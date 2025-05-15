
"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_PROFILE_NAV_ITEMS } from '@/lib/constants';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/contexts/profile-context'; // Added

export function UserNav() {
  const router = useRouter();
  const { profile } = useProfile(); // Use profile from context

  const initials = profile.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "DU";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile.avatarUrl} alt={profile.name || "User"} data-ai-hint="user avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {USER_PROFILE_NAV_ITEMS.map((item) => {
            if (item.title === 'Log out') { // Ensure href is also checked if necessary
              return (
                <DropdownMenuItem
                  key={item.href}
                  onSelect={() => router.push(item.href)} 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
