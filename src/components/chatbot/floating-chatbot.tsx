'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from 'react';
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

  const hidden = STORAGE_KEY_DISABLED_PATHS.some((p) =>
    pathname?.startsWith(p),
  );

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, streamingText]);

  // ✅ FIXED sendMessage (no duplicate responses)
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

      // IMPORTANT: single source of truth snapshot
      const updatedMessages = [...messages, userMsg];

      setMessages(updatedMessages);
      setInput('');
      setStreaming(true);
      setStreamingText('');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map(({ role, content }) => ({
              role,
              content,
            })),
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
            } catch {}
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            content: acc,
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            content:
              'I lost my connection for a second — try that again?',
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
        content: 'Fresh start. What can I help you with?',
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleVoice = () => {
    setIsListening((s) => !s);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 2500);
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Launcher (UNCHANGED ANIMATION) */}
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
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-pulse-glow rounded-full"
              style={{
                background: 'inherit',
                filter: 'blur(20px)',
                opacity: 0.6,
              }}
            />
            <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-ink-950 bg-cyan-400 text-[10px] font-bold text-ink-950">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Window (UNCHANGED DESIGN) */}
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
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50 aurora"
            />

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
                  <div className="text-sm font-semibold text-white">
                    Altivora Assistant
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-300">
                    <PulseDot />
                    AI concierge · usually replies instantly
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={reset} className="p-1.5">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5">
                  <Minimize2 className="h-4 w-4 hidden sm:block" />
                  <X className="h-4 w-4 sm:hidden" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto px-4 py-4 no-scrollbar"
            >
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
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-ink-950/60 p-3"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Altivora Assistant…"
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <button type="submit">
                  <Send />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= CHAT BUBBLE (UNCHANGED VISUALS) ================= */

function ChatBubble({
  message,
  streaming,
}: {
  message: ChatMessage;
  streaming?: boolean;
}) {
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