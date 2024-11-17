'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Activity, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [city, setCity] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city) {
      setError("Please select a city")
      return
    }
    try {
      router.push('/dashboard')
    } catch (error) {
      setError("Navigation failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20"></div>
      <div className="absolute h-32 w-32 bg-blue-500 rounded-full blur-3xl opacity-20 -top-8 -left-8"></div>
      <div className="absolute h-32 w-32 bg-purple-500 rounded-full blur-3xl opacity-20 -bottom-8 -right-8"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
            mAIntAIn
          </h1>
          <p className="text-xl text-gray-600 mb-8">Smart city management made simple</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <MapPin className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-semibold mb-1">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">Monitor infrastructure issues across your city</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Activity className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-semibold mb-1">Smart Analysis</h3>
              <p className="text-sm text-gray-600">AI-powered priority assessment</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <BarChart3 className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-semibold mb-1">Data Insights</h3>
              <p className="text-sm text-gray-600">Comprehensive reporting and analytics</p>
            </div>
          </div>

          <Card className="max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Your City</label>
                <Select onValueChange={setCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a city to begin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oxford">Oxford</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="manchester">Manchester</SelectItem>
                    <SelectItem value="birmingham">Birmingham</SelectItem>
                    <SelectItem value="edinburgh">Edinburgh</SelectItem>
                    <SelectItem value="bristol">Bristol</SelectItem>
                    <SelectItem value="cambridge">Cambridge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                type="submit"
              >
                Enter Dashboard
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}