'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Settings, Users, Database, Activity, CheckCircle, AlertCircle } from 'lucide-react';

const mockUsers = [
  { id: 1, email: 'admin@ultron.ksp', name: 'Admin User', role: 'Admin', status: 'Active' },
  { id: 2, email: 'sudo@ultron.ksp', name: 'Sudo User', role: 'Sudo', status: 'Active' },
  { id: 3, email: 'user@ultron.ksp', name: 'Regular User', role: 'User', status: 'Active' },
];

export function AdminPage() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null);

  const handleRoleChange = (userId: number, newRole: 'Admin' | 'Sudo' | 'User') => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="rounded-lg border border-[#c02040]/50 bg-[#c02040]/10 p-6 text-center">
          <p className="text-[#c02040] font-semibold">Access Denied</p>
          <p className="text-sm text-[#94a3b8] mt-1">Admin privileges required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Database, label: 'Database', status: 'healthy', color: 'text-[#20a080]' },
          { icon: Activity, label: 'API Server', status: 'healthy', color: 'text-[#20a080]' },
          { icon: Users, label: 'Auth System', status: 'healthy', color: 'text-[#20a080]' },
          { icon: Settings, label: 'ML Models', status: 'training', color: 'text-[#f0b000]' },
        ].map((item, idx) => (
          <div key={idx} className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#94a3b8]">{item.label}</p>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`} />
              <span className="text-xs capitalize text-[#f1f5f9]">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Users Management */}
      <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">User Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a3a]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8]">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8]">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8]">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#2a2a3a] hover:bg-[#111827]/50">
                  <td className="px-4 py-3 text-sm text-[#f1f5f9]">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-[#94a3b8]">{user.name}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="px-2 py-1 rounded bg-[#0a0e1a] border border-[#2a2a3a] text-[#f1f5f9] text-xs focus:outline-none focus:border-[#f0b000]"
                    >
                      <option>Admin</option>
                      <option>Sudo</option>
                      <option>User</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center gap-1 text-[#20a080]">
                      <CheckCircle className="w-4 h-4" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-[#f0b000] hover:text-[#d49000] text-xs font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">ML Models</h3>
          <div className="space-y-3">
            {[
              { name: 'Hotspot Detection', status: 'Trained', accuracy: '92%' },
              { name: 'Risk Scoring', status: 'Trained', accuracy: '88%' },
              { name: 'Anomaly Detection', status: 'Training...', accuracy: '85%' },
            ].map((model, idx) => (
              <div key={idx} className="p-3 rounded border border-[#2a2a3a]">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-[#f1f5f9]">{model.name}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    model.status === 'Trained' ? 'bg-[#20a080]/20 text-[#20a080]' : 'bg-[#f0b000]/20 text-[#f0b000]'
                  }`}>
                    {model.status}
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8]">Accuracy: {model.accuracy}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-4 py-2 rounded bg-[#800060] hover:bg-[#600050] text-white text-sm font-medium transition-colors">
            Retrain All Models
          </button>
        </div>

        <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Data Management</h3>
          <div className="space-y-3">
            <div className="p-3 rounded border border-[#2a2a3a]">
              <p className="text-sm font-medium text-[#f1f5f9] mb-2">Database Statistics</p>
              <div className="text-xs text-[#94a3b8] space-y-1">
                <p>Crime Records: 1,250</p>
                <p>Criminal Profiles: 450</p>
                <p>Cyber Incidents: 320</p>
              </div>
            </div>
            <div className="p-3 rounded border border-[#2a2a3a]">
              <p className="text-sm font-medium text-[#f1f5f9] mb-2">Storage Usage</p>
              <div className="w-full bg-[#0a0e1a] rounded h-2">
                <div className="bg-[#f0b000] h-2 rounded" style={{ width: '65%' }} />
              </div>
              <p className="text-xs text-[#94a3b8] mt-1">6.5 GB / 10 GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-6">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Recent Activity</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[
            { time: '2 min ago', action: 'User login', user: 'admin@ultron.ksp' },
            { time: '15 min ago', action: 'Data upload', user: 'sudo@ultron.ksp' },
            { time: '1 hour ago', action: 'Model training', user: 'System' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm p-2 hover:bg-[#111827]/50 rounded">
              <div>
                <p className="text-[#f1f5f9]">{log.action}</p>
                <p className="text-xs text-[#94a3b8]">{log.user}</p>
              </div>
              <span className="text-xs text-[#64748b]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
