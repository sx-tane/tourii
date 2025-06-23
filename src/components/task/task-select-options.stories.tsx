import { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import type { Meta, StoryObj } from "@storybook/react";
import TaskSelectOptions from "./task-select-options";

const mockTask = {
	taskId: "t1",
	questId: "q1",
	taskTheme: "STORY" as TaskResponseDto["taskTheme"],
	taskType: "SELECT_OPTION" as TaskResponseDto["taskType"],
	taskName: "Which path leads to the fox shrine?",
	taskDesc: "Which path leads to the fox shrine?",
	isUnlocked: true,
	requiredAction: "Select the correct path(s)",
	groupActivityMembers: [],
	selectOptions: [
		{ optionId: 1, optionText: "Left" },
		{ optionId: 2, optionText: "Right" },
		{ optionId: 3, optionText: "Straight" },
		{ optionId: 4, optionText: "Back" },
	],
	antiCheatRules: {},
	magatamaPointAwarded: 10,
	totalMagatamaPointAwarded: 10,
	isCompleted: false,
	delFlag: false,
	insUserId: "u1",
	insDateTime: "2023-01-01T00:00:00Z",
	updUserId: "u1",
	updDateTime: "2023-01-01T00:00:00Z",
};

const mockQuest: QuestResponseDto = {
	questId: "q1",
	questName: "The Fox Shrine Mystery",
	questDesc:
		"Discover the secrets of the ancient fox shrine and unlock its hidden powers.",
	questImage:
		"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
	questType: QuestResponseDto.questType.TRAVEL_TO_EARN,
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 50,
	touristSpot: {
		touristSpotId: "ts1",
		storyChapterId: "sc1",
		touristSpotName: "Fox Shrine",
		touristSpotDesc: "An ancient shrine dedicated to the fox spirits",
		bestVisitTime: "Morning",
		address: "Tokyo, Japan",
		touristSpotLatitude: 35.6762,
		touristSpotLongitude: 139.6503,
		touristSpotHashtag: ["shrine", "fox", "spiritual"],
		imageSet: {
			main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
			small: []
		},
		delFlag: false,
		insUserId: "u1",
		insDateTime: "2023-01-01T00:00:00Z",
		updUserId: "u1",
		updDateTime: "2023-01-01T00:00:00Z",
	},
	tasks: [mockTask as TaskResponseDto],
	delFlag: false,
	insUserId: "u1",
	insDateTime: "2023-01-01T00:00:00Z",
	updUserId: "u1",
	updDateTime: "2023-01-01T00:00:00Z",
};

const meta: Meta<typeof TaskSelectOptions> = {
	title: "Task/TaskSelectOptions",
	component: TaskSelectOptions,
};
export default meta;

type Story = StoryObj<typeof TaskSelectOptions>;

export const Default: Story = {
	args: {
		task: mockTask as TaskResponseDto,
		quest: mockQuest,
		isSubmitting: false,
		error: null,
		onSubmit: (selectedOptionIds: number[]) => {
			console.log("Options submitted:", selectedOptionIds);
		},
		onComplete: () => {
			console.log("Task completed");
		},
	},
};

export const Submitting: Story = {
	args: {
		task: mockTask as TaskResponseDto,
		quest: mockQuest,
		isSubmitting: true,
		error: null,
		onSubmit: (selectedOptionIds: number[]) => {
			console.log("Options submitted:", selectedOptionIds);
		},
		onComplete: () => {
			console.log("Task completed");
		},
	},
};

export const WithError: Story = {
	args: {
		task: mockTask as TaskResponseDto,
		quest: mockQuest,
		isSubmitting: false,
		error: "Incorrect answer. Please try again.",
		onSubmit: (selectedOptionIds: number[]) => {
			console.log("Options submitted:", selectedOptionIds);
		},
		onComplete: () => {
			console.log("Task completed");
		},
	},
};
