import { QuestService } from "@/api/generated/services/QuestService";
import { NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET(
    _request: NextRequest, 
    { params }: { params: Promise<{ questId: string }> }
) {
    const { questId } = await params;

    if (!questId) {
        return NextResponse.json({ error: "Missing questId" }, { status: 400 });
    }
    
    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            QuestService.touriiBackendControllerGetQuestById(questId, apiVersion, apiKey),
        `GET /api/quests/${questId}`
    );
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ questId: string }> }
) {
    const { questId } = await params;

    if (!questId) {
        return NextResponse.json({ error: "Missing questId" }, { status: 400 });
    }

    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            QuestService.touriiBackendControllerDeleteQuest(questId, apiVersion, apiKey),
        `DELETE /api/quests/${questId}`
    );
} 