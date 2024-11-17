'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Pothole } from '@/types/pothole'
import { Badge } from './ui/badge'

// Create a simple icon function
const getIcon = (severity: 'High' | 'Medium' | 'Low') => {
  const iconUrl = severity === 'High' 
    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
    : severity === 'Medium'
    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png'
    : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'

  return L.icon({
    iconUrl,
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

interface SimpleMapProps {
  potholes: Pothole[];
  onPotholeSelect: (id: number) => void;
}

export function SimpleMap({ potholes, onPotholeSelect }: SimpleMapProps) {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[51.7520, -1.2577] as LatLngExpression} 
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {potholes.map((pothole) => (
          <Marker 
            key={pothole.id} 
            position={[pothole.location.lat, pothole.location.lng] as LatLngExpression}
            icon={getIcon(pothole.severity)}
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
