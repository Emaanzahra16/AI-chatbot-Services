'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mic,
  Sparkles,
  Minimize2,
  RefreshCw,
} from 'lucide-react';
import { suggestedPrompts } from '@/lib/ai';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { PulseDot } from '@/components/ui/badge';

const STORAGE_KEY_DISABLED_PATHS = ['/dashboard'];

export function FloatingChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi — I'm Altivora Assistant, Altivora AI's in-product concierge. Ask me about features, pricing, integrations, or just say hi.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide in dashboard (has its own chat surface)
  const hidden = STORAGE_KEY_DISABLED_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streamingText]);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || streaming) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: 'user',
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setStreaming(true);
      setStreamingText('');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.body) throw new Error('No stream');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // SSE-ish format: lines starting with "data: "
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const parsed = JSON.parse(payload);
              if (parsed.delta) {
                acc += parsed.delta;
                setStreamingText(acc);
              }
            } catch {
              /* swallow */
            }
          }
        }

        const assistantMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          role: 'assistant',
          content: acc,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            content: "I lost my connection for a second — try that again?",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setStreaming(false);
        setStreamingText('');
      }
    },
    [messages, streaming],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const reset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Fresh start. What can I help you with?",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleVoice = () => {
    // Visual-only voice input toggle. Real Web Speech API integration
    // can be wired in here later by the consumer.
    setIsListening((s) => !s);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 2500);
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl shadow-violet-500/40 focus-ring sm:bottom-7 sm:right-7"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
          >
            <span aria-hidden className="absolute inset-0 -z-10 animate-pulse-glow rounded-full" style={{ background: 'inherit', filter: 'blur(20px)', opacity: 0.6 }} />
            <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-ink-950 bg-cyan-400 text-[10px] font-bold text-ink-950">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100vh-1rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-950/90 shadow-2xl shadow-violet-500/20 backdrop-blur-2xl sm:bottom-7 sm:right-7 sm:left-auto sm:h-[600px] sm:w-[400px]"
          >
            {/* aurora background */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 aurora" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 bg-ink-950/60 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/40">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-950 bg-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Altivora Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-300">
                    <PulseDot />
                    AI concierge · usually replies instantly
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  aria-label="Reset conversation"
                  className="rounded-full p-1.5 text-ink-300 transition-colors hover:bg-white/5 hover:text-white focus-ring"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Minimize chat"
                  className="rounded-full p-1.5 text-ink-300 transition-colors hover:bg-white/5 hover:text-white focus-ring"
                >
                  <Minimize2 className="h-4 w-4 hidden sm:block" />
                  <X className="h-4 w-4 sm:hidden" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
              <div className="space-y-4">
                {messages.map((m) => (
                  <ChatBubble key={m.id} message={m} />
                ))}
                {streaming && (
                  <ChatBubble
                    message={{
                      id: 'streaming',
                      role: 'assistant',
                      content: streamingText,
                      createdAt: new Date().toISOString(),
                    }}
                    streaming={!streamingText}
                  />
                )}
              </div>

              {/* Suggested prompts (only on first turn) */}
              {messages.length <= 1 && !streaming && (
                <div className="mt-6">
                  <div className="mb-2 text-[11px] uppercase tracking-wider text-ink-400">Suggested</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.slice(0, 4).map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-200 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white focus-ring"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="relative border-t border-white/10 bg-ink-950/60 p-3 backdrop-blur"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/60 px-3 py-2 focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/20">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Altivora Assistant anything…"
                  disabled={streaming}
                  className="flex-1 bg-transparent text-sm text-white placeholder-ink-400 outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={toggleVoice}
                  aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full transition-colors focus-ring',
                    isListening
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-pulse'
                      : 'text-ink-300 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label="Send message"
                  className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 focus-ring"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-ink-400">
                <span className="flex items-center gap-1">
                  <Logo size={12} showText={false} />
                  Powered by Altivora AI
                </span>
                <span>Press Enter ↵</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ message, streaming }: { message: ChatMessage; streaming?: boolean }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-2.5', isUser && 'flex-row-reverse')}
    >
      {!isUser && (
        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/20'
            : 'rounded-tl-sm border border-white/10 bg-white/5 text-ink-100 backdrop-blur',
        )}
      >
        {streaming ? (
          <span className="inline-flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
}
