import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { NextRequest } from "next/server";

/**
 * API Route: Get Available Hashtags for AI Route Discovery
 * 
 * POST /api/ai/routes/hashtags/available
 * 
 * Returns available hashtags for AI route recommendations, optionally filtered by region.
 */

interface HashtagsRequest {
	region?: string;
}

export async function POST(request: NextRequest) {
	const body: HashtagsRequest = await request.json();

	// Since the generated client doesn't support request body for hashtags,
	// we need to make the request manually to pass the region parameter
	return executeValidatedServiceCall(
		(apiKey, apiVersion) => {
			const { OpenAPI } = require("@/api/generated/core/OpenAPI");
			const { request: __request } = require("@/api/generated/core/request");
			
			return __request(OpenAPI, {
				method: 'POST',
				url: '/ai/routes/hashtags/available',
				headers: {
					'accept-version': apiVersion,
					'x-api-key': apiKey,
				},
				body: body, // Pass the region parameter
				mediaType: 'application/json',
			});
		},
		"POST /api/ai/routes/hashtags/available"
	);
}