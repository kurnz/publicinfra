'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Pothole } from '@/types/pothole'
import { Badge } from './ui/badge'

// Fix the leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'marker-icon.png',
  iconRetinaUrl: 'marker-icon-2x.png',
  shadowUrl: 'marker-shadow.png',
})

interface MapComponentProps {
  potholes: Pothole[];
  onPotholeSelect: (id: number) => void;
}

function MapComponent({ potholes, onPotholeSelect }: MapComponentProps) {
  return (
    <div className="h-full w-full">
      <MapContainer 
        key="unique-map"
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

export default MapComponent 