import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type { Connection, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphStore } from '../stores/graphStore';
import { useNavStore } from '../stores/navStore';
import { ArrowLeft } from 'lucide-react';

export default function IntelGraph() {
  const { nodes: storeNodes, edges: storeEdges, addNode, addEdge: addStoreEdge } = useGraphStore();
  const { setPage } = useNavStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge(params, eds));
      if (params.source && params.target) {
        addStoreEdge(params.source, params.target);
      }
    },
    [setEdges, addStoreEdge],
  );

  const handleAddNode = (type: string) => {
    addNode(type, 'New Node');
    // Sync back to local state (in a real app, you'd bind React Flow purely to the store)
    setNodes(useGraphStore.getState().nodes);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#0a0e1a]">
      <div className="h-14 border-b border-[#2a3040] bg-[#111827] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPage('dashboard')}
            className="text-[#94a3b8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white font-bold text-sm">Strategic Intel Graph</h1>
        </div>
        <div className="flex gap-2">
          {['ip', 'name', 'place', 'object', 'how', 'why', 'what'].map(type => (
            <button
              key={type}
              onClick={() => handleAddNode(type)}
              className="px-2 py-1 text-[10px] uppercase font-bold text-white rounded border border-[#2a3040] hover:border-[#f0b000] bg-[#1a1f2e] transition-colors"
            >
              + {type}
            </button>
          ))}
          <button className="ml-4 px-3 py-1 text-xs bg-[#c02040] text-white rounded hover:opacity-90">
            Export JSON
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="dark"
        >
          <Controls className="bg-[#111827] border-[#2a3040] fill-white" />
          <MiniMap 
            nodeColor={(n) => {
              const type = n.data?.nodeType as string;
              if (type === 'ip') return '#c02040';
              if (type === 'name') return '#f0b000';
              if (type === 'place') return '#20a080';
              return '#4b5563';
            }}
            maskColor="rgba(10, 14, 26, 0.7)"
            className="bg-[#111827]"
          />
          <Background color="#2a3040" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
