import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Headphones,
  TrendingUp,
  BookOpen,
  Phone,
  Cpu,
  PieChart,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { GlowCard } from '@/components/ui/glow-card';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { services } from '@/data/content';
import { FinalCTA } from '@/components/sections/final-cta';

export const metadata: Metadata = {
  title: 'Services — Altivora AI',
  description:
    'Production AI for support, sales, knowledge, voice, custom LLMs, and analytics. Pick the surface area, we ship the bot.',
};

const iconMap = {
  Headphones,
  TrendingUp,
  BookOpen,
  Phone,
  Cpu,
  PieChart,
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-40">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>What we ship</Eyebrow>
            <Heading as="h1" className="mt-4">
              Six surfaces. <span className="italic text-gradient">One platform.</span>
            </Heading>
            <Lede className="mx-auto mt-5">
              Whether you need a tier-1 support bot, a sales co-pilot, or a voice agent that
              survives a real phone call, Altivora AI runs the model, the memory, and the metrics.
            </Lede>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Cpu;
            return (
              <ScrollRevealItem key={service.id}>
                <GlowCard gradient={service.color + ' opacity-40'} className="h-full">
                  <div className="p-7">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-5 font-display text-xl text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealStagger>
      </Section>

      <Section className="py-20">
        <ScrollReveal>
          <div className="glass relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-16">
            <div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <Eyebrow>Custom builds</Eyebrow>
                <Heading as="h2" className="mt-4 text-4xl">
                  Need something we haven&apos;t named yet?
                </Heading>
                <p className="mt-4 text-lg text-white/70">
                  Our solutions team has built bots for healthcare triage, fintech KYC,
                  manufacturing diagnostics, and government services. If you can describe the
                  conversation, we can ship the agent.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact">
                  <Button size="lg" className="w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
                    Book a discovery call
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full">
                    Try a live bot first
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <FinalCTA />
    </>
  );
}
