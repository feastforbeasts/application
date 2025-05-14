"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Loader2, Utensils, ShoppingBasket, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { DONATION_TYPES, QUANTITY_UNITS } from "@/lib/constants";
import type { RecommendNGOsInput, RecommendNGOsOutput } from "@/ai/flows/recommend-ngos";

const donationFormSchema = z.object({
  foodType: z.string().min(1, { message: "Please select a food type." }),
  otherFoodType: z.string().optional(),
  quantity: z.coerce.number().positive({ message: "Quantity must be positive." }),
  quantityUnit: z.enum(["kg", "items"]),
  expiryDate: z.date({ required_error: "Expiry date is required." }),
  pickupLocation: z.string().min(5, { message: "Pickup location must be at least 5 characters." }),
  notes: z.string().optional(),
}).refine(data => {
    if (data.foodType === 'other' && (!data.otherFoodType || data.otherFoodType.trim() === '')) {
      return false;
    }
    return true;
  }, {
    message: "Please specify the food type if 'Other' is selected.",
    path: ["otherFoodType"],
  });

export type DonationFormValues = z.infer<typeof donationFormSchema>;

interface DonationFormProps {
  onSubmit: (data: RecommendNGOsInput) => Promise<void>;
  isLoading: boolean;
}

export function DonationForm({ onSubmit, isLoading }: DonationFormProps) {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      foodType: "",
      otherFoodType: "",
      quantity: 1,
      quantityUnit: "kg",
      pickupLocation: "",
      notes: "",
    },
  });

  const foodTypeWatcher = form.watch("foodType");

  const handleFormSubmit = (values: DonationFormValues) => {
    const submissionData: RecommendNGOsInput = {
      donationType: values.foodType === 'other' ? values.otherFoodType! : values.foodType,
      quantity: values.quantity,
      expiryDate: format(values.expiryDate, "yyyy-MM-dd"),
      pickupLocation: values.pickupLocation,
    };
    onSubmit(submissionData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="foodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><Utensils className="mr-2 h-4 w-4 text-primary" />Food Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of food" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DONATION_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best describes your donation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {foodTypeWatcher === 'other' && (
            <FormField
              control={form.control}
              name="otherFoodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specify Food Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pet Food, Baby Formula" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><ShoppingBasket className="mr-2 h-4 w-4 text-primary" />Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantityUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {QUANTITY_UNITS.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-primary" />Expiry Date (approximate if unsure)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When does the food expire? This helps us prioritize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" />Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter full address or landmark" {...field} />
              </FormControl>
              <FormDescription>
                Where can we pick up the donation from?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specific instructions, e.g., 'Contains nuts', 'Requires refrigeration'"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto text-base py-3 px-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finding NGOs...
            </>
          ) : (
            "Find Suitable NGOs"
          )}
        </Button>
      </form>
    </Form>
  );
}
