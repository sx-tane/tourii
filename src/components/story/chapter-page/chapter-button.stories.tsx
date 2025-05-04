import type { Meta, StoryObj } from "@storybook/react";
import ChapterButton from "./chapter-button";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";

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

// Mock data matching the BackendStoryChapter type used in the component
const mockUnlockedChapter: BackendStoryChapter = {
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
};

const mockLockedChapter: BackendStoryChapter = {
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
};

export const Unlocked: Story = {
	args: {
		storyId: mockUnlockedChapter.storyId,
		chapter: mockUnlockedChapter,
	},
};

export const Locked: Story = {
	args: {
		storyId: mockLockedChapter.storyId,
		chapter: mockLockedChapter,
	},
};

