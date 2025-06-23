import { StoriesService } from "@/api/generated";
import {
	touriiErrorResponse,
	executeValidatedServiceCall,
} from "../../lib/route-helper";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				StoriesService.touriiBackendControllerUpdateStoryChapter(
					apiVersion,
					apiKey,
					body,
				),
			"POST /api/stories/update-chapter",
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
