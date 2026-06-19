'use client';

import { useEffect, useRef, useState } from 'react';
import { useNavStore } from '@/stores/navStore';
// @ts-ignore
import anime from 'animejs';

const segments = [
  { name: 'Dashboard', angle: 45, color: '#f0b000' },
  { name: 'Maps', angle: 135, color: '#20a080' },
  { name: 'Network', angle: 225, color: '#800060' },
  { name: 'Intelligence', angle: 315, color: '#c02040' },
];

export function RadialNav() {
  const { setActiveSection } = useNavStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate rings on mount
    const rings = svgRef.current.querySelectorAll('.radial-ring');
    anime({
      targets: rings,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(120),
      duration: 600,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleSegmentClick = (segment: string) => {
    setActiveSection(segment.toLowerCase() as any);
  };

  return (
    <div className="flex items-center justify-center min-h-[500px] py-12">
      <svg
        ref={svgRef}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="radial-svg"
      >
        {/* Center core */}
        <circle cx="200" cy="200" r="60" fill="#c6010a" opacity="0.9" />
        <circle cx="200" cy="200" r="55" fill="none" stroke="#f0b000" strokeWidth="2" opacity="0.3" />
        <circle cx="200" cy="200" r="45" fill="none" stroke="#f0b000" strokeWidth="1" opacity="0.2" />

        {/* Ring 1 - Outer */}
        <g className="radial-ring cursor-pointer">
          {segments.map((segment, idx) => {
            const startAngle = (idx * 90 - 45) * (Math.PI / 180);
            const endAngle = ((idx + 1) * 90 - 45) * (Math.PI / 180);

            const x1 = 200 + 175 * Math.cos(startAngle);
            const y1 = 200 + 175 * Math.sin(startAngle);
            const x2 = 200 + 175 * Math.cos(endAngle);
            const y2 = 200 + 175 * Math.sin(endAngle);
            const x3 = 200 + 140 * Math.cos(endAngle);
            const y3 = 200 + 140 * Math.sin(endAngle);
            const x4 = 200 + 140 * Math.cos(startAngle);
            const y4 = 200 + 140 * Math.sin(startAngle);

            return (
              <g
                key={`ring1-${idx}`}
                onClick={() => handleSegmentClick(segment.name)}
                onMouseEnter={() => setHoveredSegment(segment.name)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="transition-all"
              >
                <path
                  d={`M ${x1} ${y1} A 175 175 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 140 140 0 0 0 ${x4} ${y4} Z`}
                  fill={segment.color}
                  opacity={
                    hoveredSegment === segment.name ? 0.9 : 0.7
                  }
                  className="transition-opacity hover:opacity-100"
                />
                <text
                  x={200 + 160 * Math.cos((startAngle + endAngle) / 2)}
                  y={200 + 160 * Math.sin((startAngle + endAngle) / 2)}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.9"
                  pointerEvents="none"
                >
                  {segment.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* Ring 2 - Inner decorative */}
        <g className="radial-ring" opacity="0.5">
          {[0, 1, 2, 3].map((idx) => {
            const angle = (idx * 90) * (Math.PI / 180);
            const x = 200 + 120 * Math.cos(angle);
            const y = 200 + 120 * Math.sin(angle);
            return (
              <circle
                key={`ring2-${idx}`}
                cx={x}
                cy={y}
                r="8"
                fill={segments[idx].color}
                opacity="0.6"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
