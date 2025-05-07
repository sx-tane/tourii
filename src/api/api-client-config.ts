import { OpenAPI } from './generated';
import { env } from '@/env.js'; // Import the typed env

// Ensure NEXT_PUBLIC_BACKEND_URL in your .env.local includes the /tourii-backend prefix
// Example: NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/tourii-backend
const defaultApiBase = 'http://localhost:3001/tourii-backend'; // Default if env var is not set

OpenAPI.BASE = env.NEXT_PUBLIC_BACKEND_URL || defaultApiBase;

OpenAPI.HEADERS = async () => {
  const headers: Record<string, string> = {
    'accept-version': '1.0.0', // Assuming this is fixed, or make it NEXT_PUBLIC_BACKEND_API_VERSION from env if needed client-side
  };
  const apiKey = env.NEXT_PUBLIC_BACKEND_API_KEY;
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  } else {
    console.warn(
      'API key (NEXT_PUBLIC_BACKEND_API_KEY) is not set in environment variables. API calls may fail.',
    );
  }
  return headers;
};

// This import ensures the configuration is applied when the app loads.
// No need to call any functions from this file elsewhere, just import it once.
if (typeof window !== 'undefined') {
  // Log only on the client side
 console.log(
    `API Client Configured: Base URL set to ${OpenAPI.BASE}. API Key Loaded: ${env.NEXT_PUBLIC_BACKEND_API_KEY ? 'Yes' : 'No'}`,
  );
} 