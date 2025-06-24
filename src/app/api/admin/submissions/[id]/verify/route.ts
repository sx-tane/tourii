import { VerifySubmissionRequestDto } from "@/api/generated";
import { AdminService } from "@/api/generated/services/AdminService";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { validateUserAccess } from "@/lib/auth/utils";
import { NextResponse } from "next/server";

interface RouteParams {
	params: Promise<{
		id: string;
	}>;
}

/**
 * POST /api/admin/submissions/[id]/verify
 * 
 * Admin endpoint to verify user submissions
 * SECURITY: Requires ADMIN role authentication
 */
export async function POST(request: Request, { params }: RouteParams) {
	const { id } = await params;

	// Validate admin authentication
	const { success, user, error } = await validateUserAccess("ADMIN");
	
	if (!success || !user) {
		return NextResponse.json(
			{ error: error || "Admin access required" },
			{ status: 403 }
		);
	}

	try {
		const body: VerifySubmissionRequestDto = await request.json();

		// Use executeValidatedServiceCall with our custom function
		const response = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AdminService.touriiBackendControllerVerifySubmission(
					id,
					apiVersion,
					user.id,
					apiKey,
					body,
				),
			"AdminService.verifySubmission",
		);

		// Extract JSON data from NextResponse
		const result = await response.json();
		return Response.json(result);
	} catch (_error) {
		return Response.json(
			{ error: "Failed to verify submission" },
			{ status: 500 },
		);
	}
}
