import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn('relative py-24 sm:py-32', className)} {...props}>
      <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', containerClassName)}>{children}</div>
    </section>
  );
}

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export function Eyebrow({ children, icon, className, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-violet-300 backdrop-blur',
        className,
      )}
      {...props}
    >
      {icon && <span className="text-violet-400">{icon}</span>}
      {children}
    </div>
  );
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3';
  eyebrow?: string;
}

export function Heading({ as: Tag = 'h2', className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display font-normal leading-[1.05] tracking-tight',
        Tag === 'h1' && 'text-5xl sm:text-6xl lg:text-7xl',
        Tag === 'h2' && 'text-4xl sm:text-5xl lg:text-6xl',
        Tag === 'h3' && 'text-3xl sm:text-4xl',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Lede({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-lg leading-relaxed text-ink-300 sm:text-xl', className)}
      {...props}
    >
      {children}
    </p>
  );
}
