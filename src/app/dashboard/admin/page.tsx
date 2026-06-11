'use client';

import { useEffect, useState } from 'react';

type Metrics = {
  totalLeads: number;
  hot: number;
  warm: number;
  cold: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  closed: number;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/overview');
      const json = await res.json();

      if (json.ok) {
        setData(json.metrics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-10 text-white">Loading admin data...</div>;
  }

  if (!data) {
    return <div className="p-10 text-red-400">Failed to load data</div>;
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">SaaS Admin Dashboard</h1>

      {/* TOP KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Leads" value={data.totalLeads} />
        <Card title="Hot Leads" value={data.hot} />
        <Card title="Warm Leads" value={data.warm} />
        <Card title="Cold Leads" value={data.cold} />
      </div>

      {/* STATUS BREAKDOWN */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="New" value={data.newLeads} />
        <Card title="Contacted" value={data.contacted} />
        <Card title="Qualified" value={data.qualified} />
        <Card title="Closed" value={data.closed} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
      <div className="text-white/60 text-sm">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}