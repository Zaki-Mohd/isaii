import dotenv from 'dotenv';

dotenv.config();

export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  supabaseUrl: process.env.SUPABASE_PROJECT_URL,
  supabaseKey: process.env.SUPABASE_API,
};

// Validate required environment variables
export function validateEnvironment() {
  const missing = [];
  
  if (!config.geminiApiKey) missing.push('GEMINI_API_KEY');
  if (!config.supabaseUrl) missing.push('SUPABASE_PROJECT_URL');
  if (!config.supabaseKey) missing.push('SUPABASE_API');
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}