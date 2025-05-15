
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

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

const initialProfileData: UserProfileData = {
  name: "Donor User",
  email: "donor@example.com",
  avatarUrl: "/images/user-avatar.jpg", // Ensure this image exists in public/images
  phone: "",
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfileData>(initialProfileData);

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
