import { RoutesTouristSpotsService } from "@/api/generated";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../lib/route-helper";

/**
 * GET: List all model routes
 * POST: Create new model route
 */

export async function GET(request: Request) {
	// Extract query parameters
	const url = new URL(request.url);
	const source = url.searchParams.get('source');
	const region = url.searchParams.get('region');
	const limit = url.searchParams.get('limit');
	const offset = url.searchParams.get('offset');
	const userId = url.searchParams.get('userId');

	// Build query string for backend
	const params = new URLSearchParams();
	if (source) params.set('source', source);
	if (region) params.set('region', region);
	if (limit) params.set('limit', limit);
	if (offset) params.set('offset', offset);
	if (userId) params.set('userId', userId);

	const queryString = params.toString();
	const backendUrl = queryString ? `/routes?${queryString}` : '/routes';

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) => {
			const { OpenAPI } = require("@/api/generated/core/OpenAPI");
			const { request: __request } = require("@/api/generated/core/request");
			
			return __request(OpenAPI, {
				method: 'GET',
				url: backendUrl,
				headers: {
					'accept-version': apiVersion,
					'x-api-key': apiKey,
				},
			});
		},
		"GET /api/routes",
	);
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerCreateModelRoute(
					apiVersion,
					apiKey,
					body,
				),
			"POST /api/routes/create-model-route",
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
