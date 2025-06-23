import type { Meta, StoryObj } from "@storybook/react";
import StoryStatsGrid from "./story-stats-grid";

const meta: Meta<typeof StoryStatsGrid> = {
	title: "Admin/Stories/StoryStatsGrid",
	component: StoryStatsGrid,
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
			total: 45,
			prologue: 8,
			mainStory: 32,
			selected: 12,
			withChapters: 38,
			missingMedia: 5,
		},
	},
};

export const LargeDataset: Story = {
	args: {
		stats: {
			total: 234,
			prologue: 45,
			mainStory: 189,
			selected: 87,
			withChapters: 201,
			missingMedia: 23,
		},
	},
};

export const SmallDataset: Story = {
	args: {
		stats: {
			total: 8,
			prologue: 2,
			mainStory: 6,
			selected: 3,
			withChapters: 5,
			missingMedia: 2,
		},
	},
};

export const NoData: Story = {
	args: {
		stats: {
			total: 0,
			prologue: 0,
			mainStory: 0,
			selected: 0,
			withChapters: 0,
			missingMedia: 0,
		},
	},
};

export const ProblemsPresent: Story = {
	args: {
		stats: {
			total: 50,
			prologue: 12,
			mainStory: 38,
			selected: 8,
			withChapters: 25,
			missingMedia: 25,
		},
	},
};