import type { Meta, StoryObj } from "@storybook/react";
import TouristSpotStatsGrid from "./tourist-spot-stats-grid";

const meta: Meta<typeof TouristSpotStatsGrid> = {
	title: "Admin/ModelRoutes/TouristSpotStatsGrid",
	component: TouristSpotStatsGrid,
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
			total: 156,
			withHashtags: 120,
			withMainImage: 138,
			withSmallImages: 95,
			withVisitTime: 89,
			noDescription: 12,
		},
	},
};

export const HighQuality: Story = {
	args: {
		stats: {
			total: 250,
			withHashtags: 240,
			withMainImage: 248,
			withSmallImages: 235,
			withVisitTime: 225,
			noDescription: 2,
		},
	},
};

export const LowQuality: Story = {
	args: {
		stats: {
			total: 45,
			withHashtags: 15,
			withMainImage: 25,
			withSmallImages: 12,
			withVisitTime: 8,
			noDescription: 20,
		},
	},
};

export const NoData: Story = {
	args: {
		stats: {
			total: 0,
			withHashtags: 0,
			withMainImage: 0,
			withSmallImages: 0,
			withVisitTime: 0,
			noDescription: 0,
		},
	},
};

export const ContentIssues: Story = {
	args: {
		stats: {
			total: 80,
			withHashtags: 30,
			withMainImage: 45,
			withSmallImages: 20,
			withVisitTime: 15,
			noDescription: 35,
		},
	},
};