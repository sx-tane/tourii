import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import type { Meta, StoryObj } from "@storybook/react";
import IntroComponent from "./intro-component";

const meta = {
	title: "Story/Chapter/Intro",
	component: IntroComponent,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#21211B" }, // charcoal
				{ name: "light", value: "#E3E3DC" }, // warmGrey
			],
		},
	},
	decorators: [
		(Story) => <div className="p-4 bg-charcoal min-h-screen">{Story()}</div>,
	],
} satisfies Meta<typeof IntroComponent>;

export default meta;
type Story = StoryObj<typeof IntroComponent>;

const mockChapter: BackendStoryChapter = {
	storyChapterId: "kyoto-intro-chapter",
	storyId: "STO-Kyoto-Intro-456",
	sagaName: "Mock Saga From Chapter",
	touristSpotId: "kyoto-intro-chapter",
	chapterNumber: "Introduction",
	chapterTitle: "Welcome to Kyoto",
	chapterDesc:
		"In the heart of ancient Japan, where legends whisper through cherry blossoms and shadows dance in moonlit temples, our story begins. A tale of courage, mystery, and the eternal dance between light and darkness unfolds...",
	chapterImage: "/image/touriiverse/bungo-ono/chapter1.png",
	characterNameList: [],
	realWorldImage: "/image/touriiverse/bungo-ono/chapter1.png",
	chapterVideoUrl: "",
	chapterVideoMobileUrl: "",
	chapterPdfUrl: "",
	isUnlocked: true,
	insUserId: "storybook",
	insDateTime: "2024-01-01 09:00",
	updUserId: "storybook",
	updDateTime: "2024-01-01 09:00",
};

export const Default: Story = {
	args: {
		chapter: mockChapter,
		sagaName: "Kyoto Saga",
	},
};

export const WithMarkdown: Story = {
	args: {
		chapter: {
			...mockChapter,
			chapterDesc: `# Welcome to Kyoto\n\nDiscover the ancient secrets of Japan's cultural heart. This chapter will take you through temples, gardens, and mysteries that have endured for centuries.\n\n## What to Expect\n\n- Visit ancient temples hidden in misty mountains\n- Experience traditional tea ceremonies with local masters\n- Uncover the secrets of the old capital\n- Meet mysterious characters who guard ancient wisdom\n\nThrough winding alleyways and sacred grounds, each step reveals a new chapter in this timeless tale.\n\n## Your Journey Begins\n\nAre you ready to step into the heart of Japan's most enigmatic city?`,
		},
		sagaName: "Kyoto Saga",
	},
};

export const WithVideo: Story = {
	args: {
		chapter: {
			...mockChapter,
			chapterImage: "/video/sample.mp4",
		},
		sagaName: "Kyoto Saga",
	},
};
