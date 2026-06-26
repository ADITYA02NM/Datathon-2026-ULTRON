import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
};

export function Modal({ children, open, onOpenChange, title, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 grid place-items-center p-4">
        <div className={cn('w-full rounded-[var(--radius-2xl)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-surface-4)]', sizeStyles[size])}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">{title ?? ''}</h2>
            <button aria-label="Close" className="text-[var(--color-text-muted)] hover:text-white" onClick={() => onOpenChange(false)}><X className="h-5 w-5" /></button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
