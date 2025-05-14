import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Star, Gift } from "lucide-react";
import Image from "next/image";
import type { Reward } from "@/lib/types";

const mockRewards: Reward[] = [
  { id: "REW001", name: "Eco Warrior Badge", description: "Awarded for 5 successful donations.", pointsRequired: 0, imageUrl: "https://placehold.co/300x200.png", dataAiHint: "badge award" },
  { id: "REW002", name: "$5 Coffee Voucher", description: "Redeemable at local partner cafes.", pointsRequired: 500, imageUrl: "https://placehold.co/300x200.png", dataAiHint: "coffee voucher" },
  { id: "REW003", name: "Plant a Tree Certificate", description: "We'll plant a tree in your name.", pointsRequired: 1000, imageUrl: "https://placehold.co/300x200.png", dataAiHint: "tree certificate" },
  { id: "REW004", name: "Reusable Shopping Bag", description: "A stylish FeastForBeasts shopping bag.", pointsRequired: 250, imageUrl: "https://placehold.co/300x200.png", dataAiHint: "shopping bag" },
];

const currentUserPoints = 750; // Placeholder

export default function RewardsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Rewards</h1>
          <Card className="w-full sm:w-auto bg-accent/20 border-accent shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <Star className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Your Points Balance</p>
                <p className="text-2xl font-bold text-accent">{currentUserPoints} Points</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 tracking-tight flex items-center">
            <Gift className="mr-3 h-6 w-6 text-primary" />
            Available Rewards
          </h2>
          {mockRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRewards.map((reward) => (
                <Card key={reward.id} className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {reward.imageUrl && (
                       <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                        <Image
                          src={reward.imageUrl}
                          alt={reward.name}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={reward.dataAiHint || "reward item"}
                        />
                      </div>
                    )}
                    <CardTitle className="text-lg text-primary">{reward.name}</CardTitle>
                    <CardDescription className="text-sm h-10 overflow-hidden">{reward.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
                     <div className="flex justify-between w-full items-center">
                        <p className="text-sm font-semibold text-accent">
                            {reward.pointsRequired > 0 ? `${reward.pointsRequired} Points` : "Free Achievement"}
                        </p>
                        <Button 
                            size="sm" 
                            disabled={reward.pointsRequired > 0 && currentUserPoints < reward.pointsRequired}
                            variant={reward.pointsRequired > 0 ? "default" : "outline"}
                        >
                           {reward.pointsRequired > 0 ? "Redeem" : "Claimed"}
                        </Button>
                     </div>
                     {reward.pointsRequired > 0 && currentUserPoints < reward.pointsRequired && (
                        <p className="text-xs text-destructive">Not enough points</p>
                     )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg shadow">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No rewards available at the moment.</p>
              <p className="text-sm text-muted-foreground">Keep donating to earn points and unlock exciting rewards!</p>
            </div>
          )}
        </div>
        
        {/* Placeholder for Redeemed Rewards History */}
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Redemption History</h2>
            <Card className="shadow-md">
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>You haven&apos;t redeemed any rewards yet.</p>
                </CardContent>
            </Card>
        </div>

      </div>
    </AppShell>
  );
}
