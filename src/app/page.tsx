import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { LiveDemo } from '@/components/sections/live-demo';
import { Pricing } from '@/components/sections/pricing';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';

export const metadata: Metadata = {
  title: 'Altivora AI — Build chatbots that actually answer',
  description:
    'A production-grade AI chatbot platform for teams who care about response quality, latency, and brand voice. Streaming, memory, voice, and analytics out of the box.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <LiveDemo />
      <Pricing compact />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
