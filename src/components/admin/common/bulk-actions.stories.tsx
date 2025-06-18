import type { Meta, StoryObj } from "@storybook/react";
import { BulkActions } from "./bulk-actions";
import { Trash2, Archive } from "lucide-react";

const meta: Meta<typeof BulkActions> = {
	title: "Admin/Common/BulkActions",
	component: BulkActions,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSelectedItems: Story = {
	args: {
		selectedCount: 3,
		onClear: () => console.log("Clear selection"),
		actions: [
			{
				id: "archive",
				label: "Archive Selected",
				icon: Archive,
				onClick: () => console.log("Archive items"),
				variant: "default",
			},
			{
				id: "delete",
				label: "Delete Selected",
				icon: Trash2,
				onClick: () => console.log("Delete items"),
				variant: "danger",
			},
		],
	},
};

export const SingleAction: Story = {
	args: {
		selectedCount: 1,
		onClear: () => console.log("Clear selection"),
		actions: [
			{
				id: "delete",
				label: "Delete Selected",
				icon: Trash2,
				onClick: () => console.log("Delete item"),
				variant: "danger",
			},
		],
	},
};

export const ManySelected: Story = {
	args: {
		selectedCount: 25,
		onClear: () => console.log("Clear selection"),
		actions: [
			{
				id: "delete",
				label: "Delete All Selected",
				icon: Trash2,
				onClick: () => console.log("Delete many items"),
				variant: "danger",
			},
		],
	},
};