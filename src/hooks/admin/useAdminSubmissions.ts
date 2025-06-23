import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";

// Types for admin submissions based on API response structure
export interface SubmissionData {
	userTaskLogId: string;
	userId: string;
	username: string;
	taskId: string;
	questId: string;
	questName?: string;
	taskType: "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT";
	submissionData: {
		image_url?: string;
		answer?: string;
		platform?: string;
		share_url?: string;
		social_url?: string;
		[key: string]: unknown;
	};
	userResponse?: string | null;
	submittedAt: string;
	daysSinceSubmission?: number;
	// Enhanced with task and tourist spot details from API route
	taskDetails?: {
		taskName: string;
		taskDesc: string;
		taskTheme: string;
		requiredAction: string;
		magatamaPointAwarded: number;
	};
	touristSpot?: {
		touristSpotId: string;
		touristSpotName: string;
		touristSpotDesc: string;
		address: string;
		touristSpotLatitude: number;
		touristSpotLongitude: number;
		[key: string]: unknown;
	};
}

export interface AdminSubmissionsResponse {
	submissions?: SubmissionData[];
	pendingSubmissions?: SubmissionData[];
	data?: SubmissionData[];
	pagination?: {
		page: number;
		limit: number;
		totalPages: number;
		totalCount: number;
	};
}

/**
 * Hook to fetch admin submissions using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param params - Query parameters for the admin submissions endpoint
 * @returns Standardized hook result with admin submissions data
 */
export function useAdminSubmissions(params?: {
	page?: number;
	limit?: number;
	taskType?: "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT";
}): UseApiHookResult<AdminSubmissionsResponse> & {
	submissions: SubmissionData[] | undefined;
} {
	// Build query string from parameters
	const queryParams = new URLSearchParams();
	if (params?.page) queryParams.set("page", params.page.toString());
	if (params?.limit) queryParams.set("limit", params.limit.toString());
	if (params?.taskType) queryParams.set("taskType", params.taskType);

	const query = `/api/admin/submissions${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

	const { data, error, isLoading, mutate } =
		useProxySWR<AdminSubmissionsResponse>(query);

	// Check if backend returned an error response
	if (
		data &&
		typeof data === "object" &&
		"code" in data &&
		"message" in data &&
		"type" in data
	) {
		console.error("useAdminSubmissions - Backend error response:", data);
		const backendError = new Error(
			`Backend Error ${data.code}: ${data.message}`,
		);
		return {
			data: undefined,
			isLoading: false,
			isError: true,
			error: backendError,
			mutate,
			submissions: undefined,
		};
	}

	// Extract submissions from either 'submissions' or 'pendingSubmissions' field
	const submissions =
		data?.submissions || data?.pendingSubmissions || undefined;

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Extract submissions array properly
		submissions,
	};
}
