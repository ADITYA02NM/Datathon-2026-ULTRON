'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SectionNav } from '@/components/layout/SectionNav';
import { RadialNav } from '@/components/layout/RadialNav';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { MapsPage } from '@/components/pages/MapsPage';
import { NetworkPage } from '@/components/pages/NetworkPage';
import { IntelligencePage } from '@/components/pages/IntelligencePage';
import { AdminPage } from '@/components/pages/AdminPage';
import { useNavStore } from '@/stores/navStore';
import { useAuthStore } from '@/stores/authStore';
import { useCrimeStore } from '@/stores/crimeStore';
import Papa from 'papaparse';
// @ts-ignore
import anime from 'animejs';
import { LogOut } from 'lucide-react';

export default function Home() {
  const { activeSection, setActiveSection } = useNavStore();
  const { isAuthenticated, login, logout, user } = useAuthStore();
  const { crimes, criminals, districts, setCrimes, setCriminals, setDistricts, setLoaded } = useCrimeStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load crime records
        const crimesRes = await fetch('/data/crime_records.csv');
        const crimesText = await crimesRes.text();
        const crimesData = Papa.parse(crimesText, { header: true }).data as any[];
        setCrimes(crimesData.filter((c) => c.FIR_No) as any);

        // Load criminals
        const criminalsRes = await fetch('/data/criminals.csv');
        const criminalsText = await criminalsRes.text();
        const criminalsData = Papa.parse(criminalsText, { header: true }).data as any[];
        setCriminals(criminalsData.filter((c) => c.Criminal_ID).map((c) => ({
          ...c,
          Crime_Count: parseInt(c.Crime_Count) || 0,
          Risk_Score: parseInt(c.Risk_Score) || 0,
        })) as any);

        // Load districts
        const districtsRes = await fetch('/data/districts.csv');
        const districtsText = await districtsRes.text();
        const districtsData = Papa.parse(districtsText, { header: true }).data as any[];
        setDistricts(districtsData.filter((d) => d.District_Name).map((d) => ({
          ...d,
          Crime_Rate: parseFloat(d.Crime_Rate) || 0,
          Literacy_Rate: parseFloat(d.Literacy_Rate) || 0,
          Poverty_Index: parseFloat(d.Poverty_Index) || 0,
          Population_Density: parseInt(d.Population_Density) || 0,
          Police_Stations: parseInt(d.Police_Stations) || 0,
          Latitude: parseFloat(d.Latitude) || 0,
          Longitude: parseFloat(d.Longitude) || 0,
        })) as any);

        setLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Handle page transitions with anime.js
  useEffect(() => {
    if (activeSection) {
      setIsTransitioning(true);
      anime({
        targets: '.page-content',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutExpo',
        complete: () => setIsTransitioning(false),
      });
    }
  }, [activeSection]);

  // Auto-login for demo
  useEffect(() => {
    if (!isAuthenticated) {
      login('admin@ultron.ksp', 'admin123');
    }
  }, []);

  const renderPage = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'maps':
        return <MapsPage />;
      case 'network':
        return <NetworkPage />;
      case 'intelligence':
        return <IntelligencePage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <RadialNav />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0e1a]">
      {/* Header */}
      <Header />

      {/* Section Nav */}
      <SectionNav />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#0a0e1a]">
        <div className="page-content">
          {renderPage()}
        </div>
      </div>

      {/* Floating Logout Button (bottom-right) */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
          <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur px-4 py-2">
            <p className="text-xs text-[#94a3b8]">Logged in as</p>
            <p className="text-sm font-semibold text-[#f1f5f9]">{user?.email}</p>
            <p className="text-xs text-[#f0b000] font-medium">{user?.role}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setActiveSection(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c02040] hover:bg-[#a01830] text-white text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
