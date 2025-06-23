import type { Meta, StoryObj } from "@storybook/react";
import QuestStatsGrid from "./quest-stats-grid";

const meta: Meta<typeof QuestStatsGrid> = {
	title: "Admin/Quests/QuestStatsGrid",
	component: QuestStatsGrid,
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
			total: 145,
			unlocked: 89,
			premium: 34,
			withTasks: 120,
			totalPoints: 2450,
			noTouristSpot: 12,
		},
	},
};

export const HighVolume: Story = {
	args: {
		stats: {
			total: 567,
			unlocked: 423,
			premium: 156,
			withTasks: 501,
			totalPoints: 15670,
			noTouristSpot: 23,
		},
	},
};

export const LowVolume: Story = {
	args: {
		stats: {
			total: 25,
			unlocked: 8,
			premium: 5,
			withTasks: 18,
			totalPoints: 450,
			noTouristSpot: 7,
		},
	},
};

export const NoData: Story = {
	args: {
		stats: {
			total: 0,
			unlocked: 0,
			premium: 0,
			withTasks: 0,
			totalPoints: 0,
			noTouristSpot: 0,
		},
	},
};

export const ProblemsPresent: Story = {
	args: {
		stats: {
			total: 100,
			unlocked: 45,
			premium: 12,
			withTasks: 60,
			totalPoints: 1200,
			noTouristSpot: 40,
		},
	},
};