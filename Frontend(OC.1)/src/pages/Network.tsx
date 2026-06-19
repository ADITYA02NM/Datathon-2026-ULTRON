import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { useCrimeStore } from '../stores/crimeStore';

export default function Network() {
  const { criminals, loadAll } = useCrimeStore();
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Generate mock edges for MO matching
  const elements = [
    ...criminals.slice(0, 15).map((c) => ({
      data: { id: c.Criminal_ID, label: c.Name, score: c.Risk_Score },
    })),
  ];

  // Add random edges for demo
  if (criminals.length > 0) {
    for (let i = 0; i < 10; i++) {
      const source = criminals[Math.floor(Math.random() * 10)].Criminal_ID;
      const target = criminals[Math.floor(Math.random() * 10) + 5].Criminal_ID;
      const moMatch = Math.floor(Math.random() * 40) + 60; // 60-99%
      elements.push({
        data: { id: `e${i}`, source, target, label: `${moMatch}% MO` } as any,
      });
    }
  }

  const layout = { name: 'cose', padding: 50 };

  const stylesheet: cytoscape.StylesheetStyle[] = [
    {
      selector: 'node',
      style: {
        'background-color': (ele: any) => ele.data('score') > 80 ? '#c02040' : '#f0b000',
        label: 'data(label)',
        color: '#f1f5f9',
        'text-outline-color': '#0a0e1a',
        'text-outline-width': 2,
        'font-size': '12px',
        width: 30,
        height: 30,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#2a3040',
        'target-arrow-color': '#2a3040',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        label: 'data(label)',
        color: '#94a3b8',
        'font-size': '10px',
        'text-background-color': '#111827',
        'text-background-opacity': 1,
        'text-background-padding': '2px',
        'text-background-shape': 'roundrectangle',
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Criminal Network & MO Matches</h2>
          <p className="text-xs text-[#94a3b8]">Cytoscape link analysis based on TF-IDF Modus Operandi similarity</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs bg-[#111827] border border-[#2a3040] rounded text-white hover:border-[#f0b000] transition-colors">
            Run Clustering
          </button>
          <button className="px-3 py-1.5 text-xs bg-[#111827] border border-[#2a3040] rounded text-white hover:border-[#f0b000] transition-colors">
            Export JSON
          </button>
        </div>
      </div>

      <div className="flex-1 glass-card rounded-xl overflow-hidden border border-[#2a3040]">
        {elements.length > 0 && (
          <CytoscapeComponent
            elements={elements}
            layout={layout}
            stylesheet={stylesheet}
            style={{ width: '100%', height: '100%' }}
            cy={(cy: cytoscape.Core) => { cyRef.current = cy; }}
          />
        )}
      </div>
    </div>
  );
}
