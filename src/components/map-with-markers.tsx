'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Badge } from './ui/badge'
import { Pothole } from '@/types/pothole'

// Create custom markers for each severity
const createCustomIcon = (severity: 'High' | 'Medium' | 'Low') => {
  const colors = {
    High: '#ef4444',    
    Medium: '#18181b',  
    Low: '#e4e4e7'      
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${colors[severity]};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

interface MapProps {
  potholes: Pothole[];
  onPotholeSelect: (id: number) => void;
}

function MapWithMarkers({ potholes, onPotholeSelect }: MapProps) {
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    // Clean up function to remove the map instance
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const handleMapInstance = (map: L.Map) => {
    mapInstanceRef.current = map
  }

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[51.7520, -1.2577]} 
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
        ref={handleMapInstance}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {potholes.map((pothole) => (
          <Marker
            key={pothole.id}
            position={[pothole.location.lat, pothole.location.lng]}
            icon={createCustomIcon(pothole.severity)}
            eventHandlers={{
              click: () => onPotholeSelect(pothole.id),
            }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-medium">{pothole.roadName}</div>
                <div className="text-sm text-gray-600">{pothole.postcode}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Badge 
                    variant="secondary"
                    className={`
                      ${pothole.severity === 'High' && 'bg-red-500 text-white hover:bg-red-500'}
                      ${pothole.severity === 'Medium' && 'bg-zinc-900 text-white hover:bg-zinc-900'}
                      ${pothole.severity === 'Low' && 'bg-zinc-200 text-zinc-900 hover:bg-zinc-200'}
                    `}
                  >
                    {pothole.severity}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Reported: {pothole.reportDate}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapWithMarkers 