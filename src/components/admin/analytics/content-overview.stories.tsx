import type { Meta, StoryObj } from "@storybook/react";
import { ContentOverview } from "./content-overview";

const meta: Meta<typeof ContentOverview> = {
	title: "Admin/Analytics/ContentOverview",
	component: ContentOverview,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		overview: {
			totalSagas: 12,
			totalQuests: 85,
			totalTasks: 234,
			totalRoutes: 8,
			totalTouristSpots: 45,
		},
		engagement: {
			unlockedQuests: 72,
			totalMagatamaPoints: 15840,
		},
	},
};

export const EmptyState: Story = {
	args: {
		overview: {
			totalSagas: 0,
			totalQuests: 0,
			totalTasks: 0,
			totalRoutes: 0,
			totalTouristSpots: 0,
		},
		engagement: {
			unlockedQuests: 0,
			totalMagatamaPoints: 0,
		},
	},
};