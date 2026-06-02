import type { Metadata } from 'next';
import Image from 'next/image';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { GlowCard } from '@/components/ui/glow-card';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ui/scroll-reveal';
import { FinalCTA } from '@/components/sections/final-cta';
import { Compass, Heart, Eye, Rocket, Users, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Altivora AI',
  description:
    'We build conversational AI that earns trust. Meet the team forging the next generation of chatbots.',
};

const values = [
  {
    icon: Compass,
    title: 'Ground every answer',
    description:
      "Our bots cite their sources or admit they don't know. We won't ship a feature that hallucinates with confidence.",
    gradient: 'from-violet-500/40 to-fuchsia-500/40',
  },
  {
    icon: Heart,
    title: 'Care about the human',
    description:
      "Every product decision starts with: 'does this feel like a relief, or a burden?' If it's burden, it's not done.",
    gradient: 'from-rose-500/40 to-amber-500/40',
  },
  {
    icon: Eye,
    title: 'Default to transparency',
    description:
      'Public roadmap. Public changelog. Real CSAT numbers, not vanity metrics. Customers can see how the sausage is made.',
    gradient: 'from-cyan-500/40 to-emerald-500/40',
  },
  {
    icon: Rocket,
    title: 'Ship the next decade',
    description:
      "We're not optimizing for 2026. We're building infrastructure for a world where conversations replace most software.",
    gradient: 'from-blue-500/40 to-violet-500/40',
  },
];

const team = [
  {
    name: 'Alina Voss',
    role: 'Co-founder & CEO',
    bio: 'Previously led conversational AI at a major fintech. Believes the best UI is one you can talk to.',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=alina',
  },
  {
    name: 'Mateo Quintero',
    role: 'Co-founder & CTO',
    bio: 'Built distributed systems at three unicorns before getting bored. Now obsessed with sub-200ms latency.',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=mateo',
  },
  {
    name: 'Soren Mikkelsen',
    role: 'VP of Product',
    bio: 'Ex-product lead at a major collaboration tool. Once shipped a feature that saved 4M hours of meeting time.',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=soren',
  },
  {
    name: 'Mei-Lin Chen',
    role: 'Head of Design',
    bio: 'Type nerd, motion enthusiast, and the reason our chat bubbles feel right. Previously at a leading design system.',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=meilin',
  },
  {
    name: 'Rashida Okonkwo',
    role: 'VP of Engineering',
    bio: 'Scaled infrastructure to a billion requests per day. Holds the team record for fewest production incidents.',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=rashida',
  },
  {
    name: 'Lukas Brand',
    role: 'Head of Research',
    bio: "PhD in NLP. Publishes on routing, retrieval, and 'why your bot lies'. Generally not optimistic, often correct.",
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=lukas',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'The first prototype',
    description:
      'Three engineers, a whiteboard, and a conviction that the next decade of software was conversational.',
  },
  {
    year: '2024',
    title: 'Seed round + first 100 customers',
    description:
      'Raised $12M led by Sequence Ventures. Onboarded our first hundred design partners across SaaS, fintech, and e-commerce.',
  },
  {
    year: '2025',
    title: 'Voice + memory shipped',
    description:
      'Launched voice agents and persistent memory in the same quarter. Both hit production at our top 10 customers within 30 days.',
  },
  {
    year: '2026',
    title: 'Series A + global expansion',
    description:
      'Closed $48M Series A. Opened offices in Berlin and Singapore. 14,000+ teams now run on Altivora.',
  },
];

const stats = [
  { value: '14,200+', label: 'Teams shipping bots' },
  { value: '127M', label: 'Conversations / month' },
  { value: '95+', label: 'Languages supported' },
  { value: '4.84', label: 'Average CSAT score' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-40">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Our story</Eyebrow>
            <Heading as="h1" className="mt-4">
              We&apos;re building the platform we wished{' '}
              <span className="italic text-gradient">existed in 2019.</span>
            </Heading>
            <Lede className="mx-auto mt-5">
              Most chatbot platforms were built for a different era — when conversations were
              scripted and customers were patient. We&apos;re building for a world where neither is
              true.
            </Lede>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <ScrollRevealItem key={s.label}>
              <div className="glass rounded-2xl border border-white/10 p-6 text-center">
                <div className="font-display text-3xl text-gradient sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </Section>

      {/* Mission */}
      <Section className="py-20">
        <ScrollReveal>
          <div className="glass relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-16">
            <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr]">
              <Eyebrow icon={<Sparkles className="h-3 w-3" />}>Mission</Eyebrow>
              <div>
                <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
                  To make every business as easy to talk to as your most thoughtful friend &mdash;
                  patient, informed, never asleep, and{' '}
                  <span className="italic text-gradient">actually listening.</span>
                </p>
                <p className="mt-6 text-white/65">
                  We believe the next decade of software won&apos;t look like apps with buttons.
                  It&apos;ll look like conversations &mdash; with assistants that know who you are,
                  what you&apos;ve tried, and what you actually want. Our job is to make those
                  conversations possible for every team, not just the ones with an ML department.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Values */}
      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Operating principles</Eyebrow>
            <Heading as="h2" className="mt-4">
              The four rules we ship by
            </Heading>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-16 grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <ScrollRevealItem key={v.title}>
              <GlowCard gradient={v.gradient} className="h-full">
                <div className="p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10">
                    <v.icon className="h-6 w-6 text-violet-300" />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-white">{v.title}</h3>
                  <p className="mt-2 text-white/65">{v.description}</p>
                </div>
              </GlowCard>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </Section>

      {/* Timeline */}
      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Milestones</Eyebrow>
            <Heading as="h2" className="mt-4">
              Three years, four chapters
            </Heading>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <ScrollReveal key={t.year}>
                <div
                  className={`relative grid items-start gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                    i % 2 === 0 ? '' : 'md:[direction:rtl]'
                  }`}
                >
                  <div className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-violet-400/40 bg-ink-900 md:left-1/2 md:-translate-x-1/2">
                    <div className="h-2 w-2 rounded-full bg-violet-400 [box-shadow:0_0_12px_2px_rgba(124,58,237,0.7)]" />
                  </div>
                  <div className={`md:[direction:ltr] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <div className="font-mono text-sm text-violet-300">{t.year}</div>
                    <h3 className="mt-1 font-display text-2xl text-white">{t.title}</h3>
                    <p className="mt-2 text-white/65">{t.description}</p>
                  </div>
                  <div className="hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow icon={<Users className="h-3 w-3" />}>The team</Eyebrow>
            <Heading as="h2" className="mt-4">
              The people forging the bots
            </Heading>
            <Lede className="mx-auto mt-4">
              We&apos;re 64 people in 11 countries, betting our careers that conversations beat
              forms.
            </Lede>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <ScrollRevealItem key={m.name}>
              <div className="glass group h-full rounded-2xl border border-white/10 p-6 transition-colors hover:border-violet-500/40">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-violet-500/30 transition group-hover:ring-violet-400/60">
                    <Image src={m.avatar} alt={m.name} fill sizes="56px" />
                  </div>
                  <div>
                    <div className="font-display text-lg text-white">{m.name}</div>
                    <div className="text-xs text-violet-300">{m.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-white/65">{m.bio}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </Section>

      <FinalCTA />
    </>
  );
}
