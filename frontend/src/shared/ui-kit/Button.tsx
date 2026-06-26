import { cn } from '@/shared/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const bases = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] font-semibold transition-[var(--transition-fast)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:shrink-0';
  const sizes: Record<string, string> = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' };
  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-gold)] text-[#111] hover:brightness-110 active:brightness-95',
    secondary: 'bg-white/10 text-white hover:bg-white/18 active:bg-white/12',
    ghost: 'text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white',
    danger: 'bg-red-500/15 text-[var(--severity-extreme)] hover:bg-red-500/30',
  };
  return <button className={cn(bases, sizes[size], variants[variant], className)} {...props}>{children}</button>;
}
