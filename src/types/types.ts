export interface Pothole {
  id?: number;
  // Add your pothole properties here
  // ... other properties
}

export interface RoadSection {
  id?: number;
  // Add your road section properties here
  // ... other properties
}

export interface BudgetAllocation {
  amount?: number;
  // Add your budget allocation properties here
  // ... other properties
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  // ... other response properties
}

export type Coordinates = {
  lat: number;
  lng: number;
};
  
