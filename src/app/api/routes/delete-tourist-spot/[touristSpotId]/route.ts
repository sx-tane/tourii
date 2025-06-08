import { RoutesService } from "@/api/generated";
import { NextRequest } from "next/server";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../../lib/route-helper";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ touristSpotId: string }> }
) {
	const { touristSpotId } = await params;
	if (!touristSpotId) return touriiErrorResponse("Missing touristSpotId", 400, "BadRequest");

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesService.touriiBackendControllerDeleteTouristSpot(touristSpotId, apiVersion, apiKey),
		`DELETE /api/routes/delete-tourist-spot/${touristSpotId}`
	);
} 