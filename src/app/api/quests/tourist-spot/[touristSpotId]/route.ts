import { QuestsService } from "@/api/generated";
import { type NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../../../lib/route-helper";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ touristSpotId: string }> },
): Promise<Response> {
	const { touristSpotId } = await params;
	const searchParams = request.nextUrl.searchParams;
	const userId = searchParams.get("userId");
	const latitude = searchParams.get("latitude")
		? Number(searchParams.get("latitude"))
		: undefined;
	const longitude = searchParams.get("longitude")
		? Number(searchParams.get("longitude"))
		: undefined;

	if (!touristSpotId) {
		return NextResponse.json(
			{ error: "Missing touristSpotId" },
			{ status: 400 },
		);
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			QuestsService.touriiBackendControllerGetQuestByTouristSpotId(
				touristSpotId,
				apiVersion,
				apiKey,
				userId ?? undefined,
				latitude,
				longitude,
			),
		`GET /api/quests/tourist-spot/${touristSpotId}`,
	);
}
