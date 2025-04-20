import type { Meta, StoryObj } from '@storybook/react';
import StoryComponent from './story-component';

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

const mockVideoStory: StoryType = {
    id: "2",
    title: "Tales of\nYomi",
    description: "Explore the dark realm of Yomi, where shadows dance and ancient spirits dwell in eternal twilight.",
    image: "/image/touriiverse/oita.png",
    backgroundImage: "/video/bungo-ono.mp4",
    storyUnlocked: false
};

const meta = {
    title: 'Story/StoryComponent',
    component: StoryComponent,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StoryComponent>;

export default meta;
type ComponentStory = StoryObj<typeof StoryComponent>;

export const WithImage: ComponentStory = {
    args: {
        story: mockStory
    }
};

export const WithVideo: ComponentStory = {
    args: {
        story: mockVideoStory
    }
};

export const ComingSoon: ComponentStory = {
    args: {
        story: {
            ...mockStory,
            title: "Coming Soon",
            description: "More stories to be unveiled",
            storyUnlocked: false
        }
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