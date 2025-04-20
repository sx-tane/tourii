import type { Meta, StoryObj } from '@storybook/react';
import StoryButton from './story-button';

interface StoryType {
    id: string;
    title: string;
    description: string;
    image: string;
    backgroundImage: string;
    storyUnlocked: boolean;
}

const mockStory: StoryType = {
    id: "1",
    title: "The Legend of\nIzanami",
    description: "Journey through ancient Japan and discover the tale of creation, where divine beings shape the world and establish the foundations of Japanese mythology.",
    image: "/image/touriiverse/oita.png",
    backgroundImage: "/image/touriiverse/yokai.png",
    storyUnlocked: true
};

const meta = {
    title: 'Story/StoryButton',
    component: StoryButton,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StoryButton>;

export default meta;
type ComponentStory = StoryObj<typeof StoryButton>;

export const Unlocked: ComponentStory = {
    args: {
        story: mockStory
    }
};

export const Locked: ComponentStory = {
    args: {
        story: {
            ...mockStory,
            storyUnlocked: false
        }
    }
};

export const OnLight: ComponentStory = {
    args: {
        story: mockStory
    },
    parameters: {
        backgrounds: { default: 'light' }
    }
};

export const Mobile: ComponentStory = {
    args: {
        story: mockStory
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
}; 