import type { Meta, StoryObj } from "@storybook/react";
import AnalyticsOverview from "./analytics-overview";

const meta: Meta<typeof AnalyticsOverview> = {
	title: "Admin/Analytics/AnalyticsOverview",
	component: AnalyticsOverview,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		overview: {
			totalSagas: 12,
			totalQuests: 45,
			totalTasks: 127,
			totalRoutes: 18,
			totalTouristSpots: 89,
			totalUsers: 1234,
			activeUsers: 987,
		},
		engagement: {
			unlockedQuests: 38,
			totalMagatamaPoints: 15420,
		},
	},
};

export const LargeScale: Story = {
	args: {
		overview: {
			totalSagas: 156,
			totalQuests: 892,
			totalTasks: 2847,
			totalRoutes: 234,
			totalTouristSpots: 1567,
			totalUsers: 45678,
			activeUsers: 38291,
		},
		engagement: {
			unlockedQuests: 734,
			totalMagatamaPoints: 2847395,
		},
	},
};

export const StartupScale: Story = {
	args: {
		overview: {
			totalSagas: 2,
			totalQuests: 8,
			totalTasks: 24,
			totalRoutes: 3,
			totalTouristSpots: 12,
			totalUsers: 47,
			activeUsers: 32,
		},
		engagement: {
			unlockedQuests: 6,
			totalMagatamaPoints: 1240,
		},
	},
};
