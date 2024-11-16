import type { Pothole, RoadSection, BudgetAllocation, ApiResponse, Coordinates } from '@/types/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export class PotholeAPI {
  private static async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Pothole endpoints
  static async getPotholes(bounds: { ne: Coordinates; sw: Coordinates }): Promise<ApiResponse<Pothole[]>> {
    return this.fetch('/potholes', {
      method: 'POST',
      body: JSON.stringify({ bounds })
    })
  }

  static async getPotholeDetails(id: string): Promise<ApiResponse<Pothole>> {
    return this.fetch(`/potholes/${id}`)
  }

  // Road section endpoints
  static async getRoadSections(bounds: { ne: Coordinates; sw: Coordinates }): Promise<ApiResponse<RoadSection[]>> {
    return this.fetch('/roads', {
      method: 'POST',
      body: JSON.stringify({ bounds })
    })
  }

  // Budget allocation
  static async getBudgetRecommendations(
    availableBudget: number,
    constraints?: {
      prioritizeTraffic?: boolean
      maximumProjects?: number
      targetConditionScore?: number
    }
  ): Promise<ApiResponse<BudgetAllocation[]>> {
    return this.fetch('/budget/allocate', {
      method: 'POST',
      body: JSON.stringify({
        availableBudget,
        constraints
      })
    })
  }

  // Analytics
  static async getAnalytics(): Promise<ApiResponse<{
    totalPotholes: number
    criticalCount: number
    averageRepairCost: number
    worstAffectedAreas: Array<{
      location: Coordinates
      severity: number
      potholeCount: number
    }>
  }>> {
    return this.fetch('/analytics')
  }
}
