'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/lib/site-config';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide nav inside dashboard (it has its own sidebar)
  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'pt-3' : 'pt-5',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              'flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6',
              scrolled
                ? 'border-white/10 bg-ink-950/70 shadow-lg shadow-violet-500/5 backdrop-blur-xl'
                : 'border-white/[0.06] bg-ink-950/30 backdrop-blur-md',
            )}
          >
            <Link href="/" aria-label="BotForge AI home" className="focus-ring rounded-full">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative rounded-full px-3.5 py-1.5 text-sm transition-colors focus-ring',
                        active ? 'text-white' : 'text-ink-300 hover:text-white',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden rounded-full px-4 py-2 text-sm text-ink-200 transition-colors hover:text-white sm:inline-block focus-ring"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform hover:-translate-y-0.5 focus-ring"
              >
                Get started
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              
              {/* Language Switcher - Added here */}
              <LanguageSwitcher />
              
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((s) => !s)}
                className="rounded-full p-2 text-ink-200 transition-colors hover:bg-white/5 md:hidden focus-ring"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-4 top-24 rounded-3xl border border-white/10 bg-ink-900/90 p-6 shadow-2xl"
            >
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors',
                          active ? 'bg-white/10 text-white' : 'text-ink-200 hover:bg-white/5',
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Get started
                </Link>
              </div>
              
              {/* Language Switcher for mobile */}
              <div className="mt-4 flex justify-center">
                <LanguageSwitcher />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}