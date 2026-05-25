'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { testimonials } from '@/data/content';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="glass relative flex w-[360px] shrink-0 flex-col gap-5 rounded-3xl border border-white/10 p-7 sm:w-[420px]">
      <div className="flex items-center gap-1 text-amber-300">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="font-display text-lg leading-snug text-white/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-white/5 pt-5">
        <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-violet-500/30">
          <Image src={t.avatar} alt={t.name} fill sizes="44px" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-white/50">
            {t.role} · {t.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Duplicate for seamless marquee loop
  const rowA = [...testimonials, ...testimonials];
  const rowB = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials];

  return (
    <Section className="overflow-hidden">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Customer signal</Eyebrow>
          <Heading as="h2" className="mt-4">
            Teams that already replaced their{' '}
            <span className="italic text-gradient">first-line agents</span>
          </Heading>
          <Lede className="mx-auto mt-5">
            From support and sales to internal ops, BotForge runs the conversations that used to
            burn out your team. Here&apos;s what they&apos;re seeing.
          </Lede>
        </div>
      </ScrollReveal>

      <div className="relative mt-16 space-y-6">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />

        <div className="flex gap-6 [animation:marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
          {rowA.map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} />
          ))}
        </div>

        <div className="flex gap-6 [animation:marquee_80s_linear_infinite_reverse] hover:[animation-play-state:paused]">
          {rowB.map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </Section>
  );
}
