import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  user: { name: string; role: string; badge: string } | null;
  login: (name: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (name, role) => set({
    isLoggedIn: true,
    user: { name, role, badge: role === 'admin' ? 'SP' : role === 'analyst' ? 'SI' : 'HC' },
  }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));
