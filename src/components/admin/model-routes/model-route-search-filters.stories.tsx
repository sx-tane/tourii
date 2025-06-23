import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteSearchFilters from "./model-route-search-filters";

const meta: Meta<typeof ModelRouteSearchFilters> = {
	title: "Admin/ModelRoutes/ModelRouteSearchFilters",
	component: ModelRouteSearchFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuickFilters = [
	{ id: "withSpots", label: "Has Tourist Spots", icon: "🏖️" },
	{ id: "withRecommendations", label: "Has Recommendations", icon: "💡" },
	{ id: "missingMedia", label: "Missing Media", icon: "⚠️" },
	{ id: "withHashtags", label: "Has Hashtags", icon: "🏷️" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalRoutes: 45,
		filteredCount: 45,
	},
};

export const WithSearch: Story = {
	args: {
		searchQuery: "kyoto temples",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalRoutes: 45,
		filteredCount: 12,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["withSpots", "withRecommendations"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalRoutes: 45,
		filteredCount: 25,
	},
};

export const NoResults: Story = {
	args: {
		searchQuery: "nonexistent route",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["missingMedia"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalRoutes: 45,
		filteredCount: 0,
	},
};