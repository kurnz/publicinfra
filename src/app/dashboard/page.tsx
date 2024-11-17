'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Menu, Camera } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { RFPDialog } from "@/components/rfp-dialog"
import { SimpleMap } from "@/components/simple-map"

type Severity = 'High' | 'Medium' | 'Low';

type Pothole = {
  id: number;
  roadName: string;
  postcode: string;
  severity: Severity;
  location: { lat: number; lng: number; };
  condition: number;
  reportDate: string;
  type: string;
  estimatedRepairCost: number;
  trafficVolume: string;
  criticalInfrastructure: Array<{ type: string; distance: string; }>;
  priorityScore: number;
  recommendedAction: string;
  budgetAllocation: {
    laborCost: number;
    materialCost: number;
    equipmentCost: number;
  };
  images: Array<{
    url: string;
    caption: string;
    date: string;
  }>;
}

const mockPotholes: Pothole[] = [
  {
    id: 1,
    roadName: 'High Street',
    postcode: 'OX1 4AH',
    severity: 'High',
    location: { lat: 51.7520, lng: -1.2577 },
    condition: 35,
    reportDate: '2024-03-15',
    type: 'Pothole',
    estimatedRepairCost: 2500,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'University', distance: '0.1km' },
      { type: 'Tourist Area', distance: '0.2km' }
    ],
    priorityScore: 92,
    recommendedAction: "Immediate repair required due to high pedestrian traffic and tourist area.",
    budgetAllocation: {
      laborCost: 1000,
      materialCost: 1000,
      equipmentCost: 500
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-15'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-15'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-15'
      }
    ],
  },
  {
    id: 2,
    roadName: 'St Aldate\'s',
    postcode: 'OX1 1BX',
    severity: 'High',
    location: { lat: 51.7505, lng: -1.2571 },
    condition: 40,
    reportDate: '2024-03-16',
    type: 'Pothole',
    estimatedRepairCost: 1200,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'School', distance: '1.2km' }
    ],
    priorityScore: 75,
    recommendedAction: "Schedule repair within next 2 weeks.",
    budgetAllocation: {
      laborCost: 500,
      materialCost: 400,
      equipmentCost: 300
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-16'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-16'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-16'
      }
    ],
  },
  {
    id: 3,
    roadName: 'Broad Street',
    postcode: 'OX1 3AS',
    severity: 'Medium',
    location: { lat: 51.7540, lng: -1.2550 },
    condition: 55,
    reportDate: '2024-03-17',
    type: 'Pothole',
    estimatedRepairCost: 3000,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'Fire Station', distance: '0.2km' },
      { type: 'Police Station', distance: '0.4km' }
    ],
    priorityScore: 95,
    recommendedAction: "Immediate repair required due to high traffic volume and proximity to critical infrastructure.",
    budgetAllocation: {
      laborCost: 1500,
      materialCost: 1500,
      equipmentCost: 1000
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-17'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-17'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-17'
      }
    ],
  },
  {
    id: 4,
    roadName: 'Cowley Road',
    postcode: 'OX4 1JE',
    severity: 'High',
    location: { lat: 51.7478, lng: -1.2367 },
    condition: 30,
    reportDate: '2024-03-18',
    type: 'Pothole',
    estimatedRepairCost: 800,
    trafficVolume: 'Low',
    criticalInfrastructure: [
      { type: 'Library', distance: '0.8km' }
    ],
    priorityScore: 45,
    recommendedAction: "Schedule repair within next 4 weeks.",
    budgetAllocation: {
      laborCost: 300,
      materialCost: 200,
      equipmentCost: 100
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-18'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-18'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-18'
      }
    ],
  },
  {
    id: 5,
    roadName: 'Banbury Road',
    postcode: 'OX2 6NN',
    severity: 'Medium',
    location: { lat: 51.7650, lng: -1.2600 },
    condition: 60,
    reportDate: '2024-03-19',
    type: 'Pothole',
    estimatedRepairCost: 2800,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'Hospital', distance: '0.1km' },
      { type: 'School', distance: '0.3km' },
      { type: 'Metro Station', distance: '0.2km' }
    ],
    priorityScore: 98,
    recommendedAction: "Immediate repair required due to high traffic volume and proximity to critical infrastructure.",
    budgetAllocation: {
      laborCost: 1200,
      materialCost: 1200,
      equipmentCost: 800
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-19'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-19'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-19'
      }
    ],
  },
  {
    id: 6,
    roadName: 'Iffley Road',
    postcode: 'OX4 1EA',
    severity: 'Low',
    location: { lat: 51.7460, lng: -1.2420 },
    condition: 70,
    reportDate: '2024-03-20',
    type: 'Pothole',
    estimatedRepairCost: 800,
    trafficVolume: 'Low',
    criticalInfrastructure: [
      { type: 'Library', distance: '0.8km' }
    ],
    priorityScore: 45,
    recommendedAction: "Schedule repair within next 4 weeks.",
    budgetAllocation: {
      laborCost: 300,
      materialCost: 200,
      equipmentCost: 100
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-20'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-20'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-20'
      }
    ],
  },
  {
    id: 7,
    roadName: 'St Clement\'s Street',
    postcode: 'OX4 1AB',
    severity: 'High',
    location: { lat: 51.7510, lng: -1.2450 },
    condition: 25,
    reportDate: '2024-03-21',
    type: 'Pothole',
    estimatedRepairCost: 3000,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'Fire Station', distance: '0.2km' },
      { type: 'Police Station', distance: '0.4km' }
    ],
    priorityScore: 95,
    recommendedAction: "Immediate repair required due to high traffic volume and proximity to critical infrastructure.",
    budgetAllocation: {
      laborCost: 1500,
      materialCost: 1500,
      equipmentCost: 1000
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-21'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-21'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-21'
      }
    ],
  },
  {
    id: 8,
    roadName: 'Woodstock Road',
    postcode: 'OX2 6HT',
    severity: 'Medium',
    location: { lat: 51.7600, lng: -1.2640 },
    condition: 50,
    reportDate: '2024-03-22',
    type: 'Pothole',
    estimatedRepairCost: 1200,
    trafficVolume: 'Medium',
    criticalInfrastructure: [
      { type: 'School', distance: '1.2km' }
    ],
    priorityScore: 75,
    recommendedAction: "Schedule repair within next 2 weeks.",
    budgetAllocation: {
      laborCost: 500,
      materialCost: 400,
      equipmentCost: 300
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-22'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-22'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-22'
      }
    ],
  },
  {
    id: 9,
    roadName: 'Parks Road',
    postcode: 'OX1 3PJ',
    severity: 'Low',
    location: { lat: 51.7580, lng: -1.2550 },
    condition: 75,
    reportDate: '2024-03-23',
    type: 'Pothole',
    estimatedRepairCost: 800,
    trafficVolume: 'Low',
    criticalInfrastructure: [
      { type: 'Library', distance: '0.8km' }
    ],
    priorityScore: 45,
    recommendedAction: "Schedule repair within next 4 weeks.",
    budgetAllocation: {
      laborCost: 300,
      materialCost: 200,
      equipmentCost: 100
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-23'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-23'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-23'
      }
    ],
  },
  {
    id: 10,
    roadName: 'Botley Road',
    postcode: 'OX2 0HP',
    severity: 'High',
    location: { lat: 51.7500, lng: -1.2700 },
    condition: 35,
    reportDate: '2024-03-24',
    type: 'Pothole',
    estimatedRepairCost: 2800,
    trafficVolume: 'High',
    criticalInfrastructure: [
      { type: 'Hospital', distance: '0.1km' },
      { type: 'School', distance: '0.3km' },
      { type: 'Metro Station', distance: '0.2km' }
    ],
    priorityScore: 98,
    recommendedAction: "Immediate repair required due to high traffic volume and proximity to critical infrastructure.",
    budgetAllocation: {
      laborCost: 1200,
      materialCost: 1200,
      equipmentCost: 800
    },
    images: [
      {
        url: '/placeholder.svg',
        caption: 'Initial damage assessment',
        date: '2024-03-24'
      },
      {
        url: '/placeholder.svg',
        caption: 'Close-up of surface damage',
        date: '2024-03-24'
      },
      {
        url: '/placeholder.svg',
        caption: 'Wide angle view',
        date: '2024-03-24'
      }
    ],
  }
]

