import type { Meta, StoryObj } from "@storybook/react";
import TouristSpotBulkActions from "./tourist-spot-bulk-actions";

const meta: Meta<typeof TouristSpotBulkActions> = {
	title: "Admin/ModelRoutes/TouristSpotBulkActions",
	component: TouristSpotBulkActions,
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
		onBulkDelete: () => console.log("Bulk delete tourist spots"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const MultipleSelection: Story = {
	args: {
		selectedCount: 6,
		onBulkDelete: () => console.log("Bulk delete tourist spots"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const LargeSelection: Story = {
	args: {
		selectedCount: 18,
		onBulkDelete: () => console.log("Bulk delete tourist spots"),
		onClearSelection: () => console.log("Clear selection"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onBulkDelete: () => console.log("Bulk delete tourist spots"),
		onClearSelection: () => console.log("Clear selection"),
	},
};