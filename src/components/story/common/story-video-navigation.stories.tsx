import type { Meta, StoryObj } from '@storybook/react';
import StoryVideoNavigationButtons from './story-video-navigation-button';

const meta = {
    title: 'Story/Common/VideoNavigation',
    component: StoryVideoNavigationButtons,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#21211B' }, // charcoal
                { name: 'light', value: '#E3E3DC' }, // warmGrey
            ],
        },
    },
    decorators: [
        (Story) => (
            <div className="w-screen h-[200px] relative bg-charcoal">
                {Story()}
            </div>
        ),
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof StoryVideoNavigationButtons>;

export default meta;
type Story = StoryObj<typeof StoryVideoNavigationButtons>;

// Base story with all buttons
export const AllControls: Story = {
    args: {
        returnLink: '/stories',
        isMuted: false,
        toggleSound: () => console.log('Toggle sound'),
        handlePreviousChapter: () => console.log('Previous chapter'),
        handleNextChapter: () => console.log('Next chapter'),
        previousChapterUnlocked: true,
        nextChapterUnlocked: true,
    },
};

// Story with muted state
export const Muted: Story = {
    args: {
        ...AllControls.args,
        isMuted: true,
    },
};

// Story with only return and sound controls
export const FirstChapter: Story = {
    args: {
        ...AllControls.args,
        previousChapterUnlocked: false,
        nextChapterUnlocked: true,
    },
};

// Story with only return and sound controls
export const LastChapter: Story = {
    args: {
        ...AllControls.args,
        previousChapterUnlocked: true,
        nextChapterUnlocked: false,
    },
};

// Mobile view
export const Mobile: Story = {
    args: {
        ...AllControls.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
}; 