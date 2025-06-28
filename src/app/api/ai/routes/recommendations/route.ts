import { AiRoutesService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import type { AiRouteRecommendationRequestDto } from "@/api/generated/models/AiRouteRecommendationRequestDto";
import { NextRequest } from "next/server";

/**
 * API Route: Get AI Route Recommendations
 * 
 * POST /api/ai/routes/recommendations
 * 
 * Returns unified route recommendations combining existing routes and AI-generated routes.
 */

export async function POST(request: NextRequest) {
	const body: AiRouteRecommendationRequestDto = await request.json();
	
	// Get user ID from headers (for authenticated requests)
	const userId = request.headers.get("x-user-id") || "anonymous";

	return executeValidatedServiceCall(
		(apiKey, apiVersion) => 
			AiRoutesService.touriiBackendControllerGenerateAiRouteRecommendations(
				userId,
				apiVersion,
				apiKey,
				body
			),
		"POST /api/ai/routes/recommendations"
	);
}