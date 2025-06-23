import type { Meta, StoryObj } from "@storybook/react";
import AlertsSection from "./alerts-section";

const meta: Meta<typeof AlertsSection> = {
	title: "Admin/Dashboard/AlertsSection",
	component: AlertsSection,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAlerts: Story = {
	args: {
		pendingSubmissions: 15,
		newUsersToday: 8,
	},
};

export const OnlySubmissions: Story = {
	args: {
		pendingSubmissions: 23,
		newUsersToday: 0,
	},
};

export const OnlyNewUsers: Story = {
	args: {
		pendingSubmissions: 0,
		newUsersToday: 12,
	},
};

export const NoAlerts: Story = {
	args: {
		pendingSubmissions: 0,
		newUsersToday: 0,
	},
};
