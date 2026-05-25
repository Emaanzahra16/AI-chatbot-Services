'use client';

import {
  Sparkles, Brain, Zap, Shield, BarChart3, Code2, Globe, Workflow, Mic,
  type LucideIcon,
} from 'lucide-react';
import { features } from '@/data/content';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ui/scroll-reveal';
import { GlowCard } from '@/components/ui/glow-card';

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Brain, Zap, Shield, BarChart3, Code2, Globe, Workflow, Mic,
};

export function Features() {
  return (
    <Section id="features">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <Eyebrow icon={<Sparkles className="h-3 w-3" />}>What you get</Eyebrow>
        <Heading className="mt-5">
          Everything you need to ship <span className="italic text-gradient">a serious bot.</span>
        </Heading>
        <Lede className="mx-auto mt-6 max-w-2xl">
          Not a wrapper. Not a widget. A platform — with memory, models, voice, analytics, and the
          security paperwork your CISO needs.
        </Lede>
      </ScrollReveal>

      <ScrollRevealStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon] ?? Sparkles;
          const gradients = [
            'from-violet-500/40 to-cyan-500/40',
            'from-cyan-500/40 to-emerald-500/40',
            'from-rose-500/40 to-violet-500/40',
            'from-amber-500/40 to-pink-500/40',
            'from-blue-500/40 to-violet-500/40',
            'from-emerald-500/40 to-cyan-500/40',
            'from-pink-500/40 to-amber-500/40',
            'from-indigo-500/40 to-cyan-500/40',
            'from-violet-500/40 to-pink-500/40',
          ];
          return (
            <ScrollRevealItem key={f.title}>
              <GlowCard gradient={gradients[i % gradients.length]} className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div
                    className="inline-grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-from, #7c3aed), var(--tw-gradient-to, #06b6d4))`, backgroundImage: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.description}</p>
                </div>
              </GlowCard>
            </ScrollRevealItem>
          );
        })}
      </ScrollRevealStagger>
    </Section>
  );
}
