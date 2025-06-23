import type { Meta, StoryObj } from "@storybook/react";
import TaskTypeIcon from "./task-type-icon";

const meta: Meta<typeof TaskTypeIcon> = {
	title: "Admin/Submissions/TaskTypeIcon",
	component: TaskTypeIcon,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PhotoUpload: Story = {
	args: {
		taskType: "PHOTO_UPLOAD",
		size: 16,
	},
};

export const SocialShare: Story = {
	args: {
		taskType: "SHARE_SOCIAL",
		size: 16,
	},
};

export const TextAnswer: Story = {
	args: {
		taskType: "ANSWER_TEXT",
		size: 16,
	},
};

export const Unknown: Story = {
	args: {
		taskType: "UNKNOWN_TYPE",
		size: 16,
	},
};

export const Large: Story = {
	args: {
		taskType: "PHOTO_UPLOAD",
		size: 32,
	},
};
