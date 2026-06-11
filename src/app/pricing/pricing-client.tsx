'use client';

import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

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
  if (value === true) return <span className="text-green-400">✔</span>;
  if (value === false) return <span className="text-white/20">✖</span>;
  return <span className="text-sm text-white/80">{value}</span>;
}

export default function PricingClient() {
  async function buy(plan: string) {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Payment failed');
      }
    } catch {
      alert('Something went wrong');
    }
  }

  return (
    <>
      <Section className="pt-40">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow>Pricing</Eyebrow>
            <Heading as="h1" className="mt-4">
              Pay for what you ship.
              <span className="text-gradient italic"> Not what you forecast.</span>
            </Heading>
            <Lede className="mt-5">
              Usage-based pricing. No seat limits. No hidden fees.
            </Lede>
          </div>
        </ScrollReveal>
      </Section>

      <Pricing showHeading={false} />

      {/* CTA BUTTONS */}
      <Section>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => buy('starter')}
            className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20"
          >
            Starter
          </button>

          <button
            onClick={() => buy('pro')}
            className="px-6 py-3 bg-violet-600 rounded-xl hover:bg-violet-700"
          >
            Pro (Recommended)
          </button>

          <button
            onClick={() => buy('enterprise')}
            className="px-6 py-3 bg-cyan-600 rounded-xl hover:bg-cyan-700"
          >
            Enterprise
          </button>
        </div>
      </Section>

      {/* COMPARISON TABLE */}
      <Section>
        <ScrollReveal>
          <div className="overflow-x-auto mt-10 rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4">Starter</th>
                  <th className="p-4 text-violet-300">Pro</th>
                  <th className="p-4">Enterprise</th>
                </tr>
              </thead>

              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-4 text-white/80">{row.feature}</td>
                    <td className="p-4 text-center"><Cell value={row.starter} /></td>
                    <td className="p-4 text-center"><Cell value={row.pro} /></td>
                    <td className="p-4 text-center"><Cell value={row.enterprise} /></td>
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