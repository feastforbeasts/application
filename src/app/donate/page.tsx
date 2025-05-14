"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DonationForm, type DonationFormValues } from "@/components/donate/donation-form";
import { NgoCard } from "@/components/donate/ngo-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, RotateCcw, Lightbulb, CheckCircle } from "lucide-react";
import { recommendNGOs, type RecommendNGOsInput, type RecommendNGOsOutput } from "@/ai/flows/recommend-ngos";
import type { NGO } from "@/lib/types"; // Use our extended NGO type
import { toast } from "@/hooks/use-toast";

export default function DonatePage() {
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<NGO[]>([]);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [donationData, setDonationData] = useState<RecommendNGOsInput | null>(null);
  const [isSubmittingDonation, setIsSubmittingDonation] = useState(false);

  const handleFormSubmit = async (data: RecommendNGOsInput) => {
    setIsLoadingRecommendations(true);
    setError(null);
    setRecommendations([]);
    setSelectedNgoId(null);
    setDonationData(data); // Store donation data

    try {
      // Add placeholder IDs and image URLs to recommendations for UI
      const rawRecommendations = await recommendNGOs(data);
      const enhancedRecommendations = rawRecommendations.map((ngo, index) => ({
        ...ngo,
        id: ngo.name.toLowerCase().replace(/\s+/g, '-') + `-${index}`, // Create a pseudo-ID
        imageUrl: `https://placehold.co/600x400.png`, // Placeholder image
        dataAiHint: `ngo charity ${ngo.name.split(" ")[0].toLowerCase()}`, // Basic AI hint
      }));
      setRecommendations(enhancedRecommendations);
      setShowRecommendations(true);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch NGO recommendations. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch NGO recommendations.",
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleNgoSelect = (ngoId: string) => {
    setSelectedNgoId(ngoId);
  };

  const confirmDonation = async () => {
    if (!selectedNgoId || !donationData) {
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
    
    toast({
      title: "Donation Submitted!",
      description: `Your donation of ${donationData.donationType} has been scheduled with the selected NGO.`,
      action: <CheckCircle className="text-green-500" />,
    });
    
    // Reset state
    setShowRecommendations(false);
    setRecommendations([]);
    setSelectedNgoId(null);
    setDonationData(null);
    // Ideally, navigate to history page or show success message
    // For now, just reset the form area.
    setIsSubmittingDonation(false);
  };

  const resetFormAndRecommendations = () => {
    setShowRecommendations(false);
    setRecommendations([]);
    setSelectedNgoId(null);
    setError(null);
    // Here you might want to reset the DonationForm's internal state if it were a controlled component fully managed here.
    // Since DonationForm uses react-hook-form, its state is internal. To reset it, we'd need to pass a key or a reset function.
    // For simplicity, we're just hiding recommendations. A full reset might involve re-instantiating DonationForm with a new key.
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
            {!showRecommendations ? (
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

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {recommendations.map((ngo) => (
                      <NgoCard
                        key={ngo.id}
                        ngo={ngo}
                        onSelect={handleNgoSelect}
                        isSelected={selectedNgoId === ngo.id}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No suitable NGOs found for your specific donation criteria at the moment. You can try adjusting the details.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={resetFormAndRecommendations} disabled={isSubmittingDonation}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Modify Donation
                  </Button>
                  <Button 
                    onClick={confirmDonation} 
                    disabled={!selectedNgoId || isSubmittingDonation || recommendations.length === 0}
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
