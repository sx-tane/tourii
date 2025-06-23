import { AdminService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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

	const userId = "TSU202506-ae8a85-222006-4bdd44-BAAA"; // TODO: Get from session/auth

	try {
		// Use the generated AdminService - executeValidatedServiceCall returns NextResponse
		return await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AdminService.touriiBackendControllerGetAllUsersForAdmin(
					apiVersion,
					userId,
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
		return Response.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}
