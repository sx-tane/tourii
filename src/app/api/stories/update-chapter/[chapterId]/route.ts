import { StoriesService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ chapterId: string }> },
) {
	const { chapterId } = await params;
	if (!chapterId)
		return touriiErrorResponse("Missing chapterId", 400, "BadRequest");

	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				StoriesService.touriiBackendControllerUpdateStoryChapter(
					apiVersion,
					apiKey,
					body,
				),
			`PUT /api/stories/update-chapter/${chapterId}`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
