import { create } from 'zustand';
import Papa from 'papaparse';
import type { CrimeRecord, Criminal, CyberIncident, District } from '../types';

interface CrimeStore {
  crimes: CrimeRecord[];
  criminals: Criminal[];
  cyberIncidents: CyberIncident[];
  districts: District[];
  loaded: boolean;
  selectedDistrict: string | null;
  loadAll: () => Promise<void>;
  setSelectedDistrict: (d: string | null) => void;
}

async function loadCSV<T>(path: string): Promise<T[]> {
  const res = await fetch(path);
  const text = await res.text();
  const { data } = Papa.parse<T>(text, { header: true, skipEmptyLines: true, dynamicTyping: true });
  return data;
}

export const useCrimeStore = create<CrimeStore>((set, get) => ({
  crimes: [],
  criminals: [],
  cyberIncidents: [],
  districts: [],
  loaded: false,
  selectedDistrict: null,
  loadAll: async () => {
    if (get().loaded) return;
    const [crimes, criminals, cyberIncidents, districts] = await Promise.all([
      loadCSV<CrimeRecord>('/data/crime_records.csv'),
      loadCSV<Criminal>('/data/criminals.csv'),
      loadCSV<CyberIncident>('/data/cyber_incidents.csv'),
      loadCSV<District>('/data/districts.csv'),
    ]);
    set({ crimes, criminals, cyberIncidents, districts, loaded: true });
  },
  setSelectedDistrict: (d) => set({ selectedDistrict: d }),
}));
