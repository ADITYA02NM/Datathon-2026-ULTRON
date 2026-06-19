'use client';

import { useEffect, useRef } from 'react';
import { useNavStore } from '@/stores/navStore';
// @ts-ignore
import anime from 'animejs';

const sections = ['Dashboard', 'Maps', 'Network', 'Intelligence', 'Admin'];

export function SectionNav() {
  const { activeSection, setActiveSection } = useNavStore();
  const underlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !underlineRef.current) return;

    const activeIndex = sections.findIndex((s) => s.toLowerCase() === activeSection);
    if (activeIndex === -1) return;

    const buttons = containerRef.current.querySelectorAll('button');
    const activeButton = buttons[activeIndex];

    const offset = activeButton.offsetLeft;
    const width = activeButton.offsetWidth;

    anime({
      targets: underlineRef.current,
      left: offset,
      width: width,
      duration: 400,
      easing: 'easeInOutSine',
    });
  }, [activeSection]);

  return (
    <div className="relative border-b border-[#2a2a3a] bg-[#111827] px-6">
      <div ref={containerRef} className="flex items-center gap-8 relative">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setActiveSection(section.toLowerCase() as any)}
            className={`py-3 px-1 text-sm font-medium transition-colors relative z-10 ${
              activeSection === section.toLowerCase()
                ? 'text-[#f1f5f9]'
                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            {section}
          </button>
        ))}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-0.5 bg-[#f0b000] transition-all"
          style={{ left: 0, width: 0 }}
        />
      </div>
    </div>
  );
}
