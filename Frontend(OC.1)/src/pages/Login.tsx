import { useState, useEffect } from 'react';
import anime from 'animejs';
import { useAuthStore } from '../stores/authStore';
import { useNavStore } from '../stores/navStore';
import { Shield } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('analyst');
  const { login } = useAuthStore();
  const { setPage } = useNavStore();

  useEffect(() => {
    anime({
      targets: '.login-card',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login(username, role);
      setPage('dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c02040]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#20a080]/10 rounded-full blur-[120px]" />
      
      <div className="login-card glass-card w-full max-w-md p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0b000] to-[#c02040] flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest">ULTRON</h1>
          <p className="text-xs text-[#94a3b8] uppercase tracking-widest mt-1">Karnataka State Police</p>
          <p className="text-[10px] text-[#f0b000] mt-1 border border-[#f0b000]/30 px-2 py-0.5 rounded-full">SCRB AUTHORIZED ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#94a3b8] mb-1">Badge ID / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#111827] border border-[#2a3040] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f0b000] transition-colors"
              placeholder="e.g. SP_VARTIKA"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-[#94a3b8] mb-1">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111827] border border-[#2a3040] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f0b000] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94a3b8] mb-1">Access Level</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#111827] border border-[#2a3040] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f0b000] transition-colors appearance-none"
            >
              <option value="officer">Field Officer (HC)</option>
              <option value="analyst">Intel Analyst (SI)</option>
              <option value="admin">Command Staff (SP/DGP)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#800060] to-[#c02040] text-white font-semibold rounded-lg px-4 py-3 text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(192,32,64,0.3)] mt-6"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
