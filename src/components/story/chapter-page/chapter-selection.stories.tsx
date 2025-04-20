import type { Meta, StoryObj } from "@storybook/react";
import ChapterSelectionComponent from "./chapter-selection";
import { useRef } from "react";
import type { Chapter, ChapterSelection, ChapterSelectionProps } from "@/types/story-type";
import { bungoOnoChapterData } from "@/lib/data/touriiverse/chapter-data";

const meta = {
    title: "Story/Chapter/ChapterSelection",
    component: ChapterSelectionComponent,
    parameters: {

        backgrounds: {
            default: "light",
            values: [
                {
                    name: "light",
                    value: "#E3E3DC",
                },
            ],
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ChapterSelectionComponent>;

// Create mock data based on the actual chapter data
const validChapters = bungoOnoChapterData.filter(
    (chapter): chapter is Chapter => chapter !== undefined
);

const mockSelectionData: ChapterSelection[] = validChapters.slice(0, 3).map((chapter, index) => ({
    selectedChapterId: chapter.chapterId,
    chapter: chapter.chapterNumber,
    placeName: chapter.placeName || "",
    isSelected: index === 0,
}));

const singleChapterData: ChapterSelection[] = [mockSelectionData[0] as ChapterSelection];

type Story = StoryObj<typeof ChapterSelectionComponent>;

export default meta;

// Story component with ref handling
const Template: Story["render"] = (args) => {
    const selectedButtonRef = useRef<HTMLDivElement>(null);
    return <ChapterSelectionComponent {...args} selectedButtonRef={selectedButtonRef} />;
};

export const MultipleChapters: Story = {
    render: Template,
    args: {
        placeName: "Bungo Ono",
        selectionData: mockSelectionData,
        handleSelectChapter: (selectedChapterId: string) => {
            console.log("Selected chapter:", selectedChapterId);
        },
    },
};

export const SingleChapter: Story = {
    render: Template,
    args: {
        placeName: "Harajiri Fall",
        selectionData: singleChapterData,
        handleSelectChapter: (selectedChapterId: string) => {
            console.log("Selected chapter:", selectedChapterId);
        },
    },
};

export const LongPlaceName: Story = {
    render: Template,
    args: {
        placeName: "Ninomiya Hachiman Shrine Historical Site",
        selectionData: mockSelectionData,
        handleSelectChapter: (selectedChapterId: string) => {
            console.log("Selected chapter:", selectedChapterId);
        },
    },
}; 