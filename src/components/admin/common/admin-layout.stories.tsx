import type { Meta, StoryObj } from "@storybook/react";
import { AdminLayout } from "./admin-layout";

const meta: Meta<typeof AdminLayout> = {
	title: "Admin/Common/AdminLayout",
	component: AdminLayout,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		onCreateClick: { action: "create clicked" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Story Management",
		description: "Manage your tourism content platform efficiently",
		createButtonText: "Create New Story",
		children: (
			<div className="bg-white p-6 rounded-lg shadow">
				<p className="text-charcoal">Content goes here...</p>
			</div>
		),
	},
};

export const WithoutDescription: Story = {
	args: {
		title: "Quest Management",
		createButtonText: "Create New Quest",
		children: (
			<div className="bg-white p-6 rounded-lg shadow">
				<p className="text-charcoal">Quest management content...</p>
			</div>
		),
	},
};

export const WithoutCreateButton: Story = {
	args: {
		title: "Analytics Dashboard",
		description: "View comprehensive insights and metrics",
		children: (
			<div className="bg-white p-6 rounded-lg shadow">
				<p className="text-charcoal">Analytics content...</p>
			</div>
		),
	},
};