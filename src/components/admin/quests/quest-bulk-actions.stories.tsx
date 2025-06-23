import type { Meta, StoryObj } from "@storybook/react";
import QuestBulkActions from "./quest-bulk-actions";

const meta: Meta<typeof QuestBulkActions> = {
	title: "Admin/Quests/QuestBulkActions",
	component: QuestBulkActions,
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
		onBulkDelete: () => console.log("Bulk delete quests"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const MultipleSelection: Story = {
	args: {
		selectedCount: 5,
		onBulkDelete: () => console.log("Bulk delete quests"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const LargeSelection: Story = {
	args: {
		selectedCount: 23,
		onBulkDelete: () => console.log("Bulk delete quests"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onBulkDelete: () => console.log("Bulk delete quests"),
		onClearSelection: () => console.log("Clear selection"),
	},
};