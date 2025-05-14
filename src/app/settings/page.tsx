import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Settings</h1>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary" /> Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Donor User" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="donor@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-primary" /> Account Security</CardTitle>
            <CardDescription>Manage your password and account security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Button variant="outline">Change Password</Button>
            </div>
            {/* Placeholder for 2FA if needed */}
            {/* <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="two-factor" className="font-semibold">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Switch id="two-factor" />
            </div> */}
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
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="sms-notifications" className="font-semibold">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get important alerts via text message (if phone provided).</p>
              </div>
              <Switch id="sms-notifications" />
            </div>
             <Button>Save Notification Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
