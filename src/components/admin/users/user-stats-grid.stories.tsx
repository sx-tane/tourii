import type { Meta, StoryObj } from "@storybook/react";
import UserStatsGrid from "./user-stats-grid";

const meta: Meta<typeof UserStatsGrid> = {
	title: "Admin/Users/UserStatsGrid",
	component: UserStatsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		totalUsers: 1247,
		premiumCount: 156,
		bannedCount: 23,
		moderatorCount: 8,
		adminCount: 3,
		totalQuests: 4892,
	},
};

export const SmallCommunity: Story = {
	args: {
		totalUsers: 42,
		premiumCount: 8,
		bannedCount: 1,
		moderatorCount: 2,
		adminCount: 1,
		totalQuests: 127,
	},
};

export const ZeroStats: Story = {
	args: {
		totalUsers: 0,
		premiumCount: 0,
		bannedCount: 0,
		moderatorCount: 0,
		adminCount: 0,
		totalQuests: 0,
	},
};
