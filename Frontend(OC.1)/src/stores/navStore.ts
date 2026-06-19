import { create } from 'zustand';
import type { PageId, NavSection } from '../types';

interface NavStore {
  currentPage: PageId;
  activeSection: NavSection;
  isTransitioning: boolean;
  setPage: (page: PageId) => void;
  setSection: (section: NavSection) => void;
  setTransitioning: (v: boolean) => void;
}

const sectionToPage: Record<NavSection, PageId> = {
  Dashboard: 'dashboard',
  Maps: 'maps',
  Network: 'network',
  Intelligence: 'intelligence',
  Admin: 'admin',
};

export const useNavStore = create<NavStore>((set) => ({
  currentPage: 'login',
  activeSection: 'Dashboard',
  isTransitioning: false,
  setPage: (page) => set({ currentPage: page }),
  setSection: (section) => set({ activeSection: section, currentPage: sectionToPage[section] }),
  setTransitioning: (v) => set({ isTransitioning: v }),
}));
