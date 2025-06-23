import type { Meta, StoryObj } from "@storybook/react";
import StoryChapterSearchFilters from "./story-chapter-search-filters";

const meta: Meta<typeof StoryChapterSearchFilters> = {
	title: "Admin/Stories/StoryChapterSearchFilters",
	component: StoryChapterSearchFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuickFilters = [
	{ id: "unlocked", label: "Unlocked", icon: "🔓" },
	{ id: "withCharacters", label: "Has Characters", icon: "👥" },
	{ id: "withVideos", label: "Has Videos", icon: "🎥" },
	{ id: "withPDFs", label: "Has PDFs", icon: "📄" },
	{ id: "missingImages", label: "Missing Images", icon: "⚠️" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		filteredCount: 156,
		totalCount: 156,
	},
};

export const WithSearch: Story = {
	args: {
		searchQuery: "sakura temple",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		filteredCount: 12,
		totalCount: 156,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["unlocked", "withVideos"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		filteredCount: 89,
		totalCount: 156,
	},
};

export const WithSearchAndFilters: Story = {
	args: {
		searchQuery: "chapter 1",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["withCharacters", "withPDFs"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		filteredCount: 5,
		totalCount: 156,
	},
};

export const NoResults: Story = {
	args: {
		searchQuery: "nonexistent chapter",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["missingImages"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		filteredCount: 0,
		totalCount: 156,
	},
};