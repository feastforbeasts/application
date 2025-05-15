
export type User = {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  avatarUrl?: string;
  role: 'donor' | 'admin' | 'volunteer';
  points?: number; // For reward system
};

export type Donation = {
  id: string;
  userId: string; // For a full app, this would link to the User
  foodType: string;
  quantity: number; // in kg or units
  quantityUnit: 'kg' | 'items';
  expiryDate: string; // YYYY-MM-DD
  pickupLocation: string;
  status: 'pending' | 'approved' | 'picked_up' | 'delivered' | 'cancelled';
  submittedAt: string; // ISO date string
  notes?: string;
  assignedNgoId?: string;
  ngoName?: string; // Added to store NGO name directly for history
  assignedVolunteerId?: string;
};

// This is based on RecommendNGOsOutput from the AI flow
export type NGO = {
  id: string; 
  name: string;
  suitabilityScore: number;
  urgencyScore: number;
  address: string;
  contactNumber: string;
  notes?: string;
  // Additional fields
  operatingHours?: string;
  acceptedFoodTypes?: string[];
};

export type Volunteer = {
  id: string;
  userId: string;
  availability: string; // e.g., "Weekends", "Mon-Fri evenings"
  assignedTasks: string[];
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
};

export type UserRewardRedemption = {
  id: string;
  userId: string;
  rewardId: string;
  redeemedAt: string; // ISO date string
  pointsSpent: number;
};

