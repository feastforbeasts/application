
"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { User, Mail, Edit3, Shield, Gift, Star, Trophy, Phone } from "lucide-react"; // Added Phone
import Link from "next/link";
import { useProfile } from "@/contexts/profile-context"; // Added

// Mock data for non-editable fields
const staticProfileInfo = {
  role: "Donor",
  joinDate: "2023-01-15",
  totalDonations: 27,
  totalPoints: 750,
  recentAchievements: [
    { id: "ach001", name: "First Donation Hero", date: "2023-01-20", icon: Gift },
    { id: "ach002", name: "Eco Warrior Badge", date: "2023-05-10", icon: Shield },
    { id: "ach003", name: "Community Star", date: "2024-02-01", icon: Star },
  ],
};

export default function ProfilePage() {
  const { profile } = useProfile(); // Use profile from context
  const initials = profile.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "DU";

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/20 via-background to-accent/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="user avatar" />
                <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">{profile.name}</h1>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail className="h-4 w-4" /> {profile.email}
                </p>
                {profile.phone && (
                   <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Phone className="h-4 w-4" /> {profile.phone}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-1">Joined on: {new Date(staticProfileInfo.joinDate).toLocaleDateString()}</p>
                <Badge variant="outline" className="mt-2 bg-accent/20 border-accent text-accent-foreground font-semibold">{staticProfileInfo.role}</Badge>
              </div>
              <Button asChild variant="outline" className="md:ml-auto mt-4 md:mt-0">
                <Link href="/settings">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
            </div>
          </div>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Your Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard title="Total Donations Made" value={staticProfileInfo.totalDonations.toString()} icon={Gift} className="bg-secondary/50" />
              <StatCard title="Reward Points Earned" value={staticProfileInfo.totalPoints.toString()} icon={Star} iconColor="text-accent" className="bg-secondary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-primary"><Trophy className="mr-2 h-6 w-6" /> Recent Achievements</CardTitle>
            <CardDescription>Milestones and badges you've earned through your contributions.</CardDescription>
          </CardHeader>
          <CardContent>
            {staticProfileInfo.recentAchievements.length > 0 ? (
              <ul className="space-y-4">
                {staticProfileInfo.recentAchievements.map((achievement) => (
                  <li key={achievement.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                    <achievement.icon className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">Achieved on: {new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No achievements yet. Keep donating to earn badges!</p>
            )}
             <div className="mt-6 text-center">
                <Button variant="link" asChild>
                    <Link href="/rewards" className="text-primary">View All Rewards &rarr;</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
