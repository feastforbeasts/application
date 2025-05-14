import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { NGO } from "@/lib/types";
import { Star, MapPin, Phone, ShieldCheck, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NgoCardProps {
  ngo: NGO;
  onSelect: (ngoId: string) => void;
  isSelected?: boolean;
}

export function NgoCard({ ngo, onSelect, isSelected }: NgoCardProps) {
  const suitabilityColor = ngo.suitabilityScore > 0.7 ? "bg-green-500" : ngo.suitabilityScore > 0.4 ? "bg-yellow-500" : "bg-red-500";
  const urgencyColor = ngo.urgencyScore > 0.7 ? "text-red-500" : ngo.urgencyScore > 0.4 ? "text-yellow-600" : "text-green-600";
  
  return (
    <Card className={`shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl ${isSelected ? 'ring-2 ring-primary' : 'ring-1 ring-border'}`}>
      <CardHeader className="pb-3">
        {ngo.imageUrl && (
          <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={ngo.imageUrl}
              alt={ngo.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={ngo.dataAiHint || "ngo building"}
            />
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-primary">{ngo.name}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> <span>{ngo.address}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground flex items-center"><ShieldCheck className="h-4 w-4 mr-1 text-green-500"/>Suitability:</span>
            <div className="flex items-center w-1/2">
                <Progress value={ngo.suitabilityScore * 100} className={`h-2 w-full ${suitabilityColor}`} />
                <span className="ml-2 text-xs font-semibold">{(ngo.suitabilityScore * 100).toFixed(0)}%</span>
            </div>
        </div>
         <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground flex items-center"><Flame className={`h-4 w-4 mr-1 ${urgencyColor}`}/>Urgency:</span>
             <div className="flex items-center w-1/2">
                <Progress value={ngo.urgencyScore * 100} className={`h-2 w-full ${ngo.urgencyScore > 0.7 ? 'bg-red-500' : ngo.urgencyScore > 0.4 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                <span className="ml-2 text-xs font-semibold">{(ngo.urgencyScore * 100).toFixed(0)}%</span>
            </div>
        </div>
        {ngo.contactNumber && (
            <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" /> {ngo.contactNumber}
            </div>
        )}
        {ngo.notes && (
          <CardDescription className="text-xs border-l-2 border-primary pl-2 py-1 bg-secondary/30 rounded-r-md">
            <strong>Notes:</strong> {ngo.notes}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(ngo.id || ngo.name)} 
          className="w-full" 
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? "Selected" : "Select this NGO"}
        </Button>
      </CardFooter>
    </Card>
  );
}
