import type { Meta, StoryObj } from '@storybook/react';
import ChapterSelectionMobile from './chapter-selection-mobile';

// Define the new item type expected by the component
interface ChapterSelectionItem {
    storyChapterId: string;
    isSelected: boolean;
    chapterNumber: string;
    chapterTitle: string;
}

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

// Update mock data to use ChapterSelectionItem structure
const mockSelections: ChapterSelectionItem[] = [
    {
        storyChapterId: "ch1", // Was selectedChapterId
        chapterNumber: "Chapter 1", // Was chapter
        chapterTitle: "Kyoto Temple", // Was placeName
        isSelected: true
    },
    {
        storyChapterId: "ch2",
        chapterNumber: "Chapter 2",
        chapterTitle: "Zen Garden",
        isSelected: false
    },
    {
        storyChapterId: "ch3",
        chapterNumber: "Chapter 3",
        chapterTitle: "Ancient Shrine",
        isSelected: false
    },
];

export const Default: Story = {
    args: {
        selectionData: mockSelections,
        handleSelectChapter: (id: string) => console.log('Selected:', id),
        currentIndex: 0,
        setCurrentIndex: (index: number) => console.log('New index:', index),
    },
};

export const LastChapter: Story = {
    args: {
        selectionData: mockSelections,
        handleSelectChapter: (id: string) => console.log('Selected:', id),
        currentIndex: 2,
        setCurrentIndex: (index: number) => console.log('New index:', index),
    },
}; 