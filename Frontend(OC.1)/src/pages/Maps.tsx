import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useCrimeStore } from '../stores/crimeStore';
import { AlertTriangle } from 'lucide-react';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redZoneIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Maps() {
  const { districts, loadAll } = useCrimeStore();
  const [overlay, setOverlay] = useState<'none' | 'literacy' | 'poverty'>('none');
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Karnataka center
  const center: [number, number] = [15.3173, 75.7139];

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="absolute top-4 left-4 z-[400] flex gap-2">
        <div className="glass-card p-2 flex gap-2">
          <select 
            value={overlay}
            onChange={(e) => setOverlay(e.target.value as any)}
            className="bg-[#111827] text-xs text-white border border-[#2a3040] rounded px-2 py-1 outline-none"
          >
            <option value="none">No Overlay</option>
            <option value="literacy">Literacy Rate</option>
            <option value="poverty">Poverty Index</option>
          </select>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="bg-[#111827] text-xs text-white border border-[#2a3040] rounded px-2 py-1 outline-none"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-[#2a3040] mx-6 mb-6 mt-4">
        <MapContainer center={center} zoom={7} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {districts.map((d) => {
            if (!d.Lat || !d.Lng) return null;
            
            // Red zone pulse for high crime rate
            const isRedZone = d.Crime_Rate_Per_Lakh > 280;
            
            // Overlay logic
            let circleColor = 'transparent';
            if (overlay === 'literacy') circleColor = d.Literacy_Rate > 80 ? '#20a080' : '#f0b000';
            if (overlay === 'poverty') circleColor = d.Poverty_Index > 25 ? '#c02040' : '#20a080';

            return (
              <div key={`d-${d.District_Code}`}>
                {overlay !== 'none' && (
                  <Circle 
                    center={[d.Lat, d.Lng]} 
                    radius={15000} 
                    pathOptions={{ color: circleColor, fillColor: circleColor, fillOpacity: 0.4 }} 
                  />
                )}
                
                {isRedZone && (
                  <Circle 
                    center={[d.Lat, d.Lng]} 
                    radius={20000} 
                    className="pulse-red"
                    pathOptions={{ color: '#c02040', fillColor: '#c02040', fillOpacity: 0.2 }} 
                  />
                )}

                <Marker position={[d.Lat, d.Lng]} icon={isRedZone ? redZoneIcon : new L.Icon.Default()}>
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-gray-800 flex items-center gap-1">
                        {d.District_Name} {isRedZone && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">Crime Rate: {d.Crime_Rate_Per_Lakh}/lakh</p>
                      <p className="text-xs text-gray-600">Police Stations: {d.Police_Stations}</p>
                      <button className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded w-full">Drill Down</button>
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
