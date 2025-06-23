import type { Meta, StoryObj } from "@storybook/react";
import QuestSearchFilters from "./quest-search-filters";

const meta: Meta<typeof QuestSearchFilters> = {
	title: "Admin/Quests/QuestSearchFilters",
	component: QuestSearchFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuickFilters = [
	{ id: "unlocked", label: "Unlocked", icon: "🔓" },
	{ id: "premium", label: "Premium", icon: "⭐" },
	{ id: "withTasks", label: "Has Tasks", icon: "📋" },
	{ id: "withImages", label: "Has Images", icon: "🖼️" },
	{ id: "noTouristSpot", label: "No Tourist Spot", icon: "⚠️" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalQuests: 145,
		filteredCount: 145,
	},
};

export const WithSearch: Story = {
	args: {
		searchQuery: "temple adventure",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalQuests: 145,
		filteredCount: 23,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["unlocked", "premium"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalQuests: 145,
		filteredCount: 34,
	},
};

export const WithSearchAndFilters: Story = {
	args: {
		searchQuery: "kyoto",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["withTasks", "withImages"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalQuests: 145,
		filteredCount: 12,
	},
};

export const NoResults: Story = {
	args: {
		searchQuery: "nonexistent quest",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["noTouristSpot"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalQuests: 145,
		filteredCount: 0,
	},
};