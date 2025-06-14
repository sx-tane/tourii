import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TaskSelectOptions from "./task-select-options";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";

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

const meta: Meta<typeof TaskSelectOptions> = {
	title: "Task/TaskSelectOptions",
	component: TaskSelectOptions,
};
export default meta;

type Story = StoryObj<typeof TaskSelectOptions>;

export const Default: Story = {
	args: {
		task: mockTask,
	},
};
