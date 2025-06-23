import { QuestService } from "@/api/generated";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../lib/route-helper";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				QuestService.touriiBackendControllerUpdateQuestTask(
					apiVersion,
					apiKey,
					body,
				),
			"POST /api/quests/update-task",
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
