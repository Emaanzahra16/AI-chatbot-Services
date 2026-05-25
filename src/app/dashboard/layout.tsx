'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessagesSquare,
  Bot,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/conversations', label: 'Conversations', icon: MessagesSquare },
  { href: '/dashboard/chatbots', label: 'Chatbots', icon: Bot },
  { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

function Sidebar({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full flex-col border-r border-white/5 bg-ink-950/60 backdrop-blur-xl">
      <div className="border-b border-white/5 p-5">
        <Link href="/" className="inline-flex" onClick={onNav}>
          <Logo showText />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                active
                  ? 'text-white'
                  : 'text-white/55 hover:bg-white/[0.04] hover:text-white',
              )}
            >
              {active && (
                <motion.span
                  layoutId="dash-nav-active"
                  className="absolute inset-0 rounded-xl border border-violet-500/30 bg-violet-500/10"
                />
              )}
              <item.icon className="relative h-4 w-4 shrink-0" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-white/5 p-3">
        <Link
          href="/blog"
          onClick={onNav}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-white"
        >
          <HelpCircle className="h-4 w-4" />
          Documentation
        </Link>
        <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-4">
          <Sparkles className="h-4 w-4 text-violet-300" />
          <div className="mt-2 text-sm font-medium text-white">Pro trial</div>
          <div className="mt-1 text-xs text-white/60">9 days left · upgrade to keep features</div>
          <Link
            href="/dashboard/subscription"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-ink-950 hover:bg-white/90"
          >
            Upgrade
          </Link>
        </div>
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://api.dicebear.com/9.x/notionists/svg?seed=alex"
            alt=""
            className="h-9 w-9 rounded-full ring-2 ring-violet-500/30"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm text-white">Alex Rivera</div>
            <div className="truncate text-xs text-white/40">alex@acme.com</div>
          </div>
          <Link
            href="/"
            className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="lg:grid lg:grid-cols-[260px_1fr]">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-ink-950/80 px-4 py-3 backdrop-blur lg:hidden">
          <Logo showText />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border border-white/10 p-2 text-white"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </header>

        {/* Desktop sidebar */}
        <div className="hidden lg:block lg:h-screen lg:sticky lg:top-0">
          <Sidebar />
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="absolute inset-y-0 left-0 w-[260px]"
            >
              <Sidebar onNav={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-2 text-white/60 hover:bg-white/5"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        )}

        {/* Content */}
        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl p-6 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
