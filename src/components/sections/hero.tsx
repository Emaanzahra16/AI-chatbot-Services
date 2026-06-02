'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, ChevronRight } from 'lucide-react';
import { PulseDot } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-28">
      {/* Aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent 65%)' }} />
        <div className="absolute top-[35%] right-[15%] h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4), transparent 65%)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex"
          >
            <Link
              href="/blog/the-q1-product-update"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink-200 backdrop-blur transition-all hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-white"
            >
              <PulseDot />
              <span className="font-medium">New —</span>
              <span className="text-ink-300">Voice agents, persistent memory & multi-model routing</span>
              <ChevronRight className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-normal leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
          >
            Altivora Assistant conversations <br className="hidden sm:inline" />
            that <span className="relative inline-block">
              <span className="text-gradient italic">actually</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 9C40 4 80 2 198 6" stroke="url(#underline)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </span> close.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl"
          >
            The enterprise platform to build, train, and deploy AI agents that resolve tickets,
            book demos, and answer with citations. Production-ready in 30 minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3.5 text-sm font-medium text-white shadow-2xl shadow-violet-500/40 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/60 focus-ring"
            >
              <Sparkles className="h-4 w-4" />
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-all hover:border-violet-500/40 hover:bg-white/[0.08] focus-ring"
            >
              <Play className="h-4 w-4" />
              Watch live demo
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex flex-col items-center gap-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-ink-400">
              Trusted by 4,200+ teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
              {['LUMEN', 'NORTHWIND', 'TABULA', 'STRATO', 'FJORD', 'VERTEX'].map((name) => (
                <span key={name} className="font-display text-base tracking-[0.3em] text-ink-300 sm:text-lg">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating demo card preview */}
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="relative mx-auto mt-20 max-w-5xl"
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-900/60 backdrop-blur-2xl shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <PulseDot />
            <span>altivora.ai/agent/support-concierge</span>
          </div>
          <span className="w-12" />
        </div>

        {/* Mock chat */}
        <div className="grid gap-0 sm:grid-cols-[1fr_280px]">
          <div className="space-y-4 p-6 sm:p-8">
            <PreviewBubble role="user">
              We just got a 502 error trying to embed the widget on our docs site. Help?
            </PreviewBubble>
            <PreviewBubble role="assistant">
              I see the request in your logs — looks like a CSP violation, not a 502 from our end.
              Your `connect-src` is missing `wss://api.altivora.ai`. Add that and refresh; if it&apos;s
              still broken in 30 seconds I&apos;ll page Engineering.
            </PreviewBubble>
            <PreviewBubble role="user">That fixed it. Thanks.</PreviewBubble>
            <PreviewBubble role="assistant">
              Anytime. I&apos;ve added a note to your account so the next time you spin up a domain we&apos;ll
              pre-flight the CSP. Anything else?
            </PreviewBubble>
          </div>
          <aside className="border-t border-white/[0.06] bg-ink-950/40 p-5 sm:border-l sm:border-t-0">
            <div className="text-[11px] uppercase tracking-wider text-ink-400">Live signals</div>
            <ul className="mt-3 space-y-3 text-xs">
              <SignalRow label="Latency" value="312ms" tone="ok" />
              <SignalRow label="Tokens" value="284" tone="muted" />
              <SignalRow label="Model" value="GPT-4o" tone="muted" />
              <SignalRow label="Confidence" value="98.6%" tone="ok" />
              <SignalRow label="Sentiment" value="Positive ↑" tone="ok" />
              <SignalRow label="Sources" value="3 cited" tone="muted" />
            </ul>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-400">Customer</div>
              <div className="mt-1.5 text-sm text-white">Aria Johansson</div>
              <div className="text-[11px] text-ink-400">Pro plan · since Mar 2024</div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewBubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const user = role === 'user';
  return (
    <div className={user ? 'flex justify-end' : 'flex justify-start gap-2.5'}>
      {!user && (
        <div className="mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={
          user
            ? 'max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-cyan-600 px-4 py-2.5 text-sm text-white shadow-lg shadow-violet-500/20'
            : 'max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-ink-100 backdrop-blur'
        }
      >
        {children}
      </div>
    </div>
  );
}

function SignalRow({ label, value, tone }: { label: string; value: string; tone: 'ok' | 'muted' }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-ink-400">{label}</span>
      <span className={tone === 'ok' ? 'font-mono text-emerald-300' : 'font-mono text-ink-200'}>{value}</span>
    </li>
  );
}
