
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Donation } from '@/lib/types';

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'userId' | 'status' | 'submittedAt' | 'id'> & { ngoName?: string }) => void;
}

const DONATIONS_STORAGE_KEY = 'feastForBeastsDonations';

export const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load donations from localStorage on initial client-side render
    try {
      const storedDonations = localStorage.getItem(DONATIONS_STORAGE_KEY);
      if (storedDonations) {
        setDonations(JSON.parse(storedDonations));
      } else {
        // Initialize with some default data if nothing in storage
        // You might want to remove this or make it conditional
        setDonations([
          { id: "DON_HIST_001", userId: "user1", foodType: "Cooked Rice & Curry", quantity: 5, quantityUnit: "kg", expiryDate: "2024-07-10", pickupLocation: "123 Main St, Anytown", status: "delivered", submittedAt: "2024-07-08T10:00:00Z", assignedNgoId: "ngo-foodlink", ngoName: "FoodLink" },
          { id: "DON_HIST_002", userId: "user1", foodType: "Canned Beans", quantity: 24, quantityUnit: "items", expiryDate: "2025-01-15", pickupLocation: "456 Oak Ave, Anytown", status: "picked_up", submittedAt: "2024-07-15T14:30:00Z", assignedNgoId: "ngo-community-kitchen", ngoName: "Community Kitchen" },
        ]);
      }
    } catch (error) {
      console.error("Failed to load donations from localStorage", error);
      // Initialize with default if error
       setDonations([
          { id: "DON_HIST_001", userId: "user1", foodType: "Cooked Rice & Curry", quantity: 5, quantityUnit: "kg", expiryDate: "2024-07-10", pickupLocation: "123 Main St, Anytown", status: "delivered", submittedAt: "2024-07-08T10:00:00Z", assignedNgoId: "ngo-foodlink", ngoName: "FoodLink" },
        ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save donations to localStorage whenever they change, but only after initial load
    if (isLoaded) {
      try {
        localStorage.setItem(DONATIONS_STORAGE_KEY, JSON.stringify(donations));
      } catch (error) {
        console.error("Failed to save donations to localStorage", error);
      }
    }
  }, [donations, isLoaded]);

  const addDonation = useCallback((newDonationData: Omit<Donation, 'userId' | 'status' | 'submittedAt' | 'id'> & { ngoName?: string }) => {
    const newDonation: Donation = {
      ...newDonationData,
      id: `don-${Date.now()}-${Math.random().toString(16).slice(2)}`, // More unique ID
      userId: "currentUser", 
      status: "pending",
      submittedAt: new Date().toISOString(),
      ngoName: newDonationData.ngoName, 
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
