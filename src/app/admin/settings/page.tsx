import { AdminShell } from "@/components/layout/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SlidersHorizontal, Users, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Admin Settings</h1>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5 text-primary" /> General Platform Settings</CardTitle>
            <CardDescription>Configure core settings for the FeastForBeasts platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="FeastForBeasts" />
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="new-registrations" className="font-semibold">Allow New User Registrations</Label>
                <p className="text-sm text-muted-foreground">Enable or disable new users from signing up.</p>
              </div>
              <Switch id="new-registrations" defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="ngo-verification" className="font-semibold">Automatic NGO Verification (Placeholder)</Label>
                <p className="text-sm text-muted-foreground">If enabled, new NGOs might be auto-verified based on criteria.</p>
              </div>
              <Switch id="ngo-verification" />
            </div>
             <Button>Save General Settings</Button>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary" /> User Role Management (Placeholder)</CardTitle>
            <CardDescription>Define roles and permissions for platform users.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Role management interface would go here. (e.g., assigning admin roles, defining volunteer permissions).</p>
             <Button variant="outline" className="mt-4">Manage Roles</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" /> System Notifications</CardTitle>
            <CardDescription>Configure system-wide notification settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="admin-email">Admin Notification Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@feastforbeasts.com" />
                <p className="text-sm text-muted-foreground mt-1">Critical system alerts will be sent to this email.</p>
            </div>
             <Button>Save Notification Settings</Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
