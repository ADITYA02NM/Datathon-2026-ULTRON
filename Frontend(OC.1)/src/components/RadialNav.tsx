import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useNavStore } from '../stores/navStore';
import type { NavSection } from '../types';

interface Segment {
  section: NavSection;
  startAngle: number;
  endAngle: number;
  color: string;
  icon: string;
}

const segments: Segment[] = [
  { section: 'Dashboard', startAngle: -40, endAngle: 50, color: '#f0b000', icon: '📊' },
  { section: 'Maps', startAngle: 50, endAngle: 130, color: '#20a080', icon: '🗺️' },
  { section: 'Network', startAngle: 130, endAngle: 240, color: '#800060', icon: '🔗' },
  { section: 'Intelligence', startAngle: 240, endAngle: 320, color: '#c02040', icon: '🧠' },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function RadialNav() {
  const { activeSection, setSection, setPage, setTransitioning } = useNavStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const ringsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    ringsRef.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: i * 200,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  const handleClick = (seg: Segment) => {
    setTransitioning(true);
    anime({
      targets: svgRef.current,
      scale: [1, 1.1, 0.95, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .5)',
      complete: () => {
        setSection(seg.section);
        setTransitioning(false);
      },
    });
  };

  const cx = 200, cy = 200;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg ref={svgRef} viewBox="0 0 400 400" className="w-72 h-72 md:w-80 md:h-80 cursor-pointer">
        {/* Center circle */}
        <circle cx={cx} cy={cy} r={30} fill="#c02040" opacity={0.9} />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ULTRON</text>

        {/* Ring segments */}
        {segments.map((seg, i) => {
          const isActive = activeSection === seg.section;
          const midAngle = (seg.startAngle + seg.endAngle) / 2;
          const labelPos = polarToCartesian(cx, cy, 120, midAngle);

          return (
            <g key={seg.section} onClick={() => handleClick(seg)} className="cursor-pointer">
              {/* Outer ring */}
              <path
                ref={(el) => { ringsRef.current[i] = el; }}
                d={arcPath(cx, cy, 160, seg.startAngle, seg.endAngle)}
                fill="none"
                stroke={seg.color}
                strokeWidth={isActive ? 22 : 16}
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.5}
                className="transition-all duration-300 hover:opacity-90"
              />
              {/* Inner ring */}
              <path
                d={arcPath(cx, cy, 130, seg.startAngle, seg.endAngle)}
                fill="none"
                stroke={seg.color}
                strokeWidth={isActive ? 12 : 8}
                strokeLinecap="round"
                opacity={isActive ? 0.8 : 0.3}
                className="transition-all duration-300"
              />
              {/* Label */}
              <text
                x={labelPos.x}
                y={labelPos.y - 8}
                textAnchor="middle"
                fill={isActive ? '#f1f5f9' : '#64748b'}
                fontSize="11"
                fontWeight={isActive ? 'bold' : 'normal'}
                className="pointer-events-none select-none"
              >
                {seg.icon}
              </text>
              <text
                x={labelPos.x}
                y={labelPos.y + 8}
                textAnchor="middle"
                fill={isActive ? '#f1f5f9' : '#64748b'}
                fontSize="9"
                fontWeight={isActive ? 'bold' : 'normal'}
                className="pointer-events-none select-none"
              >
                {seg.section}
              </text>
            </g>
          );
        })}

        {/* Admin button at bottom */}
        <g onClick={() => { setSection('Admin'); }} className="cursor-pointer">
          <circle cx={cx} cy={cy + 185} r={14} fill="#1a1f2e" stroke="#4b5563" strokeWidth={1.5} />
          <text x={cx} y={cy + 189} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">⚙️</text>
        </g>
      </svg>

      <button
        onClick={() => setPage('intelgraph')}
        className="px-5 py-2 text-sm font-semibold rounded-lg border border-[#f0b000]/40 text-[#f0b000] hover:bg-[#f0b000]/10 transition-colors"
      >
        🔍 Open Intel Graph
      </button>
    </div>
  );
}
