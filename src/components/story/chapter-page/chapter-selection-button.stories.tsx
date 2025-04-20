import type { Meta, StoryObj } from '@storybook/react';
import ChapterSelectionButton from './chapter-selection-button';
import type { ChapterSelection } from "@/types/story-type";

const meta = {
    title: 'Story/Chapter/SelectionButton',
    component: ChapterSelectionButton,
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
} satisfies Meta<typeof ChapterSelectionButton>;

export default meta;
type Story = StoryObj<typeof ChapterSelectionButton>;

const mockSelection: ChapterSelection = {
    selectedChapterId: "ch1",
    chapter: "Chapter 1",
    placeName: "Kyoto Temple",
    isSelected: true
};

export const Selected: Story = {
    args: {
        selection: mockSelection,
        onSelect: (id) => console.log('Selected:', id),
    },
};

export const Unselected: Story = {
    args: {
        selection: {
            ...mockSelection,
            isSelected: false,
        },
        onSelect: (id) => console.log('Selected:', id),
    },
}; 