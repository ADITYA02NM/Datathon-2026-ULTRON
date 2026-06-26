import { cn } from '@/shared/utils/cn';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'muted' | 'red' | 'amber' | 'green';
  className?: string;
}

export function Badge({ children, variant = 'muted', className }: BadgeProps) {
  const styles: Record<string, string> = {
    gold: 'bg-[var(--color-gold-soft)] text-[var(--color-gold)]',
    muted: 'bg-white/5 text-[var(--color-text-secondary)]',
    red: 'bg-red-500/15 text-[var(--severity-extreme)]',
    amber: 'bg-amber-500/15 text-[var(--severity-high)]',
    green: 'bg-green-500/15 text-[var(--severity-low)]',
  };
  return <span className={cn('inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-semibold', styles[variant], className)}>{children}</span>;
}
