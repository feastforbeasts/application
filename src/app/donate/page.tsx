
"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DonationForm } from "@/components/donate/donation-form";
import { NgoCard } from "@/components/donate/ngo-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, RotateCcw, Lightbulb, CheckCircle } from "lucide-react";
import { recommendNGOs, type RecommendNGOsInput } from "@/ai/flows/recommend-ngos";
import type { NGO } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useProfile } from "@/contexts/profile-context";
import { useDonations } from "@/contexts/donation-context"; // Added

export default function DonatePage() {
  const { profile } = useProfile();
  const { addDonation } = useDonations(); // Added
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<NGO[]>([]);
  const [selectedNgoDetails, setSelectedNgoDetails] = useState<NGO | null>(null); // Store full NGO details
  const [error, setError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [donationData, setDonationData] = useState<RecommendNGOsInput | null>(null);
  const [isSubmittingDonation, setIsSubmittingDonation] = useState(false);

  const handleFormSubmit = async (data: RecommendNGOsInput) => {
    setIsLoadingRecommendations(true);
    setError(null);
    setRecommendations([]);
    setSelectedNgoDetails(null);
    setDonationData(data); 
    setShowRecommendations(true); 

    try {
      const rawRecommendations = await recommendNGOs(data);
      const enhancedRecommendations = rawRecommendations.map((ngo, index) => ({
        ...ngo,
        id: ngo.name.toLowerCase().replace(/\s+/g, '-') + `-${index}`, 
      }));
      setRecommendations(enhancedRecommendations);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      const errorMessage = "Failed to fetch NGO recommendations. Please check your setup or try again later.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch NGO recommendations. Please check your setup or try again later.",
      });
      setRecommendations([]); 
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleNgoSelect = (ngo: NGO) => { // Now expects full NGO object
    setSelectedNgoDetails(ngo);
  };

  const confirmDonation = async () => {
    if (!selectedNgoDetails || !donationData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an NGO and ensure donation data is available.",
      });
      return;
    }
    setIsSubmittingDonation(true);
    
    // Simulate donation submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to donation context
    addDonation({
      foodType: donationData.donationType,
      quantity: donationData.quantity,
      // Ensure quantityUnit is part of RecommendNGOsInput or derive it
      // For now, assuming it might be part of a more complete donationData or hardcode for example
      quantityUnit: donationData.quantity.toString().includes("kg") ? "kg" : "items", // This is a guess, ideally it's in donationData
      expiryDate: donationData.expiryDate,
      pickupLocation: donationData.pickupLocation,
      notes: donationData.notes, // Assuming notes might be part of RecommendNGOsInput or DonationFormValues
      assignedNgoId: selectedNgoDetails.id,
      ngoName: selectedNgoDetails.name,
    });

    toast({
      title: "Donation Submitted!",
      description: `Your donation of ${donationData.donationType} has been scheduled with ${selectedNgoDetails.name}. In a real application, a confirmation email would be sent to ${profile.email}.`,
      action: <CheckCircle className="text-green-500" />,
    });
    
    setShowRecommendations(false);
    setRecommendations([]);
    setSelectedNgoDetails(null);
    setDonationData(null);
    setIsSubmittingDonation(false);
    // Optionally reset the form itself here if it has a reset method
  };

  const resetFormAndRecommendations = () => {
    setShowRecommendations(false);
    setRecommendations([]);
    setSelectedNgoDetails(null);
    setError(null);
    setDonationData(null);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Make a Donation</CardTitle>
            <CardDescription>
              Fill in the details of your surplus food, and we'll help you find the best NGO to donate to.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {!showRecommendations || (isLoadingRecommendations && recommendations.length === 0 && !error) ? (
              <DonationForm onSubmit={handleFormSubmit} isLoading={isLoadingRecommendations} />
            ) : (
              <div>
                <Alert className="mb-6 bg-primary/10 border-primary/30">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-semibold text-primary">NGO Recommendations</AlertTitle>
                  <AlertDescription>
                    Based on your donation details, here are some NGOs that might be a good fit. Review their profiles and select one.
                  </AlertDescription>
                </Alert>

                {isLoadingRecommendations && (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2">Loading recommendations...</p>
                  </div>
                )}

                {error && !isLoadingRecommendations && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!isLoadingRecommendations && !error && recommendations.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {recommendations.map((ngo) => (
                      <NgoCard
                        key={ngo.id}
                        ngo={ngo}
                        onSelect={() => handleNgoSelect(ngo)} // Pass full NGO object
                        isSelected={selectedNgoDetails?.id === ngo.id}
                      />
                    ))}
                  </div>
                )}
                
                {!isLoadingRecommendations && !error && recommendations.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No suitable NGOs found for your specific donation criteria at the moment. You can try adjusting the details.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={resetFormAndRecommendations} disabled={isSubmittingDonation || isLoadingRecommendations}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Modify Donation
                  </Button>
                  <Button 
                    onClick={confirmDonation} 
                    disabled={!selectedNgoDetails || isSubmittingDonation || isLoadingRecommendations || recommendations.length === 0 || !!error}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isSubmittingDonation ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Confirm Donation with Selected NGO
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
