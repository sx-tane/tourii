import { UserService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { validateUserAccess } from "@/lib/auth/utils";
import { type NextRequest, NextResponse } from "next/server";

/**
 * GET /api/checkins
 * 
 * Fetches user check-ins with filtering and pagination
 * SECURITY: Now uses proper session-based authentication
 */
export async function GET(request: NextRequest) {
	// Validate user authentication
	const { success, user, error } = await validateUserAccess("USER");
	
	if (!success || !user) {
		return NextResponse.json(
			{ error: error || "Authentication required" },
			{ status: 401 }
		);
	}

	const { searchParams } = new URL(request.url);

	// Input validation for query parameters
	const page = Math.max(
		1,
		Number.parseInt(searchParams.get("page") || "1", 10),
	);
	const limit = Math.min(
		100,
		Math.max(1, Number.parseInt(searchParams.get("limit") || "20", 10)),
	);
	const userId = searchParams.get("userId");
	const questId = searchParams.get("questId");
	const touristSpotId = searchParams.get("touristSpotId");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");

	// Use authenticated user's ID for check-ins
	return executeValidatedServiceCall((apiKey: string, apiVersion: string) => {
		return UserService.touriiBackendControllerGetCheckins(
			apiVersion,
			apiKey,
			endDate || "",
			startDate || "",
			touristSpotId || undefined,
			questId || undefined,
			user.id, // Use authenticated user's ID
			limit.toString(),
			page,
		);
	}, "GET /api/checkins");
}
