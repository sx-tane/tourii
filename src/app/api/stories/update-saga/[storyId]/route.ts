import { StoriesService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ storyId: string }> },
) {
	const { storyId } = await params;
	if (!storyId)
		return touriiErrorResponse("Missing storyId", 400, "BadRequest");

	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				StoriesService.touriiBackendControllerUpdateStory(
					apiVersion,
					apiKey,
					body,
				),
			`PUT /api/stories/update-saga/${storyId}`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
