import { StoriesService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function POST(
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
				StoriesService.touriiBackendControllerCreateStoryChapter(
					storyId,
					apiVersion,
					apiKey,
					body,
				),
			`POST /api/stories/create-chapter/${storyId}`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
