
"use client";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, User, MapPin, CalendarDays, Package, Info, Utensils, HandHeart, Users, Truck, CheckCircle, XCircle, Edit, Send, Lightbulb, Building } from "lucide-react";
import type { Donation, NGO as NgoType, Volunteer as VolunteerType } from "@/lib/types"; // Use NgoType to avoid conflict
import { optimizeDonationAllocation, type OptimizeDonationAllocationInput, type OptimizeDonationAllocationOutput } from "@/ai/flows/optimize-donation-allocation";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

// Mock data - replace with actual data fetching
const mockAdminDonations: (Donation & { userName: string; userEmail: string; ngoName?: string, volunteerName?: string })[] = [
  { id: "DON101", userId: "userA", userName: "Alice Wonderland", userEmail: "alice@example.com", foodType: "Party Leftovers", quantity: 12, quantityUnit: "kg", expiryDate: "2024-07-25", pickupLocation: "Wonderland Hall, 123 Fantasy Lane, Storybook City", status: "pending", submittedAt: "2024-07-24T10:00:00Z", notes: "Mixed items: sandwiches, cakes, and some salads. Needs refrigeration." },
  { id: "DON102", userId: "userB", userName: "Bob The Builder", userEmail: "bob@example.com", foodType: "Canned Goods", quantity: 50, quantityUnit: "items", expiryDate: "2025-06-01", pickupLocation: "Construction Site Office, BuildIt Rd, Toolsville", status: "approved", submittedAt: "2024-07-23T14:30:00Z", assignedNgoId: "ngo-citypantry", ngoName: "City Pantry", notes: "Assorted canned soups and vegetables." },
  { id: "DON103", userId: "userC", userName: "Charlie Chaplin", userEmail: "charlie@example.com", foodType: "Fresh Produce", quantity: 20, quantityUnit: "kg", expiryDate: "2024-07-28", pickupLocation: "Film Studio Cafe, Hollywood Blvd, LA", status: "picked_up", submittedAt: "2024-07-22T09:15:00Z", assignedNgoId: "ngo-greenearth", ngoName: "Green Earth Initiative", assignedVolunteerId: "vol-jane", volunteerName: "Jane Doe", notes: "Organic carrots, tomatoes, and lettuce." },
];

const mockNgos: NgoType[] = [
    { id: "ngo-citypantry", name: "City Pantry", address: "456 Community Dr, Metro City", contactNumber: "555-0011", suitabilityScore: 0.8, urgencyScore: 0.7, imageUrl:"https://placehold.co/100x100.png", dataAiHint: "city building" },
    { id: "ngo-greenearth", name: "Green Earth Initiative", address: "789 Nature Way, Eco Town", contactNumber: "555-0022", suitabilityScore: 0.9, urgencyScore: 0.6, imageUrl:"https://placehold.co/100x100.png", dataAiHint: "nature charity" },
    { id: "ngo-hopekitchen", name: "Hope Kitchen", address: "101 Giving St, Unity Village", contactNumber: "555-0033", suitabilityScore: 0.7, urgencyScore: 0.9, imageUrl:"https://placehold.co/100x100.png", dataAiHint: "community kitchen" },
];

const mockVolunteers: (VolunteerType & { name: string, email: string })[] = [
    { id: "vol-jane", userId: "userV1", name: "Jane Doe", email: "jane.doe@example.com", availability: "Weekends", assignedTasks: [] },
    { id: "vol-john", userId: "userV2", name: "John Smith", email: "john.smith@example.com", availability: "Weekdays", assignedTasks: [] },
];


