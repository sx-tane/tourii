import type { Meta, StoryObj } from "@storybook/react";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types"; // Assuming this path is correct or type is globally available

import { ChapterTabs } from "./chapter-tabs";

// Mock Data based on inferred type usage
const mockChapters: BackendStoryChapter[] = [
    {
        storyChapterId: "ch1",
        chapterNumber: "chapter 1",
        chapterTitle: "The Discovery",
        isUnlocked: true,
        sagaName: "The Lost Temple of Kyoto", // Include if needed, based on actual type
        chapterVideoUrl: "https://example.com/video1",
        storyId: "story1",
        touristSpotId: "spot1",
        chapterDesc: "Description for chapter 1...",
        chapterImage: "/image/character/thumbnail/ninigi-card.png",
        characterNameList: ["Ninigi", "Sarutahiko"],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch2",
        chapterNumber: "chapter 2",
        chapterTitle: "Secret Scrolls",
        isUnlocked: true,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "https://example.com/video2",
        storyId: "story1",
        touristSpotId: "spot2",
        chapterDesc: "Description for chapter 2...",
        chapterImage: "/image/character/thumbnail/uzume-card.png",
        characterNameList: ["Uzume"],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch3",
        chapterNumber: "chapter 3",
        chapterTitle: "Forest Spirits",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "https://example.com/video3",
        storyId: "story1",
        touristSpotId: "spot3",
        chapterDesc: "Description for chapter 3...",
        chapterImage: "/image/character/thumbnail/amaterasu-card.png",
        characterNameList: ["Amaterasu", "Ninigi"],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch4",
        chapterNumber: "chapter 4",
        chapterTitle: "Modern Revelations",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "https://example.com/video4",
        storyId: "story1",
        touristSpotId: "spot4",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch5",
        chapterNumber: "chapter 5",
        chapterTitle: "The Final Chapter",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "https://example.com/video5",
        storyId: "",
        touristSpotId: "",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch6",
        chapterNumber: "chapter 6",
        chapterTitle: "The Final Chapter",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        storyId: "",
        touristSpotId: "",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoUrl: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch7",
        chapterNumber: "chapter 7",
        chapterTitle: "The Final Chapter",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "",
        storyId: "",
        touristSpotId: "",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch8",
        chapterNumber: "chapter 8",
        chapterTitle: "The Final Chapter",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        chapterVideoUrl: "",
        storyId: "",
        touristSpotId: "",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    },
    {
        storyChapterId: "ch9",
        chapterNumber: "chapter 9",
        chapterTitle: "The Final Chapter",
        isUnlocked: false,
        sagaName: "The Lost Temple of Kyoto",
        storyId: "",
        touristSpotId: "",
        chapterDesc: "",
        chapterImage: "",
        characterNameList: [],
        realWorldImage: "",
        chapterVideoUrl: "",
        chapterVideoMobileUrl: "",
        chapterPdfUrl: "",
        insUserId: "",
        insDateTime: "",
        updUserId: "",
        updDateTime: ""
    }
];

const meta: Meta<typeof ChapterTabs> = {
    title: "Story/Chapter/ChapterTabs", // Adjusted title based on path
    component: ChapterTabs,
    tags: ["autodocs"], // Optional: enables automatic documentation generation
    parameters: {
        // Optional parameters
        layout: "centered",
    },
    args: {
        // Add default args needed by the component
        chapters: mockChapters,
        initialSelectedChapterId: "ch1", // Default to the first chapter
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Example of a story with a different chapter initially selected
export const SecondChapterSelected: Story = {
    args: {
        chapters: mockChapters,
        initialSelectedChapterId: "ch2",
    },
};

// Example of a story with no chapters (edge case)
export const NoChapters: Story = {
    args: {
        chapters: [],
        initialSelectedChapterId: "",
    },
};
