'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', crimes: 120 },
  { month: 'Feb', crimes: 132 },
  { month: 'Mar', crimes: 115 },
  { month: 'Apr', crimes: 145 },
  { month: 'May', crimes: 138 },
  { month: 'Jun', crimes: 155 },
  { month: 'Jul', crimes: 168 },
  { month: 'Aug', crimes: 142 },
  { month: 'Sep', crimes: 156 },
  { month: 'Oct', crimes: 171 },
  { month: 'Nov', crimes: 185 },
  { month: 'Dec', crimes: 192 },
];

export function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
        <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
        <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #2a2a3a',
            borderRadius: '6px',
          }}
          labelStyle={{ color: '#f1f5f9' }}
        />
        <Line
          type="monotone"
          dataKey="crimes"
          stroke="#f0b000"
          dot={{ fill: '#f0b000', r: 4 }}
          activeDot={{ r: 6 }}
          strokeWidth={2}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
