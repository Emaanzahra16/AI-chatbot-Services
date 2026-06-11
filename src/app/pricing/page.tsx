import type { Metadata } from 'next';
import PricingClient from './pricing-client';

export const metadata: Metadata = {
  title: 'Pricing — Altivora AI',
  description:
    'Transparent, usage-based pricing. Start free, scale to enterprise. No surprise overage charges.',
};

export default function PricingPage() {
  return <PricingClient />;
}