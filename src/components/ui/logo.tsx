import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

export function Logo({ className, showText = true, size = 32 }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* hex anvil */}
        <path
          d="M20 3L34 11V29L20 37L6 29V11L20 3Z"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          fill="rgba(139,92,246,0.08)"
          filter="url(#logoGlow)"
        />
        {/* spark inside */}
        <path
          d="M20 12L22.5 18L29 19L24 23.5L25.5 30L20 26.5L14.5 30L16 23.5L11 19L17.5 18L20 12Z"
          fill="url(#logoGrad)"
          filter="url(#logoGlow)"
        />
      </svg>
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          Bot<span className="text-gradient">Forge</span>
        </span>
      )}
    </div>
  );
}
