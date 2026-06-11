'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Users,
  Clock,
  Smile,
} from 'lucide-react';

import {
  analyticsMetrics,
  conversationVolume,
  topIntents,
} from '@/data/dashboard';

import { cn } from '@/lib/utils';

const iconMap = {
  'Total conversations': MessageSquare,
  'Active users': Users,
  'Avg. response time': Clock,
  'CSAT score': Smile,
};

export default function DashboardOverviewPage() {
  const { data: session } = useSession();

  const [userName, setUserName] = useState('User');
  const [leads, setLeads] = useState<any[]>([]);
  const [ceoReport, setCeoReport] = useState<string>('Loading AI report...');

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    } else if (session?.user?.email) {
      setUserName(session.user.email.split('@')[0]);
    }
  }, [session]);

  // 🔥 FETCH LEADS
  useEffect(() => {
    fetch('/api/leads')
      .then((r) => r.json())
      .then((data) => setLeads(data.leads || []));
  }, []);

  // 🧠 FETCH AI CEO REPORT
  useEffect(() => {
    fetch('/api/ai/ceo-report')
      .then((r) => r.json())
      .then((data) => setCeoReport(data.report || 'No report generated'));
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-white/50">
            Welcome back, {userName}
          </div>
          <h1 className="text-3xl text-white font-bold mt-1">
            AI CEO Dashboard
          </h1>
        </div>
      </div>

      {/* 🧠 CEO AI REPORT */}
      <div className="p-5 border border-white/10 rounded-xl bg-white/5">
        <h2 className="text-lg font-bold text-white mb-2">
          🧠 CEO AI Insight
        </h2>
        <p className="text-white/70 whitespace-pre-line">
          {ceoReport}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((m, i) => {
          const Icon = iconMap[m.label as keyof typeof iconMap] ?? MessageSquare;
          const TrendIcon = m.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 border border-white/10 rounded-xl bg-white/5"
            >
              <div className="flex justify-between">
                <Icon className="text-violet-300" />

                <span className="text-xs text-white/60">
                  <TrendIcon className="inline h-3 w-3 mr-1" />
                  {m.change.toFixed(1)}%
                </span>
              </div>

              <div className="text-white/50 text-xs mt-3">{m.label}</div>
              <div className="text-white text-2xl">{m.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* LEADS */}
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-white font-bold">Recent Leads</h3>
        </div>

        <table className="w-full text-sm">
          <tbody>
            {leads.slice(0, 5).map((lead) => (
              <tr key={lead.id} className="border-b border-white/5">
                <td className="p-4 text-white">{lead.name}</td>
                <td className="p-4 text-white/60">{lead.email}</td>
                <td className="p-4 text-white/50 truncate max-w-[200px]">
                  {lead.message}
                </td>
                <td className="p-4">
                  <span
                    className={
                      lead.priority === 'hot'
                        ? 'text-red-400'
                        : lead.priority === 'warm'
                        ? 'text-yellow-400'
                        : 'text-gray-400'
                    }
                  >
                    {lead.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}