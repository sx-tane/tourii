import type { Meta, StoryObj } from "@storybook/react";
import { ContentHealth } from "./content-health";

const meta: Meta<typeof ContentHealth> = {
	title: "Admin/Analytics/ContentHealth",
	component: ContentHealth,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const getStatusColor = (value: number, total: number, isInverse = false) => {
	if (total === 0) return "text-gray-600";
	const percentage = (value / total) * 100;
	if (isInverse) {
		if (percentage > 80) return "text-red-600";
		if (percentage > 50) return "text-yellow-600";
		return "text-green-600";
	}
	if (percentage > 80) return "text-green-600";
	if (percentage > 50) return "text-yellow-600";
	return "text-red-600";
};

export const HealthyContent: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 2,
			questsWithoutTouristSpot: 1,
			healthScore: 92.5,
		},
		totalQuests: 50,
		getStatusColor,
	},
};

export const PoorHealth: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 15,
			questsWithoutTouristSpot: 8,
			healthScore: 45.2,
		},
		totalQuests: 30,
		getStatusColor,
	},
};

export const PerfectHealth: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 0,
			healthScore: 100,
		},
		totalQuests: 25,
		getStatusColor,
	},
};