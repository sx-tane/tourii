import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteBulkActions from "./model-route-bulk-actions";

const meta: Meta<typeof ModelRouteBulkActions> = {
	title: "Admin/ModelRoutes/ModelRouteBulkActions",
	component: ModelRouteBulkActions,
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
		onBulkDelete: () => console.log("Bulk delete routes"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const MultipleSelection: Story = {
	args: {
		selectedCount: 4,
		onBulkDelete: () => console.log("Bulk delete routes"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const LargeSelection: Story = {
	args: {
		selectedCount: 12,
		onBulkDelete: () => console.log("Bulk delete routes"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onBulkDelete: () => console.log("Bulk delete routes"),
		onClearSelection: () => console.log("Clear selection"),
	},
};