import type { Meta, StoryObj } from '@storybook/react';
import ChapterComponent from './chapter-component';
import type { BackendStoryChapter } from '@/app/v2/(stories)/types';

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

const mockChapter: BackendStoryChapter = {
    storyId: "STO-Kyoto-123",
    touristSpotId: "kyoto-chapter-1",
    chapterNumber: "Chapter 1",
    chapterTitle: "The Beginning",
    chapterDesc: "In the heart of ancient Japan, where legends whisper through cherry blossoms and shadows dance in moonlit temples, our story begins. A tale of courage, mystery, and the eternal dance between light and darkness unfolds...",
    chapterImage: "/image/touriiverse/bungo-ono/chapter1.png",
    characterNameList: ["Hero", "Mentor"],
    realWorldImage: "/image/touriiverse/bungo-ono/chapter1.png",
    chapterVideoUrl: "",
    chapterVideoMobileUrl: "",
    chapterPdfUrl: "",
    isUnlocked: true,
    insUserId: "storybook",
    insDateTime: "2024-01-01 10:00",
    updUserId: "storybook",
    updDateTime: "2024-01-01 10:00",
    storyChapterId: 'kyoto-chapter-1',
    sagaName: 'Kyoto Saga'
};

export const Default: Story = {
    args: {
        chapter: mockChapter,
        areaLink: '/stories/kyoto',
        sagaName: "Kyoto Saga",
    },
};

export const LongContent: Story = {
    args: {
        chapter: {
            ...mockChapter,
            chapterDesc: '# The Tale of Kyoto\n\nIn the heart of ancient Japan, where legends whisper through cherry blossoms and shadows dance in moonlit temples, our story begins. A tale of courage, mystery, and the eternal dance between light and darkness unfolds...\n\n## The Journey Begins\n\n- Visit ancient temples hidden in misty mountains\n- Experience traditional tea ceremonies with local masters\n- Uncover the secrets of the old capital\n- Meet mysterious characters who guard ancient wisdom\n\nThrough winding alleyways and sacred grounds, each step reveals a new chapter in this timeless tale.',
        },
        areaLink: '/stories/kyoto',
        sagaName: "Kyoto Saga",
    },
}; 