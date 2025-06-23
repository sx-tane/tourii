import type { Meta, StoryObj } from "@storybook/react";
import StorySearchFilters from "./story-search-filters";

const meta: Meta<typeof StorySearchFilters> = {
	title: "Admin/Stories/StorySearchFilters",
	component: StorySearchFilters,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof StorySearchFilters>;

const quickFilters = [
	{ id: "prologue", label: "Prologue", icon: "📖" },
	{ id: "main-story", label: "Main Story", icon: "📚" },
	{ id: "selected", label: "Selected", icon: "⭐" },
	{ id: "no-chapters", label: "No Chapters", icon: "❌" },
	{ id: "missing-media", label: "Missing Media", icon: "🖼️" },
	{ id: "no-location", label: "No Location", icon: "📍" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) =>
			console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all"),
		quickFilters,
		totalStories: 25,
		filteredCount: 25,
	},
};

export const WithSearchQuery: Story = {
	args: {
		...Default.args,
		searchQuery: "Tokyo adventure",
		filteredCount: 3,
	},
};

export const WithActiveFilters: Story = {
	args: {
		...Default.args,
		activeFilters: ["prologue", "missing-media"],
		filteredCount: 8,
	},
};

export const WithSearchAndFilters: Story = {
	args: {
		...Default.args,
		searchQuery: "mythology",
		activeFilters: ["main-story", "selected"],
		filteredCount: 2,
	},
};
