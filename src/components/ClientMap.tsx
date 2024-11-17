'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => <p>Loading map...</p>
  }
)

interface ClientMapProps {
  potholes: any[]
  selectedPothole: any
  setSelectedPothole: (pothole: any) => void
}

export default function ClientMap({ potholes, selectedPothole, setSelectedPothole }: ClientMapProps) {
  return <Map potholes={potholes} selectedPothole={selectedPothole} setSelectedPothole={setSelectedPothole} />
} 