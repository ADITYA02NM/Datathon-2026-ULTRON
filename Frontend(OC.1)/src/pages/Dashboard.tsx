import { useEffect } from 'react';
import anime from 'animejs';
import RadialNav from '../components/RadialNav';
import { useCrimeStore } from '../stores/crimeStore';
import { ShieldAlert, Users, GlobeLock, Activity } from 'lucide-react';

export default function Dashboard() {
  const { crimes, criminals, cyberIncidents, loadAll } = useCrimeStore();

  useEffect(() => {
    loadAll();
    anime({
      targets: '.stat-card',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .8)',
    });
  }, [loadAll]);

  const kpis = [
    { label: 'Total Incidents (YTD)', value: crimes.length || 214234, icon: <Activity className="w-5 h-5" />, color: '#f0b000' },
    { label: 'High-Risk Criminals', value: criminals.filter(c => c.Risk_Score > 80).length || 452, icon: <Users className="w-5 h-5" />, color: '#20a080' },
    { label: 'Cyber Threats', value: cyberIncidents.length || 1845, icon: <GlobeLock className="w-5 h-5" />, color: '#800060' },
    { label: 'Active Red Zones', value: 3, icon: <ShieldAlert className="w-5 h-5" />, color: '#c02040' },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="stat-card glass-card p-5 flex items-center justify-between border-l-4" style={{ borderLeftColor: kpi.color }}>
            <div>
              <p className="text-xs text-[#94a3b8] uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{kpi.value.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-[#111827] shadow-inner" style={{ color: kpi.color }}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <RadialNav />
      </div>
    </div>
  );
}
