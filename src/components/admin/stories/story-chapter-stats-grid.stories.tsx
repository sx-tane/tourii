import type { Meta, StoryObj } from "@storybook/react";
import StoryChapterStatsGrid from "./story-chapter-stats-grid";

const meta: Meta<typeof StoryChapterStatsGrid> = {
	title: "Admin/Stories/StoryChapterStatsGrid",
	component: StoryChapterStatsGrid,
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
			total: 156,
			unlocked: 89,
			withCharacters: 120,
			withVideos: 78,
			withPDFs: 45,
			missingImages: 12,
		},
	},
};

export const HighEngagement: Story = {
	args: {
		stats: {
			total: 450,
			unlocked: 423,
			withCharacters: 389,
			withVideos: 356,
			withPDFs: 245,
			missingImages: 8,
		},
	},
};

export const LowEngagement: Story = {
	args: {
		stats: {
			total: 25,
			unlocked: 8,
			withCharacters: 12,
			withVideos: 5,
			withPDFs: 2,
			missingImages: 15,
		},
	},
};

export const NoData: Story = {
	args: {
		stats: {
			total: 0,
			unlocked: 0,
			withCharacters: 0,
			withVideos: 0,
			withPDFs: 0,
			missingImages: 0,
		},
	},
};

export const ContentIssues: Story = {
	args: {
		stats: {
			total: 100,
			unlocked: 45,
			withCharacters: 30,
			withVideos: 25,
			withPDFs: 10,
			missingImages: 55,
		},
	},
};