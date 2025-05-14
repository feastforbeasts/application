import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-donation-allocation.ts';
import '@/ai/flows/recommend-ngos.ts';
import '@/ai/flows/allocate-donations.ts';