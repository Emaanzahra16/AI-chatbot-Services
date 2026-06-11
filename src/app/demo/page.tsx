'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const submit = async () => {
    setLoading(true);

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-6">

      <div className="w-full max-w-lg space-y-4">

        <h1 className="text-2xl font-bold">
          🚀 Live AI Demo
        </h1>

        <p className="text-white/60 text-sm">
          This simulates a real chatbot lead capture.
        </p>

        <input
          className="w-full p-2 bg-black/40 border border-white/10"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 bg-black/40 border border-white/10"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 bg-black/40 border border-white/10"
          placeholder="Company"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <textarea
          className="w-full p-2 bg-black/40 border border-white/10"
          placeholder="Message"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-violet-600 py-2 rounded"
        >
          {loading ? 'Sending...' : 'Send Demo Lead'}
        </button>

        {result && (
          <pre className="text-xs bg-black/40 p-3 border border-white/10">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}

      </div>
    </div>
  );
}