
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfileData {
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
}

interface ProfileContextType {
  profile: UserProfileData;
  updateProfile: (newProfileData: Partial<UserProfileData>) => void;
}

const PROFILE_STORAGE_KEY = 'feastForBeastsUserProfile';

const defaultInitialProfileData: UserProfileData = {
  name: "Donor User",
  email: "donor@example.com",
  avatarUrl: "/images/user-avatar.jpg", 
  phone: "",
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfileData>(defaultInitialProfileData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load profile from localStorage on initial client-side render
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        setProfile(defaultInitialProfileData); // Use default if nothing in storage
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
      setProfile(defaultInitialProfileData); // Use default if error
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save profile to localStorage whenever it changes, but only after initial load
    if (isLoaded) {
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      } catch (error) {
        console.error("Failed to save profile to localStorage", error);
      }
    }
  }, [profile, isLoaded]);

  const updateProfile = (newProfileData: Partial<UserProfileData>) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...newProfileData }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
