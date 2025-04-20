import type { Meta, StoryObj } from '@storybook/react';
import ChapterSelectionMobile from './chapter-selection-mobile';
import type { ChapterSelection as ChapterSelectionType } from "@/types/story-type";

const meta = {
    title: 'Story/Chapter/MobileSelection',
    component: ChapterSelectionMobile,
    tags: ['autodocs'],
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
} satisfies Meta<typeof ChapterSelectionMobile>;

export default meta;
type Story = StoryObj<typeof ChapterSelectionMobile>;

const mockSelections: ChapterSelectionType[] = [
    { selectedChapterId: "ch1", chapter: "Chapter 1", placeName: "Kyoto Temple", isSelected: true },
    { selectedChapterId: "ch2", chapter: "Chapter 2", placeName: "Zen Garden", isSelected: false },
    { selectedChapterId: "ch3", chapter: "Chapter 3", placeName: "Ancient Shrine", isSelected: false },
];

export const Default: Story = {
    args: {
        selectionData: mockSelections,
        handleSelectChapter: (id: string) => console.log('Selected:', id),
        selectedButtonRef: { current: null },
        currentIndex: 0,
        setCurrentIndex: (index: number) => console.log('New index:', index),
    },
};

export const LastChapter: Story = {
    args: {
        selectionData: mockSelections,
        handleSelectChapter: (id: string) => console.log('Selected:', id),
        selectedButtonRef: { current: null },
        currentIndex: 2,
        setCurrentIndex: (index: number) => console.log('New index:', index),
    },
}; 