import type { Meta, StoryObj } from "@storybook/react";
import { SearchAndFilters } from "./search-and-filters";

const meta: Meta<typeof SearchAndFilters> = {
	title: "Admin/Common/SearchAndFilters",
	component: SearchAndFilters,
	parameters: {
		layout: "padded",
	},
	argTypes: {
		onSearchChange: { action: "search changed" },
		onFilterToggle: { action: "filter toggled" },
		onClearAll: { action: "clear all clicked" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const storyQuickFilters = [
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
		searchPlaceholder: "Search stories by name, description, or location...",
		quickFilters: storyQuickFilters,
		activeFilters: [],
		resultsCount: 12,
		totalCount: 12,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "tokyo",
		searchPlaceholder: "Search stories by name, description, or location...",
		quickFilters: storyQuickFilters,
		activeFilters: ["prologue", "missing-media"],
		resultsCount: 3,
		totalCount: 12,
	},
};

export const QuestFilters: Story = {
	args: {
		searchQuery: "",
		searchPlaceholder: "Search quests by name, description, tourist spot, or type...",
		quickFilters: [
			{ id: "unlocked", label: "Unlocked", icon: "🔓" },
			{ id: "locked", label: "Locked", icon: "🔒" },
			{ id: "premium", label: "Premium", icon: "⭐" },
			{ id: "no-tasks", label: "No Tasks", icon: "❌" },
			{ id: "many-tasks", label: "5+ Tasks", icon: "📋" },
			{ id: "high-points", label: "100+ Points", icon: "💰" },
		],
		activeFilters: ["unlocked"],
		resultsCount: 32,
		totalCount: 45,
	},
};