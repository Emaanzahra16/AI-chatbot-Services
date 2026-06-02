'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Settings2,
  RefreshCcw,
  Mic,
  ChevronDown,
  Cpu,
  Activity,
  Code2,
} from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Input } from '@/components/ui/input';
import { suggestedPrompts } from '@/lib/ai';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

const models = [
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', tag: 'Fast' },
  { id: 'gpt-4o', label: 'GPT-4o', tag: 'Smart' },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', tag: 'Balanced' },
  { id: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku', tag: 'Lightning' },
  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', tag: 'Long context' },
];

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function DemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: 'assistant',
      content:
        "Welcome to the Altivora playground. Tweak the system prompt, swap models, and put me through my paces. What should I be today?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [model, setModel] = useState(models[0]);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a senior product specialist at Altivora AI. Be concise, technically rigorous, and friendly.',
  );
  const [temperature, setTemperature] = useState(0.6);
  const [listening, setListening] = useState(false);
  const [tokensThisSession, setTokensThisSession] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };
    const assistantId = uid();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    };

    setMessages((m) => [...m, userMsg, assistantMsg]);
    setInput('');
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          model: model.id,
          temperature,
          system: systemPrompt,
        }),
      });

      if (!res.body) throw new Error('No stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';
        for (const evt of events) {
          const line = evt.trim();
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.delta) {
              setTokensThisSession((t) => t + parsed.delta.split(/\s+/).length);
              setMessages((m) =>
                m.map((msg) =>
                  msg.id === assistantId ? { ...msg, content: msg.content + parsed.delta } : msg,
                ),
              );
            }
          } catch {
            // ignore
          }
        }
      }
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: 'Something went wrong streaming the response. Please try again.' }
            : msg,
        ),
      );
    } finally {
      setStreaming(false);
    }
  }

  function reset() {
    setMessages([
      {
        id: uid(),
        role: 'assistant',
        content: 'Conversation reset. Where do you want to start?',
        createdAt: new Date().toISOString(),
      },
    ]);
    setTokensThisSession(0);
  }

  return (
    <Section className="pt-40">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow icon={<Sparkles className="h-3 w-3" />}>AI Playground</Eyebrow>
          <Heading as="h1" className="mt-4">
            Push the bot until <span className="italic text-gradient">it breaks.</span>
          </Heading>
          <Lede className="mx-auto mt-5">
            Swap models, edit the system prompt, dial temperature, and watch the response stream
            token by token. This is the same engine running in production for 14,000+ teams.
          </Lede>
        </div>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Settings panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.aside
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="glass space-y-6 rounded-3xl border border-white/10 p-6 h-fit"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg text-white">Playground settings</h3>
                <Settings2 className="h-4 w-4 text-white/40" />
              </div>

              {/* Model selector */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-300">
                  Model
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModelMenu((v) => !v)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white transition hover:border-violet-500/40"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-violet-300" />
                      {model.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white/40 transition-transform',
                        showModelMenu && 'rotate-180',
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {showModelMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-950/95 backdrop-blur-xl shadow-2xl"
                      >
                        {models.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setModel(m);
                              setShowModelMenu(false);
                            }}
                            className={cn(
                              'flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/5',
                              model.id === m.id ? 'text-white' : 'text-white/70',
                            )}
                          >
                            <span>{m.label}</span>
                            <span className="text-xs text-violet-300">{m.tag}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* System prompt */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-300">
                  System prompt
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-ink-400 transition focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              {/* Temperature */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-ink-300">
                    Temperature
                  </label>
                  <span className="font-mono text-xs text-violet-300">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-white/5 pt-5">
                <div className="text-xs uppercase tracking-wider text-white/40">Session</div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-white/60">Messages</span>
                    <span className="font-mono text-white">{messages.length}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-white/60">~Tokens</span>
                    <span className="font-mono text-white">{tokensThisSession}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-white/60">Avg latency</span>
                    <span className="font-mono text-emerald-300">312ms</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={reset}
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/[0.08]"
              >
                <RefreshCcw className="h-4 w-4" /> Reset conversation
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <div className="glass relative flex h-[700px] flex-col overflow-hidden rounded-3xl border border-white/10">
          <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
          <header className="relative flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-display text-sm text-white">Altivora Playground</div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 [box-shadow:0_0_8px_rgba(52,211,153,0.7)]" />
                  Streaming · {model.label}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Toggle settings"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  msg.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-violet-500 to-cyan-500 text-white'
                      : 'glass border border-white/10 text-white/90',
                  )}
                >
                  {msg.content ||
                    (streaming && msg.role === 'assistant' && (
                      <span className="inline-flex gap-1">
                        <span className="typing-dot" />
                        <span className="typing-dot [animation-delay:0.15s]" />
                        <span className="typing-dot [animation-delay:0.3s]" />
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>

          {messages.length <= 2 && (
            <div className="relative border-t border-white/5 px-6 py-3">
              <div className="text-[10px] uppercase tracking-wider text-white/40">Try asking</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 4).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    disabled={streaming}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white disabled:opacity-50"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative border-t border-white/5 p-4"
          >
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..."
                disabled={streaming}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => setListening((l) => !l)}
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-xl border transition',
                  listening
                    ? 'border-rose-400/40 bg-rose-500/20 text-rose-300 animate-pulse'
                    : 'border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08]',
                )}
                aria-label="Voice input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white transition hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Info row */}
      <ScrollReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Activity, title: 'Real streaming', body: 'Same SSE pipeline as production.' },
            { icon: Cpu, title: 'Model swap', body: 'Test the same prompt across 5 frontier models.' },
            { icon: Code2, title: 'API-ready', body: 'Every interaction is also available via REST.' },
          ].map((c) => (
            <div key={c.title} className="glass rounded-2xl border border-white/10 p-5">
              <c.icon className="h-5 w-5 text-violet-300" />
              <div className="mt-3 font-display text-lg text-white">{c.title}</div>
              <div className="mt-1 text-sm text-white/60">{c.body}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
