import type { Meta, StoryObj } from "@storybook/react";
import AdminStatsGrid from "./admin-stats-grid";

const meta: Meta<typeof AdminStatsGrid> = {
	title: "Admin/Dashboard/AdminStatsGrid",
	component: AdminStatsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockStats = {
	users: {
		total: 1245,
		active: 1200,
		premium: 324,
		newToday: 12,
	},
	content: {
		total: 145,
		quests: 45,
		routes: 25,
		sagas: 15,
		tasks: 180,
		unlockedQuests: 42,
	},
	submissions: {
		pending: 23,
		photo: 15,
		social: 5,
		text: 3,
	},
	engagement: {
		totalQuestsCompleted: 3456,
		avgQuestsPerUser: 2.8,
	},
};

export const Default: Story = {
	args: {
		stats: mockStats,
	},
};

export const ZeroStats: Story = {
	args: {
		stats: {
			users: {
				total: 0,
				active: 0,
				premium: 0,
				newToday: 0,
			},
			content: {
				total: 0,
				quests: 0,
				routes: 0,
				sagas: 0,
				tasks: 0,
				unlockedQuests: 0,
			},
			submissions: {
				pending: 0,
				photo: 0,
				social: 0,
				text: 0,
			},
			engagement: {
				totalQuestsCompleted: 0,
				avgQuestsPerUser: 0,
			},
		},
	},
};

export const HighVolume: Story = {
	args: {
		stats: {
			users: {
				total: 25789,
				active: 23456,
				premium: 5432,
				newToday: 156,
			},
			content: {
				total: 1234,
				quests: 567,
				routes: 234,
				sagas: 89,
				tasks: 2345,
				unlockedQuests: 534,
			},
			submissions: {
				pending: 234,
				photo: 156,
				social: 45,
				text: 33,
			},
			engagement: {
				totalQuestsCompleted: 45678,
				avgQuestsPerUser: 8.7,
			},
		},
	},
};
