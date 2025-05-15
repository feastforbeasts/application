
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Package, CalendarDays, MapPin, Building, Info, Clock, CheckCircle, XCircle, Hourglass, Truck, Utensils } from "lucide-react";
import type { Donation } from "@/lib/types";
import { useDonations } from "@/contexts/donation-context";

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

const StatusIcon = ({ status }: { status: Donation['status'] }) => {
  switch (status) {
    case 'pending': return <Hourglass className="mr-1.5 h-3.5 w-3.5" />;
    case 'approved': return <CheckCircle className="mr-1.5 h-3.5 w-3.5" />;
    case 'picked_up': return <Truck className="mr-1.5 h-3.5 w-3.5" />;
    case 'delivered': return <CheckCircle className="mr-1.5 h-3.5 w-3.5" />;
    case 'cancelled': return <XCircle className="mr-1.5 h-3.5 w-3.5" />;
    default: return null;
  }
};


export default function DonationDetailPageUser() {
  const params = useParams();
  const router = useRouter();
  const { donations } = useDonations();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const donationId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (donationId && donations.length > 0) {
      const foundDonation = donations.find(d => d.id === donationId);
      setDonation(foundDonation || null);
    }
    // Set loading to false even if donationId is not found or donations are empty
    // to prevent infinite loading state.
    setIsLoading(false); 
  }, [donationId, donations]);

  if (isLoading) {
    return <AppShell><div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AppShell>;
  }

  if (!donation) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <Alert variant="destructive" className="max-w-md text-center">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Donation Not Found</AlertTitle>
            <AlertDescription>
                The donation you are looking for does not exist or could not be loaded.
            </AlertDescription>
            </Alert>
            <Button onClick={() => router.push('/history')} variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Donation History
            </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6 py-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Donation Details</h1>
            <Button variant="outline" size="sm" onClick={() => router.push('/history')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
            </Button>
        </div>

        <Card className="shadow-xl border-primary/20">
          <CardHeader className="flex flex-row items-start justify-between pb-3 bg-primary/5 rounded-t-lg">
            <div>
                <CardTitle className="text-2xl text-primary">Donation ID: {donation.id}</CardTitle>
                <CardDescription>Submitted on: {new Date(donation.submittedAt).toLocaleString()}</CardDescription>
            </div>
            <Badge className={`capitalize px-3 py-1.5 text-sm font-medium flex items-center ${getStatusBadgeColors(donation.status)}`}>
              <StatusIcon status={donation.status}/>
              {donation.status.replace("_", " ")}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <strong className="text-muted-foreground flex items-center mb-1"><Utensils className="mr-2 h-4 w-4 text-primary" />Food Type:</strong>
                <p className="pl-6">{donation.foodType}</p>
              </div>
              <div>
                <strong className="text-muted-foreground flex items-center mb-1"><Package className="mr-2 h-4 w-4 text-primary" />Quantity:</strong>
                <p className="pl-6">{donation.quantity} {donation.quantityUnit}</p>
              </div>
              <div>
                <strong className="text-muted-foreground flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-primary" />Expiry Date:</strong>
                <p className="pl-6">{new Date(donation.expiryDate).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-2">
                <strong className="text-muted-foreground flex items-center mb-1"><MapPin className="mr-2 h-4 w-4 text-primary" />Pickup Location:</strong>
                <p className="pl-6">{donation.pickupLocation}</p>
              </div>
              {donation.ngoName && (
                <div className="md:col-span-2">
                  <strong className="text-muted-foreground flex items-center mb-1"><Building className="mr-2 h-4 w-4 text-primary" />Assigned NGO:</strong>
                  <p className="pl-6">{donation.ngoName}</p>
                </div>
              )}
            </div>

            {donation.notes && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2 flex items-center text-md"><Info className="mr-2 h-5 w-5 text-primary" />Your Notes:</h4>
                  <p className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-md whitespace-pre-wrap border">{donation.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
      </div>
    </AppShell>
  );
}
