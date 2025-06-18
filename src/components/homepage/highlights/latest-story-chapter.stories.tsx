import type { Meta, StoryObj } from "@storybook/react";
import LatestStoryChapter from "./latest-story-chapter";

const meta: Meta<typeof LatestStoryChapter> = {
	title: "Homepage/Highlights/LatestStoryChapter",
	component: LatestStoryChapter,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: "Latest story chapter component for homepage highlights",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockChapter = {
	storyId: "story-1",
	chapterId: "chapter-1",
	title: "The Legend of Ninigi",
	imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
	link: null,
};

export const Default: Story = {
	args: {
		chapter: mockChapter,
	},
};

export const WithCustomLink: Story = {
	args: {
		chapter: {
			...mockChapter,
			link: "/custom/chapter/link",
		},
	},
};

export const NoImage: Story = {
	args: {
		chapter: {
			...mockChapter,
			imageUrl: null,
		},
	},
};

export const LongTitle: Story = {
	args: {
		chapter: {
			...mockChapter,
			title: "This is a very long chapter title that should be truncated properly to maintain good visual design",
		},
	},
};

export const NoChapter: Story = {
	args: {
		chapter: null,
	},
};