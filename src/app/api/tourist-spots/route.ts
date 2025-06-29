import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../lib/route-helper";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const offset = searchParams.get('offset') || undefined;
		const limit = searchParams.get('limit') || undefined;

		// Use the new standalone tourist spots API
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetStandaloneTouristSpots(
					apiVersion,
					apiKey,
					offset,
					limit,
				),
			"GET /api/tourist-spots",
		);
	} catch (error) {
		console.error("Error fetching standalone tourist spots:", error);
		return touriiErrorResponse(`Detailed error: ${error}`, 500, "InternalServerError");
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		
		// Use the new standalone tourist spot endpoint
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerCreateStandaloneTouristSpot(
					apiVersion,
					apiKey,
					body,
				),
			"POST /api/tourist-spots",
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}