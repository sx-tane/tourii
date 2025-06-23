import type { Meta, StoryObj } from "@storybook/react";
import type { TaskResponseDto } from "@/api/generated";
import QuestTaskTable from "./quest-task-table";

const meta: Meta<typeof QuestTaskTable> = {
	title: "Admin/Quests/QuestTaskTable",
	component: QuestTaskTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTasks = [
	{
		taskId: "TASK-001",
		taskName: "GPS Check-in at Temple",
		taskDesc: "Check in at the main temple entrance",
		taskType: "GPS_CHECKIN",
		taskOrder: 1,
		magatamaPointAwarded: 50,
		touristSpot: {
			touristSpotId: "SPOT-KIYOMIZU",
			touristSpotName: "Kiyomizu Temple",
		},
	},
	{
		taskId: "TASK-002",
		taskName: "Photo at Cherry Blossoms",
		taskDesc: "Take a photo with the famous cherry blossom trees",
		taskType: "PHOTO_UPLOAD",
		taskOrder: 2,
		magatamaPointAwarded: 75,
		touristSpot: {
			touristSpotId: "SPOT-KIYOMIZU",
			touristSpotName: "Kiyomizu Temple",
		},
	},
	{
		taskId: "TASK-003",
		taskName: "Answer History Question",
		taskDesc: "Answer a question about the temple's history",
		taskType: "ANSWER_TEXT",
		taskOrder: 3,
		magatamaPointAwarded: 100,
		requiredAnswer: "Emperor Kammu",
		touristSpot: null,
	},
];

const getTaskTypeIcon = (taskType: string) => {
	switch (taskType) {
		case "GPS_CHECKIN": return "📍";
		case "PHOTO_UPLOAD": return "📷";
		case "QR_SCAN": return "📱";
		case "ANSWER_TEXT": return "✍️";
		case "SHARE_SOCIAL": return "📢";
		case "GROUP_QUEST": return "👥";
		default: return "📋";
	}
};

const getTaskTypeColor = (taskType: string) => {
	switch (taskType) {
		case "GPS_CHECKIN": return "bg-green-100 text-green-800";
		case "PHOTO_UPLOAD": return "bg-blue-100 text-blue-800";
		case "QR_SCAN": return "bg-purple-100 text-purple-800";
		case "ANSWER_TEXT": return "bg-orange-100 text-orange-800";
		case "SHARE_SOCIAL": return "bg-pink-100 text-pink-800";
		case "GROUP_QUEST": return "bg-indigo-100 text-indigo-800";
		default: return "bg-gray-100 text-gray-800";
	}
};

export const Default: Story = {
	args: {
		tasks: mockTasks,
		selectedTasks: [],
		deletingTaskId: null,
		isSubmitting: false,
		onToggleSelection: (taskId: string) => console.log("Toggle selection:", taskId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (task: TaskResponseDto) => console.log("Edit task:", task.taskName),
		onDelete: (taskId: string, taskName: string) => console.log("Delete task:", taskId, taskName),
		getTaskTypeIcon,
		getTaskTypeColor,
	},
};

export const WithSelection: Story = {
	args: {
		tasks: mockTasks,
		selectedTasks: ["TASK-001", "TASK-003"],
		deletingTaskId: null,
		isSubmitting: false,
		onToggleSelection: (taskId: string) => console.log("Toggle selection:", taskId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (task: TaskResponseDto) => console.log("Edit task:", task.taskName),
		onDelete: (taskId: string, taskName: string) => console.log("Delete task:", taskId, taskName),
		getTaskTypeIcon,
		getTaskTypeColor,
	},
};

export const Deleting: Story = {
	args: {
		tasks: mockTasks,
		selectedTasks: [],
		deletingTaskId: "TASK-002",
		isSubmitting: true,
		onToggleSelection: (taskId: string) => console.log("Toggle selection:", taskId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (task: TaskResponseDto) => console.log("Edit task:", task.taskName),
		onDelete: (taskId: string, taskName: string) => console.log("Delete task:", taskId, taskName),
		getTaskTypeIcon,
		getTaskTypeColor,
	},
};

export const EmptyState: Story = {
	args: {
		tasks: [],
		selectedTasks: [],
		deletingTaskId: null,
		isSubmitting: false,
		onToggleSelection: (taskId: string) => console.log("Toggle selection:", taskId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (task: TaskResponseDto) => console.log("Edit task:", task.taskName),
		onDelete: (taskId: string, taskName: string) => console.log("Delete task:", taskId, taskName),
		getTaskTypeIcon,
		getTaskTypeColor,
	},
};