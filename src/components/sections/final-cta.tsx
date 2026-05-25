'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function FinalCTA() {
  return (
    <Section>
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900/60 px-8 py-20 sm:px-16 sm:py-28">
          {/* Animated gradient backdrop */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(60% 80% at 20% 30%, rgba(124,58,237,0.35) 0%, transparent 60%), radial-gradient(60% 80% at 80% 70%, rgba(6,182,212,0.3) 0%, transparent 60%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-violet-500/30 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Start forging
            </div>

            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-white sm:text-6xl">
              Your customers are waiting.{' '}
              <span className="italic text-gradient">Let&apos;s answer them.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Spin up your first chatbot in under five minutes. No credit card. No sales call. Just
              you, your data, and a bot that actually helps.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
              >
                Start building free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Try the live demo
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/50">
              <span>✓ 14-day Pro trial</span>
              <span>✓ SOC 2 Type II</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
