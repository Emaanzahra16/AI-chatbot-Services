'use client';

import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps extends MotionProps {
  className?: string;
  gradient?: string;
  hover?: boolean;
  children: ReactNode;
}

export function GlowCard({
  className,
  gradient = 'from-violet-500/40 to-cyan-500/40',
  hover = true,
  children,
  ...props
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative rounded-2xl',
        hover && 'transition-transform duration-500 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {/* gradient border */}
      <div
        aria-hidden
        className={cn(
          'absolute -inset-px rounded-2xl bg-gradient-to-br opacity-50 transition-opacity duration-500',
          gradient,
          hover && 'group-hover:opacity-100',
        )}
        style={{
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {/* glow on hover */}
      {hover && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30',
            gradient,
          )}
        />
      )}
      {/* content */}
      <div className="relative h-full rounded-2xl bg-ink-900/60 backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}