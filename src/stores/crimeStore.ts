import { create } from 'zustand';

export interface CrimeRecord {
  FIR_No: string;
  District: string;
  UnitName: string;
  Crime_Head: string;
  Date: string;
  Time: string;
  Latitude: number;
  Longitude: number;
  Status: string;
  Criminal_Name: string;
  Victim_Name: string;
  MO_Description: string;
}

export interface CriminalRecord {
  Criminal_ID: string;
  Name: string;
  Alias: string;
  DOB: string;
  Gender: string;
  Address: string;
  District: string;
  Crime_Count: number;
  Risk_Score: number;
}

export interface DistrictRecord {
  District_Name: string;
  Crime_Rate: number;
  Literacy_Rate: number;
  Poverty_Index: number;
  Population_Density: number;
  Police_Stations: number;
}

interface CrimeState {
  crimes: CrimeRecord[];
  criminals: CriminalRecord[];
  districts: DistrictRecord[];
  loaded: boolean;
  setCrimes: (crimes: CrimeRecord[]) => void;
  setCriminals: (criminals: CriminalRecord[]) => void;
  setDistricts: (districts: DistrictRecord[]) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useCrimeStore = create<CrimeState>((set) => ({
  crimes: [],
  criminals: [],
  districts: [],
  loaded: false,
  setCrimes: (crimes) => set({ crimes }),
  setCriminals: (criminals) => set({ criminals }),
  setDistricts: (districts) => set({ districts }),
  setLoaded: (loaded) => set({ loaded }),
}));
