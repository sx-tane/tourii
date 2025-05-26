import { QuestService } from "@/api/generated/services/QuestService";
import { NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET(_request: NextRequest, { params }: { params: { questId: string } }) {
    const { questId } = params;
    if (!questId) {
        return NextResponse.json({ error: "Missing questId" }, { status: 400 });
    }
    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            QuestService.touriiBackendControllerGetQuestById(questId, apiVersion, apiKey),
        `GET /api/quests/${questId}`
    );
} 