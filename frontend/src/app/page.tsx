'use client';

import { useEffect, useState } from 'react';
import { LogOut, BarChart3, Map, Users, Brain, Shield } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Auto-login for demo
    setIsAuthenticated(true);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0a0e1a] text-[#f1f5f9]">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#111827]/50 backdrop-blur px-8 py-4">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#ff6b4a] to-[#f0b000] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#f1f5f9]">ULTRON</h1>
              <p className="text-xs text-[#94a3b8]">Karnataka State Police</p>
            </div>
          </div>
          <div className="text-sm text-[#94a3b8]">AI-Driven Crime Analytics Platform</div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-[#2a2a3a] bg-[#111827]/30 backdrop-blur p-6 overflow-y-auto">
          <div className="space-y-3">
            <button
              onClick={() => setActiveSection(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                !activeSection
                  ? 'bg-[#f0b000]/20 text-[#f0b000]'
                  : 'text-[#94a3b8] hover:bg-[#2a2a3a]'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('maps')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'maps'
                  ? 'bg-[#f0b000]/20 text-[#f0b000]'
                  : 'text-[#94a3b8] hover:bg-[#2a2a3a]'
              }`}
            >
              <Map className="w-5 h-5" />
              Geographic Mapping
            </button>
            <button
              onClick={() => setActiveSection('network')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'network'
                  ? 'bg-[#f0b000]/20 text-[#f0b000]'
                  : 'text-[#94a3b8] hover:bg-[#2a2a3a]'
              }`}
            >
              <Users className="w-5 h-5" />
              Criminal Network
            </button>
            <button
              onClick={() => setActiveSection('intelligence')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'intelligence'
                  ? 'bg-[#f0b000]/20 text-[#f0b000]'
                  : 'text-[#94a3b8] hover:bg-[#2a2a3a]'
              }`}
            >
              <Brain className="w-5 h-5" />
              Intelligence Graph
            </button>
            <button
              onClick={() => setActiveSection('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'admin'
                  ? 'bg-[#f0b000]/20 text-[#f0b000]'
                  : 'text-[#94a3b8] hover:bg-[#2a2a3a]'
              }`}
            >
              <Shield className="w-5 h-5" />
              Admin Management
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {!activeSection && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-[#f1f5f9] mb-2">ULTRON</h2>
                  <p className="text-lg text-[#94a3b8]">AI-Driven Crime Analytics Platform</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div className="space-y-2 p-6 rounded-lg bg-[#111827]/50 border border-[#2a2a3a] hover:border-[#f0b000]/50 cursor-pointer transition-all" onClick={() => setActiveSection(null)}>
                    <BarChart3 className="w-10 h-10 text-[#f0b000] mx-auto" />
                    <p className="font-semibold text-[#f1f5f9]">Dashboard</p>
                    <p className="text-xs text-[#94a3b8]">Real-time crime analytics</p>
                  </div>
                  <div className="space-y-2 p-6 rounded-lg bg-[#111827]/50 border border-[#2a2a3a] hover:border-[#f0b000]/50 cursor-pointer transition-all" onClick={() => setActiveSection('maps')}>
                    <Map className="w-10 h-10 text-[#f0b000] mx-auto" />
                    <p className="font-semibold text-[#f1f5f9]">Maps</p>
                    <p className="text-xs text-[#94a3b8]">Geographic visualization</p>
                  </div>
                  <div className="space-y-2 p-6 rounded-lg bg-[#111827]/50 border border-[#2a2a3a] hover:border-[#f0b000]/50 cursor-pointer transition-all" onClick={() => setActiveSection('network')}>
                    <Users className="w-10 h-10 text-[#f0b000] mx-auto" />
                    <p className="font-semibold text-[#f1f5f9]">Network</p>
                    <p className="text-xs text-[#94a3b8]">Criminal relationships</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#f1f5f9] mb-6">
                {activeSection === 'maps' && 'Geographic Mapping'}
                {activeSection === 'network' && 'Criminal Network Analysis'}
                {activeSection === 'intelligence' && 'Intelligence Graph'}
                {activeSection === 'admin' && 'Admin Management'}
              </h3>
              <div className="p-8 rounded-lg bg-[#111827]/50 border border-[#2a2a3a]">
                <p className="text-[#94a3b8]">
                  {activeSection === 'maps' && 'Geographic mapping and crime hotspot visualization will be displayed here.'}
                  {activeSection === 'network' && 'Criminal network graph and relationship analysis will be displayed here.'}
                  {activeSection === 'intelligence' && 'Intelligence graph editor and analysis tools will be displayed here.'}
                  {activeSection === 'admin' && 'Admin dashboard with user and system management will be displayed here.'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating User Info */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
          <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur px-4 py-2">
            <p className="text-xs text-[#94a3b8]">Logged in as</p>
            <p className="text-sm font-semibold text-[#f1f5f9]">admin@ultron.ksp</p>
            <p className="text-xs text-[#f0b000] font-medium">Administrator</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c02040] hover:bg-[#a01830] text-white text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
