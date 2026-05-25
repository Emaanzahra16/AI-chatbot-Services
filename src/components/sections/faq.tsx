'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { faqs } from '@/data/content';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <ScrollReveal>
          <Eyebrow>Common questions</Eyebrow>
          <Heading as="h2" className="mt-4">
            Everything teams ask <span className="italic text-gradient">before signing</span>
          </Heading>
          <Lede className="mt-5">
            Short, honest answers. If yours isn&apos;t here, our team replies inside the chat in
            under five minutes during business hours.
          </Lede>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <ScrollReveal key={idx}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-violet-500/40 bg-violet-500/5'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-ring"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-white">{faq.question}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 transition-transform ${
                        isOpen ? 'rotate-45 bg-violet-500/20 border-violet-400/50' : ''
                      }`}
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <div className="px-6 pb-6 text-white/70 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
