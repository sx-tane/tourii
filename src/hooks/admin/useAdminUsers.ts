import type { AdminUserListResponseDto } from "@/api/generated";
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch admin users using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param params - Query parameters for the admin users endpoint
 * @returns Standardized hook result with admin users data
 */
export function useAdminUsers(params?: {
	page?: number;
	limit?: number;
	sortOrder?: "asc" | "desc";
	sortBy?:
		| "username"
		| "registered_at"
		| "total_quest_completed"
		| "total_travel_distance";
	endDate?: string;
	startDate?: string;
	isBanned?: string;
	isPremium?: string;
	role?: "USER" | "MODERATOR" | "ADMIN";
	searchTerm?: string;
}): UseApiHookResult<AdminUserListResponseDto> & {
	users: AdminUserListResponseDto | undefined;
} {
	// Build query string from parameters
	const queryParams = new URLSearchParams();
	if (params?.page) queryParams.set("page", params.page.toString());
	if (params?.limit) queryParams.set("limit", params.limit.toString());
	if (params?.sortOrder) queryParams.set("sortOrder", params.sortOrder);
	if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
	if (params?.endDate) queryParams.set("endDate", params.endDate);
	if (params?.startDate) queryParams.set("startDate", params.startDate);
	if (params?.isBanned) queryParams.set("isBanned", params.isBanned);
	if (params?.isPremium) queryParams.set("isPremium", params.isPremium);
	if (params?.role) queryParams.set("role", params.role);
	if (params?.searchTerm) queryParams.set("searchTerm", params.searchTerm);

	const query = `/api/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

	const { data, error, isLoading, mutate } =
		useProxySWR<AdminUserListResponseDto>(query);

	// Check if backend returned an error response
	if (
		data &&
		typeof data === "object" &&
		"code" in data &&
		"message" in data &&
		"type" in data
	) {
		const backendError = new Error(
			`Backend Error ${data.code}: ${data.message}`,
		);
		return {
			data: undefined,
			isLoading: false,
			isError: true,
			error: backendError,
			mutate,
			users: undefined,
		};
	}

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Legacy property for backward compatibility
		users: data,
	};
}
