import { StoriesService } from "@/api/generated";
import {
	touriiErrorResponse,
	executeValidatedServiceCall,
} from "@/app/api/lib/route-helper";
import { logger } from "@/utils/logger";

/**
 * POST handler to complete a story chapter and unlock associated quests.
 * This endpoint follows the three-layer API pattern and triggers the backend
 * story completion logic which returns unlocked quests and rewards.
 */
export async function POST(
	request: Request,
	{ params }: { params: Promise<{ chapterId: string }> }
) {
	const { chapterId } = await params;

	if (!chapterId) {
		logger.warn(
			"API POST /api/stories/chapters/[chapterId]/complete: Missing chapterId parameter",
		);
		return touriiErrorResponse("Missing chapter ID", 400, "BadRequest");
	}

	// Parse request body for user ID
	let requestBody;
	try {
		const body = await request.text();
		requestBody = body ? JSON.parse(body) : undefined;
	} catch (error) {
		logger.warn(
			`API POST /api/stories/chapters/${chapterId}/complete: Invalid JSON body`,
		);
		// Continue without body - API can work without it
		requestBody = undefined;
	}

	logger.info(
		`API POST /api/stories/chapters/${chapterId}/complete: Completing story chapter`,
	);

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			StoriesService.touriiBackendControllerHandleStoryAction(
				chapterId,
				"complete",
				apiVersion,
				apiKey,
				requestBody?.userId,
				requestBody,
			),
		`POST /api/stories/chapters/${chapterId}/complete`,
	);
}