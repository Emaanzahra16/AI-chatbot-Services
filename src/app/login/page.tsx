'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { Sparkles, ArrowRight, Github } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid credentials');
        setLoading(false);
        return;
      }

      toast.success('Welcome back');
      router.push('/dashboard');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Left gradient panel */}
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 30% 20%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(50% 70% at 80% 80%, rgba(6,182,212,0.35) 0%, transparent 60%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
          <Link href="/" className="relative z-10">
            <Logo showText />
          </Link>

          <div className="relative z-10 max-w-md">
            <Sparkles className="h-8 w-8 text-violet-300" />
            <h2 className="mt-4 font-display text-4xl leading-tight text-white">
              The conversational layer for{' '}
              <span className="italic text-gradient">every product.</span>
            </h2>
            <p className="mt-4 text-white/65">
              14,000+ teams already shipped bots that actually answer. Sign in to see what
              you&apos;ve built.
            </p>

            <div className="mt-10 flex items-center gap-4">
              {['anya', 'mateo', 'lin', 'kai'].map((s) => (
                <div
                  key={s}
                  className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-ink-950"
                >
                  <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${s}`}
                    alt=""
                    className="h-full w-full"
                  />
                </div>
              ))}
              <span className="text-sm text-white/60">14,200+ teams</span>
            </div>
          </div>

          <div className="relative z-10 text-xs text-white/40">
            © 2026 Altivora AI · The all-in-one conversational platform
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex min-h-screen items-center justify-center p-6 sm:p-12">
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

            <h1 className="mt-10 font-display text-4xl text-white lg:mt-0">
              Welcome back
            </h1>

            <p className="mt-2 text-white/60">
              New here?{' '}
              <Link href="/signup" className="text-violet-300 hover:text-violet-200">
                Create an account
              </Link>
            </p>

            {/* OAuth buttons (still stubbed) */}
            <div className="mt-8 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                onClick={() => toast('Google OAuth coming soon')}
              >
                Continue with Google
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                onClick={() => toast('GitHub OAuth coming soon')}
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

            {/* LOGIN FORM (UPDATED) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end">
                <Link href="#" className="text-xs text-violet-300 hover:text-violet-200">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Sign in
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-white/40">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}