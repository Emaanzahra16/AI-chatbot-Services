'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'outline' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, iconLeft, iconRight, className, children, disabled, ...props },
  ref,
) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-ring';
  const variants: Record<Variant, string> = {
    primary:
      'text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'bg-white/[0.04] border border-white/10 text-ink-100 hover:bg-white/[0.08] hover:border-violet-500/40 backdrop-blur-md',
    outline: 'border border-violet-500/40 bg-violet-500/5 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400',
    subtle: 'text-ink-300 hover:text-white',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
        />
      )}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)' }}
        />
      )}
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  );
});
