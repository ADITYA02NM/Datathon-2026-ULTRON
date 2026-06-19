'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useCrimeStore, DistrictRecord } from '@/stores/crimeStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin } from 'lucide-react';

// Fix Leaflet default icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function MapsPage() {
  const { crimes, districts } = useCrimeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictRecord | null>(null);

  const filteredCrimes = crimes.filter(
    (crime) =>
      crime.District.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crime.Crime_Head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCrimeColor = (crimeType: string) => {
    if (crimeType.toLowerCase().includes('murder') || crimeType.toLowerCase().includes('rape')) return '#c02040';
    if (crimeType.toLowerCase().includes('theft') || crimeType.toLowerCase().includes('robbery')) return '#f0b000';
    if (crimeType.toLowerCase().includes('cyber')) return '#20a080';
    return '#800060';
  };

  return (
    <div className="flex h-full gap-4 p-4">
      {/* Left Panel */}
      <div className="w-96 flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search crimes or districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-[#111827] border border-[#2a2a3a] text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:border-[#f0b000]"
          />
        </div>

        {/* Districts List */}
        <div className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-[#f0b000] mb-3">Districts</h3>
          <div className="space-y-2">
            {districts.map((district) => (
              <button
                key={district.District_Name}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedDistrict?.District_Name === district.District_Name
                    ? 'border-[#f0b000] bg-[#f0b000]/10'
                    : 'border-[#2a2a3a] hover:border-[#f0b000]/50'
                }`}
              >
                <p className="text-sm font-medium text-[#f1f5f9]">{district.District_Name}</p>
                <p className="text-xs text-[#94a3b8]">Rate: {district.Crime_Rate}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected District Info */}
        {selectedDistrict && (
          <div className="rounded-lg border border-[#2a2a3a] bg-[#111827]/80 backdrop-blur p-4">
            <h3 className="text-sm font-semibold text-[#f0b000] mb-3">District Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Crime Rate:</span>
                <span className="text-[#f1f5f9] font-medium">{selectedDistrict.Crime_Rate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Literacy:</span>
                <span className="text-[#f1f5f9] font-medium">{selectedDistrict.Literacy_Rate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">Density:</span>
                <span className="text-[#f1f5f9] font-medium">{selectedDistrict.Population_Density}/km²</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 rounded-lg border border-[#2a2a3a] overflow-hidden">
        <MapContainer
          center={[15.5, 77]}
          zoom={7}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {filteredCrimes.map((crime, idx) => (
            <CircleMarker
              key={idx}
              center={[crime.Latitude, crime.Longitude]}
              radius={6}
              fillColor={getCrimeColor(crime.Crime_Head)}
              color={getCrimeColor(crime.Crime_Head)}
              weight={2}
              opacity={0.8}
              fillOpacity={0.7}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{crime.Crime_Head}</p>
                  <p className="text-xs text-gray-600">{crime.District}</p>
                  <p className="text-xs text-gray-600">{crime.Date}</p>
                  <p className="text-xs text-gray-600">Status: {crime.Status}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
