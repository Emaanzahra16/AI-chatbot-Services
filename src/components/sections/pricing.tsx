'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { pricingTiers } from '@/data/content';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ui/scroll-reveal';
import { cn } from '@/lib/utils';

interface PricingProps {
  compact?: boolean;
  showHeading?: boolean;
}

export function Pricing({ compact, showHeading = true }: PricingProps) {
  const [yearly, setYearly] = useState(true);

  return (
    <Section id="pricing" className={cn(compact && 'py-16')}>
      {showHeading && (
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <Eyebrow icon={<Zap className="h-3 w-3" />}>Pricing</Eyebrow>
          <Heading className="mt-5">
            Pay for conversations, <span className="italic text-gradient">not seats.</span>
          </Heading>
          <Lede className="mx-auto mt-6 max-w-2xl">
            Every plan includes unlimited team members, every model, and every integration. Scale by
            conversations only.
          </Lede>
        </ScrollReveal>
      )}

      {/* Billing toggle */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              'relative rounded-full px-4 py-1.5 text-sm transition-colors',
              !yearly ? 'text-white' : 'text-ink-300 hover:text-white',
            )}
          >
            {!yearly && (
              <motion.span
                layoutId="pricing-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
              />
            )}
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              'relative rounded-full px-4 py-1.5 text-sm transition-colors',
              yearly ? 'text-white' : 'text-ink-300 hover:text-white',
            )}
          >
            {yearly && (
              <motion.span
                layoutId="pricing-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
              />
            )}
            Yearly <span className="ml-1 text-[10px] opacity-80">2 mo free</span>
          </button>
        </div>
      </div>

      <ScrollRevealStagger className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
        {pricingTiers.map((t) => (
          <ScrollRevealItem key={t.id}>
            <PricingCard tier={t} yearly={yearly} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>

      <p className="mt-10 text-center text-sm text-ink-400">
        All plans include unlimited team members · no credit card to start · cancel anytime.
      </p>
    </Section>
  );
}

function PricingCard({ tier, yearly }: { tier: typeof pricingTiers[number]; yearly: boolean }) {
  const isEnterprise = tier.id === 'enterprise';
  const price = isEnterprise ? null : yearly ? Math.round(tier.price.yearly / 12) : tier.price.monthly;

  return (
    <div
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border bg-ink-900/50 p-6 backdrop-blur-xl transition-all hover:-translate-y-1',
        tier.highlighted
          ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20'
          : 'border-white/10 hover:border-white/20',
      )}
    >
      {tier.highlighted && (
        <>
          <div aria-hidden className="pointer-events-none absolute -top-1/2 -right-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-1/2 -left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-3xl" />
        </>
      )}

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl text-white">{tier.name}</h3>
          {tier.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/30">
              <Sparkles className="h-3 w-3" />
              {tier.badge}
            </span>
          )}
        </div>

        <p className="mt-3 min-h-[2.5rem] text-sm text-ink-300">{tier.description}</p>

        <div className="mt-6 flex items-baseline gap-2">
          {isEnterprise ? (
            <span className="font-display text-5xl text-white">Custom</span>
          ) : (
            <>
              <span className="font-display text-5xl text-white">${price}</span>
              <span className="text-sm text-ink-400">/ mo</span>
              {yearly && <span className="ml-1 text-xs text-ink-400">billed yearly</span>}
            </>
          )}
        </div>

        <Link
          href={isEnterprise ? '/contact' : '/signup'}
          className={cn(
            'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all focus-ring',
            tier.highlighted
              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30 hover:-translate-y-0.5'
              : 'border border-white/15 bg-white/[0.04] text-white hover:border-violet-500/40 hover:bg-white/[0.08]',
          )}
        >
          {tier.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="mt-7 space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-ink-400">What&apos;s included</p>
          <ul className="space-y-2.5">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink-200">
                <Check className="h-4 w-4 flex-shrink-0 translate-y-0.5 text-emerald-400" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
