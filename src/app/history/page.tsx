
"use client"; // Converted to client component

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import type { Donation } from "@/lib/types";
import { useDonations } from "@/contexts/donation-context"; // Added
import Link from "next/link";

const getStatusBadgeVariant = (status: Donation['status']) => {
  switch (status) {
    case 'delivered': return 'default'; 
    case 'picked_up': return 'secondary'; 
    case 'approved': return 'outline'; 
    case 'pending': return 'destructive'; 
    case 'cancelled': return 'destructive'; 
    default: return 'secondary';
  }
};

const getStatusBadgeColors = (status: Donation['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700';
      case 'picked_up': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700';
      case 'approved': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500';
    }
  };


export default function HistoryPage() {
  const { donations } = useDonations(); // Use donations from context

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Donation History</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export History
          </Button>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Your Past Donations</CardTitle>
            <CardDescription>Review the details and status of all your previous donations.</CardDescription>
          </CardHeader>
          <CardContent>
            {donations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>ID</TableHead>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>NGO</TableHead> {/* Added NGO Name column */}
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted On</TableHead>
                      <TableHead className="text-right">Actions</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id} className="hover:bg-muted/50"><TableCell className="font-medium">{donation.id}</TableCell>
                        <TableCell>{donation.foodType}</TableCell>
                        <TableCell>{donation.quantity} {donation.quantityUnit}</TableCell>
                        <TableCell>{donation.ngoName || 'N/A'}</TableCell> {/* Display NGO Name */}
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(donation.status)} className={getStatusBadgeColors(donation.status)}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(donation.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" title="View Details (placeholder)">
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Button>
                        </TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">You haven&apos;t made any donations yet.</p>
                <Button asChild>
                   <Link href="/donate">Make Your First Donation</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
