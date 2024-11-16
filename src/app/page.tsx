'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Menu } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'

const mockPotholes = [
  {
    id: 1,
    roadName: 'Main Street',
    severity: 'High',
    location: { lat: 40.7128, lng: -74.0060 },
    condition: 35,
    reportDate: '2024-11-15',
    type: 'Pothole',
    estimatedRepairCost: 2500,
    trafficVolume: 'High', // vehicles per day: 15000
    criticalInfrastructure: [
      { type: 'Hospital', distance: '0.3km' },
      { type: 'School', distance: '0.5km' }
    ],
    priorityScore: 92, // out of 100
    recommendedAction: 'Immediate repair required',
    budgetAllocation: {
      laborCost: 1500,
      materialCost: 800,
      equipmentCost: 200
    }
  },
  {
    id: 2,
    roadName: 'Oak Avenue',
    severity: 'Medium',
    location: { lat: 40.7138, lng: -74.0070 },
    condition: 65,
    reportDate: '2024-11-16',
    type: 'Pothole',
    estimatedRepairCost: 1200,
    trafficVolume: 'Medium', // vehicles per day: 8000
    criticalInfrastructure: [
      { type: 'School', distance: '1.2km' }
    ],
    priorityScore: 75,
    recommendedAction: 'Schedule repair within 2 weeks',
    budgetAllocation: {
      laborCost: 700,
      materialCost: 400,
      equipmentCost: 100
    }
  },
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

export default function InfrastructureDashboard() {
  const [selectedPothole, setSelectedPothole] = useState(mockPotholes[0])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPotholes = mockPotholes.filter(pothole => 
    pothole.roadName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu */}
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
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {filteredPotholes.map((pothole) => (
                <Button
                  key={pothole.id}
                  variant={selectedPothole?.id === pothole.id ? "secondary" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedPothole(pothole)}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-grow text-left">
                      <div className="font-medium">{pothole.roadName}</div>
                      <div className="text-sm text-muted-foreground">Reported: {pothole.reportDate}</div>
                    </div>
                    <Badge 
                      variant={
                        pothole.severity === 'High' 
                          ? "destructive" 
                          : pothole.severity === 'Medium' 
                            ? "default" 
                            : "secondary"
                      }
                    >
                      {pothole.severity}
                    </Badge>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Left Sidebar */}
      <div className="hidden md:block w-1/4 p-4 border-r">
        <Card className="h-full">
          <CardHeader>
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
            <ScrollArea className="h-[calc(100vh-15rem)]">
              {filteredPotholes.map((pothole) => (
                <Button
                  key={pothole.id}
                  variant={selectedPothole?.id === pothole.id ? "secondary" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedPothole(pothole)}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-grow text-left">
                      <div className="font-medium">{pothole.roadName}</div>
                      <div className="text-sm text-muted-foreground">Reported: {pothole.reportDate}</div>
                    </div>
                    <Badge 
                      variant={
                        pothole.severity === 'High' 
                          ? "destructive" 
                          : pothole.severity === 'Medium' 
                            ? "default" 
                            : "secondary"
                      }
                    >
                      {pothole.severity}
                    </Badge>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 space-y-2">
        {/* Map */}
        <Card className="w-full h-[35vh]">
          <CardHeader className="py-2">
            <CardTitle>Asset Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-3rem)]">
            <div className="h-full w-full">
              <div>Map placeholder</div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="w-full h-[calc(65vh-6rem)]">
          <CardHeader className="py-2">
            <CardTitle className="flex justify-between items-center">
              <span>{selectedPothole.roadName}</span>
              <Badge 
                variant={
                  selectedPothole.severity === 'High' 
                    ? "destructive" 
                    : selectedPothole.severity === 'Medium' 
                      ? "default" 
                      : "secondary"
                }
              >
                {selectedPothole.severity} Priority
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details & Analysis</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-1">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Asset Information</h3>
                      <div className="space-y-1">
                        <div>
                          <p className="text-xs text-muted-foreground">Road Name</p>
                          <p className="font-medium">{selectedPothole.roadName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Report Date</p>
                          <p className="font-medium">{selectedPothole.reportDate}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Priority Analysis</h3>
                      <div className="space-y-1">
                        <div>
                          <p className="text-xs text-muted-foreground">Priority Level</p>
                          <Badge 
                            variant={
                              selectedPothole.severity === 'High' 
                                ? "destructive" 
                                : selectedPothole.severity === 'Medium' 
                                  ? "default" 
                                  : "secondary"
                            }
                          >
                            {selectedPothole.severity}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Traffic Volume</p>
                          <p className="font-medium">{selectedPothole.trafficVolume}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Nearby Critical Infrastructure</p>
                          <div className="font-medium">
                            {selectedPothole.criticalInfrastructure.map((infra, index) => (
                              <p key={index}>{infra.type} ({infra.distance})</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Cost Analysis</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Estimated Total Cost</p>
                        <p className="font-medium">${selectedPothole.estimatedRepairCost}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Recommended Action</p>
                        <p className="font-medium">{selectedPothole.recommendedAction}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Budget Breakdown</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-1.5 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground">Labor</p>
                          <p className="text-sm font-medium">${selectedPothole.budgetAllocation.laborCost}</p>
                        </div>
                        <div className="p-1.5 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground">Materials</p>
                          <p className="text-sm font-medium">${selectedPothole.budgetAllocation.materialCost}</p>
                        </div>
                        <div className="p-1.5 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground">Equipment</p>
                          <p className="text-sm font-medium">${selectedPothole.budgetAllocation.equipmentCost}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full">
                          <FileText className="mr-2 h-3 w-3" /> Generate RFP
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Request for Proposal (RFP)</DialogTitle>
                          <DialogDescription>
                            RFP for Road Repair at {selectedPothole.roadName}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 mt-4">
                          {generateRFPSections(selectedPothole).map((section, index) => (
                            <div key={index} className="space-y-2">
                              <h3 className="font-semibold text-sm">{section.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                {section.content}
                              </div>
                              {index < generateRFPSections(selectedPothole).length - 1 && (
                                <Separator className="my-2" />
                              )}
                            </div>
                          ))}
                          
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Download PDF
                            </Button>
                            <Button size="sm">
                              Send to Procurement
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="images">
                <Card>
                  <CardContent className="p-2">
                    <Image 
                      src="/placeholder.svg" 
                      alt="Pothole image" 
                      width={300}
                      height={300}
                      className="w-full h-auto rounded"
                    />
                    <p className="text-sm text-center mt-2">Street View</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