type RFPSection = {
  title: string;
  content: string | React.ReactNode;
}

const generateRFPSections = (pothole: typeof mockPotholes[0]): RFPSection[] => {
  return [
    {
      title: "Project Overview",
      content: `Repair work required for severe road damage at ${pothole.roadName}. Priority Level: ${pothole.severity}.`
    },
    {
      title: "Scope of Work",
      content: (
        <div className="space-y-2">
          <p>Required repairs include:</p>
          <ul className="list-disc pl-4">
            <li>Location: {pothole.roadName}</li>
            <li>Damage Type: {pothole.type}</li>
            <li>Current Condition Score: {pothole.condition}/100</li>
            <li>Traffic Consideration: {pothole.trafficVolume} volume area</li>
          </ul>
        </div>
      )
    },
    {
      title: "Timeline Requirements",
      content: pothole.recommendedAction
    },
    {
      title: "Budget Considerations",
      content: (
        <div className="space-y-2">
          <p>Estimated Project Costs:</p>
          <ul className="list-disc pl-4">
            <li>Total Estimated Cost: ${pothole.estimatedRepairCost}</li>
            <li>Labor: ${pothole.budgetAllocation.laborCost}</li>
            <li>Materials: ${pothole.budgetAllocation.materialCost}</li>
            <li>Equipment: ${pothole.budgetAllocation.equipmentCost}</li>
          </ul>
        </div>
      )
    },
    {
      title: "Critical Infrastructure Considerations",
      content: (
        <div className="space-y-2">
          <p>Nearby Critical Infrastructure:</p>
          <ul className="list-disc pl-4">
            {pothole.criticalInfrastructure.map((infra, index) => (
              <li key={index}>{infra.type} - {infra.distance}</li>
            ))}
          </ul>
        </div>
      )
    },
  ]
}

