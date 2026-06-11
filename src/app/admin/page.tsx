'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Lead = {
  id: string;
  name: string;
  email: string;
  business: string;
  goal: string;
  created_at: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <h1 className="text-3xl font-bold">
          AI Agency Dashboard
        </h1>

        <p className="mt-2 text-white/60">
          Manage all your demo requests and leads
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/60">Total Leads</div>
            <div className="text-2xl font-bold">{leads.length}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/60">Today</div>
            <div className="text-2xl font-bold">
              {leads.filter(l =>
                new Date(l.created_at).toDateString() ===
                new Date().toDateString()
              ).length}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/60">Conversion Ready</div>
            <div className="text-2xl font-bold text-green-400">Active</div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-sm text-white/60">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Business</th>
                <th className="p-3">Goal</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4 text-white/60">Loading...</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3 text-white/70">{lead.email}</td>
                    <td className="p-3 text-white/70">{lead.business}</td>
                    <td className="p-3 text-white/50">{lead.goal}</td>
                    <td className="p-3 text-white/40 text-sm">
                      {new Date(lead.created_at).toLocaleString()}
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