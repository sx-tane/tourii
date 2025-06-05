import type { StoryChapterResponseDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import ChapterButton from "./chapter-button";
const meta = {
	title: "Story/ChapterPage/Button",
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

// Mock data matching the BackendStoryChapter type used in the component
const mockUnlockedChapter: StoryChapterResponseDto = {
	storyId: "test-story-id",
	storyChapterId: "chapter-1-unlocked",
	sagaName: "Test Saga",
	touristSpotId: "spot-123",
	chapterNumber: "1", // Changed to string
	chapterTitle: "The Beginning",
	chapterDesc: "Start your journey.",
	chapterImage: "https://example.com/image1.jpg",
	characterNameList: ["Hero", "Mentor"],
	realWorldImage: "https://example.com/real1.jpg",
	chapterVideoUrl: "https://example.com/video1.mp4",
	chapterVideoMobileUrl: "https://example.com/video1_mobile.mp4",
	chapterPdfUrl: "https://example.com/chapter1.pdf",
	isUnlocked: true,
	delFlag: false,
	insUserId: "1",
	insDateTime: "2021-01-01",
	updUserId: "1",
	updDateTime: "2021-01-01",
};

const mockLockedChapter: StoryChapterResponseDto = {
	storyId: "test-story-id",
	storyChapterId: "chapter-2-locked",
	sagaName: "Test Saga",
	touristSpotId: "spot-456",
	chapterNumber: "2", // Changed to string
	chapterTitle: "The Next Step",
	chapterDesc: "Unlock this chapter to continue.",
	chapterImage: "https://example.com/image2.jpg",
	characterNameList: ["Villain"],
	realWorldImage: "https://example.com/real2.jpg",
	chapterVideoUrl: "https://example.com/video2.mp4",
	chapterVideoMobileUrl: "https://example.com/video2_mobile.mp4",
	chapterPdfUrl: "https://example.com/chapter2.pdf",
	isUnlocked: false,
	delFlag: false,
	insUserId: "1",
	insDateTime: "2021-01-01",
	updUserId: "1",
	updDateTime: "2021-01-01",
};

export const Unlocked: Story = {
	args: {
		chapter: mockUnlockedChapter,
	},
};

export const Locked: Story = {
	args: {
		chapter: mockLockedChapter,
	},
};
