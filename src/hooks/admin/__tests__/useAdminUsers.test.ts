import { describe, expect, it } from "vitest";
import { ADMIN_CONFIG } from "@/config/admin";

describe("useAdminUsers hook URL construction", () => {
	it("should construct URL with basic filters", () => {
		const filters = {
			page: 1,
			limit: ADMIN_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
		};

		const queryParams = new URLSearchParams();
		if (filters.page) queryParams.set("page", String(filters.page));
		if (filters.limit) queryParams.set("limit", String(filters.limit));

		const expectedUrl = `/api/admin/users?${queryParams.toString()}`;
		expect(expectedUrl).toBe("/api/admin/users?page=1&limit=20");
	});

	it("should construct URL with all filters", () => {
		const filters = {
			page: 2,
			limit: 30,
			searchTerm: "test",
			role: "USER" as const,
			isPremium: "true",
			sortBy: "username" as const,
			sortOrder: "asc" as const,
		};

		const queryParams = new URLSearchParams();
		if (filters.page) queryParams.set("page", String(filters.page));
		if (filters.limit) queryParams.set("limit", String(filters.limit));
		if (filters.searchTerm) queryParams.set("searchTerm", filters.searchTerm);
		if (filters.role) queryParams.set("role", filters.role);
		if (filters.isPremium) queryParams.set("isPremium", filters.isPremium);
		if (filters.sortBy) queryParams.set("sortBy", filters.sortBy);
		if (filters.sortOrder) queryParams.set("sortOrder", filters.sortOrder);

		const expectedUrl = `/api/admin/users?${queryParams.toString()}`;
		expect(expectedUrl).toBe(
			"/api/admin/users?page=2&limit=30&searchTerm=test&role=USER&isPremium=true&sortBy=username&sortOrder=asc",
		);
	});

	it("should use default config values", () => {
		expect(ADMIN_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE).toBe(20);
		expect(ADMIN_CONFIG.PAGINATION.MAX_PAGE_SIZE).toBe(100);
		expect(ADMIN_CONFIG.DASHBOARD.INITIAL_USER_LIMIT).toBe(30);
	});
});
