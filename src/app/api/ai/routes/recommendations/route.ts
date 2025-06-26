import { executeValidatedServiceCall } from "@/app/api/route-helper";
import { touriiErrorResponse } from "@/app/api/route-helper";
import type { NextRequest } from "next/server";
import { AiService } from "@/api/generated";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		
		// Validate required fields
		if (!body.keywords || !Array.isArray(body.keywords) || body.keywords.length === 0) {
			return touriiErrorResponse(
				"At least one keyword is required", 
				400, 
				"MissingKeywords"
			);
		}

		// Validate keywords array
		if (body.keywords.some((keyword: unknown) => typeof keyword !== "string" || !keyword.trim())) {
			return touriiErrorResponse(
				"All keywords must be non-empty strings", 
				400, 
				"InvalidKeywords"
			);
		}

		// Validate optional numeric fields
		if (body.proximityRadiusKm !== undefined) {
			const radius = Number(body.proximityRadiusKm);
			if (isNaN(radius) || radius <= 0 || radius > 500) {
				return touriiErrorResponse(
					"Proximity radius must be between 1 and 500 km", 
					400, 
					"InvalidRadius"
				);
			}
		}

		if (body.maxRoutes !== undefined) {
			const maxRoutes = Number(body.maxRoutes);
			if (isNaN(maxRoutes) || maxRoutes < 1 || maxRoutes > 20) {
				return touriiErrorResponse(
					"Max routes must be between 1 and 20", 
					400, 
					"InvalidMaxRoutes"
				);
			}
		}

		if (body.minSpotsPerCluster !== undefined) {
			const minSpots = Number(body.minSpotsPerCluster);
			if (isNaN(minSpots) || minSpots < 1 || minSpots > 10) {
				return touriiErrorResponse(
					"Min spots per cluster must be between 1 and 10", 
					400, 
					"InvalidMinSpots"
				);
			}
		}

		if (body.maxSpotsPerCluster !== undefined) {
			const maxSpots = Number(body.maxSpotsPerCluster);
			if (isNaN(maxSpots) || maxSpots < 1 || maxSpots > 20) {
				return touriiErrorResponse(
					"Max spots per cluster must be between 1 and 20", 
					400, 
					"InvalidMaxSpots"
				);
			}
		}

		// Validate mode field
		if (body.mode && !["all", "any"].includes(body.mode)) {
			return touriiErrorResponse(
				"Mode must be either 'all' or 'any'", 
				400, 
				"InvalidMode"
			);
		}

		// Set default values
		const requestPayload = {
			keywords: body.keywords.map((k: string) => k.trim()),
			mode: body.mode || "any",
			region: body.region || undefined,
			proximityRadiusKm: body.proximityRadiusKm || 50,
			minSpotsPerCluster: body.minSpotsPerCluster || 2,
			maxSpotsPerCluster: body.maxSpotsPerCluster || 8,
			maxRoutes: body.maxRoutes || 5,
		};

		// Get user ID from headers if available for rate limiting
		const userId = request.headers.get("x-user-id") || undefined;

		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AiService.touriiBackendControllerGetAiRouteRecommendations(
					requestPayload,
					apiVersion,
					apiKey,
					userId
				),
			"POST /api/ai/routes/recommendations"
		);
	} catch (error) {
		console.error("Error processing AI route recommendations request:", error);
		return touriiErrorResponse(
			"Invalid request body", 
			400, 
			"InvalidRequestBody"
		);
	}
}