import { AiRoutesService } from "@/api/generated";
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

	return executeValidatedServiceCall(
		(apiKey, apiVersion) => 
			AiRoutesService.touriiBackendControllerGetAvailableHashtags(apiVersion, apiKey),
		"POST /api/ai/routes/hashtags/available"
	);
}