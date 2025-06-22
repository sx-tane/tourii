import { StoriesService } from "@/api/generated";
import type { NextRequest } from "next/server";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../../lib/route-helper";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ chapterId: string }> }
) {
	const { chapterId } = await params;
	if (!chapterId) return touriiErrorResponse("Missing chapterId", 400, "BadRequest");

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			StoriesService.touriiBackendControllerDeleteStoryChapter(chapterId, apiVersion, apiKey),
		`DELETE /api/stories/delete-chapter/${chapterId}`
	);
} 