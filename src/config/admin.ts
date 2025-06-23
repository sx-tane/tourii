/**
 * Admin Dashboard Configuration
 * Centralized configuration for admin functionality
 */

export const ADMIN_CONFIG = {
	// Data fetching limits
	DASHBOARD: {
		INITIAL_USER_LIMIT: 30,
		INITIAL_SUBMISSION_LIMIT: 30,
		INITIAL_QUEST_LIMIT: 30,
		REFRESH_INTERVAL: 30000, // 30 seconds
	},

	// Pagination settings
	PAGINATION: {
		DEFAULT_PAGE_SIZE: 20,
		MAX_PAGE_SIZE: 100,
		USER_MANAGEMENT_PAGE_SIZE: 25,
		SUBMISSION_REVIEW_PAGE_SIZE: 15,
	},

	// Performance settings
	PERFORMANCE: {
		QUEST_BATCH_SIZE: 10, // For parallel quest fetching
		API_TIMEOUT: 10000, // 10 seconds
		DEBOUNCE_DELAY: 300, // For search inputs
	},

	// UI settings
	UI: {
		STATS_UPDATE_INTERVAL: 5000, // 5 seconds for live stats
		TOAST_DURATION: 4000,
		MODAL_CLOSE_DELAY: 1000,
	},

	// Feature flags
	FEATURES: {
		ENABLE_REAL_TIME_UPDATES: true,
		ENABLE_BULK_OPERATIONS: true,
		ENABLE_ADVANCED_FILTERS: true,
		ENABLE_EXPORT_FUNCTIONS: true,
	},

	// Status mappings
	STATUS: {
		SUBMISSION_STATUSES: [
			"PENDING",
			"APPROVED",
			"REJECTED",
			"IN_REVIEW",
		] as const,
		TASK_TYPES: [
			"PHOTO_UPLOAD",
			"SHARE_SOCIAL",
			"ANSWER_TEXT",
			"CHECK_IN",
			"QR_SCAN",
		] as const,
		USER_ROLES: ["USER", "MODERATOR", "ADMIN"] as const,
	},
} as const;

// Type definitions for configuration
export type AdminConfig = typeof ADMIN_CONFIG;
export type SubmissionStatus =
	(typeof ADMIN_CONFIG.STATUS.SUBMISSION_STATUSES)[number];
export type TaskType = (typeof ADMIN_CONFIG.STATUS.TASK_TYPES)[number];
export type UserRole = (typeof ADMIN_CONFIG.STATUS.USER_ROLES)[number];
