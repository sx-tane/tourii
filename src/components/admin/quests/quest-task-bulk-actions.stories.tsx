import type { Meta, StoryObj } from "@storybook/react";
import QuestTaskBulkActions from "./quest-task-bulk-actions";

const meta: Meta<typeof QuestTaskBulkActions> = {
	title: "Admin/Quests/QuestTaskBulkActions",
	component: QuestTaskBulkActions,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {
	args: {
		selectedCount: 1,
		onBulkDelete: () => console.log("Bulk delete tasks"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const MultipleSelection: Story = {
	args: {
		selectedCount: 7,
		onBulkDelete: () => console.log("Bulk delete tasks"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const LargeSelection: Story = {
	args: {
		selectedCount: 15,
		onBulkDelete: () => console.log("Bulk delete tasks"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onBulkDelete: () => console.log("Bulk delete tasks"),
		onClearSelection: () => console.log("Clear selection"),
	},
};