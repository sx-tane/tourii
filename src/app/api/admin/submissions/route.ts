import { AdminService, QuestService } from "@/api/generated";
import type { NextRequest } from "next/server";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
	const limit = searchParams.get("limit")
		? Number(searchParams.get("limit"))
		: 20;
	const taskType = searchParams.get("taskType") as
		| "PHOTO_UPLOAD"
		| "SHARE_SOCIAL"
		| "ANSWER_TEXT"
		| undefined;

	const userId = "TSU202506-614e2f-211442-172685-KAAA"; // TODO: Get from session/auth

	try {
		// Fetch submissions using executeValidatedServiceCall
		const submissionsResponse = await executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				AdminService.touriiBackendControllerGetPendingSubmissions(
					apiVersion,
					userId,
					apiKey,
					page,
					limit,
					taskType,
				),
			"AdminService.getPendingSubmissions",
		);

		// Since executeValidatedServiceCall returns NextResponse, we need to extract the JSON data
		const submissionsData = await submissionsResponse.json();

		// Extract submissions from the response
		const submissions =
			submissionsData?.submissions || submissionsData?.pendingSubmissions || [];

		if (submissions.length === 0) {
			return Response.json(submissionsData);
		}

		// Get unique quest IDs to minimize API calls
		const questIds = [
			...new Set(
				submissions
					.map((s: unknown) => (s as Record<string, unknown>)?.questId)
					.filter(Boolean),
			),
		];
		const questDetailsMap = new Map();

		// Fetch quest details for all unique questIds using executeValidatedServiceCall
		for (const questId of questIds) {
			try {
				const questResponse = await executeValidatedServiceCall(
					(apiKey: string, apiVersion: string) =>
						QuestService.touriiBackendControllerGetQuestById(
							String(questId),
							apiVersion,
							apiKey,
							userId,
						),
					"QuestService.getQuestById",
				);
				// Extract JSON data from NextResponse
				const questDetails = await questResponse.json();
				questDetailsMap.set(questId, questDetails);
			} catch (error) {
				console.warn(`Failed to fetch quest details for ${questId}:`, error);
			}
		}

		// Enhance each submission with task and tourist spot details
		const enhancedSubmissions = submissions.map((submission: unknown) => {
			const submissionData = submission as Record<string, unknown>;
			const questDetails = questDetailsMap.get(submissionData.questId);

			let enhancedSubmission = { ...submissionData };

			// Add task details
			if (questDetails?.tasks) {
				const taskDetails = questDetails.tasks.find(
					(task: unknown) =>
						(task as Record<string, unknown>)?.taskId === submissionData.taskId,
				);
				if (taskDetails) {
					const taskData = taskDetails as Record<string, unknown>;
					enhancedSubmission.taskDetails = {
						taskName: taskData.taskName,
						taskDesc: taskData.taskDesc,
						taskTheme: taskData.taskTheme,
						requiredAction: taskData.requiredAction,
						magatamaPointAwarded: taskData.magatamaPointAwarded,
					};
				}
			}

			// Add tourist spot details from quest
			if (questDetails?.touristSpot) {
				enhancedSubmission.touristSpot = questDetails.touristSpot;
			}

			return enhancedSubmission;
		});

		// Return enhanced submissions with the same structure as original response
		const enhancedResponse = { ...submissionsData };
		if (enhancedResponse.submissions) {
			enhancedResponse.submissions = enhancedSubmissions;
		} else if (enhancedResponse.pendingSubmissions) {
			enhancedResponse.pendingSubmissions = enhancedSubmissions;
		}

		return Response.json(enhancedResponse);
	} catch (error) {
		console.error("Admin Submissions API - Error:", error);
		return Response.json(
			{ error: "Failed to fetch submissions" },
			{ status: 500 },
		);
	}
}
