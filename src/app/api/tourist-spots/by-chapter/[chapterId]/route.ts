import { RoutesTouristSpotsService } from "@/api/generated";
import { type NextRequest } from "next/server";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../../lib/route-helper";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ storyChapterId: string }> }
) {
	const { storyChapterId } = await params;

	if (!storyChapterId) {
		return touriiErrorResponse("Story chapter ID is required", 400);
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesTouristSpotsService.touriiBackendControllerGetTouristSpotsByChapterId(
				storyChapterId,
				apiVersion,
				apiKey,
			),
		"GET /api/routes/tourist-spots/[storyChapterId]",
	);
}