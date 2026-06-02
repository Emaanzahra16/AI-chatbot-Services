'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { siteConfig, footerNav } from '@/lib/site-config';
import { Logo } from '@/components/ui/logo';
import { PulseDot } from '@/components/ui/badge';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-violet-500/[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">{siteConfig.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <PulseDot />
              <span className="text-xs text-ink-300">All systems operational</span>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Twitter, href: siteConfig.links.twitter, label: 'Twitter' },
                { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
                { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, href: siteConfig.links.discord, label: 'Discord' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white focus-ring"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Product" items={footerNav.product} />
          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Resources" items={footerNav.resources} />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">© {new Date().getFullYear()} {siteConfig.name}. Built with attention and a lot of coffee.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-xs text-ink-400 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Giant brand watermark */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none overflow-hidden text-center font-display text-[18vw] leading-none tracking-tighter text-transparent"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(139,92,246,0.12), rgba(6,8,26,0))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          Altivora 
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-300">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm text-ink-200 transition-colors hover:text-white focus-ring"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
