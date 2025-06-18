import type { Meta, StoryObj } from "@storybook/react";
import { StoryDetails } from "./story-details";
import type { StoryResponseDto } from "@/api/generated";

const meta: Meta<typeof StoryDetails> = {
	title: "Admin/Stories/StoryDetails",
	component: StoryDetails,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockStory: StoryResponseDto = {
	storyId: "story-123",
	storyName: "Legends of Ancient Kyoto",
	storyDesc: "Journey through the mystical tales and legends that shaped the cultural heritage of Kyoto. Discover hidden temples, meet legendary figures, and uncover ancient secrets.",
	storyBackgroundMedia: "https://example.com/kyoto-legends-bg.jpg",
	storyCategory: "Historical Fiction",
	storyIntroVideoUrl: "https://example.com/kyoto-intro.mp4",
	storyBackgroundMusic: "https://example.com/traditional-music.mp3",
	storyProgress: {
		isCompleted: false,
		completionPercentage: 45.5,
		currentChapterId: "chapter-3",
		completedChapters: ["chapter-1", "chapter-2"],
	},
	chapters: [
		{
			chapterId: "chapter-1",
			chapterName: "The Temple Guardian",
			chapterDesc: "Meet the mysterious guardian of Senso-ji Temple",
			chapterOrder: 1,
		},
		{
			chapterId: "chapter-2", 
			chapterName: "The Lost Scroll",
			chapterDesc: "Search for the ancient scroll in Kyoto's backstreets",
			chapterOrder: 2,
		},
		{
			chapterId: "chapter-3",
			chapterName: "The Final Revelation",
			chapterDesc: "Uncover the truth behind the legend",
			chapterOrder: 3,
		},
	],
	insDateTime: "2024-01-10T08:00:00Z",
	updDateTime: "2024-01-25T16:30:00Z",
};

export const Default: Story = {
	args: {
		story: mockStory,
	},
};

export const CompletedStory: Story = {
	args: {
		story: {
			...mockStory,
			storyProgress: {
				isCompleted: true,
				completionPercentage: 100,
				currentChapterId: "chapter-3",
				completedChapters: ["chapter-1", "chapter-2", "chapter-3"],
			},
		},
	},
};

export const MinimalData: Story = {
	args: {
		story: {
			storyId: "story-minimal",
			storyName: "Simple Story",
			storyDesc: "A basic story with minimal data",
			storyCategory: "Adventure",
			chapters: [],
		},
	},
};