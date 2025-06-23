import type { Meta, StoryObj } from "@storybook/react";
import StoryChapterBulkActions from "./story-chapter-bulk-actions";

const meta: Meta<typeof StoryChapterBulkActions> = {
	title: "Admin/Stories/StoryChapterBulkActions",
	component: StoryChapterBulkActions,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {
	args: {
		selectedChapters: ["CHAPTER-001"],
		onBulkDelete: () => console.log("Bulk delete chapters"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const MultipleSelection: Story = {
	args: {
		selectedChapters: ["CHAPTER-001", "CHAPTER-002", "CHAPTER-003"],
		onBulkDelete: () => console.log("Bulk delete chapters"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const LargeSelection: Story = {
	args: {
		selectedChapters: [
			"CHAPTER-001",
			"CHAPTER-002", 
			"CHAPTER-003",
			"CHAPTER-004",
			"CHAPTER-005",
			"CHAPTER-006",
			"CHAPTER-007",
			"CHAPTER-008",
			"CHAPTER-009",
			"CHAPTER-010",
		],
		onBulkDelete: () => console.log("Bulk delete chapters"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedChapters: [],
		onBulkDelete: () => console.log("Bulk delete chapters"),
		onClearSelection: () => console.log("Clear selection"),
	},
};