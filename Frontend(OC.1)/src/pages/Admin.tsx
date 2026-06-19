import { Settings, Server, Database, ShieldCheck } from 'lucide-react';

export default function Admin() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5" /> Admin Settings
        </h2>
        <p className="text-xs text-[#94a3b8] mt-1">System configuration and ML model management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ML Models Card */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-[#2a3040] pb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-[#800060]" /> ML Model Status
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Risk Score (Random Forest)', status: 'Active', accuracy: '94%' },
              { name: 'Anomaly (Isolation Forest)', status: 'Active', accuracy: '91%' },
              { name: 'MO Matcher (TF-IDF)', status: 'Active', accuracy: '88%' },
              { name: 'Predictive (ARIMA)', status: 'Training', accuracy: '--' },
              { name: 'Phishing (Logistic Reg)', status: 'Active', accuracy: '96%' }
            ].map(m => (
              <div key={m.name} className="flex justify-between items-center text-xs">
                <span className="text-[#94a3b8]">{m.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">{m.accuracy}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${m.status === 'Active' ? 'bg-[#20a080]/20 text-[#20a080]' : 'bg-[#f0b000]/20 text-[#f0b000]'}`}>
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-2 bg-[#111827] border border-[#2a3040] rounded text-xs text-white hover:border-[#800060] transition-colors">
              Trigger Full Retrain
            </button>
          </div>
        </div>

        {/* Database Stats */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-[#2a3040] pb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-[#20a080]" /> Database Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#94a3b8]">Total Records</span>
              <span className="text-white">2.4M</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94a3b8]">Storage Used</span>
              <span className="text-white">45 GB</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94a3b8]">Last Backup</span>
              <span className="text-white">Today, 02:00 AM</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94a3b8]">API Latency</span>
              <span className="text-[#20a080]">45ms</span>
            </div>
          </div>
        </div>

        {/* Access Logs */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 border-b border-[#2a3040] pb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#f0b000]" /> Recent Logins
          </h3>
          <div className="space-y-3">
            {[
              { user: 'SP_VARTIKA', time: '10 mins ago', ip: '10.0.0.45' },
              { user: 'SI_RAMESH', time: '1 hr ago', ip: '10.0.1.12' },
              { user: 'HC_SURESH', time: '2 hrs ago', ip: '10.0.2.88' },
            ].map((log, i) => (
              <div key={i} className="flex justify-between text-xs border-b border-[#2a3040]/50 pb-2">
                <div>
                  <p className="text-white">{log.user}</p>
                  <p className="text-[#94a3b8] text-[10px]">{log.ip}</p>
                </div>
                <span className="text-[#94a3b8]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
