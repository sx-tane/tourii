import type { Meta, StoryObj } from "@storybook/react";
import QualityMetricsSection from "./quality-metrics-section";

const meta: Meta<typeof QualityMetricsSection> = {
	title: "Admin/Analytics/QualityMetricsSection",
	component: QualityMetricsSection,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		quality: {
			averageTasksPerQuest: 2.8,
			averageSpotsPerRoute: 4.2,
		},
		engagement: {
			premiumQuests: 45,
			spotsWithHashtags: 120,
			unlockedQuests: 38,
		},
		totalQuests: 50,
	},
};

export const HighQuality: Story = {
	args: {
		quality: {
			averageTasksPerQuest: 5.2,
			averageSpotsPerRoute: 8.7,
		},
		engagement: {
			premiumQuests: 80,
			spotsWithHashtags: 250,
			unlockedQuests: 75,
		},
		totalQuests: 100,
	},
};

export const LowQuality: Story = {
	args: {
		quality: {
			averageTasksPerQuest: 1.1,
			averageSpotsPerRoute: 1.8,
		},
		engagement: {
			premiumQuests: 5,
			spotsWithHashtags: 12,
			unlockedQuests: 8,
		},
		totalQuests: 25,
	},
};

export const NoData: Story = {
	args: {
		quality: {
			averageTasksPerQuest: 0,
			averageSpotsPerRoute: 0,
		},
		engagement: {
			premiumQuests: 0,
			spotsWithHashtags: 0,
			unlockedQuests: 0,
		},
		totalQuests: 0,
	},
};