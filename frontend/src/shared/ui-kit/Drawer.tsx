import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

export function Drawer({ children, open, onOpenChange, title }: DrawerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-lg border-l border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold">{title ?? 'Context'}</h2>
          <button aria-label="Close" className="text-[var(--color-text-muted)] hover:text-white" onClick={() => onOpenChange(false)}><X className="h-5 w-5" /></button>
        </div>
        {children}
      </aside>
    </>
  );
}
