import { StoriesService } from "@/api/generated";
import {
	touriiErrorResponse,
	executeValidatedServiceCall,
} from "@/app/api/lib/route-helper";
import { logger } from "@/utils/logger";

/**
 * GET handler to fetch a single story's chapters by its ID from the backend service via proxy.
 */
export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ storyId: string }> },
) {
	// Adjusted params for App Router convention
	const { storyId } = await params;

	if (!storyId) {
		logger.warn(
			"API GET /api/stories/[storyId]/chapters: Missing storyId parameter",
		);
		return touriiErrorResponse("Missing story ID", 400, "BadRequest");
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			StoriesService.touriiBackendControllerGetStoryChaptersByStoryId(
				storyId,
				apiVersion,
				apiKey,
			),
		`GET /api/stories/${storyId}/chapters`,
	);
}