export default function DonationDetailPage({ params }: { params: { id: string } }) {
  const [donation, setDonation] = useState<(Donation & { userName: string; userEmail: string; ngoName?: string, volunteerName?: string }) | null>(null);
  const [assignedNgo, setAssignedNgo] = useState<NgoType | null>(null);
  const [assignedVolunteer, setAssignedVolunteer] = useState<(VolunteerType & {name: string, email: string}) | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [suggestedNgos, setSuggestedNgos] = useState<OptimizeDonationAllocationOutput>([]);

  useEffect(() => {
    // Simulate fetching donation data
    const fetchedDonation = mockAdminDonations.find(d => d.id === params.id) || null;
    setDonation(fetchedDonation);
    if (fetchedDonation?.assignedNgoId) {
        const ngo = mockNgos.find(n => n.id === fetchedDonation.assignedNgoId) || null;
        setAssignedNgo(ngo);
    }
    if (fetchedDonation?.assignedVolunteerId) {
        setAssignedVolunteer(mockVolunteers.find(v => v.id === fetchedDonation.assignedVolunteerId) || null);
    }
    setIsLoading(false);
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: Donation['status']) => {
    if (!donation) return;
    setIsUpdatingStatus(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDonation({ ...donation, status: newStatus });
    toast({ title: "Status Updated", description: `Donation status changed to ${newStatus}.` });
    setIsUpdatingStatus(false);
  };

  const fetchNgoSuggestions = async () => {
    if (!donation) return;
    setIsFetchingSuggestions(true);
    setSuggestedNgos([]);
    try {
      const input: OptimizeDonationAllocationInput = {
        donationType: donation.foodType,
        quantity: donation.quantity,
        expiryDate: donation.expiryDate,
        pickupLocation: donation.pickupLocation,
      };
      const results = await optimizeDonationAllocation(input);
      const enhancedResults = results.map((ngo, index) => ({
        ...ngo,
        id: ngo.name.toLowerCase().replace(/\s+/g, '-') + `-sug-${index}`, // Create a pseudo-ID
        imageUrl: `https://placehold.co/80x80.png`, 
        dataAiHint: `charity building ${ngo.name.split(" ")[0].toLowerCase()}`,
      }));
      setSuggestedNgos(enhancedResults);
      toast({ title: "NGO Suggestions Loaded", description: "Review the AI-powered recommendations below." });
    } catch (error) {
      console.error("Failed to fetch NGO suggestions:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not load NGO suggestions." });
    } finally {
      setIsFetchingSuggestions(false);
    }
  };
  
  const handleAssignNgo = (ngo: NgoType) => {
    if(!donation) return;
    // Simulate assigning NGO
    setAssignedNgo(ngo);
    setDonation({...donation, assignedNgoId: ngo.id, ngoName: ngo.name});
    setSuggestedNgos([]); // Clear suggestions after selection
    toast({title: "NGO Assigned", description: `${ngo.name} has been assigned to this donation.`});
  }


  if (isLoading) {
    return <AdminShell><div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminShell>;
  }

  if (!donation) {
    return <AdminShell><Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Donation not found.</AlertDescription></Alert></AdminShell>;
  }

  const getStatusBadgeColors = (status: Donation['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      case 'picked_up': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'approved': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Donation ID: {donation.id}</h1>
            <p className="text-muted-foreground">Submitted on {new Date(donation.submittedAt).toLocaleString()}</p>
          </div>
          <Badge className={`text-lg px-4 py-2 capitalize ${getStatusBadgeColors(donation.status)}`}>{donation.status.replace("_", " ")}</Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Main Details */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><Package className="mr-2 text-primary" />Donation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><strong>Food Type:</strong> {donation.foodType}</div>
                  <div><strong>Quantity:</strong> {donation.quantity} {donation.quantityUnit}</div>
                  <div><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</div>
                  <div className="sm:col-span-2"><strong>Pickup Location:</strong> {donation.pickupLocation}</div>
                </div>
                {donation.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center"><Info className="mr-2 h-4 w-4 text-primary" />Notes from Donor:</h4>
                      <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md">{donation.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><User className="mr-2 text-primary" />Donor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Name:</strong> {donation.userName}</p>
                <p><strong>Email:</strong> <a href={`mailto:${donation.userEmail}`} className="text-primary hover:underline">{donation.userEmail}</a></p>
                {/* Add phone number if available */}
              </CardContent>
            </Card>

            {/* NGO Suggestions / Assignment */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center"><HandHeart className="mr-2 text-primary" />NGO Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                    {assignedNgo ? (
                        <div className="flex items-start gap-4">
                            {assignedNgo.imageUrl && (
                                <Image 
                                    src={assignedNgo.imageUrl} 
                                    alt={assignedNgo.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md object-cover"
                                    data-ai-hint={assignedNgo.dataAiHint || "ngo building"}
                                />
                            )}
                             {!assignedNgo.imageUrl && (
                                <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center">
                                    <Building className="h-10 w-10 text-muted-foreground" />
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-lg">{assignedNgo.name}</p>
                                <p className="text-sm text-muted-foreground">{assignedNgo.address}</p>
                                <p className="text-sm text-muted-foreground">Contact: {assignedNgo.contactNumber}</p>
                                <Button variant="outline" size="sm" className="mt-2" onClick={fetchNgoSuggestions} disabled={isFetchingSuggestions}>
                                    {isFetchingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Edit className="mr-2 h-4 w-4" /> }
                                    Change NGO / View Suggestions
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted-foreground mb-3">No NGO assigned yet.</p>
                            <Button onClick={fetchNgoSuggestions} disabled={isFetchingSuggestions || donation.status === 'delivered' || donation.status === 'cancelled'}>
                                {isFetchingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" /> }
                                Get AI Recommendations
                            </Button>
                        </div>
                    )}

                    {suggestedNgos.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Suggested NGOs:</h3>
                             <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>NGO</TableHead>
                                            <TableHead>Suitability</TableHead>
                                            <TableHead>Urgency</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {suggestedNgos.map(ngo => (
                                        <TableRow key={(ngo as NgoType).id || ngo.name}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {(ngo as NgoType).imageUrl && <Image src={(ngo as NgoType).imageUrl!} alt={ngo.name} width={40} height={40} className="rounded-sm" data-ai-hint={(ngo as NgoType).dataAiHint || "charity building"} />}
                                                    <div>
                                                        <p className="font-medium">{ngo.name}</p>
                                                        <p className="text-xs text-muted-foreground">{ngo.address}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Progress value={ngo.suitabilityScore * 100} className="h-2 w-20" />
                                                <span className="text-xs">{(ngo.suitabilityScore*100).toFixed(0)}%</span>
                                            </TableCell>
                                            <TableCell>
                                                <Progress value={ngo.urgencyScore * 100} className="h-2 w-20" />
                                                <span className="text-xs">{(ngo.urgencyScore*100).toFixed(0)}%</span>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" onClick={() => handleAssignNgo(ngo as unknown as NgoType)}>Assign</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Volunteer Assignment Placeholder */}
             <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center"><Users className="mr-2 text-primary" />Volunteer Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                     {assignedVolunteer ? (
                        <div>
                            <p className="font-semibold text-lg">{assignedVolunteer.name}</p>
                            <p className="text-sm text-muted-foreground">Email: {assignedVolunteer.email}</p>
                            <p className="text-sm text-muted-foreground">Availability: {assignedVolunteer.availability}</p>
                            <Button variant="outline" size="sm" className="mt-2" disabled> {/* Add functionality later */}
                                <Edit className="mr-2 h-4 w-4" /> Change Volunteer
                            </Button>
                        </div>
                    ) : (
                         <div className="text-center py-4">
                            <p className="text-muted-foreground mb-3">No volunteer assigned yet.</p>
                            <Button variant="outline" disabled={!assignedNgo || donation.status !== 'approved'}>Assign Volunteer</Button> {/* Add functionality later */}
                        </div>
                    )}
                </CardContent>
             </Card>


          </div>

          {/* Right Column: Actions & Status */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><Send className="mr-2 text-primary" />Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donation.status === "pending" && (
                  <Button onClick={() => handleStatusUpdate("approved")} disabled={isUpdatingStatus} className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-foreground">
                    {isUpdatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    Approve Donation
                  </Button>
                )}
                {donation.status === "approved" && (
                  <Button onClick={() => handleStatusUpdate("picked_up")} disabled={isUpdatingStatus || !assignedNgo || !assignedVolunteer} className="w-full bg-blue-500 hover:bg-blue-600 text-blue-foreground">
                    {isUpdatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />}
                    Mark as Picked Up
                  </Button>
                )}
                {donation.status === "picked_up" && (
                  <Button onClick={() => handleStatusUpdate("delivered")} disabled={isUpdatingStatus} className="w-full bg-green-500 hover:bg-green-600 text-green-foreground">
                    {isUpdatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    Mark as Delivered
                  </Button>
                )}
                {(donation.status === "pending" || donation.status === "approved") && (
                  <Button onClick={() => handleStatusUpdate("cancelled")} disabled={isUpdatingStatus} variant="destructive" className="w-full">
                    {isUpdatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                    Cancel Donation
                  </Button>
                )}
                {(donation.status === "delivered" || donation.status === "cancelled") && (
                    <p className="text-sm text-muted-foreground text-center">No further actions for this donation.</p>
                )}
              </CardContent>
            </Card>
            <Link href="/admin/donations" className="block text-center mt-4">
                <Button variant="outline">
                    &larr; Back to All Donations
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
