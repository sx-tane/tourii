import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../lib/route-helper";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const userId = request.headers.get("x-user-id");

		if (!userId) {
			return touriiErrorResponse("Missing user ID", 400, "BadRequest");
		}

		// Validate required fields
		const { routeName, regionDesc, recommendations, touristSpotIds } = body;
		
		if (!routeName || !regionDesc || !recommendations || !touristSpotIds) {
			return touriiErrorResponse("Missing required fields", 400, "BadRequest");
		}

		if (!Array.isArray(recommendations) || !Array.isArray(touristSpotIds)) {
			return touriiErrorResponse("Recommendations and touristSpotIds must be arrays", 400, "BadRequest");
		}

		if (touristSpotIds.length === 0) {
			return touriiErrorResponse("At least one tourist spot ID is required", 400, "BadRequest");
		}

		// Use the new user tourist route endpoint
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerCreateTouristRoute(
					userId,
					apiVersion,
					apiKey,
					body,
				),
			"POST /api/tourist/routes",
		);
	} catch (error) {
		console.error("Error creating user tourist route:", error);
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}