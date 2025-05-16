import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The googleAI() plugin will automatically look for GOOGLE_API_KEY or GEMINI_API_KEY
// in the environment variables.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
