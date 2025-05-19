import { QuestService } from "@/api/generated/services/QuestService";
import { NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../lib/route-helper";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const questType = searchParams.get("type") as "UNKNOWN" | "TRAVEL_TO_EARN" | "EARN_TO_TRAVEL" | "CAMPAIGN" | "COMMUNITY_EVENT" | null;
    const isUnlocked = searchParams.get("unlocked") === "true" ? true : searchParams.get("unlocked") === "false" ? false : null;
    const isPremium = searchParams.get("premium") === "true" ? true : searchParams.get("premium") === "false" ? false : null;

    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            QuestService.touriiBackendControllerGetQuestList(
                apiVersion,
                apiKey,
                questType || undefined,
                isUnlocked || undefined,
                isPremium || undefined,
                20, // limit per page
                page
            ),
        "GET /api/quests"
    );
} 