import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../lib/route-helper";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get('q') || undefined;
		const location = searchParams.get('location') || undefined;
		const hashtags = searchParams.get('hashtags') || undefined;
		const offset = searchParams.get('offset') || undefined;
		const limit = searchParams.get('limit') || undefined;

		// Use the new search tourist spots API
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerSearchTouristSpots(
					apiVersion,
					apiKey,
					offset,
					limit,
					hashtags,
					location,
					query,
				),
			"GET /api/tourist-spots/search",
		);
	} catch (error) {
		console.error("Error searching tourist spots:", error);
		return touriiErrorResponse("Internal server error", 500, "InternalServerError");
	}
}