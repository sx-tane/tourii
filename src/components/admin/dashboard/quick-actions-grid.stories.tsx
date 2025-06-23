import type { Meta, StoryObj } from "@storybook/react";
import QuickActionsGrid from "./quick-actions-grid";
import { BarChart3, Users, Settings } from "lucide-react";

const meta: Meta<typeof QuickActionsGrid> = {
	title: "Admin/Dashboard/QuickActionsGrid",
	component: QuickActionsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const CustomActions: Story = {
	args: {
		actions: [
			{
				title: "Custom Analytics",
				description: "View custom metrics and reports",
				icon: BarChart3,
				href: "/admin/custom-analytics",
				color: "bg-red-100 text-red-800",
			},
			{
				title: "User Settings",
				description: "Configure user management settings",
				icon: Users,
				href: "/admin/user-settings",
				color: "bg-green-100 text-green-800",
			},
			{
				title: "System Settings",
				description: "Configure system-wide settings",
				icon: Settings,
				href: "/admin/system-settings",
				color: "bg-blue-100 text-blue-800",
			},
		],
	},
};
