import { AdminShell } from "@/components/layout/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, UserPlus, Mail, Phone } from "lucide-react";
import type { Volunteer } from "@/lib/types"; // Assuming Volunteer has associated user info

interface MockVolunteer extends Volunteer {
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending_verification";
  avatarUrl?: string;
  totalPickups: number;
  dataAiHint?: string; // Added for avatar AI hint
}

const mockVolunteers: MockVolunteer[] = [
  { id: "VOL001", userId: "userV1", name: "Jane Doe", email: "jane.doe@example.com", phone: "555-1234", availability: "Weekends, Mon Evenings", assignedTasks: ["DON103 Pickup"], status: "active", avatarUrl: "https://placehold.co/40x40.png", totalPickups: 15, dataAiHint:"woman portrait" },
  { id: "VOL002", userId: "userV2", name: "John Smith", email: "john.smith@example.com", phone: "555-5678", availability: "Weekdays 9am-5pm", assignedTasks: [], status: "active", totalPickups: 22, dataAiHint:"man portrait" },
  { id: "VOL003", userId: "userV3", name: "Emily White", email: "emily.white@example.com", phone: "555-8765", availability: "Flexible", assignedTasks: [], status: "inactive", totalPickups: 5, dataAiHint:"person smiling" },
  { id: "VOL004", userId: "userV4", name: "Michael Brown", email: "michael.brown@example.com", phone: "555-4321", availability: "Sat AM", assignedTasks: [], status: "pending_verification", totalPickups: 0, dataAiHint:"volunteer photo" },
];

export default function ManageVolunteersPage() {
  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Volunteers</h1>
            <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add New Volunteer
            </Button>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Volunteer Roster</CardTitle>
            <CardDescription>View, manage, and assign tasks to volunteers.</CardDescription>
             <div className="flex items-center gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by name, email, status..." className="pl-10" />
              </div>
              {/* Add filter for status if needed */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pickups</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={volunteer.avatarUrl || `https://placehold.co/40x40.png`} alt={volunteer.name} data-ai-hint={volunteer.dataAiHint || "person photo"} />
                            <AvatarFallback>{volunteer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{volunteer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3 w-3"/> {volunteer.email}</span>
                            <span className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3"/> {volunteer.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{volunteer.availability}</TableCell>
                      <TableCell>
                        <Badge variant={volunteer.status === "active" ? "default" : volunteer.status === "pending_verification" ? "outline" : "secondary"}
                               className={volunteer.status === "active" ? "bg-green-100 text-green-700" : volunteer.status === "pending_verification" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-700"}>
                          {volunteer.status.replace("_", " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">{volunteer.totalPickups}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        {/* Dropdown for actions: Edit, View Profile, Assign Task, Deactivate etc. */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination (Placeholder) */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
