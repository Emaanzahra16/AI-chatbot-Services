'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, MapPin, MessageCircle, Twitter, Github, Linkedin, Send } from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const offices = [
  { city: 'San Francisco', address: '548 Market St, Suite 38420', timezone: 'PST' },
  { city: 'Berlin', address: 'Rosenthaler Straße 40, 10178', timezone: 'CET' },
  { city: 'Singapore', address: '6 Battery Road, #38-04', timezone: 'SGT' },
];

const channels = [
  { icon: Mail, label: 'Email', value: 'hello@botforge.ai', href: 'mailto:hello@botforge.ai' },
  { icon: MessageCircle, label: 'Sales', value: 'sales@botforge.ai', href: 'mailto:sales@botforge.ai' },
  { icon: Twitter, label: 'Twitter', value: '@botforgeai', href: '#' },
  { icon: Github, label: 'GitHub', value: 'github.com/botforge', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', value: '/company/botforge', href: '#' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      });
      if (!res.ok) throw new Error('Failed to send');
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      toast.error('Something went wrong. Try again or email us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="pt-40">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <Heading as="h1" className="mt-4">
            Let&apos;s start a <span className="italic text-gradient">conversation.</span>
          </Heading>
          <Lede className="mx-auto mt-5">
            Sales, support, partnerships, or just curious — we read every message. Most replies go
            out within four hours during business days.
          </Lede>
        </div>
      </ScrollReveal>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <form onSubmit={handleSubmit} className="relative space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Your name"
                placeholder="Ada Lovelace"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Work email"
                type="email"
                placeholder="ada@company.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <Input
              label="Company"
              placeholder="Analytical Engines Inc."
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <Textarea
              label="What are you building?"
              rows={5}
              placeholder="Tell us about your use case, team size, and timeline..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button
              type="submit"
              size="lg"
              loading={loading}
              iconRight={<Send className="h-4 w-4" />}
              className="w-full"
            >
              Send message
            </Button>
            <p className="text-center text-xs text-white/40">
              By submitting, you agree to our terms and privacy policy. We won&apos;t spam &mdash;
              promise.
            </p>
          </form>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ScrollReveal>
            <div className="glass rounded-3xl border border-white/10 p-7">
              <h3 className="font-display text-xl text-white">Direct channels</h3>
              <ul className="mt-5 space-y-3">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/20">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-wider text-white/40">
                          {c.label}
                        </div>
                        <div className="truncate text-sm text-white">{c.value}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass rounded-3xl border border-white/10 p-7">
              <h3 className="font-display text-xl text-white">Offices</h3>
              <ul className="mt-5 space-y-4">
                {offices.map((o) => (
                  <li key={o.city} className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                    <div className="text-sm">
                      <div className="font-medium text-white">
                        {o.city} <span className="ml-1 text-xs text-white/40">{o.timezone}</span>
                      </div>
                      <div className="text-white/60">{o.address}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
