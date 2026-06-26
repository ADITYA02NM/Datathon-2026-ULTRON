import { Search } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

export function SearchInput({ className, shortcut, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
      <input className={cn('h-9 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] pl-9 pr-3 text-sm text-white placeholder:text-[var(--color-text-muted)] transition-[var(--transition-fast)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]', className)} type="search" {...props} />
      {shortcut ? (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-1.5 text-[10px] font-mono text-[var(--color-text-muted)] sm:flex">
          <span>Ctrl</span><span>+</span><span className="uppercase">{shortcut}</span>
        </kbd>
      ) : null}
    </div>
  );
}
