import { OpenAPI } from "./generated";
import { env } from "@/env.js"; // Import the typed env

// This configuration is for any potential *direct* client-side usage of the generated SDK.
// For API calls proxied through Next.js API routes (as used by SWR hooks now),
// this client-side configuration for BASE or HEADERS is not directly used by those proxied calls.
// The server-side proxy routes configure OpenAPI.BASE themselves for their specific SDK usage.

// Ensure NEXT_PUBLIC_BACKEND_URL in your .env.local includes the /tourii-backend prefix
// Example: NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/tourii-backend
const defaultApiBase = "http://localhost:3001/tourii-backend"; // Default if env var is not set

OpenAPI.BASE = env.NEXT_PUBLIC_BACKEND_URL || defaultApiBase;

// HEADERS for any direct client-side SDK calls.
// API key and specific version for proxied calls are handled server-side.
OpenAPI.HEADERS = async () => {
	const headers: Record<string, string> = {
		// Example of a truly public, common header if needed for direct client calls:
		// 'X-Client-Identifier': 'tourii-webapp'
	};
	// No API key or sensitive headers here.
	return headers;
};

// This import ensures the configuration is applied when the app loads for any potential direct client SDK use.
if (typeof window !== "undefined") {
	console.log(
		`Minimal API Client Initialized: Base URL for any direct SDK calls set to ${OpenAPI.BASE}. API Key and critical headers for data fetching are now handled server-side by API proxies.`,
	);
}
