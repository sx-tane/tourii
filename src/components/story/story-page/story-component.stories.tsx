import type { StoryResponseDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import StoryComponent from "./story-component";

const mockStory: StoryResponseDto = {
	storyId: "story-image-1",
	sagaName: "The Legend of\nIzanami",
	sagaDesc:
		"Journey through ancient Japan and discover the tale of creation, where divine beings shape the world and establish the foundations of Japanese mythology.",
	backgroundMedia: "/image/touriiverse/yokai.png",
	mapImage: "/image/touriiverse/oita.png",
	location: "Oita, Japan",
	order: 1,
	isPrologue: false,
	isSelected: false,
	chapterList: [],
	delFlag: false,
	insUserId: "1",
	insDateTime: "2021-01-01",
	updUserId: "1",
	updDateTime: "2021-01-01",
};

const mockVideoStory: StoryResponseDto = {
	storyId: "story-video-2",
	sagaName: "Tales of\nYomi",
	sagaDesc:
		"Explore the dark realm of Yomi, where shadows dance and ancient spirits dwell in eternal twilight.",
	backgroundMedia: "/video/bungo-ono.mp4",
	mapImage: "/image/touriiverse/oita.png",
	location: "Oita, Japan",
	order: 1,
	isPrologue: false,
	isSelected: false,
	chapterList: [],
	delFlag: false,
	insUserId: "1",
	insDateTime: "2021-01-01",
	updUserId: "1",
	updDateTime: "2021-01-01",
};

const meta = {
	title: "Story/StoryComponent",
	component: StoryComponent,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof StoryComponent>;

export default meta;
type ComponentStory = StoryObj<typeof StoryComponent>;

export const WithImage: ComponentStory = {
	args: {
		story: mockStory,
	},
};

export const WithVideo: ComponentStory = {
	args: {
		story: mockVideoStory,
	},
};

export const ComingSoon: ComponentStory = {
	args: {
		story: {
			...mockStory,
			sagaName: "Coming Soon",
			sagaDesc: "More stories to be unveiled",
			backgroundMedia: "/image/touriiverse/coming-soon-bg.png",
			mapImage: "/image/touriiverse/oita.png",
		},
	},
};

export const Mobile: ComponentStory = {
	args: {
		story: mockStory,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
