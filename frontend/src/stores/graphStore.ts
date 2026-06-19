import { create } from 'zustand';

export interface GraphNode {
  id: string;
  type: 'IP' | 'Name' | 'Place' | 'Object' | 'How' | 'Why' | 'What';
  data: any;
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: string | null;
  addNode: (type: GraphNode['type'], position: { x: number; y: number }) => void;
  removeNode: (id: string) => void;
  updateNodeData: (id: string, data: any) => void;
  addEdge: (source: string, target: string) => void;
  removeEdge: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  exportGraph: () => string;
  clearGraph: () => void;
  loadFromJSON: (json: string) => void;
}

let nodeCounter = 0;

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  addNode: (type, position) => {
    const id = `${type}-${nodeCounter++}`;
    const newNode: GraphNode = {
      id,
      type,
      data: { label: `${type} Node` },
      position,
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },
  removeNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNode: state.selectedNode === id ? null : state.selectedNode,
    }));
  },
  updateNodeData: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, data } : n)),
    }));
  },
  addEdge: (source, target) => {
    const id = `${source}-${target}`;
    const edge: GraphEdge = { id, source, target };
    set((state) => ({ edges: [...state.edges, edge] }));
  },
  removeEdge: (id) => {
    set((state) => ({ edges: state.edges.filter((e) => e.id !== id) }));
  },
  setSelectedNode: (id) => set({ selectedNode: id }),
  exportGraph: () => {
    const state = get();
    return JSON.stringify({ nodes: state.nodes, edges: state.edges }, null, 2);
  },
  clearGraph: () => {
    nodeCounter = 0;
    set({ nodes: [], edges: [], selectedNode: null });
  },
  loadFromJSON: (json) => {
    try {
      const { nodes, edges } = JSON.parse(json);
      set({ nodes, edges });
    } catch (e) {
      console.error('Failed to load graph:', e);
    }
  },
}));
