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
        <div
          className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.5), transparent 65%)',
          }}
        />
        <div
          className="absolute top-[35%] right-[15%] h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(34,211,238,0.4), transparent 65%)',
          }}
        />
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
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink-200 backdrop-blur transition-all hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-white"
            >
              <PulseDot />
              <span className="font-medium">Free Demo —</span>
              <span className="text-ink-300">
                Get your AI chatbot website in 24 hours
              </span>
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
            We build AI systems that{' '}
            <span className="relative inline-block">
              <span className="text-gradient italic">
                turn visitors into customers
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 9C40 4 80 2 198 6"
                  stroke="url(#underline)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="underline"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl"
          >
            Get a free AI chatbot + landing page demo for your business in 24
            hours. No commitment. No setup cost. Just results-focused AI
            systems built for conversions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3.5 text-sm font-medium text-white shadow-2xl shadow-violet-500/40 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/60 focus-ring"
            >
              <Sparkles className="h-4 w-4" />
              Get Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-all hover:border-violet-500/40 hover:bg-white/[0.08] focus-ring"
            >
              <Play className="h-4 w-4" />
              Book a Call
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
              AI automation systems for startups & agencies
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
              {['LEADS', 'AUTOMATION', 'GROWTH', 'SALES', 'AI SYSTEMS'].map(
                (name) => (
                  <span
                    key={name}
                    className="font-display text-base tracking-[0.3em] text-ink-300 sm:text-lg"
                  >
                    {name}
                  </span>
                )
              )}
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
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <div className="ml-4 rounded-lg bg-black/20 px-3 py-1 text-xs text-white/50">
            altivora-ai-demo.com
          </div>
        </div>

        {/* Chat Preview */}
        <div className="space-y-4 p-6">
          <div className="rounded-2xl bg-black/30 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-400">
              AI Assistant
            </p>

            <p className="mt-2 text-white">
              👋 Hello! Welcome to Altivora AI. How can I help your
              business today?
            </p>
          </div>

          <div className="flex justify-end">
            <div className="max-w-xs rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-white">
              I need more leads for my business.
            </div>
          </div>

          <div className="rounded-2xl bg-black/30 p-4">
            <p className="text-white">
              Great! We can build an AI chatbot that captures leads,
              qualifies prospects, books meetings, and follows up
              automatically.
            </p>
          </div>

          <div className="grid gap-4 pt-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-2xl font-bold text-cyan-400">
                +320%
              </div>
              <div className="text-sm text-white/60">
                More Qualified Leads
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-2xl font-bold text-violet-400">
                24/7
              </div>
              <div className="text-sm text-white/60">
                AI Customer Support
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-2xl font-bold text-green-400">
                10x
              </div>
              <div className="text-sm text-white/60">
                Faster Response Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}