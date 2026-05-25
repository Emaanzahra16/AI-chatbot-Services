'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentPlan = {
  name: 'Pro',
  price: 99,
  billingCycle: 'monthly',
  nextBillingDate: '2026-06-24',
  conversationsUsed: 9820,
  conversationsLimit: 15000,
  botsUsed: 3,
  botsLimit: 5,
};

const invoices = [
  { id: 'INV-2026-05', date: 'May 1, 2026', amount: '$99.00', status: 'paid' },
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: '$99.00', status: 'paid' },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: '$99.00', status: 'paid' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: '$79.00', status: 'paid' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: '$79.00', status: 'paid' },
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    conversations: '1,000',
    bots: 1,
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    conversations: '15,000',
    bots: 5,
    current: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    conversations: 'Unlimited',
    bots: 'Unlimited',
    current: false,
  },
];

function UsageMeter({
  label,
  used,
  limit,
  unit = '',
}: {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}) {
  const pct = Math.min((used / limit) * 100, 100);
  const color =
    pct > 85 ? 'from-rose-500 to-red-500' : pct > 65 ? 'from-amber-500 to-yellow-500' : 'from-violet-500 to-cyan-500';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-white">
          {used.toLocaleString()}
          <span className="text-white/40"> / {limit.toLocaleString()}{unit}</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', color)}
        />
      </div>
      <div className="mt-1 text-right text-xs text-white/40">{pct.toFixed(0)}% used</div>
    </div>
  );
}

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Subscription</h1>
        <p className="mt-1 text-sm text-white/50">
          Manage your plan, usage, and billing details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Current plan */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/40">Current plan</div>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-display text-3xl text-white">{currentPlan.name}</span>
                <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-200">
                  Active
                </span>
              </div>
              <div className="mt-1 text-sm text-white/60">
                ${currentPlan.price}/mo · renews{' '}
                {new Date(currentPlan.nextBillingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            <Zap className="h-8 w-8 text-violet-300" />
          </div>

          <div className="mt-8 space-y-5">
            <UsageMeter
              label="Conversations"
              used={currentPlan.conversationsUsed}
              limit={currentPlan.conversationsLimit}
            />
            <UsageMeter
              label="Active chatbots"
              used={currentPlan.botsUsed}
              limit={currentPlan.botsLimit}
            />
          </div>

          {currentPlan.conversationsUsed / currentPlan.conversationsLimit > 0.8 && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              You&apos;re at {((currentPlan.conversationsUsed / currentPlan.conversationsLimit) * 100).toFixed(0)}% of your monthly conversations. Consider upgrading to avoid hitting the limit.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-6 sm:flex-row">
            <button
              onClick={() => toast.success('Upgrade flow (Stripe stub)')}
              className="flex-1 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
            >
              Upgrade plan
            </button>
            <button
              onClick={() => toast('Cancellation flow stub')}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/[0.08] hover:text-white"
            >
              Cancel subscription
            </button>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-4">
          <div className="glass rounded-2xl border border-white/10 p-6">
            <div className="text-xs uppercase tracking-wider text-white/40">Payment method</div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid h-11 w-16 place-items-center rounded-lg border border-white/10 bg-white/5">
                <CreditCard className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <div className="text-sm text-white">Visa ending in 4242</div>
                <div className="text-xs text-white/50">Expires 09/2028</div>
              </div>
            </div>
            <button
              onClick={() => toast.success('Payment update flow (Stripe stub)')}
              className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/[0.08]"
            >
              Update payment method
            </button>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              <div className="text-xs uppercase tracking-wider text-white/40">Security</div>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Payments processed by Stripe. We never store your card details. All transactions are
              PCI-DSS compliant.
            </p>
          </div>
        </div>
      </div>

      {/* Plan comparison */}
      <div className="glass rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl text-white">Change plan</h3>
            <p className="text-sm text-white/50">Switch anytime — changes take effect immediately.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'rounded-lg px-4 py-1.5 text-xs transition',
                !yearly ? 'bg-white/10 text-white' : 'text-white/50',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'rounded-lg px-4 py-1.5 text-xs transition',
                yearly ? 'bg-violet-500/20 text-violet-200' : 'text-white/50',
              )}
            >
              Yearly <span className="ml-1 text-[10px] text-emerald-300">−20%</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl border p-5 transition',
                plan.current
                  ? 'border-violet-500/50 bg-violet-500/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20',
              )}
            >
              {plan.current && (
                <div className="absolute -top-3 left-4 rounded-full bg-violet-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Current
                </div>
              )}
              <div className="font-display text-lg text-white">{plan.name}</div>
              <div className="mt-2">
                {plan.price ? (
                  <span className="font-display text-3xl text-white">
                    ${yearly ? Math.round(plan.price * 0.8) : plan.price}
                    <span className="text-sm font-normal text-white/50">/mo</span>
                  </span>
                ) : (
                  <span className="font-display text-2xl text-white">Custom</span>
                )}
              </div>
              <ul className="mt-4 space-y-2 border-t border-white/5 pt-4 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-violet-300" />
                  {plan.conversations} conversations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-violet-300" />
                  {plan.bots} chatbot{plan.bots !== 1 ? 's' : ''}
                </li>
              </ul>
              {!plan.current && (
                <button
                  onClick={() =>
                    plan.price
                      ? toast.success(`Switching to ${plan.name} (Stripe stub)`)
                      : toast.success('Opening enterprise contact')
                  }
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  {plan.price ? 'Switch to this plan' : 'Contact sales'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div className="glass overflow-hidden rounded-2xl border border-white/10">
        <div className="border-b border-white/5 p-6">
          <h3 className="font-display text-xl text-white">Invoice history</h3>
          <p className="text-sm text-white/50">Download receipts for your records.</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-left text-xs uppercase tracking-wider text-white/40">
              <th className="px-6 py-3 font-medium">Invoice</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 font-mono text-sm text-white/80">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-white/60">{inv.date}</td>
                <td className="px-6 py-4 font-mono text-sm text-white">{inv.amount}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toast.success('Downloading PDF (stub)')}
                    className="inline-flex items-center gap-1 text-xs text-violet-300 transition hover:text-violet-200"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
