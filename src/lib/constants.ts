import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Gift, History, Award, Settings, Users, Shield, PackagePlus, LogOut, UserCircle } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[]; // For sub-menus
}

export const APP_NAME = "FeastForBeasts";

export const USER_NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Make a Donation', href: '/donate', icon: Gift },
  { title: 'Donation History', href: '/history', icon: History },
  { title: 'My Rewards', href: '/rewards', icon: Award },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: 'Admin Dashboard', href: '/admin/dashboard', icon: Shield },
  { title: 'Manage Donations', href: '/admin/donations', icon: PackagePlus },
  { title: 'Manage Volunteers', href: '/admin/volunteers', icon: Users },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
];

export const USER_PROFILE_NAV_ITEMS: NavItem[] = [
    { title: 'Profile', href: '/profile', icon: UserCircle },
    { title: 'Settings', href: '/settings', icon: Settings },
    { title: 'Log out', href: '/api/auth/logout', icon: LogOut }, // Placeholder for actual logout
]

export const DONATION_TYPES = [
  { value: "cooked_food", label: "Cooked Food" },
  { value: "canned_goods", label: "Canned Goods" },
  { value: "bakery_products", label: "Bakery Products" },
  { value: "fruits_vegetables", label: "Fruits & Vegetables" },
  { value: "dairy_products", label: "Dairy Products" },
  { value: "dry_grains", label: "Dry Grains & Pulses" },
  { value: "other", label: "Other" },
];

export const QUANTITY_UNITS = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "items", label: "Items (units)" },
];
