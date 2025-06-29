import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function DELETE(
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

		// First, get the existing route to get its current tourist spots
		const routeResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRouteById(
					routeId,
					apiVersion,
					apiKey,
				),
			"GET route for removing spot",
		);

		// Extract route data from the response
		const routeData = await routeResponse.json();
		
		if (!routeData) {
			return touriiErrorResponse("Route not found", 404, "NotFound");
		}

		// Check if the spot is in the route
		const existingSpots = routeData.touristSpotList || [];
		const spotIndex = existingSpots.findIndex(
			(spot: any) => spot.touristSpotId === touristSpotId
		);

		if (spotIndex === -1) {
			return touriiErrorResponse(
				"Tourist spot not found in this route", 
				404, 
				"NotFound"
			);
		}

		// Remove the spot from the route's tourist spot list
		const updatedTouristSpotList = existingSpots.filter(
			(spot: any) => spot.touristSpotId !== touristSpotId
		);

		// Update the route with the tourist spot removed
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerUpdateModelRoute(
					apiVersion,
					apiKey,
					{
						modelRouteId: routeData.modelRouteId,
						storyId: routeData.storyId || "",
						routeName: routeData.routeName,
						region: routeData.region,
						regionDesc: routeData.regionDesc,
						regionBackgroundMedia: routeData.regionBackgroundMedia || "",
						recommendation: routeData.recommendation || [],
						touristSpotList: updatedTouristSpotList,
						delFlag: false,
						updUserId: "admin",
					}
				),
			"DELETE /api/routes/[routeId]/remove-spot",
		);
	} catch (error) {
		console.error("Error removing tourist spot from route:", error);
		return touriiErrorResponse(
			"Invalid request body or server error", 
			400, 
			"BadRequest"
		);
	}
}