import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Sudo' | 'User';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {
    const roleMap: Record<string, 'Admin' | 'Sudo' | 'User'> = {
      'admin@ultron.ksp': 'Admin',
      'sudo@ultron.ksp': 'Sudo',
      'user@ultron.ksp': 'User',
    };

    const role = roleMap[email] || 'User';
    const name = email.split('@')[0].toUpperCase();

    set({
      isAuthenticated: true,
      user: { name, email, role },
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
