
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Donation } from '@/lib/types';

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'userId' | 'status' | 'submittedAt' | 'id'> & { ngoName?: string }) => void;
}

const initialDonations: Donation[] = [
  // Keep some initial mock data or start empty
  { id: "DON_HIST_001", userId: "user1", foodType: "Cooked Rice & Curry", quantity: 5, quantityUnit: "kg", expiryDate: "2024-07-10", pickupLocation: "123 Main St, Anytown", status: "delivered", submittedAt: "2024-07-08T10:00:00Z", assignedNgoId: "ngo-foodlink", ngoName: "FoodLink" },
  { id: "DON_HIST_002", userId: "user1", foodType: "Canned Beans", quantity: 24, quantityUnit: "items", expiryDate: "2025-01-15", pickupLocation: "456 Oak Ave, Anytown", status: "picked_up", submittedAt: "2024-07-15T14:30:00Z", assignedNgoId: "ngo-community-kitchen", ngoName: "Community Kitchen" },
];

export const DonationContext = createContext<DonationContextType | undefined>(undefined);

let donationIdCounter = initialDonations.length + 1;

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);

  const addDonation = useCallback((newDonationData: Omit<Donation, 'userId' | 'status' | 'submittedAt' | 'id'> & { ngoName?: string }) => {
    const newDonation: Donation = {
      ...newDonationData,
      id: `DON_NEW_${donationIdCounter++}`,
      userId: "currentUser", // In a real app, get current user's ID
      status: "pending",
      submittedAt: new Date().toISOString(),
      ngoName: newDonationData.ngoName, // Ensure ngoName is passed through
    };
    setDonations((prevDonations) => [newDonation, ...prevDonations]);
  }, []);

  return (
    <DonationContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
}
