import type { Meta, StoryObj } from "@storybook/react";
import StoryBulkActions from "./story-bulk-actions";

const meta: Meta<typeof StoryBulkActions> = {
	title: "Admin/Stories/StoryBulkActions",
	component: StoryBulkActions,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof StoryBulkActions>;

export const Default: Story = {
	args: {
		selectedCount: 3,
		onBulkDelete: () => console.log("Bulk delete"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const SingleSelected: Story = {
	args: {
		selectedCount: 1,
		onBulkDelete: () => console.log("Bulk delete"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const ManySelected: Story = {
	args: {
		selectedCount: 15,
		onBulkDelete: () => console.log("Bulk delete"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onBulkDelete: () => console.log("Bulk delete"),
		onClearSelection: () => console.log("Clear selection"),
	},
};
