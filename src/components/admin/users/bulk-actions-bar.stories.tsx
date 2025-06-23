import type { Meta, StoryObj } from "@storybook/react";
import BulkActionsBar from "./bulk-actions-bar";

const meta: Meta<typeof BulkActionsBar> = {
	title: "Admin/Users/BulkActionsBar",
	component: BulkActionsBar,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSelectedUsers: Story = {
	args: {
		selectedCount: 5,
		onCancel: () => console.log("Cancel clicked"),
	},
};

export const NoSelection: Story = {
	args: {
		selectedCount: 0,
		onCancel: () => console.log("Cancel clicked"),
	},
};

export const ManySelected: Story = {
	args: {
		selectedCount: 47,
		onCancel: () => console.log("Cancel clicked"),
	},
};
