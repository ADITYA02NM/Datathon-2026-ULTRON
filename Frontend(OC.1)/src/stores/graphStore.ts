import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';

interface GraphStore {
  nodes: Node[];
  edges: Edge[];
  addNode: (type: string, label: string, position?: { x: number; y: number }) => void;
  addEdge: (source: string, target: string, label?: string) => void;
  removeNode: (id: string) => void;
  updateNodeData: (id: string, data: Record<string, string>) => void;
  clearGraph: () => void;
}

const nodeColors: Record<string, string> = {
  ip: '#c02040',
  name: '#f0b000',
  place: '#20a080',
  object: '#6366f1',
  how: '#f97316',
  why: '#a855f7',
  what: '#06b6d4',
};

let nodeCounter = 0;

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: [],
  edges: [],
  addNode: (type, label, position) => {
    const id = `node_${++nodeCounter}`;
    const newNode: Node = {
      id,
      type: 'default',
      position: position || { x: 100 + Math.random() * 400, y: 100 + Math.random() * 300 },
      data: {
        label: `[${type.toUpperCase()}] ${label}`,
        nodeType: type,
      },
      style: {
        background: nodeColors[type] || '#374151',
        color: '#fff',
        border: `2px solid ${nodeColors[type] || '#6b7280'}`,
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '12px',
        fontWeight: 600,
      },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  addEdge: (source, target, label) => {
    const id = `edge_${source}_${target}`;
    const newEdge: Edge = {
      id,
      source,
      target,
      label: label || '',
      style: { stroke: '#4b5563', strokeWidth: 2 },
      animated: true,
    };
    set({ edges: [...get().edges, newEdge] });
  },
  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },
  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)),
    });
  },
  clearGraph: () => set({ nodes: [], edges: [] }),
}));
