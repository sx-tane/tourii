import type { Meta, StoryObj } from "@storybook/react";
import QuestTaskSearchFilters from "./quest-task-search-filters";

const meta: Meta<typeof QuestTaskSearchFilters> = {
	title: "Admin/Quests/QuestTaskSearchFilters",
	component: QuestTaskSearchFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuickFilters = [
	{ id: "gps", label: "GPS Check-in", icon: "📍" },
	{ id: "photo", label: "Photo Upload", icon: "📷" },
	{ id: "qr", label: "QR Scan", icon: "📱" },
	{ id: "text", label: "Text Answer", icon: "✍️" },
	{ id: "social", label: "Social Share", icon: "📢" },
	{ id: "group", label: "Group Quest", icon: "👥" },
];

export const Default: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalTasks: 48,
		filteredCount: 48,
	},
};

export const WithSearch: Story = {
	args: {
		searchQuery: "temple photo",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: [],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalTasks: 48,
		filteredCount: 8,
	},
};

export const WithActiveFilters: Story = {
	args: {
		searchQuery: "",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["photo", "gps"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalTasks: 48,
		filteredCount: 15,
	},
};

export const NoResults: Story = {
	args: {
		searchQuery: "nonexistent task",
		onSearchChange: (query: string) => console.log("Search:", query),
		activeFilters: ["group"],
		onToggleFilter: (filterId: string) => console.log("Toggle filter:", filterId),
		onClearAll: () => console.log("Clear all filters"),
		quickFilters: mockQuickFilters,
		totalTasks: 48,
		filteredCount: 0,
	},
};