
import { AdminShell } from "@/components/layout/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, CheckCircle, XCircle, Truck, Hourglass, Eye } from "lucide-react";
import type { Donation } from "@/lib/types";
import Link from "next/link";

const mockAdminDonations: (Donation & { userName: string; ngoName?: string })[] = [
  { id: "DON101", userId: "userA", userName: "Alice Wonderland", foodType: "Party Leftovers", quantity: 12, quantityUnit: "kg", expiryDate: "2024-07-25", pickupLocation: "Wonderland Hall", status: "pending", submittedAt: "2024-07-24T10:00:00Z" },
  { id: "DON102", userId: "userB", userName: "Bob The Builder", foodType: "Canned Goods", quantity: 50, quantityUnit: "items", expiryDate: "2025-06-01", pickupLocation: "Construction Site Office", status: "approved", submittedAt: "2024-07-23T14:30:00Z", assignedNgoId: "ngo-citypantry", ngoName: "City Pantry" },
  { id: "DON103", userId: "userC", userName: "Charlie Chaplin", foodType: "Fresh Produce", quantity: 20, quantityUnit: "kg", expiryDate: "2024-07-28", pickupLocation: "Film Studio Cafe", status: "picked_up", submittedAt: "2024-07-22T09:15:00Z", assignedNgoId: "ngo-greenearth", ngoName: "Green Earth Initiative", assignedVolunteerId: "vol-jane" },
  { id: "DON104", userId: "userD", userName: "Diana Prince", foodType: "Frozen Meals", quantity: 30, quantityUnit: "items", expiryDate: "2024-12-01", pickupLocation: "Themyscira Embassy", status: "delivered", submittedAt: "2024-07-20T11:00:00Z", assignedNgoId: "ngo-hopekitchen", ngoName: "Hope Kitchen", assignedVolunteerId: "vol-steve" },
  { id: "DON105", userId: "userE", userName: "Edward Scissorhands", foodType: "Pastries", quantity: 5, quantityUnit: "kg", expiryDate: "2024-07-26", pickupLocation: "Suburban Residence", status: "cancelled", submittedAt: "2024-07-19T16:45:00Z" },
];

const StatusIcon = ({ status }: { status: Donation['status'] }) => {
  switch (status) {
    case 'pending': return <Hourglass className="h-4 w-4 text-orange-500" />;
    case 'approved': return <CheckCircle className="h-4 w-4 text-yellow-500" />;
    case 'picked_up': return <Truck className="h-4 w-4 text-blue-500" />;
    case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
    default: return null;
  }
};

export default function ManageDonationsPage() {
  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Donations</h1>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>All Donation Requests</CardTitle>
            <CardDescription>View, approve, and manage all food donation submissions.</CardDescription>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by ID, user, food type..." className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    <Filter className="mr-2 h-4 w-4" /> Filter by Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Statuses</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Approved</DropdownMenuItem>
                  <DropdownMenuItem>Picked Up</DropdownMenuItem>
                  <DropdownMenuItem>Delivered</DropdownMenuItem>
                  <DropdownMenuItem>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Food Type</TableHead><TableHead>Qty</TableHead><TableHead>Expires</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead><TableHead>Assigned NGO</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminDonations.map((donation) => (
                    <TableRow key={donation.id} className="hover:bg-muted/50"><TableCell className="font-medium">
                        <Link href={`/admin/donations/${donation.id}`} className="text-primary hover:underline">
                          {donation.id}
                        </Link>
                      </TableCell><TableCell>{donation.userName}</TableCell><TableCell>{donation.foodType}</TableCell><TableCell>{donation.quantity} {donation.quantityUnit}</TableCell><TableCell>{donation.expiryDate}</TableCell><TableCell>{new Date(donation.submittedAt).toLocaleDateString()}</TableCell><TableCell>
                        <Badge variant="outline" className="flex items-center gap-1.5 capitalize">
                          <StatusIcon status={donation.status} />
                          {donation.status.replace("_", " ")}
                        </Badge>
                      </TableCell><TableCell>{donation.ngoName || 'N/A'}</TableCell><TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                               <Link href={`/admin/donations/${donation.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            {donation.status === 'pending' && (
                                <DropdownMenuItem>
                                    {/* This would typically trigger an action */}
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Approve Donation
                                </DropdownMenuItem>
                            )}
                            {donation.status === 'approved' && (
                                <DropdownMenuItem>
                                    {/* This would typically trigger an action or open a modal */}
                                     Assign Volunteer
                                </DropdownMenuItem>
                            )}
                             <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                              <XCircle className="mr-2 h-4 w-4" /> Cancel Donation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
