'use client';

import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Live AI Demo</h1>

        <p className="text-white/60">
          Try the chatbot below (this is your real SaaS demo)
        </p>

        <div className="p-6 border border-white/10 rounded-xl">
          <p className="text-sm text-white/70">
            Ask: "I need a demo", "pricing", "book a call"
          </p>
        </div>

        <Link
          href="/"
          className="text-violet-400 underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}