import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteStatsGrid from "./model-route-stats-grid";

const meta: Meta<typeof ModelRouteStatsGrid> = {
	title: "Admin/ModelRoutes/ModelRouteStatsGrid",
	component: ModelRouteStatsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		stats: {
			total: 45,
			withSpots: 38,
			withRecommendations: 25,
			missingMedia: 7,
			regions: 8,
			totalSpots: 156,
		},
	},
};

export const HighVolume: Story = {
	args: {
		stats: {
			total: 234,
			withSpots: 201,
			withRecommendations: 156,
			missingMedia: 23,
			regions: 15,
			totalSpots: 892,
		},
	},
};

export const LowVolume: Story = {
	args: {
		stats: {
			total: 12,
			withSpots: 8,
			withRecommendations: 5,
			missingMedia: 4,
			regions: 3,
			totalSpots: 28,
		},
	},
};

export const NoData: Story = {
	args: {
		stats: {
			total: 0,
			withSpots: 0,
			withRecommendations: 0,
			missingMedia: 0,
			regions: 0,
			totalSpots: 0,
		},
	},
};

export const ProblemsPresent: Story = {
	args: {
		stats: {
			total: 50,
			withSpots: 25,
			withRecommendations: 12,
			missingMedia: 25,
			regions: 5,
			totalSpots: 45,
		},
	},
};