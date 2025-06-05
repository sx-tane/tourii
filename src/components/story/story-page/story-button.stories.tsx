import type { StoryResponseDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import StoryButton from "./story-button";

const mockStory: StoryResponseDto = {
	storyId: "1",
	sagaName: "The Legend of Izanami",
	sagaDesc: "Journey through ancient Japan...",
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

const meta = {
	title: "Story/StoryButton",
	component: StoryButton,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof StoryButton>;

export default meta;
type ComponentStory = StoryObj<typeof StoryButton>;

export const Unlocked: ComponentStory = {
	args: {
		story: mockStory,
	},
};

export const Locked: ComponentStory = {
	args: {
		story: mockStory,
	},
};

export const OnLight: ComponentStory = {
	args: {
		story: mockStory,
	},
	parameters: {
		backgrounds: { default: "light" },
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
