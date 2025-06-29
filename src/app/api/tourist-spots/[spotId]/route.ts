import { RoutesTouristSpotsService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../lib/route-helper";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ spotId: string }> },
) {
	const { spotId } = await params;
	if (!spotId)
		return touriiErrorResponse("Missing spotId", 400, "BadRequest");

	try {
		// Use the new get tourist spot by ID API
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetTouristSpotById(
					spotId,
					apiVersion,
					apiKey,
				),
			`GET /api/tourist-spots/${spotId}`,
		);
	} catch (error) {
		console.error("Error fetching tourist spot:", error);
		return touriiErrorResponse(`Detailed error: ${error}`, 500, "InternalServerError");
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ spotId: string }> }
) {
	const { spotId } = await params;
	if (!spotId) {
		return touriiErrorResponse("Missing spotId", 400, "BadRequest");
	}

	try {
		// Get the current tourist spot using the new direct API
		const currentSpotResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerGetTouristSpotById(
					spotId,
					apiVersion,
					apiKey,
				),
			`POST /api/tourist-spots/${spotId} - get current spot`,
		);

		if (!currentSpotResponse.ok) {
			return currentSpotResponse;
		}

		const currentSpot = await currentSpotResponse.json();

		// Merge update data with current spot
		const updateData = await request.json();
		const fullUpdateBody = {
			...currentSpot,
			...updateData,
			updUserId: "admin" // TODO: Get from auth
		};

		// Use the correct backend API for updating tourist spots
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerUpdateTouristSpot(
					apiVersion,
					apiKey,
					fullUpdateBody,
				),
			`POST /api/tourist-spots/${spotId}`,
		);
	} catch (error) {
		console.error("Error updating tourist spot:", error);
		return touriiErrorResponse(`Update failed: ${error}`, 400, "BadRequest");
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ spotId: string }> }
) {
	const { spotId } = await params;
	if (!spotId) {
		return touriiErrorResponse("Missing spotId", 400, "BadRequest");
	}

	try {
		// Use the correct backend API for deleting tourist spots
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerDeleteTouristSpot(
					spotId,
					apiVersion,
					apiKey,
				),
			`DELETE /api/tourist-spots/${spotId}`,
		);
	} catch (error) {
		console.error("Error deleting tourist spot:", error);
		return touriiErrorResponse("Internal server error", 500, "InternalServerError");
	}
}