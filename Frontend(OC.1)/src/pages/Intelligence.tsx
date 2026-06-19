import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BrainCircuit, TrendingUp, AlertOctagon } from 'lucide-react';

export default function Intelligence() {
  const trendData = [
    { name: 'Jan', cyber: 400, property: 240, violent: 150 },
    { name: 'Feb', cyber: 300, property: 139, violent: 180 },
    { name: 'Mar', cyber: 200, property: 980, violent: 200 },
    { name: 'Apr', cyber: 278, property: 390, violent: 190 },
    { name: 'May', cyber: 189, property: 480, violent: 140 },
    { name: 'Jun', cyber: 239, property: 380, violent: 160 },
  ];

  const socioData = [
    { name: 'Bengaluru', literacy: 88, poverty: 12, crime: 485 },
    { name: 'Mysuru', literacy: 72, poverty: 22, crime: 312 },
    { name: 'Kalaburagi', literacy: 64, poverty: 31, crime: 278 },
    { name: 'Raichur', literacy: 59, poverty: 35, crime: 312 },
    { name: 'Udupi', literacy: 86, poverty: 11, crime: 145 },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#800060]" /> Strategic Intelligence Hub
          </h2>
          <p className="text-xs text-[#94a3b8] mt-1">Command center for senior SCRB officers. AI-generated predictive insights.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Alerts Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#2a3040] pb-2">
            <AlertOctagon className="w-4 h-4 text-[#c02040]" /> Automated Briefs
          </h3>
          
          <div className="glass-card p-4 border-l-4 border-l-[#c02040]">
            <p className="text-xs text-[#c02040] font-bold mb-1">EMERGING TREND</p>
            <p className="text-sm text-white">Cyber Fraud spike in Bengaluru Rural (+45% MoM). Highly correlated with new industrial zone expansion.</p>
          </div>
          
          <div className="glass-card p-4 border-l-4 border-l-[#f0b000]">
            <p className="text-xs text-[#f0b000] font-bold mb-1">MO MATCH ALERT</p>
            <p className="text-sm text-white">3 recent chain-snatchings in Mysuru show 92% MO similarity (TF-IDF) to known offender 'Raja'.</p>
          </div>

          <div className="glass-card p-4 border-l-4 border-l-[#20a080]">
            <p className="text-xs text-[#20a080] font-bold mb-1">PREDICTIVE WATCH</p>
            <p className="text-sm text-white">ARIMA models predict a 20% drop in property crimes in Udupi following recent arrests.</p>
          </div>
        </div>

        {/* Charts Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-4 h-[250px]">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#20a080]" /> 6-Month Crime Category Trends
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', borderColor: '#2a3040', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="cyber" stroke="#800060" strokeWidth={2} />
                <Line type="monotone" dataKey="property" stroke="#f0b000" strokeWidth={2} />
                <Line type="monotone" dataKey="violent" stroke="#c02040" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-4 h-[250px]">
            <h3 className="text-sm font-semibold text-white mb-4">Socio-Economic Correlation (Crime vs Poverty)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#c02040" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', borderColor: '#2a3040', color: '#fff' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="crime" fill="#20a080" name="Crime Rate" />
                <Bar yAxisId="right" dataKey="poverty" fill="#c02040" name="Poverty Index" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
