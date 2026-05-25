'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MessageSquare,
  Users,
  Clock,
  Smile,
} from 'lucide-react';
import {
  analyticsMetrics,
  mockConversations,
  conversationVolume,
  topIntents,
} from '@/data/dashboard';
import { cn, formatRelativeTime } from '@/lib/utils';

const iconMap = {
  'Total conversations': MessageSquare,
  'Active users': Users,
  'Avg. response time': Clock,
  'CSAT score': Smile,
};

function Spark({ data, trend }: { data: number[]; trend: 'up' | 'down' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 28}`)
    .join(' ');
  const color = trend === 'up' ? '#34d399' : '#f472b6';
  return (
    <svg viewBox="0 0 100 30" className="h-10 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${trend}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,30 ${points} 100,30`}
        fill={`url(#spark-${trend})`}
        stroke="none"
      />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const sentimentColors = {
  positive: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  neutral: 'bg-white/10 text-white/70 border-white/15',
  negative: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
} as const;

const statusColors = {
  resolved: 'bg-emerald-500/15 text-emerald-300',
  active: 'bg-violet-500/15 text-violet-300',
  escalated: 'bg-amber-500/15 text-amber-300',
  converted: 'bg-cyan-500/15 text-cyan-300',
} as const;

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-white/50">Welcome back, Alex</div>
          <h1 className="mt-1 font-display text-3xl text-white sm:text-4xl">
            Here&apos;s what your bots did today
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 [box-shadow:0_0_8px_rgba(52,211,153,0.7)]" />
          All systems operational
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((m, i) => {
          const Icon = iconMap[m.label as keyof typeof iconMap] ?? MessageSquare;
          const TrendIcon = m.trend === 'up' ? TrendingUp : TrendingDown;
          const trendGood =
            (m.trend === 'up' && m.label !== 'Avg. response time') ||
            (m.trend === 'down' && m.label === 'Avg. response time');
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass relative overflow-hidden rounded-2xl border border-white/10 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/10 text-violet-300">
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]',
                    trendGood
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-rose-500/15 text-rose-300',
                  )}
                >
                  <TrendIcon className="h-3 w-3" />
                  {m.change.toFixed(1)}%
                </span>
              </div>
              <div className="mt-4 text-xs uppercase tracking-wider text-white/40">{m.label}</div>
              <div className="mt-1 font-display text-3xl text-white">{m.value}</div>
              <div className="mt-3">
                <Spark data={m.spark} trend={trendGood ? 'up' : 'down'} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Volume bar chart */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white">Conversation volume</h3>
              <p className="text-sm text-white/50">Last 7 days</p>
            </div>
            <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5 text-xs">
              <button className="rounded-md bg-white/10 px-3 py-1 text-white">7d</button>
              <button className="px-3 py-1 text-white/50">30d</button>
              <button className="px-3 py-1 text-white/50">90d</button>
            </div>
          </div>
          <div className="mt-8 flex h-56 items-end justify-between gap-3">
            {conversationVolume.map((d, i) => {
              const max = Math.max(...conversationVolume.map((x) => x.value));
              const pct = (d.value / max) * 100;
              return (
                <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct * 2}px` }}
                      transition={{ delay: i * 0.06, duration: 0.6 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-violet-600/80 to-cyan-500/80 transition-all group-hover:from-violet-500 group-hover:to-cyan-400"
                    />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink-900 px-2 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                      {d.value.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs text-white/50">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top intents */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="font-display text-lg text-white">Top intents</h3>
          <p className="text-sm text-white/50">This week</p>
          <ul className="mt-6 space-y-4">
            {topIntents.map((intent, i) => {
              const max = Math.max(...topIntents.map((x) => x.count));
              const pct = (intent.count / max) * 100;
              return (
                <li key={intent.intent}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-white/80">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: intent.color }}
                      />
                      {intent.intent}
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      {intent.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: intent.color }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Recent conversations */}
      <div className="glass rounded-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <div>
            <h3 className="font-display text-lg text-white">Recent conversations</h3>
            <p className="text-sm text-white/50">Live feed from all chatbots</p>
          </div>
          <Link
            href="/dashboard/conversations"
            className="inline-flex items-center gap-1 text-sm text-violet-300 hover:text-violet-200"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-white/40">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Bot</th>
                <th className="px-6 py-3 font-medium">Last message</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockConversations.slice(0, 5).map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt="" className="h-8 w-8 rounded-full" />
                      <div>
                        <div className="text-sm text-white">{c.user}</div>
                        <div
                          className={cn(
                            'mt-0.5 inline-block rounded-full border px-1.5 py-px text-[10px]',
                            sentimentColors[c.sentiment as keyof typeof sentimentColors],
                          )}
                        >
                          {c.sentiment}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">{c.chatbot}</td>
                  <td className="max-w-[280px] truncate px-6 py-4 text-sm text-white/60">
                    {c.lastMessage}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wider',
                        statusColors[c.status as keyof typeof statusColors],
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/50">
                    {formatRelativeTime(c.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
