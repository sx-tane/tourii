import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../../lib/route-helper";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ modelRouteId: string }> },
) {
	const { modelRouteId } = await params;
	if (!modelRouteId)
		return touriiErrorResponse("Missing modelRouteId", 400, "BadRequest");

	try {
		const body = await request.json();
		const { touristSpotId } = body;

		if (!touristSpotId) {
			return touriiErrorResponse("Missing touristSpotId", 400, "BadRequest");
		}

		// Get the current route
		const routeResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRouteById(
					modelRouteId,
					apiVersion,
					apiKey,
				),
			`GET /api/routes/${modelRouteId}`,
		);

		if (!routeResponse.ok) {
			return routeResponse;
		}

		const routeData = await routeResponse.json();

		// Check if route has tourist spots
		if (!Array.isArray(routeData.touristSpotList)) {
			return touriiErrorResponse("Route has no tourist spots", 400, "BadRequest");
		}

		// Check if spot exists in this route
		const spotExists = routeData.touristSpotList.some(
			(spot: any) => spot.touristSpotId === touristSpotId
		);

		if (!spotExists) {
			return touriiErrorResponse("Tourist spot not found in this route", 404, "NotFound");
		}

		// Remove the tourist spot from the route
		const updatedTouristSpotList = routeData.touristSpotList.filter(
			(spot: any) => spot.touristSpotId !== touristSpotId
		);

		// Ensure we preserve all required fields for the update
		const updatedRoute = {
			...routeData,
			touristSpotList: updatedTouristSpotList,
			// Ensure required fields are present
			updatedAt: new Date().toISOString()
		};

		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerUpdateModelRoute(
					apiVersion,
					apiKey,
					updatedRoute,
				),
			`DELETE /api/routes/${modelRouteId}/remove-spot`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}