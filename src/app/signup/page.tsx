'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Sparkles, ArrowRight, Github, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const benefits = [
  '14-day Pro trial, no card required',
  '5 chatbots, 15k conversations included',
  'Voice agent + memory unlocked',
  'Cancel anytime, export your data',
];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Account created — welcome to Altivora.');
    router.push('/dashboard');
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
        {/* Form panel */}
        <div className="flex min-h-screen items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="lg:hidden">
              <Link href="/">
                <Logo showText />
              </Link>
            </div>
            <h1 className="mt-10 font-display text-4xl text-white lg:mt-0">Start forging</h1>
            <p className="mt-2 text-white/60">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-300 hover:text-violet-200">
                Sign in
              </Link>
            </p>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                onClick={() => toast('OAuth flow stub')}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M21.35 11.1H12v2.9h5.34c-.23 1.43-1.65 4.19-5.34 4.19-3.21 0-5.84-2.66-5.84-5.94S8.79 6.31 12 6.31c1.83 0 3.06.78 3.76 1.45l2.57-2.48C16.84 3.78 14.66 2.9 12 2.9 6.97 2.9 2.9 6.97 2.9 12s4.07 9.1 9.1 9.1c5.25 0 8.73-3.69 8.73-8.88 0-.6-.06-1.06-.15-1.52Z"
                  />
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                onClick={() => toast('OAuth flow stub')}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </button>
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-wider text-white/40">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full name"
                placeholder="Ada Lovelace"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Work email"
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="At least 12 characters"
                required
                minLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="Use a long passphrase. We&apos;ll check it against known breaches."
              />
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Create account
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-white/40">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>

        {/* Gradient panel */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden order-1 lg:order-2">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 70% 20%, rgba(6,182,212,0.35) 0%, transparent 60%), radial-gradient(50% 70% at 20% 80%, rgba(124,58,237,0.4) 0%, transparent 60%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
          <Link href="/" className="relative z-10 ml-auto">
            <Logo showText />
          </Link>

          <div className="relative z-10 max-w-md ml-auto text-right">
            <Sparkles className="ml-auto h-8 w-8 text-cyan-300" />
            <h2 className="mt-4 font-display text-4xl leading-tight text-white">
              Your first bot in <span className="italic text-gradient">five minutes.</span>
            </h2>
            <p className="mt-4 text-white/65">
              No credit card. No sales call. Pure product, in your browser, before your coffee gets
              cold.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start justify-end gap-2 text-white/80">
                  <span className="text-right">{b}</span>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 ml-auto text-xs text-white/40">
            SOC 2 Type II · GDPR · CCPA
          </div>
        </div>
      </div>
    </div>
  );
}
