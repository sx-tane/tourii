import { QuestService } from "@/api/generated";
import type { NextRequest } from "next/server";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../../lib/route-helper";

export async function POST(request: NextRequest, { params }: { params: Promise<{ questId: string }> }) {
    const { questId } = await params;
    if (!questId) return touriiErrorResponse("Missing questId", 400, "BadRequest");
    try {
        const body = await request.json();
        return executeValidatedServiceCall(
            (apiKey: string, apiVersion: string) =>
                QuestService.touriiBackendControllerCreateQuestTask(questId, apiVersion, apiKey, body),
            `POST /api/quests/create-task/${questId}`
        );
    } catch {
        return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
    }
}
