import type { Meta, StoryObj } from "@storybook/react";
import SubmissionFilters from "./submission-filters";

const meta: Meta<typeof SubmissionFilters> = {
	title: "Admin/Submissions/SubmissionFilters",
	component: SubmissionFilters,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		taskTypeFilter: "",
		limit: 20,
		onTaskTypeFilterChange: (
			value: "" | "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT",
		) => console.log("Task type filter:", value),
		onLimitChange: (value: number) => console.log("Limit:", value),
		onClearFilters: () => console.log("Clear filters"),
	},
};

export const WithFilter: Story = {
	args: {
		taskTypeFilter: "PHOTO_UPLOAD",
		limit: 50,
		onTaskTypeFilterChange: (
			value: "" | "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT",
		) => console.log("Task type filter:", value),
		onLimitChange: (value: number) => console.log("Limit:", value),
		onClearFilters: () => console.log("Clear filters"),
	},
};
