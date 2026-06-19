'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CrimeRecord } from '@/stores/crimeStore';

interface CrimeTypeChartProps {
  crimes: CrimeRecord[];
}

export function CrimeTypeChart({ crimes }: CrimeTypeChartProps) {
  const crimeTypes = crimes.reduce(
    (acc, crime) => {
      const existing = acc.find((c) => c.type === crime.Crime_Head);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ type: crime.Crime_Head, count: 1 });
      }
      return acc;
    },
    [] as { type: string; count: number }[]
  ).sort((a, b) => b.count - a.count).slice(0, 8);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={crimeTypes}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
        <XAxis dataKey="type" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} style={{ fontSize: '12px' }} />
        <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #2a2a3a',
            borderRadius: '6px',
          }}
          labelStyle={{ color: '#f1f5f9' }}
        />
        <Bar dataKey="count" fill="#20a080" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