const severityOrder: Record<Severity, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };

const sortedPotholes = [...mockPotholes].sort((a, b) => {
  return severityOrder[b.severity as Severity] - severityOrder[a.severity as Severity];
});

// Update the SeverityBadge component definition
const SeverityBadge = ({ severity, className }: { severity: Severity; className?: string }) => {
  const styles = {
    High: "bg-red-500 text-white hover:bg-red-500",
    Medium: "bg-zinc-800 text-white hover:bg-zinc-800",
    Low: "bg-zinc-200 text-zinc-800 hover:bg-zinc-200"
  };

  return (
    <Badge
      variant="secondary"
      className={`${styles[severity]} ${className || ''}`}
    >
      {severity}
    </Badge>
  );
};

export default function InfrastructureDashboard() {
  const [selectedPothole, setSelectedPothole] = useState(mockPotholes[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(mockPotholes.map(p => [p.id, "To Do"]))
  )

  const filteredPotholes = sortedPotholes.filter(pothole => 
    pothole.roadName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusUpdate = (potholeId: number) => {
    setStatuses(prev => ({
      ...prev,
      [potholeId]: "Stakeholder Contacted"
    }))
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-4 left-4 md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="py-4">
            <CardTitle className="mb-2">Infrastructure Assets</CardTitle>
            <CardDescription className="mb-4">Manage and monitor your assets</CardDescription>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search roads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {filteredPotholes.map((pothole) => (
                <Button
                  key={pothole.id}
                  variant="ghost"
                  className={`w-full justify-start mb-2 p-4 h-auto transition-colors ${
                    selectedPothole?.id === pothole.id 
                      ? 'bg-accent hover:bg-accent' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedPothole(pothole)}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-grow text-left">
                      <div className="font-medium">{pothole.roadName}</div>
                      <div className="text-xs text-muted-foreground">{pothole.postcode}</div>
                      <div className="text-xs text-muted-foreground">Reported: {pothole.reportDate}</div>
                    </div>
                    <SeverityBadge severity={pothole.severity} />
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Left Sidebar */}
      <div className="hidden md:block w-1/4 p-4 h-screen">
        <Card className="h-full">
          <CardHeader className="py-2">
            <CardTitle>Infrastructure Assets</CardTitle>
            <CardDescription>Manage and monitor your assets</CardDescription>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Search roads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-11rem)]">
              {filteredPotholes.map((pothole) => (
                <Button
                  key={pothole.id}
                  variant="ghost"
                  className={`w-full justify-start mb-2 p-4 h-auto transition-colors ${
                    selectedPothole?.id === pothole.id 
                      ? 'bg-accent hover:bg-accent' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedPothole(pothole)}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-grow text-left">
                      <div className="font-medium">{pothole.roadName}</div>
                      <div className="text-xs text-muted-foreground">{pothole.postcode}</div>
                      <div className="text-xs text-muted-foreground">Reported: {pothole.reportDate}</div>
                    </div>
                    <SeverityBadge severity={pothole.severity} />
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 h-screen overflow-hidden">
        {/* Map Card */}
        <Card className="w-full h-[calc(50vh-1rem)]">
          <CardHeader className="py-2">
            <CardTitle>Asset Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-3rem)]">
            <SimpleMap 
              potholes={mockPotholes}
              onPotholeSelect={(id) => {
                const pothole = mockPotholes.find(p => p.id === id)
                if (pothole) setSelectedPothole(pothole)
              }}
            />
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="w-full h-[calc(50vh-1rem)] mt-2 flex flex-col">
          <CardHeader className="py-2 px-4 flex-none">
            <CardTitle className="flex justify-between items-center text-lg">
              <span>{selectedPothole.roadName}</span>
              <SeverityBadge severity={selectedPothole.severity} />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-3">
            <Tabs defaultValue="details" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 flex-none mb-3">
                <TabsTrigger value="details">Details & Analysis</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="h-[calc(100%-2.5rem)]">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-2 gap-2" style={{ height: 'calc(100% - 40px)' }}>
                    <Card className="h-full">
                      <CardContent className="p-3 h-full flex flex-col">
                        <h3 className="font-medium text-sm mb-2">Asset Information</h3>
                        <div className="space-y-1.5">
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="text-sm truncate">{selectedPothole.roadName}</p>
                            <p className="text-xs text-muted-foreground">{selectedPothole.postcode}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Report Date</p>
                            <p className="text-sm">{selectedPothole.reportDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <Badge variant="secondary" className="text-xs mt-0.5">
                              {statuses[selectedPothole.id]}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="h-full">
                      <CardContent className="p-3 h-full flex flex-col">
                        <h3 className="font-medium text-sm mb-2">Priority Analysis</h3>
                        <div className="space-y-1.5">
                          <div>
                            <p className="text-xs text-muted-foreground">Priority Level</p>
                            <SeverityBadge severity={selectedPothole.severity} className="mt-0.5" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Traffic Volume</p>
                            <p className="text-sm">{selectedPothole.trafficVolume}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Critical Infrastructure</p>
                            {selectedPothole.criticalInfrastructure.slice(0, 2).map((infra, index) => (
                              <p key={index} className="text-sm leading-tight truncate">
                                {infra.type} ({infra.distance})
                              </p>
                            ))}
                          </div>
                          <div className="min-h-0">
                            <p className="text-xs text-muted-foreground">Estimated Cost</p>
                            <p className="text-sm font-semibold truncate">${selectedPothole.estimatedRepairCost}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <RFPDialog 
                    pothole={selectedPothole} 
                    onStatusUpdate={() => handleStatusUpdate(selectedPothole.id)} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="h-[calc(100%-2.5rem)]">
                <div className="flex flex-col h-full">
                  {/* Single image container */}
                  <div className="h-full"> {/* Takes full height */}
                    <Card className="overflow-hidden h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Larger image container */}
                        <div className="relative w-full h-[75%]"> {/* Increased height ratio */}
                          <Image
                            src={selectedPothole.images[0].url} 
                            alt={selectedPothole.images[0].caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Image details */}
                        <div className="p-3 flex-1">
                          <p className="text-sm font-medium truncate">{selectedPothole.images[0].caption}</p>
                          <p className="text-xs text-muted-foreground">{selectedPothole.images[0].date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

