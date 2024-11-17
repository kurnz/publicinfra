import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  potholes: any[] // Replace 'any' with your actual pothole type
  selectedPothole: any
  setSelectedPothole: (pothole: any) => void
}

export default function Map({ potholes, selectedPothole, setSelectedPothole }: MapProps) {
  if (typeof window === 'undefined') return null;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#ef4444'
      case 'Medium': return '#f97316'
      default: return '#22c55e'
    }
  }

  return (
    <MapContainer
      center={[40.7128, -74.0060]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {potholes.map((pothole) => (
        <CircleMarker
          key={pothole.id}
          center={[pothole.location.lat, pothole.location.lng]}
          radius={10}
          fillColor={getSeverityColor(pothole.severity)}
          color={getSeverityColor(pothole.severity)}
          weight={2}
          opacity={0.8}
          fillOpacity={0.6}
          eventHandlers={{
            click: () => setSelectedPothole(pothole)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{pothole.roadName}</h3>
              <p className="text-sm">Severity: {pothole.severity}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
} 