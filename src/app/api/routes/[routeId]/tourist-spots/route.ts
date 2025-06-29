import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

/**
 * GET: List tourist spots in a route
 * POST: Add existing tourist spot to route OR create new spot in route
 */

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ routeId: string }> },
) {
	const { routeId } = await params;
	if (!routeId)
		return touriiErrorResponse("Missing routeId", 400, "BadRequest");

	try {
		const routeResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRouteById(
					routeId,
					apiVersion,
					apiKey,
				),
			`GET /api/routes/${routeId}/tourist-spots`,
		);

		if (!routeResponse.ok) {
			return routeResponse;
		}

		const routeData = await routeResponse.json();
		return Response.json(routeData.touristSpotList || []);
	} catch (error) {
		console.error("Error fetching route tourist spots:", error);
		return touriiErrorResponse("Internal server error", 500, "InternalServerError");
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ routeId: string }> },
) {
	const { routeId } = await params;
	if (!routeId)
		return touriiErrorResponse("Missing routeId", 400, "BadRequest");

	try {
		const body = await request.json();
		const { touristSpotId, createNew, ...touristSpotData } = body;

		// If createNew flag is true, create a new tourist spot in this route
		if (createNew) {
			return executeValidatedServiceCall(
				(apiKey: string, apiVersion: string) =>
					RoutesTouristSpotsService.touriiBackendControllerCreateTouristSpot(
						routeId,
						apiVersion,
						apiKey,
						touristSpotData,
					),
				`POST /api/routes/${routeId}/tourist-spots (create new)`,
			);
		}

		// Otherwise, add existing tourist spot to route
		if (!touristSpotId) {
			return touriiErrorResponse("Missing touristSpotId", 400, "BadRequest");
		}

		// Get the target route
		const routeResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRouteById(
					routeId,
					apiVersion,
					apiKey,
				),
			`GET /api/routes/${routeId}`,
		);

		if (!routeResponse.ok) {
			return routeResponse;
		}

		const routeData = await routeResponse.json();

		// Get all routes to find the tourist spot
		const allRoutesResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetRoutes(apiVersion, apiKey),
			`GET /api/routes`,
		);

		if (!allRoutesResponse.ok) {
			return allRoutesResponse;
		}

		const allRoutes = await allRoutesResponse.json();
		
		// Find the tourist spot
		let touristSpot = null;
		for (const route of allRoutes) {
			const spot = route.touristSpotList?.find(
				(s: any) => s.touristSpotId === touristSpotId
			);
			if (spot) {
				touristSpot = spot;
				break;
			}
		}

		if (!touristSpot) {
			return touriiErrorResponse("Tourist spot not found", 404, "NotFound");
		}

		// Check if spot is already in this route
		const existingSpot = routeData.touristSpotList?.find(
			(spot: any) => spot.touristSpotId === touristSpotId
		);

		if (existingSpot) {
			return touriiErrorResponse("Tourist spot already exists in this route", 409, "Conflict");
		}

		// Add the tourist spot to the route
		const updatedRoute = {
			...routeData,
			touristSpotList: [...(routeData.touristSpotList || []), touristSpot]
		};

		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerUpdateModelRoute(
					apiVersion,
					apiKey,
					updatedRoute,
				),
			`POST /api/routes/${routeId}/tourist-spots (add existing)`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}