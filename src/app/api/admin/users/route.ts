import { AdminService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { validateUserAccess } from "@/lib/auth/utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/users
 * 
 * Admin endpoint to fetch all users with filtering and pagination
 * SECURITY: Requires ADMIN role authentication
 */
export async function GET(request: NextRequest) {
	// Validate admin authentication
	const { success, user, error } = await validateUserAccess("ADMIN");
	
	if (!success || !user) {
		return NextResponse.json(
			{ error: error || "Admin access required" },
			{ status: 403 }
		);
	}

	const { searchParams } = new URL(request.url);

	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
	const limit = searchParams.get("limit")
		? Number(searchParams.get("limit"))
		: 20;
	const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | undefined;
	const sortBy = searchParams.get("sortBy") as
		| "username"
		| "registered_at"
		| "total_quest_completed"
		| "total_travel_distance"
		| undefined;
	const endDate = searchParams.get("endDate") || undefined;
	const startDate = searchParams.get("startDate") || undefined;
	const isBanned = searchParams.get("isBanned") || undefined;
	const isPremium = searchParams.get("isPremium") || undefined;
	const role = searchParams.get("role") as
		| "USER"
		| "MODERATOR"
		| "ADMIN"
		| undefined;
	const searchTerm = searchParams.get("searchTerm") || undefined;

	try {
		// Use authenticated user's ID for admin operations
		return await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AdminService.touriiBackendControllerGetAllUsersForAdmin(
					apiVersion,
					user.id,
					apiKey,
					sortOrder,
					sortBy,
					endDate,
					startDate,
					isBanned,
					isPremium,
					role,
					searchTerm,
					limit,
					page,
				),
			"AdminService.getAllUsersForAdmin",
		);
	} catch (error) {
		console.error("🔍 Admin Users API - Error:", error);
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}
