'use server';
/**
 * @fileOverview Optimizes donation allocation by suggesting the most appropriate NGOs based on food type, quantity, and urgency.
 *
 * - optimizeDonationAllocation - A function that suggests NGOs for a given donation.
 * - OptimizeDonationAllocationInput - The input type for the optimizeDonationAllocation function.
 * - OptimizeDonationAllocationOutput - The return type for the optimizeDonationAllocation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeDonationAllocationInputSchema = z.object({
  donationType: z
    .string()
    .describe('The type of donation (e.g., cooked food, canned goods, etc.).'),
  quantity: z.number().describe('The quantity of the donation (e.g., in kilograms).'),
  expiryDate: z
    .string()
    .describe('The expiry date of the donation (YYYY-MM-DD).'),
  pickupLocation: z
    .string()
    .describe('The pickup location of the donation (address or coordinates).'),
});
export type OptimizeDonationAllocationInput = z.infer<typeof OptimizeDonationAllocationInputSchema>;

const NGOSchema = z.object({
  name: z.string().describe('The name of the NGO.'),
  suitabilityScore: z.number().describe('Suitability score based on donation type, urgency, and location, from 0 to 1.'),
  urgencyScore: z.number().describe('urgency score from 0 to 1, 1 is highest urgency'),
  address: z.string().describe('address of the NGO'),
  contactNumber: z.string().describe('The contact number of the NGO.'),
  notes: z.string().optional().describe('Additional notes about the NGO.'),
});

const OptimizeDonationAllocationOutputSchema = z.array(NGOSchema);
export type OptimizeDonationAllocationOutput = z.infer<typeof OptimizeDonationAllocationOutputSchema>;

export async function optimizeDonationAllocation(input: OptimizeDonationAllocationInput): Promise<OptimizeDonationAllocationOutput> {
  return optimizeDonationAllocationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeDonationAllocationPrompt',
  input: {schema: OptimizeDonationAllocationInputSchema},
  output: {schema: OptimizeDonationAllocationOutputSchema},
  prompt: `You are an AI assistant helping donors find the most suitable NGOs for their food donations.\n\n  Given the following donation details, recommend a list of NGOs that are nearby and match the donation type and urgency. Consider the expiry date to evaluate urgency of the donation.\n\n  Donation Type: {{{donationType}}}\n  Quantity: {{{quantity}}} (e.g., in kilograms)\n  Expiry Date: {{{expiryDate}}} (YYYY-MM-DD)\n  Pickup Location: {{{pickupLocation}}} (address or coordinates)\n\n  Respond with a JSON array of NGOs, with each NGO containing:\n    - name: The name of the NGO.\n    - suitabilityScore: A numerical score (0 to 1) representing how well the NGO matches the donation type, urgency, and location. The closer to 1, the better. Consider travel distance when computing this score.\n    - urgencyScore: A numerical score (0 to 1) representing the urgency of the need for donation. If expiry date is near, the score will be closer to 1.\n    - address: The address of the NGO.\n    - contactNumber: The contact number of the NGO.\n    - notes: Any additional notes about the NGO.\n\n  Example:\n  [
    {
      "name": "Food Bank ABC",
      "suitabilityScore": 0.9,
      "urgencyScore": 0.8,
      "address": "123 Main St, Cityville",
      "contactNumber": "555-1234",
      "notes": "Accepts all types of cooked food."
    },
    {
      "name": "Community Kitchen XYZ",
      "suitabilityScore": 0.7,
      "urgencyScore": 0.6,
      "address": "456 Elm St, Townsville",
      "contactNumber": "555-5678",
      "notes": "Specializes in distributing canned goods."
    }
  ]
  `,
});

const optimizeDonationAllocationFlow = ai.defineFlow(
  {
    name: 'optimizeDonationAllocationFlow',
    inputSchema: OptimizeDonationAllocationInputSchema,
    outputSchema: OptimizeDonationAllocationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

