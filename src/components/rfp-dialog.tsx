'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Mail, Loader2 } from 'lucide-react'
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Severity = 'High' | 'Medium' | 'Low';

interface Pothole {
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

interface RFPDialogProps {
  pothole: Pothole
  onStatusUpdate: () => void
}

export function RFPDialog({ pothole, onStatusUpdate }: RFPDialogProps) {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [allocatedBudget, setAllocatedBudget] = useState(pothole.estimatedRepairCost.toString())
  const [comments, setComments] = useState("")

  // AI-generated summary based on pothole data
  const generateSummary = (pothole: Pothole) => {
    return `Urgent infrastructure repair required at ${pothole.roadName}. This ${pothole.severity.toLowerCase()}-priority repair addresses road damage in a ${pothole.trafficVolume.toLowerCase()}-traffic area, with proximity to critical facilities (${pothole.criticalInfrastructure.map(i => i.type).join(', ')}). Immediate action recommended to ensure public safety and prevent further deterioration.`
  }

  const handleEmailSend = async () => {
    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    setIsEmailDialogOpen(false)
    toast.success("RFP Sent Successfully", {
      description: `The RFP has been sent to ${emailAddress}`
    })
    onStatusUpdate()
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full h-8 bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate RFP
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request for Proposal</DialogTitle>
            <DialogDescription>
              RFP for road repair at {pothole.roadName}
            </DialogDescription>
          </DialogHeader>

          {/* Summary Section */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {generateSummary(pothole)}
              </p>
            </CardContent>
          </Card>

          {/* Details Section */}
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Location Details</h4>
                <p className="text-sm">{pothole.roadName}</p>
                <p className="text-sm text-muted-foreground">{pothole.postcode}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Priority Level</h4>
                <p className="text-sm">{pothole.severity}</p>
                <p className="text-sm text-muted-foreground">Traffic: {pothole.trafficVolume}</p>
              </div>
            </div>

            <Separator />

            {/* Cost Section */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Estimated Cost</h4>
                <p className="text-sm font-medium">${pothole.estimatedRepairCost}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Budget Allocation</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    value={allocatedBudget}
                    onChange={(e) => setAllocatedBudget(e.target.value)}
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Additional Comments</h4>
                <textarea
                  className="w-full min-h-[100px] p-2 text-sm rounded-md border"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter any additional requirements or comments..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-6">
              <Button className="flex-1" onClick={() => setIsEmailDialogOpen(true)}>
                <Mail className="mr-2 h-4 w-4" />
                Email Stakeholder
              </Button>
              <Button className="flex-1" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send RFP</DialogTitle>
            <DialogDescription>
              Enter stakeholder email address to send the RFP
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="stakeholder@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEmailSend} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send RFP'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 