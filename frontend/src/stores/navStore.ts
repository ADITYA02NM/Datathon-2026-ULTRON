import { create } from 'zustand';

type Section = 'dashboard' | 'maps' | 'network' | 'intelligence' | 'admin' | null;

interface NavState {
  activeSection: Section;
  showRadialNav: boolean;
  setActiveSection: (section: Section) => void;
  toggleRadialNav: (show: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeSection: null,
  showRadialNav: true,
  setActiveSection: (section: Section) => set({ activeSection: section, showRadialNav: section === null }),
  toggleRadialNav: (show: boolean) => set({ showRadialNav: show }),
}));
