import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Shield } from 'lucide-react';
import type { NavSection } from '../types';
import { useNavStore } from '../stores/navStore';

const sections: NavSection[] = ['Dashboard', 'Maps', 'Network', 'Intelligence', 'Admin'];

export default function KSPHeader() {
  const { activeSection, setSection, currentPage } = useNavStore();
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isLoggedIn = currentPage !== 'login';

  useEffect(() => {
    if (!isLoggedIn) return;
    const idx = sections.indexOf(activeSection);
    const btn = navRefs.current[idx];
    const underline = underlineRef.current;
    if (btn && underline) {
      anime({
        targets: underline,
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  }, [activeSection, isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <header className="w-full">
      {/* Header 1: KSP Branding */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#2a3040]" style={{ background: '#0a0e1a' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0b000] to-[#c02040] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">ULTRON</h1>
            <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest">Karnataka State Police • SCRB</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-[#94a3b8]">State Crime Records Bureau</p>
            <p className="text-[10px] text-[#94a3b8]">DGP: Dr. M.A. Saleem, IPS</p>
          </div>
          <div className="flex gap-2">
            {['CM', 'Dy CM'].map((title) => (
              <div key={title} className="w-9 h-9 rounded-full bg-[#1a1f2e] border border-[#f0b000]/30 flex items-center justify-center">
                <span className="text-[9px] text-[#f0b000] font-bold">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header 2: Section Nav with anime.js underline */}
      <nav className="relative flex items-center gap-1 px-6 py-2 border-b border-[#2a3040]" style={{ background: '#111827' }}>
        {sections.map((sec, i) => (
          <button
            key={sec}
            ref={(el) => { navRefs.current[i] = el; }}
            onClick={() => setSection(sec)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative z-10 rounded-md ${
              activeSection === sec ? 'text-[#f0b000]' : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            {sec}
          </button>
        ))}
        <div
          ref={underlineRef}
          className="absolute bottom-1 h-[2px] bg-[#f0b000] rounded-full"
          style={{ left: 0, width: 0 }}
        />
      </nav>
    </header>
  );
}
