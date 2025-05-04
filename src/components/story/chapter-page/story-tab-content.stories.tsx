import type { Meta, StoryObj } from "@storybook/react";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import { StoryTabContent } from "./story-tab-content";

// Mock Data (similar to ChapterTabs story, but might need adjustments)
const mockChapters: BackendStoryChapter[] = [
    {
        storyChapterId: "ch1", chapterNumber: "1", chapterTitle: "The Discovery", isUnlocked: true,
        sagaName: "Saga Name", storyId: "s1", touristSpotId: "t1", chapterDesc: "Desc 1", chapterImage: "/image/character/thumbnail/ninigi-card.png",
        characterNameList: [], realWorldImage: "", chapterVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapterVideoMobileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapterPdfUrl: "",
    },
    {
        storyChapterId: "ch2", chapterNumber: "2", chapterTitle: "Secrets Revealed", isUnlocked: true,
        sagaName: "Saga Name", storyId: "s1", touristSpotId: "t2", chapterDesc: "Desc 2", chapterImage: "/image/character/thumbnail/amaterasu-card.png",
        characterNameList: [], realWorldImage: "", chapterVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapterVideoMobileUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapterPdfUrl: "",
    },
    {
        storyChapterId: "ch3", chapterNumber: "3", chapterTitle: "Locked Chapter", isUnlocked: false,
        sagaName: "Saga Name", storyId: "s1", touristSpotId: "t3", chapterDesc: "Desc 3", chapterImage: "/image/character/thumbnail/sarutahiko-card.png",
        characterNameList: [], realWorldImage: "", chapterVideoUrl: "", chapterVideoMobileUrl: "", chapterPdfUrl: "",
    },
];

const meta: Meta<typeof StoryTabContent> = {
    title: "Story/Chapter/StoryTabContent",
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