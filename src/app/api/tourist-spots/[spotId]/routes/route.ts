import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ spotId: string }> },
) {
	const { spotId } = await params;
	if (!spotId)
		return touriiErrorResponse("Missing spotId", 400, "BadRequest");

	try {
		// Get all routes and find ones containing this tourist spot
		const routes = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRoutes(apiVersion, apiKey),
			`GET /api/tourist-spots/${spotId}/routes`,
		);

		if (!routes.ok) {
			return routes;
		}

		const routesData = await routes.json();
		
		// Filter routes that contain this tourist spot
		const routesWithSpot = routesData.filter((route: any) => 
			route.touristSpotList?.some((spot: any) => spot.touristSpotId === spotId)
		);

		return Response.json(routesWithSpot);
	} catch (error) {
		console.error("Error fetching routes for tourist spot:", error);
		return touriiErrorResponse("Internal server error", 500, "InternalServerError");
	}
}