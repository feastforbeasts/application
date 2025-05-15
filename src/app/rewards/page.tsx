
"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Star, Gift, Loader2 } from "lucide-react";
import type { Reward } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

const initialUserPoints = 750;

const mockRewardsData: Reward[] = [
  { id: "REW001", name: "Eco Warrior Badge", description: "Awarded for 5 successful donations.", pointsRequired: 0 },
  { id: "REW002", name: "$5 Coffee Voucher", description: "Redeemable at local partner cafes.", pointsRequired: 500 },
  { id: "REW003", name: "Plant a Tree Certificate", description: "We'll plant a tree in your name.", pointsRequired: 1000 },
  { id: "REW004", name: "Reusable Shopping Bag", description: "A stylish FeastForBeasts shopping bag.", pointsRequired: 250 },
];

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(initialUserPoints);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [loadingRedemptionId, setLoadingRedemptionId] = useState<string | null>(null);

  const handleRedeem = async (reward: Reward) => {
    if (reward.pointsRequired > 0 && (userPoints < reward.pointsRequired || redeemedRewards.includes(reward.id))) {
      toast({ variant: "destructive", title: "Cannot Redeem", description: "Not enough points or reward already redeemed." });
      return;
    }
    if (reward.pointsRequired === 0 && redeemedRewards.includes(reward.id)) { // For achievements already "claimed"
        toast({ title: "Achievement", description: `${reward.name} already earned.` });
        return;
    }

    setLoadingRedemptionId(reward.id);
    // Simulate API call for redemption
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (reward.pointsRequired > 0) {
      setUserPoints(prevPoints => prevPoints - reward.pointsRequired);
    }
    setRedeemedRewards(prev => [...prev, reward.id]);
    
    toast({
      title: reward.pointsRequired > 0 ? "Reward Redeemed!" : "Achievement Unlocked!",
      description: `${reward.name} has been successfully ${reward.pointsRequired > 0 ? 'redeemed' : 'unlocked'}.`,
    });
    setLoadingRedemptionId(null);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Rewards</h1>
          <Card className="w-full sm:w-auto bg-accent/20 border-accent shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <Star className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Your Points Balance</p>
                <p className="text-4xl font-bold text-accent">{userPoints} Points</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 tracking-tight flex items-center">
            <Gift className="mr-3 h-6 w-6 text-primary" />
            Available Rewards & Achievements
          </h2>
          {mockRewardsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRewardsData.map((reward) => {
                const isRedeemed = redeemedRewards.includes(reward.id);
                const canAfford = userPoints >= reward.pointsRequired;
                const isAchievement = reward.pointsRequired === 0;
                const isLoading = loadingRedemptionId === reward.id;

                let buttonText = "Redeem";
                let buttonDisabled = isLoading || (isAchievement && isRedeemed);

                if (isLoading) {
                    buttonText = "Processing...";
                } else if (isRedeemed) {
                    buttonText = isAchievement ? "Achieved" : "Redeemed";
                    buttonDisabled = true;
                } else if (isAchievement) {
                    buttonText = "Unlock Achievement"; // Or "View Achievement" if already unlocked by default
                } else if (!canAfford) {
                    buttonText = "Redeem";
                    buttonDisabled = true;
                }


                return (
                  <Card key={reward.id} className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">{reward.name}</CardTitle>
                      <CardDescription className="text-sm h-10 overflow-hidden">{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow" /> {/* Pushes footer to bottom */}
                    <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
                       <div className="flex justify-between w-full items-center">
                          <p className="text-sm font-semibold text-accent">
                              {reward.pointsRequired > 0 ? `${reward.pointsRequired} Points` : "Free"}
                          </p>
                          <Button 
                              size="sm" 
                              onClick={() => handleRedeem(reward)}
                              disabled={buttonDisabled}
                              variant={isRedeemed || (isAchievement && !isRedeemed) ? "outline" : "default"}
                          >
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             {buttonText}
                          </Button>
                       </div>
                       {reward.pointsRequired > 0 && !isRedeemed && !canAfford && (
                          <p className="text-xs text-destructive">Not enough points</p>
                       )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg shadow">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No rewards available at the moment.</p>
              <p className="text-sm text-muted-foreground">Keep donating to earn points and unlock exciting rewards!</p>
            </div>
          )}
        </div>
        
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Redemption History</h2>
            <Card className="shadow-md">
                <CardContent className="p-6 text-muted-foreground">
                    {redeemedRewards.length === 0 ? (
                        <p className="text-center">You haven&apos;t redeemed any rewards yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {redeemedRewards.map(id => {
                                const redeemedItem = mockRewardsData.find(r => r.id === id);
                                return redeemedItem ? (
                                    <li key={id} className="p-2 border rounded-md bg-secondary/50">
                                        <span className="font-semibold">{redeemedItem.name}</span>
                                        {redeemedItem.pointsRequired > 0 && ` - ${redeemedItem.pointsRequired} points`}
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>

      </div>
    </AppShell>
  );
}
