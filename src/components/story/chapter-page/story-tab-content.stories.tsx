import type { StoryChapterResponseDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryTabContent } from "./story-tab-content";

// Mock Data (similar to ChapterTabs story, but might need adjustments)
const mockChapters: StoryChapterResponseDto[] = [
	{
		storyChapterId: "ch1",
		chapterNumber: "1",
		chapterTitle: "The Discovery",
		isUnlocked: true,
		sagaName: "Saga Name",
		storyId: "s1",
		touristSpotId: "t1",
		chapterDesc: "Desc 1",
		chapterImage: "/image/character/thumbnail/ninigi-card.png",
		characterNameList: [],
		realWorldImage: "",
		chapterVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		chapterVideoMobileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		chapterPdfUrl: "",
		delFlag: false,
		insUserId: "storybook",
		insDateTime: "2024-01-01 09:00",
		updUserId: "storybook",
		updDateTime: "2024-01-01 09:00",
	},
	{
		storyChapterId: "ch2",
		chapterNumber: "2",
		chapterTitle: "Secrets Revealed",
		isUnlocked: true,
		sagaName: "Saga Name",
		storyId: "s1",
		touristSpotId: "t2",
		chapterDesc: "Desc 2",
		chapterImage: "/image/character/thumbnail/amaterasu-card.png",
		characterNameList: [],
		realWorldImage: "",
		chapterVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		chapterVideoMobileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		chapterPdfUrl: "",
		delFlag: false,
		insUserId: "storybook",
		insDateTime: "2024-01-01 09:00",
		updUserId: "storybook",
		updDateTime: "2024-01-01 09:00",
	},
	{
		storyChapterId: "ch3",
		chapterNumber: "3",
		chapterTitle: "Locked Chapter",
		isUnlocked: false,
		sagaName: "Saga Name",
		storyId: "s1",
		touristSpotId: "t3",
		chapterDesc: "Desc 3",
		chapterImage: "/image/character/thumbnail/sarutahiko-card.png",
		characterNameList: [],
		realWorldImage: "",
		chapterVideoUrl: "",
		chapterVideoMobileUrl: "",
		chapterPdfUrl: "",
		delFlag: false,
		insUserId: "storybook",
		insDateTime: "2024-01-01 09:00",
		updUserId: "storybook",
		updDateTime: "2024-01-01 09:00",
	},
];

const meta: Meta<typeof StoryTabContent> = {
	title: "Story/ChapterPage/StoryTabContent",
	component: StoryTabContent,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen", // Use fullscreen as it's tab content
	},
	args: {
		chapters: mockChapters,
		selectedChapterId: "ch1",
		chapterToDisplay: mockChapters[0], // Display first chapter by default
		iframeSrc: mockChapters[0]?.chapterVideoUrl, // Use video URL from first chapter
		isMuted: false,
		// Mock handlers - log actions in Storybook console
		handleSelectChapter: (id) => console.log("Selected chapter:", id),
		toggleSound: () => console.log("Toggled sound"),
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondChapterSelected: Story = {
	args: {
		selectedChapterId: "ch2",
		chapterToDisplay: mockChapters[1],
		iframeSrc: mockChapters[1]?.chapterVideoUrl,
	},
};

export const NoChapterSelected: Story = {
	args: {
		selectedChapterId: "",
		chapterToDisplay: undefined,
		iframeSrc: undefined,
	},
};
