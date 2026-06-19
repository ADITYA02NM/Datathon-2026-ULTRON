'use client';

import { useEffect, useRef, useState } from 'react';
import { useCrimeStore, CriminalRecord } from '@/stores/crimeStore';
import cytoscape from 'cytoscape';
import { Search, Filter } from 'lucide-react';

export function NetworkPage() {
  const { criminals, crimes } = useCrimeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [crimeFilter, setCrimeFilter] = useState('All');

  useEffect(() => {
    if (!containerRef.current || !criminals.length) return;

    // Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele: any) => {
              if (ele.data('type') === 'criminal') return '#ef4444';
              return '#20a080';
            },
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '10px',
            'width': (ele: any) => `${Math.max(30, ele.data('crimeCount') || 30)}px`,
            'height': (ele: any) => `${Math.max(30, ele.data('crimeCount') || 30)}px`,
            'padding': '10px',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#2a2a3a',
            'width': 1,
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 3,
            'border-color': '#f0b000',
          },
        },
      ],
      layout: {
        name: 'cose' as any,
        animate: true,
        animationDuration: 500,
        avoidOverlap: true,
        nodeSpacing: 5,
      } as any,
    });

    // Add nodes
    const nodes: cytoscape.NodeDefinition[] = criminals.map((criminal) => ({
      data: {
        id: criminal.Criminal_ID,
        label: criminal.Name,
        type: 'criminal',
        crimeCount: criminal.Crime_Count * 5 + 30,
      },
    }));

    // Add edges based on shared crimes
    const edges: cytoscape.EdgeDefinition[] = [];
    for (let i = 0; i < criminals.length; i++) {
      for (let j = i + 1; j < criminals.length; j++) {
        if (Math.random() > 0.7) {
          // Random connections for demo
          edges.push({
            data: {
              id: `${criminals[i].Criminal_ID}-${criminals[j].Criminal_ID}`,
              source: criminals[i].Criminal_ID,
              target: criminals[j].Criminal_ID,
            },
          });
        }
      }
    }

    cy.add([...nodes, ...edges]);
    cyRef.current = cy;

    // Layout
    cy.layout({ name: 'cose' as any, animate: true } as any).run();

    // Handle click
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const criminal = criminals.find((c) => c.Criminal_ID === node.data('id'));
      if (criminal) {
        alert(`Suspect: ${criminal.Name}\nCrime Count: ${criminal.Crime_Count}\nRisk Score: ${criminal.Risk_Score}`);
      }
    });

    return () => {
      cy.destroy();
    };
  }, [criminals]);

  return (
    <div className="flex h-full gap-4 p-4">
      {/* Left Panel */}
      <div className="w-80 flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search suspects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-[#111827] border border-[#2a2a3a] text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:border-[#f0b000]"
          />
        </div>

        {/* Filters */}
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-[#f0b000]" />
            <h3 className="text-sm font-semibold text-[#f0b000]">Filters</h3>
          </div>
          <select
            value={crimeFilter}
            onChange={(e) => setCrimeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#0a0e1a] border border-[#2a2a3a] text-[#f1f5f9] focus:outline-none focus:border-[#f0b000]"
          >
            <option>All</option>
            <option>High Risk (80+)</option>
            <option>Medium Risk (50-80)</option>
            <option>Low Risk (0-50)</option>
          </select>
        </div>

        {/* Suspect List */}
        <div className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-[#f0b000] mb-3">Suspects</h3>
          <div className="space-y-2">
            {criminals.slice(0, 15).map((criminal) => (
              <div
                key={criminal.Criminal_ID}
                className="p-3 rounded border border-[#2a2a3a] hover:border-[#f0b000]/50 cursor-pointer transition-colors"
              >
                <p className="text-sm font-medium text-[#f1f5f9]">{criminal.Name}</p>
                <div className="flex gap-2 mt-1 text-xs">
                  <span className="text-[#94a3b8]">Crimes: {criminal.Crime_Count}</span>
                  <span className={`font-semibold ${
                    criminal.Risk_Score > 80 ? 'text-[#c02040]' : 'text-[#f0b000]'
                  }`}>
                    Risk: {criminal.Risk_Score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#0a0e1a] overflow-hidden">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
