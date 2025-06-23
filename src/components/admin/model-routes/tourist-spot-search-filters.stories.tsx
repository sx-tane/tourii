import type { Meta, StoryObj } from "@storybook/react";
import TouristSpotSearchFilters from "./tourist-spot-search-filters";

const meta: Meta<typeof TouristSpotSearchFilters> = {
	title: "Admin/ModelRoutes/TouristSpotSearchFilters",
	component: TouristSpotSearchFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuickFilters = [
	{ id: "withHashtags", label: "Has Hashtags", icon: "🏷️" },
	{ id: "withMainImage", label: "Has Main Image", icon: "🖼️" },
	{ id: "withGallery", label: "Has Gallery", icon: "📷" },
	{ id: "withVisitTime", label: "Has Visit Time", icon: "⏰" },
	{ id: "noDescription", label: "No Description", icon: "⚠️" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalSpots: 156,
		filteredCount: 156,
	},
};

export const WithSearch: Story = {
	args: {
		searchQuery: "temple shrine",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalSpots: 156,
		filteredCount: 28,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["withMainImage", "withHashtags"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalSpots: 156,
		filteredCount: 89,
	},
};

export const NoResults: Story = {
	args: {
		searchQuery: "nonexistent spot",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["noDescription"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalSpots: 156,
		filteredCount: 0,
	},
};