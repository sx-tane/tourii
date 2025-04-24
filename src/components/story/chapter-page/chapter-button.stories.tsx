import type { Meta, StoryObj } from "@storybook/react";
import ChapterButton from "./chapter-button";

const meta = {
	title: "Story/Chapter/Button",
	component: ChapterButton,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
} satisfies Meta<typeof ChapterButton>;

export default meta;
type Story = StoryObj<typeof ChapterButton>;

export const Unlocked: Story = {
	args: {
		areaLink: "/stories/kyoto",
		vnUnlocked: true,
		chapterId: "chapter-1",
		chapterNumber: "Chapter 1",
	},
};

export const Locked: Story = {
	args: {
		...Unlocked.args,
		vnUnlocked: false,
	},
};
