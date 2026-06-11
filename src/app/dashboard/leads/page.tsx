'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase-client';

type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
  status?: string;
  lead_strength?: number;
  intent_tags?: string[];
  created_at: string;
};

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // =========================
  // FETCH LEADS
  // =========================
  async function fetchLeads() {
    try {
      const res = await fetch('/api/leads', { cache: 'no-store' });
      const data = await res.json();

      if (data.ok) setLeads(data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  // =========================
  // REALTIME (FINAL FIX)
  // =========================
  useEffect(() => {
    const channel = supabase
      .channel('leads-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          const newLead = payload.new as Lead;

          if (!newLead?.id) return;

          setLeads((prev) => {
            const exists = prev.some((l) => l.id === newLead.id);

            if (exists) {
              return prev.map((l) =>
                l.id === newLead.id ? { ...l, ...newLead } : l
              );
            }

            return [newLead, ...prev];
          });

          // HOT LEAD ALERT
          if ((newLead.lead_strength ?? 0) >= 70) {
            console.log('🔥 HOT LEAD:', newLead.name);
            alert(`🔥 HOT LEAD: ${newLead.name}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  async function updateStatus(id: string, status: string) {
    try {
      setUpdatingId(id);

      const res = await fetch('/api/leads/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();

      if (data.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  // =========================
  // STATUS COLORS
  // =========================
  const statusColor = (status?: string) => {
    switch (status ?? 'new') {
      case 'new':
        return 'text-blue-400';
      case 'contacted':
        return 'text-yellow-400';
      case 'qualified':
        return 'text-green-400';
      case 'closed':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  // =========================
  // SCORE SYSTEM
  // =========================
  const getScoreLabel = (score?: number) => {
    if (!score) return 'COLD';
    if (score >= 70) return 'HOT';
    if (score >= 40) return 'WARM';
    return 'COLD';
  };

  const getScoreColor = (score?: number) => {
    const label = getScoreLabel(score);

    if (label === 'HOT') return 'bg-red-500/20 text-red-400';
    if (label === 'WARM') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  // =========================
  // FILTERED LEADS
  // =========================
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (lead.status ?? 'new') === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  // =========================
  // ANALYTICS
  // =========================
  const analytics = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => (l.status ?? 'new') === 'new').length;
    const contacted = leads.filter((l) => (l.status ?? 'new') === 'contacted').length;
    const qualified = leads.filter((l) => (l.status ?? 'new') === 'qualified').length;
    const closed = leads.filter((l) => (l.status ?? 'new') === 'closed').length;

    return {
      total,
      newLeads,
      contacted,
      qualified,
      closed,
      conversionRate: total ? Math.round((closed / total) * 100) : 0,
    };
  }, [leads]);

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <div className="p-10 text-white">Loading leads...</div>;
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Leads Dashboard (CRM v2)</h1>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <KPI title="Total" value={analytics.total} />
        <KPI title="New" value={analytics.newLeads} />
        <KPI title="Contacted" value={analytics.contacted} />
        <KPI title="Qualified" value={analytics.qualified} />
        <KPI title="Closed" value={analytics.closed} />
      </div>

      <div className="mb-6 text-sm text-white/70">
        Conversion Rate:{' '}
        <span className="text-green-400 font-bold">
          {analytics.conversionRate}%
        </span>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black/40 border border-white/10 px-3 py-2 rounded text-white w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/40 border border-white/10 px-3 py-2 rounded text-white"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* LEADS */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between items-start">

              {/* LEFT */}
              <div>
                <p className="flex items-center gap-2">
                  <b>Name:</b> {lead.name}

                  <span
                    className={`text-xs px-2 py-1 rounded ${getScoreColor(
                      lead.lead_strength
                    )}`}
                  >
                    {getScoreLabel(lead.lead_strength)}
                  </span>
                </p>

                <p><b>Email:</b> {lead.email}</p>
                {lead.company && <p><b>Company:</b> {lead.company}</p>}
                <p><b>Message:</b> {lead.message}</p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <span className={`text-sm font-semibold ${statusColor(lead.status)}`}>
                  {(lead.status ?? 'new').toUpperCase()}
                </span>

                <select
                  value={lead.status ?? 'new'}
                  disabled={updatingId === lead.id}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="bg-black/40 border border-white/10 text-white text-sm rounded px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================
// KPI COMPONENT
// =========================
function KPI({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
      <div className="text-xs text-white/50">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}