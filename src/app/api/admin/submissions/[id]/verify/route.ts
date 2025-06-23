import { VerifySubmissionRequestDto } from "@/api/generated";
import { AdminService } from "@/api/generated/services/AdminService";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";

interface RouteParams {
	params: Promise<{
		id: string;
	}>;
}

export async function POST(request: Request, { params }: RouteParams) {
	const { id } = await params;

	try {
		const body: VerifySubmissionRequestDto = await request.json();

		const userId = "TSU202506-614e2f-211442-172685-KAAA"; // TODO: Get from session/auth

		// Use executeValidatedServiceCall with our custom function
		const response = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AdminService.touriiBackendControllerVerifySubmission(
					id,
					apiVersion,
					userId,
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
