
"use client";

import { useState, useEffect, type FormEvent } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Bell, Lock, Loader2 } from "lucide-react";
import { useProfile } from "@/contexts/profile-context";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || "");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone || "");
    // In a real app, you'd load these preferences from user settings
    // For now, we'll use default values or what's stored in local state.
  }, [profile]);

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProfile({ name, email, phone });
    setIsLoadingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleNotificationSave = async () => {
    setIsLoadingNotifications(true);
    // Simulate API call to save notification preferences
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you would save emailNotifications and smsNotifications states
    setIsLoadingNotifications(false);
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Settings</h1>

        <form onSubmit={handleProfileSave}>
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary" /> Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoadingProfile} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoadingProfile} />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoadingProfile} />
              </div>
              <Button type="submit" disabled={isLoadingProfile}>
                {isLoadingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </form>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-primary" /> Account Security</CardTitle>
            <CardDescription>Manage your password and account security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Button variant="outline" disabled>Change Password</Button> 
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" /> Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to be notified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates about your donations and rewards via email.</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={isLoadingNotifications}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="sms-notifications" className="font-semibold">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get important alerts via text message (if phone provided).</p>
              </div>
              <Switch 
                id="sms-notifications" 
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
                disabled={isLoadingNotifications || !profile.phone} // Disable if no phone
              />
            </div>
             <Button onClick={handleNotificationSave} disabled={isLoadingNotifications}>
                {isLoadingNotifications && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Notification Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
