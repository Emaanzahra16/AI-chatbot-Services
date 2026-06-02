import type { Metadata } from 'next';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — Altivora AI',
  description:
    'Transparent, usage-based pricing. Start free, scale to enterprise. No surprise overage charges.',
};

const compareRows = [
  { feature: 'Conversations per month', starter: '1,000', pro: '15,000', enterprise: 'Unlimited' },
  { feature: 'Chatbots', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { feature: 'Knowledge base size', starter: '100 docs', pro: '10,000 docs', enterprise: 'Unlimited' },
  { feature: 'Custom branding', starter: false, pro: true, enterprise: true },
  { feature: 'API access', starter: false, pro: true, enterprise: true },
  { feature: 'Voice agent', starter: false, pro: true, enterprise: true },
  { feature: 'SSO + SAML', starter: false, pro: false, enterprise: true },
  { feature: 'EU data residency', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated support', starter: 'Email', pro: 'Priority', enterprise: 'Slack + CSM' },
  { feature: 'SLA', starter: false, pro: '99.9%', enterprise: '99.99%' },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-400" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-white/20" />;
  return <span className="text-sm text-white/80">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Section className="pt-40">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <Heading as="h1" className="mt-4">
              Pay for what you ship.{' '}
              <span className="italic text-gradient">Not what you forecast.</span>
            </Heading>
            <Lede className="mx-auto mt-5">
              We bill on actual conversations, not seats or API calls. Hit a quiet month? You pay
              less. Hit a viral moment? We won&apos;t throttle you.
            </Lede>
          </div>
        </ScrollReveal>
      </Section>

      <Pricing showHeading={false} />

      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Plan comparison</Eyebrow>
            <Heading as="h2" className="mt-4">
              The full feature matrix
            </Heading>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-6 py-5 text-left text-sm font-semibold text-white/60">
                    Feature
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                    Starter
                  </th>
                  <th className="bg-violet-500/10 px-6 py-5 text-center text-sm font-semibold text-white">
                    Pro
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm text-white/80">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.starter} />
                    </td>
                    <td className="bg-violet-500/5 px-6 py-4 text-center">
                      <Cell value={row.pro} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
