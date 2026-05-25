'use client';

import { useState, useMemo } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockConversations } from '@/data/dashboard';
import { cn, formatRelativeTime } from '@/lib/utils';

const filters = ['All', 'Resolved', 'Active', 'Escalated', 'Converted'];

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

export default function ConversationsPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return mockConversations.filter((c) => {
      const matchFilter = filter === 'All' || c.status === filter.toLowerCase();
      const matchQuery =
        !query ||
        c.user.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(query.toLowerCase()) ||
        c.chatbot.toLowerCase().includes(query.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [filter, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Conversations</h1>
          <p className="mt-1 text-sm text-white/50">
            {mockConversations.length} total · {rows.length} shown
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:bg-white/[0.08]">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters bar */}
      <div className="glass space-y-4 rounded-2xl border border-white/10 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              iconLeft={<Search className="h-4 w-4" />}
              placeholder="Search by user, message, or bot..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/60 p-1">
            <Filter className="ml-2 h-3.5 w-3.5 text-white/40" />
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs transition',
                  filter === f
                    ? 'bg-violet-500/20 text-violet-200'
                    : 'text-white/60 hover:text-white',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-left text-xs uppercase tracking-wider text-white/40">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Bot</th>
                <th className="px-6 py-3 font-medium">Last message</th>
                <th className="px-6 py-3 font-medium">Sentiment</th>
                <th className="px-6 py-3 font-medium">Messages</th>
                <th className="px-6 py-3 font-medium">Duration</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-white/40">
                    No conversations match your filters.
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer border-b border-white/5 last:border-0 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt="" className="h-8 w-8 rounded-full" />
                        <div className="text-sm text-white">{c.user}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">{c.chatbot}</td>
                    <td className="max-w-[260px] truncate px-6 py-4 text-sm text-white/60">
                      {c.lastMessage}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 text-[11px]',
                          sentimentColors[c.sentiment as keyof typeof sentimentColors],
                        )}
                      >
                        {c.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-white/70">{c.messages}</td>
                    <td className="px-6 py-4 font-mono text-sm text-white/70">{c.duration}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
