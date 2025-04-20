import type { Meta, StoryObj } from '@storybook/react';
import ChapterComponent from './chapter-component';

const meta = {
    title: 'Story/Chapter/Content',
    component: ChapterComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
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
            <div className="p-4 bg-charcoal min-h-screen">
                {Story()}
            </div>
        ),
    ],
} satisfies Meta<typeof ChapterComponent>;

export default meta;
type Story = StoryObj<typeof ChapterComponent>;

const mockChapter = {
    chapterId: "chapter-1",
    chapterNumber: "Chapter 1",
    title: "The Beginning",
    content: "In the heart of ancient Japan, where legends whisper through cherry blossoms and shadows dance in moonlit temples, our story begins. A tale of courage, mystery, and the eternal dance between light and darkness unfolds...",
    area: "Kyoto",
    image: "/image/touriiverse/bungo-ono/chapter1.png",
    realImage: "/image/touriiverse/bungo-ono/chapter1.png",
    storyUnlocked: true,
    part: 1
};

export const Default: Story = {
    args: {
        chapter: mockChapter,
        areaLink: '/stories/kyoto',
    },
};

export const LongContent: Story = {
    args: {
        chapter: {
            ...mockChapter,
            content: `# The Tale of Kyoto

In the heart of ancient Japan, where legends whisper through cherry blossoms and shadows dance in moonlit temples, our story begins. A tale of courage, mystery, and the eternal dance between light and darkness unfolds...

## The Journey Begins

- Visit ancient temples hidden in misty mountains
- Experience traditional tea ceremonies with local masters
- Uncover the secrets of the old capital
- Meet mysterious characters who guard ancient wisdom

Through winding alleyways and sacred grounds, each step reveals a new chapter in this timeless tale.`,
        },
        areaLink: '/stories/kyoto',
    },
}; 