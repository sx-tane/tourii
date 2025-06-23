import { QuestService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ taskId: string }> },
) {
	const { taskId } = await params;
	if (!taskId) return touriiErrorResponse("Missing taskId", 400, "BadRequest");

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			QuestService.touriiBackendControllerDeleteQuestTask(
				taskId,
				apiVersion,
				apiKey,
			),
		`DELETE /api/quests/delete-task/${taskId}`,
	);
}
