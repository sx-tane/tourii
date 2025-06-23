import type { Meta, StoryObj } from "@storybook/react";
import SubmissionStatsGrid from "./submission-stats-grid";

const meta: Meta<typeof SubmissionStatsGrid> = {
	title: "Admin/Submissions/SubmissionStatsGrid",
	component: SubmissionStatsGrid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		totalPending: 127,
		photoUploads: 68,
		socialShares: 34,
		textAnswers: 25,
	},
};

export const HighVolume: Story = {
	args: {
		totalPending: 1247,
		photoUploads: 687,
		socialShares: 342,
		textAnswers: 218,
	},
};

export const ZeroState: Story = {
	args: {
		totalPending: 0,
		photoUploads: 0,
		socialShares: 0,
		textAnswers: 0,
	},
};
