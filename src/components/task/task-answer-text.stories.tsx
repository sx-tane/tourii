import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TaskAnswerText from "./task-answer-text";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";

const mockQuest = {
	questId: "q1",
	questName: "Fox Shire Hunt",
	questDesc: "A quest through the shire.",
	questImage: "",
	questType: "TRAVEL_TO_EARN",
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 100,
	tasks: [],
	touristSpot: {
		touristSpotId: "ts1",
		storyChapterId: "sc1",
		touristSpotName: "Kyoto",
		touristSpotDesc: "Beautiful city.",
		bestVisitTime: "Spring",
		address: "Kyoto, Japan",
		touristSpotLatitude: 35.0116,
		touristSpotLongitude: 135.7681,
		touristSpotHashtag: ["#kyoto"],
		imageSet: { main: "", small: [] },
		weatherInfo: {
			temperatureCelsius: 20,
			weatherName: "Clear",
			weatherDesc: "Sunny",
		},
		delFlag: false,
		insUserId: "u1",
		insDateTime: "2023-01-01T00:00:00Z",
		updUserId: "u1",
		updDateTime: "2023-01-01T00:00:00Z",
	},
	delFlag: false,
	insUserId: "u1",
	insDateTime: "2023-01-01T00:00:00Z",
	updUserId: "u1",
	updDateTime: "2023-01-01T00:00:00Z",
};

const mockTask = {
	taskId: "t1",
	questId: "q1",
	taskTheme: "STORY",
	taskType: "ANSWER_TEXT",
	taskName: "Chapter 2",
	taskDesc:
		"To help unravel the mystery of the Sakura Quest, you'll need to piece together the clues.",
	isUnlocked: true,
	requiredAction: "Answer the riddle",
	groupActivityMembers: [],
	selectOptions: [],
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

const meta: Meta<typeof TaskAnswerText> = {
	title: "Task/TaskAnswerText",
	component: TaskAnswerText,
};
export default meta;

type Story = StoryObj<typeof TaskAnswerText>;

export const Default: Story = {
	args: {
		task: mockTask as TaskResponseDto,
		quest: mockQuest as QuestResponseDto,
		onComplete: () => alert("Completed!"),
	},
};
