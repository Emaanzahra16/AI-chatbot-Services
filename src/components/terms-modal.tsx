'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Shield, AlertTriangle, Database, HardDrive, Trash2 } from 'lucide-react';

export function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = Cookies.get('botforge-terms-accepted');
    if (!hasAccepted) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('botforge-terms-accepted', 'true', {
      expires: 365,
      secure: true,
      sameSite: 'strict',
    });
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-[#0a0c1a] p-6 shadow-2xl">
        <button
          onClick={handleDecline}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-400 hover:bg-white/5 hover:text-white"
        >
          <AlertTriangle className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Terms & Conditions Required</h2>
            <p className="text-sm text-ink-300">Please read and accept to continue</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-ink-200">
          {/* GDPR Section */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-300">
              <Shield className="h-4 w-4" />
              GDPR Compliance 🇪🇺
            </h3>
            <p className="text-xs leading-relaxed">
              BotForge AI complies with European GDPR (Regulation EU 2016/679). 
            </p>
          </div>

          {/* Data Storage Disclosure */}
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-cyan-300">
              <HardDrive className="h-4 w-4" />
              Data Storage
            </h3>
            <p className="text-xs leading-relaxed">
              Your conversations are stored securely in the EU. You can request deletion anytime.
            </p>
          </div>

          {/* AI Training Disclosure */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
              <Database className="h-4 w-4" />
              AI Training
            </h3>
            <p className="text-xs leading-relaxed">
              ❌ We NEVER use your conversations to train AI models without explicit consent.
            </p>
          </div>

          {/* AI Warning */}
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-rose-300">
              <AlertTriangle className="h-4 w-4" />
              AI Disclaimer
            </h3>
            <p className="text-xs leading-relaxed">
              AI can make mistakes. Always verify critical information.
            </p>
          </div>

          {/* Legal Links */}
          <div className="rounded-lg border border-white/5 bg-ink-900/30 p-3 text-center text-xs">
            <p>
              By accepting, you agree to our{' '}
              <Link href="/privacy" className="text-cyan-400 underline">Privacy Policy</Link>
              ,{' '}
              <Link href="/terms" className="text-cyan-400 underline">Terms of Service</Link>
              , and{' '}
              <Link href="/cookies" className="text-cyan-400 underline">Cookie Policy</Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5"
          >
            I Accept & Continue
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-ink-300 transition-all hover:border-rose-500/40"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}