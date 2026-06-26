import { cn } from '@/shared/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className, label, id, ...props }: InputProps) {
  return (
    <div className="grid gap-1.5">
      {label ? <label className="text-sm font-semibold text-[var(--color-text-secondary)]" htmlFor={id}>{label}</label> : null}
      <input className={cn('h-10 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 text-sm text-white placeholder:text-[var(--color-text-muted)] transition-[var(--transition-fast)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]', className)} id={id} {...props} />
    </div>
  );
}
