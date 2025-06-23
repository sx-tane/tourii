import type { Meta, StoryObj } from "@storybook/react";
import QuestTaskStatsGrid from "./quest-task-stats-grid";

const meta: Meta<typeof QuestTaskStatsGrid> = {
	title: "Admin/Quests/QuestTaskStatsGrid",
	component: QuestTaskStatsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const getTaskTypeIcon = (taskType: string) => {
	switch (taskType) {
		case "GPS_CHECKIN":
			return "📍";
		case "PHOTO_UPLOAD":
			return "📷";
		case "QR_SCAN":
			return "📱";
		case "ANSWER_TEXT":
			return "✍️";
		case "SHARE_SOCIAL":
			return "📢";
		case "GROUP_QUEST":
			return "👥";
		default:
			return "📋";
	}
};

export const Default: Story = {
	args: {
		stats: {
			total: 12,
			withSpots: 8,
			totalPoints: 1800,
			avgPoints: 150,
			taskTypes: {
				GPS_CHECKIN: 4,
				PHOTO_UPLOAD: 3,
				ANSWER_TEXT: 3,
				QR_SCAN: 2,
			},
		},
		getTaskTypeIcon,
	},
};

export const DiverseTaskTypes: Story = {
	args: {
		stats: {
			total: 25,
			withSpots: 18,
			totalPoints: 3750,
			avgPoints: 150,
			taskTypes: {
				GPS_CHECKIN: 8,
				PHOTO_UPLOAD: 6,
				ANSWER_TEXT: 5,
				QR_SCAN: 3,
				SHARE_SOCIAL: 2,
				GROUP_QUEST: 1,
			},
		},
		getTaskTypeIcon,
	},
};

export const SingleTaskType: Story = {
	args: {
		stats: {
			total: 5,
			withSpots: 5,
			totalPoints: 500,
			avgPoints: 100,
			taskTypes: {
				PHOTO_UPLOAD: 5,
			},
		},
		getTaskTypeIcon,
	},
};

export const NoTasks: Story = {
	args: {
		stats: {
			total: 0,
			withSpots: 0,
			totalPoints: 0,
			avgPoints: 0,
			taskTypes: {},
		},
		getTaskTypeIcon,
	},
};