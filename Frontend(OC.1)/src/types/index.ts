export interface CrimeRecord {
  FIR_No: string;
  District: string;
  UnitName: string;
  Crime_Head: string;
  Date: string;
  Time: string;
  Lat: number;
  Lng: number;
  Status: string;
  Criminal_Name: string;
  Victim_Name: string;
  MO_Description: string;
}

export interface Criminal {
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

export interface CyberIncident {
  Case_No: string;
  Incident_Type: string;
  Date: string;
  Source_IP: string;
  Target_Domain: string;
  Victim: string;
  Status: string;
  Geo_City: string;
  Geo_Country: string;
}

export interface District {
  District_Code: number;
  District_Name: string;
  Population: number;
  Area_SqKm: number;
  Literacy_Rate: number;
  Poverty_Index: number;
  Police_Stations: number;
  Crime_Rate_Per_Lakh: number;
  Lat: number;
  Lng: number;
}

export type PageId = 'login' | 'dashboard' | 'maps' | 'network' | 'intelligence' | 'admin' | 'intelgraph';

export type NavSection = 'Dashboard' | 'Maps' | 'Network' | 'Intelligence' | 'Admin';

export interface IntelNode {
  id: string;
  type: 'ip' | 'name' | 'place' | 'object' | 'how' | 'why' | 'what';
  label: string;
  data: Record<string, string>;
}

export interface IntelEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}
