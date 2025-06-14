import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TaskCheckIn from "./task-check-in";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";

const mockTask = {
	taskId: "t1",
	questId: "q1",
	taskTheme: "STORY" as TaskResponseDto["taskTheme"],
	taskType: "CHECK_IN" as TaskResponseDto["taskType"],
	taskName: "Check in to the fox shrine",
	taskDesc: "Check in to the fox shrine",
	isUnlocked: true,
	requiredAction: "Check in to the fox shrine",
	groupActivityMembers: [],
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

const meta: Meta<typeof TaskCheckIn> = {
	title: "Task/TaskCheckIn",
	component: TaskCheckIn,
};
export default meta;

type Story = StoryObj<typeof TaskCheckIn>;

export const Default: Story = {
	args: {
		task: mockTask as TaskResponseDto,
	},
};
