import { MomentsService } from "@/api/generated";
import { type NextRequest, NextResponse } from "next/server";
import { executeValidatedServiceCall } from "../lib/route-helper";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const page = Number(searchParams.get("page")) || 1;
	const limit = Number(searchParams.get("limit")) || 10;

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			MomentsService.touriiBackendControllerGetMoments(
				apiVersion,
				apiKey,
				limit,
				page,
			),
		"GET /api/moments",
	);
}
