
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Compass, Truck, CheckCircle, Package, BuildingIcon } from "lucide-react";
import Image from 'next/image';

interface TrackedDonationInfo {
  pickupLocation: string;
  ngoName: string;
  ngoAddress: string;
  foodType: string;
}

interface DonationTrackingCardProps {
  donationInfo: TrackedDonationInfo;
  onMakeAnotherDonation: () => void;
}

export function DonationTrackingCard({ donationInfo, onMakeAnotherDonation }: DonationTrackingCardProps) {
  const [eta, setEta] = useState<string>("Calculating...");
  const [distance, setDistance] = useState<string>("Calculating...");

  useEffect(() => {
    // Simulate fetching ETA and distance
    const timer = setTimeout(() => {
      const randomMinutes = Math.floor(Math.random() * 30) + 15; // 15-45 minutes
      const randomDistance = (Math.random() * 10 + 2).toFixed(1); // 2.0-12.0 km
      setEta(`Approx. ${randomMinutes} minutes`);
      setDistance(`Approx. ${randomDistance} km`);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="shadow-xl border-2 border-green-500">
      <CardHeader className="bg-green-500/10">
        <div className="flex items-center gap-3">
          <Truck className="h-10 w-10 text-green-600" />
          <div>
            <CardTitle className="text-2xl font-bold text-green-700">Donation Pickup In Progress!</CardTitle>
            <CardDescription className="text-green-600">
              Your donation of <strong>{donationInfo.foodType}</strong> to <strong>{donationInfo.ngoName}</strong> is on its way to be collected.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center p-3 bg-secondary/50 rounded-md">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <p className="font-semibold text-lg text-foreground">Status: Pickup is on the way</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center"><Package className="h-4 w-4 mr-2 text-primary" />Pickup From:</p>
                <p className="font-semibold text-foreground">{donationInfo.pickupLocation}</p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center"><BuildingIcon className="h-4 w-4 mr-2 text-primary" />Delivering To:</p>
                <p className="font-semibold text-foreground">{donationInfo.ngoName}</p>
                <p className="text-xs text-muted-foreground">{donationInfo.ngoAddress}</p>
            </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center p-3 bg-muted/30 rounded-md">
                <Compass className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground">Estimated Distance:</p>
                    <p className="font-semibold text-primary">{distance}</p>
                </div>
            </div>
            <div className="flex items-center p-3 bg-muted/30 rounded-md">
                <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground">Estimated Time of Arrival:</p>
                    <p className="font-semibold text-primary">{eta}</p>
                </div>
            </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" />Live Tracking (Simulated):</p>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-inner flex items-center justify-center border">
            <Image
              src="https://placehold.co/600x338.png" // Roughly 16:9 aspect ratio
              alt="Map placeholder showing a route"
              width={600}
              height={338}
              className="object-cover w-full h-full"
              data-ai-hint="map route"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            In a real application, an interactive map highlighting the route would appear here.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button 
          onClick={onMakeAnotherDonation} 
          variant="default" 
          className="w-full bg-primary hover:bg-primary/90"
        >
          Make Another Donation
        </Button>
      </CardFooter>
    </Card>
  );
}
