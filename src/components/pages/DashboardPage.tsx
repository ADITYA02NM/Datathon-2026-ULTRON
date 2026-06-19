'use client';

import { useEffect, useState, useRef } from 'react';
import { useCrimeStore } from '@/stores/crimeStore';
import { TrendChart } from '@/components/charts/TrendChart';
import { CrimeTypeChart } from '@/components/charts/CrimeTypeChart';
// @ts-ignore
import anime from 'animejs';
import { AlertCircle, TrendingUp, Users, BarChart3 } from 'lucide-react';

export function DashboardPage() {
  const { crimes, criminals, districts } = useCrimeStore();
  const [stats, setStats] = useState({
    totalCrimes: 0,
    solvedPercent: 0,
    activeCases: 0,
    avgRiskScore: 0,
  });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const solved = crimes.filter((c) => c.Status === 'Resolved').length;
    const active = crimes.filter((c) => c.Status === 'Under Investigation').length;
    const avgRisk = criminals.length > 0
      ? Math.round(criminals.reduce((sum, c) => sum + c.Risk_Score, 0) / criminals.length)
      : 0;

    setStats({
      totalCrimes: crimes.length,
      solvedPercent: crimes.length > 0 ? Math.round((solved / crimes.length) * 100) : 0,
      activeCases: active,
      avgRiskScore: avgRisk,
    });

    // Animate KPI numbers
    if (statsRef.current) {
      const numbers = statsRef.current.querySelectorAll('.kpi-number');
      anime({
        targets: numbers,
        innerHTML: [0, (el: Element, i: number) => {
          const values = [stats.totalCrimes, stats.solvedPercent, stats.activeCases, stats.avgRiskScore];
          return values[i] || 0;
        }],
        round: 1,
        duration: 2000,
        easing: 'easeOutCubic',
        delay: anime.stagger(200),
      });
    }
  }, [crimes, criminals]);

  return (
    <div className="space-y-6 p-6">
      {/* KPI Cards */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: BarChart3, label: 'Total Crimes', value: stats.totalCrimes, color: 'text-[#f0b000]' },
          { icon: TrendingUp, label: 'Solved %', value: `${stats.solvedPercent}%`, color: 'text-[#20a080]' },
          { icon: AlertCircle, label: 'Active Cases', value: stats.activeCases, color: 'text-[#c02040]' },
          { icon: Users, label: 'Avg Risk Score', value: stats.avgRiskScore, color: 'text-[#800060]' },
        ].map((card, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6 hover:border-[#f0b000]/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#94a3b8] mb-2">{card.label}</p>
                <p className={`text-3xl font-bold kpi-number ${card.color}`}>0</p>
              </div>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">30-Day Trend</h3>
          <TrendChart />
        </div>
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Crime Types Distribution</h3>
          <CrimeTypeChart crimes={crimes} />
        </div>
      </div>

      {/* Recent Feed */}
      <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Recent Cases</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {crimes.slice(0, 10).map((crime, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 rounded border border-[#2a2a3a] hover:border-[#f0b000]/30 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                crime.Status === 'Resolved' ? 'bg-[#20a080]' :
                crime.Status === 'Under Investigation' ? 'bg-[#f0b000]' :
                'bg-[#c02040]'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#f1f5f9] truncate">{crime.Crime_Head}</p>
                <p className="text-xs text-[#94a3b8]">{crime.District}</p>
              </div>
              <span className="text-xs text-[#64748b]">{crime.Date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
