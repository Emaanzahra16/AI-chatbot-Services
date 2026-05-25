'use client';

import { motion } from 'framer-motion';
import { Plus, Bot, MoreHorizontal, Edit3, Power, Trash2, Cpu } from 'lucide-react';
import { mockChatbots } from '@/data/dashboard';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

const statusColors = {
  active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  draft: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  paused: 'bg-white/10 text-white/60 border-white/15',
} as const;

export default function ChatbotsPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Your chatbots</h1>
          <p className="mt-1 text-sm text-white/50">
            {mockChatbots.length} bots ·{' '}
            {mockChatbots.filter((b) => b.status === 'active').length} active
          </p>
        </div>
        <button
          onClick={() => toast.success('Bot creation wizard would open here')}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)] transition hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.8)]"
        >
          <Plus className="h-4 w-4" />
          Create chatbot
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Create new card */}
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => toast.success('Bot creation wizard would open here')}
          className="group relative flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] transition hover:border-violet-500/40 hover:bg-violet-500/5"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:border-violet-500/40 group-hover:bg-violet-500/10">
            <Plus className="h-6 w-6 text-white/60 transition group-hover:text-violet-300" />
          </div>
          <div className="text-center">
            <div className="font-display text-lg text-white">Create a new bot</div>
            <div className="mt-1 text-sm text-white/50">Start from scratch or a template</div>
          </div>
        </motion.button>

        {/* Bot cards */}
        {mockChatbots.map((bot, i) => (
          <motion.div
            key={bot.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 p-6 transition hover:border-violet-500/30"
          >
            {/* Color accent */}
            <div
              className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', bot.color)}
            />

            <div className="flex items-start justify-between">
              <div
                className={cn(
                  'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br',
                  bot.color,
                )}
              >
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === bot.id ? null : bot.id)}
                  className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
                  aria-label="Bot menu"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {openMenu === bot.id && (
                  <div className="absolute right-0 top-9 z-10 w-44 overflow-hidden rounded-xl border border-white/10 bg-ink-950/95 backdrop-blur-xl shadow-2xl">
                    {[
                      { label: 'Edit', icon: Edit3 },
                      { label: bot.status === 'active' ? 'Pause' : 'Activate', icon: Power },
                      { label: 'Delete', icon: Trash2, danger: true },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          toast.success(`${item.label} (stub)`);
                          setOpenMenu(null);
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 px-3 py-2 text-sm transition hover:bg-white/5',
                          item.danger ? 'text-rose-300' : 'text-white/80',
                        )}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex-1">
              <h3 className="font-display text-lg text-white">{bot.name}</h3>
              <p className="mt-1 text-sm text-white/60">{bot.description}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wider',
                  statusColors[bot.status as keyof typeof statusColors],
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    bot.status === 'active' ? 'bg-emerald-400' : 'bg-current',
                  )}
                />
                {bot.status}
              </span>
              <div className="inline-flex items-center gap-1 font-mono text-xs text-white/50">
                <Cpu className="h-3 w-3" />
                {bot.model}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/40">Conversations</div>
                <div className="mt-0.5 font-display text-xl text-white">
                  {bot.conversations.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/40">CSAT</div>
                <div className="mt-0.5 font-display text-xl text-white">
                  {bot.csat > 0 ? bot.csat.toFixed(1) : '—'}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/40">
              Edited {formatRelativeTime(bot.lastEdited)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
