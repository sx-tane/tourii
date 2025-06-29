import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest, NextResponse } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function POST(
	request: NextRequest,
	{ params }: { params: { routeId: string } }
) {
	try {
		const { routeId } = params;
		const body = await request.json();
		const { touristSpotId } = body;

		if (!routeId) {
			return touriiErrorResponse("Route ID is required", 400, "BadRequest");
		}

		if (!touristSpotId) {
			return touriiErrorResponse("Tourist spot ID is required", 400, "BadRequest");
		}

		// For now, let's use a simpler approach that directly creates a new tourist spot
		// on the route instead of trying to modify existing routes
		// This creates a new spot linked to the route using the standalone spot data
		return executeValidatedServiceCall(
			async (apiKey: string, apiVersion: string) => {
				// First get the standalone tourist spot data
				const spotData = await RoutesTouristSpotsService.touriiBackendControllerGetTouristSpotById(
					touristSpotId,
					apiVersion,
					apiKey,
				);

				// Create a new tourist spot on the route using the standalone spot's data
				return RoutesTouristSpotsService.touriiBackendControllerCreateTouristSpot(
					routeId,
					apiVersion,
					apiKey,
					{
						storyChapterId: spotData.storyChapterId,
						touristSpotName: spotData.touristSpotName,
						touristSpotDesc: spotData.touristSpotDesc,
						bestVisitTime: spotData.bestVisitTime || "",
						touristSpotHashtag: spotData.touristSpotHashtag || [],
						imageSet: spotData.imageSet || { main: "", small: [] },
						address: spotData.address || "",
					}
				);
			},
			"POST /api/routes/[routeId]/add-spot",
		);
	} catch (error) {
		console.error("Error adding tourist spot to route:", error);
		return touriiErrorResponse(
			"Invalid request body or server error", 
			400, 
			"BadRequest"
		);
	}
}