'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Cpu } from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PulseDot } from '@/components/ui/badge';
import { suggestedPrompts } from '@/lib/ai';
import type { ChatMessage } from '@/types';

export function LiveDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'demo-1',
      role: 'assistant',
      content:
        "This is a live BotForge agent. Ask me anything — I'm streaming token by token, just like in production.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streamingText]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || streaming) return;
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: t,
      createdAt: new Date().toISOString(),
    };
    setMessages((p) => [...p, userMsg]);
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
      if (!res.body) throw new Error('no body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data:')) continue;
          const p = line.slice(5).trim();
          if (p === '[DONE]') continue;
          try {
            const parsed = JSON.parse(p);
            if (parsed.delta) {
              acc += parsed.delta;
              setStreamingText(acc);
            }
          } catch {}
        }
      }
      setMessages((p) => [
        ...p,
        { id: `a_${Date.now()}`, role: 'assistant', content: acc, createdAt: new Date().toISOString() },
      ]);
    } finally {
      setStreaming(false);
      setStreamingText('');
    }
  }

  return (
    <Section id="demo" className="relative">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <Eyebrow icon={<Cpu className="h-3 w-3" />}>Try it live</Eyebrow>
        <Heading className="mt-5">
          Talk to the platform <span className="italic text-gradient">that&apos;s talking back.</span>
        </Heading>
        <Lede className="mx-auto mt-6 max-w-2xl">
          This widget is a live BotForge agent. Same architecture, same streaming, same response model
          your customers will use.
        </Lede>
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="mx-auto mt-14 max-w-3xl">
        <div className="relative">
          <div aria-hidden className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-500/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 backdrop-blur-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Forge · Demo Agent</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-300">
                    <PulseDot />
                    Streaming · gpt-4o-mini · response time avg 312ms
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="max-h-[440px] min-h-[360px] overflow-y-auto p-5 no-scrollbar">
              <div className="space-y-3.5">
                {messages.map((m) => (
                  <DemoBubble key={m.id} message={m} />
                ))}
                {streaming && (
                  <DemoBubble
                    streaming={!streamingText}
                    message={{
                      id: 's',
                      role: 'assistant',
                      content: streamingText,
                      createdAt: new Date().toISOString(),
                    }}
                  />
                )}
              </div>

              {messages.length <= 1 && !streaming && (
                <div className="mt-5">
                  <div className="mb-2 text-[11px] uppercase tracking-wider text-ink-400">Try one of these</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => send(p)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-200 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white focus-ring"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/[0.06] p-4"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-2.5 focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/20">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Forge anything…"
                  disabled={streaming}
                  className="flex-1 bg-transparent text-sm text-white placeholder-ink-400 outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0 focus-ring"
                >
                  Send <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}

function DemoBubble({ message, streaming }: { message: ChatMessage; streaming?: boolean }) {
  const user = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${user ? 'flex-row-reverse' : ''}`}
    >
      {!user && (
        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={
          user
            ? 'max-w-[78%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-cyan-600 px-4 py-2.5 text-sm text-white shadow-lg shadow-violet-500/20'
            : 'max-w-[82%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-ink-100 backdrop-blur'
        }
      >
        {streaming ? (
          <span className="inline-flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        ) : (
          <span className="whitespace-pre-wrap leading-relaxed">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
}
