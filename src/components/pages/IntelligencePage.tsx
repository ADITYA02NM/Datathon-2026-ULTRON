'use client';

import { useCrimeStore } from '@/stores/crimeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, AlertTriangle, Users } from 'lucide-react';

export function IntelligencePage() {
  const { crimes, criminals, districts } = useCrimeStore();

  // Emerging trends
  const trends = crimes.reduce(
    (acc, crime) => {
      const existing = acc.find((t) => t.type === crime.Crime_Head);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ type: crime.Crime_Head, count: 1 });
      }
      return acc;
    },
    [] as { type: string; count: number }[]
  ).sort((a, b) => b.count - a.count).slice(0, 5);

  // Risk scores
  const riskData = criminals.map((c) => ({
    name: c.Name,
    score: c.Risk_Score,
    crimes: c.Crime_Count,
  })).sort((a, b) => b.score - a.score).slice(0, 10);

  // Socio-economic correlation
  const correlationData = districts.slice(0, 8).map((d) => ({
    name: d.District_Name,
    crime: d.Crime_Rate,
    literacy: d.Literacy_Rate * 5, // Scale for visibility
  }));

  // Red-zone districts (high crime rate)
  const redZones = districts.filter((d) => d.Crime_Rate > 600).sort((a, b) => b.Crime_Rate - a.Crime_Rate);

  return (
    <div className="space-y-6 p-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#94a3b8] uppercase">High Risk Suspects</p>
              <p className="text-2xl font-bold text-[#c02040]">
                {criminals.filter((c) => c.Risk_Score > 80).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-[#c02040]" />
          </div>
        </div>
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#94a3b8] uppercase">Red-Zone Districts</p>
              <p className="text-2xl font-bold text-[#f0b000]">{redZones.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#f0b000]" />
          </div>
        </div>
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#94a3b8] uppercase">Emerging Trends</p>
              <p className="text-2xl font-bold text-[#20a080]">{trends.length}</p>
            </div>
            <Users className="w-8 h-8 text-[#20a080]" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emerging Trends */}
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Top 5 Emerging Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #2a2a3a',
                  borderRadius: '6px',
                }}
              />
              <Bar dataKey="count" fill="#f0b000" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Crime vs Literacy */}
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Crime Rate vs Literacy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="crime" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis dataKey="literacy" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #2a2a3a',
                  borderRadius: '6px',
                }}
              />
              <Scatter name="Districts" data={correlationData} fill="#20a080" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* High-Risk Suspects */}
      <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">High-Risk Suspects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskData.map((suspect, idx) => (
            <div
              key={idx}
              className="rounded border border-[#2a2a3a] bg-[#0a0e1a] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-[#f1f5f9]">{suspect.name}</p>
                <span className={`text-sm font-bold px-2 py-1 rounded ${
                  suspect.score > 90 ? 'bg-[#c02040]/20 text-[#c02040]' :
                  suspect.score > 80 ? 'bg-[#f0b000]/20 text-[#f0b000]' :
                  'bg-[#20a080]/20 text-[#20a080]'
                }`}>
                  {suspect.score}
                </span>
              </div>
              <p className="text-xs text-[#94a3b8]">Crimes: {suspect.crimes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Red-Zone Districts */}
      <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Red-Zone Districts (High Crime Rate)</h3>
        <div className="space-y-3">
          {redZones.map((district) => (
            <div
              key={district.District_Name}
              className="flex items-center justify-between p-3 rounded border border-[#2a2a3a] hover:border-[#c02040]/50"
            >
              <div>
                <p className="font-medium text-[#f1f5f9]">{district.District_Name}</p>
                <p className="text-xs text-[#94a3b8]">Literacy: {district.Literacy_Rate}%</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#c02040]">{district.Crime_Rate}</p>
                <p className="text-xs text-[#94a3b8]">crime rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
