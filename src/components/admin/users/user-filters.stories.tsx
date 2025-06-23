import type { Meta, StoryObj } from "@storybook/react";
import UserFilters from "./user-filters";

const meta: Meta<typeof UserFilters> = {
	title: "Admin/Users/UserFilters",
	component: UserFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		searchTerm: "",
		roleFilter: "",
		isPremiumFilter: "",
		isBannedFilter: "",
		sortBy: "registered_at",
		sortOrder: "desc",
		limit: 20,
		onSearchChange: (value: string) => console.log("Search:", value),
		onRoleFilterChange: (value: "" | "USER" | "MODERATOR" | "ADMIN") =>
			console.log("Role filter:", value),
		onPremiumFilterChange: (value: "" | "true" | "false") =>
			console.log("Premium filter:", value),
		onBannedFilterChange: (value: "" | "true" | "false") =>
			console.log("Banned filter:", value),
		onSortByChange: (
			value:
				| "username"
				| "registered_at"
				| "total_quest_completed"
				| "total_travel_distance",
		) => console.log("Sort by:", value),
		onSortOrderChange: (value: "asc" | "desc") =>
			console.log("Sort order:", value),
		onLimitChange: (value: number) => console.log("Limit:", value),
		onClearFilters: () => console.log("Clear filters"),
	},
};

export const WithFilters: Story = {
	args: {
		searchTerm: "john@example.com",
		roleFilter: "USER",
		isPremiumFilter: "true",
		isBannedFilter: "false",
		sortBy: "username",
		sortOrder: "asc",
		limit: 50,
		onSearchChange: (value: string) => console.log("Search:", value),
		onRoleFilterChange: (value: "" | "USER" | "MODERATOR" | "ADMIN") =>
			console.log("Role filter:", value),
		onPremiumFilterChange: (value: "" | "true" | "false") =>
			console.log("Premium filter:", value),
		onBannedFilterChange: (value: "" | "true" | "false") =>
			console.log("Banned filter:", value),
		onSortByChange: (
			value:
				| "username"
				| "registered_at"
				| "total_quest_completed"
				| "total_travel_distance",
		) => console.log("Sort by:", value),
		onSortOrderChange: (value: "asc" | "desc") =>
			console.log("Sort order:", value),
		onLimitChange: (value: number) => console.log("Limit:", value),
		onClearFilters: () => console.log("Clear filters"),
	},
};
