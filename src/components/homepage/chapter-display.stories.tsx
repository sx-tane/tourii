import type { Meta, StoryObj } from '@storybook/react';
import ChapterDisplay from './chapter-display';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import { setChapterDetails } from '@/lib/redux/features/chapter/chapter-slice';

// Initialize the store with some data
store.dispatch(setChapterDetails({
    chapterNumber: "Chapter Three",
    storyTitle: "The Lantern Festival",
    imageUrl: "/image/touriiverse/bungo-ono/chapter3.png"
}));

const meta = {
    title: 'Homepage/ChapterDisplay',
    component: ChapterDisplay,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'warmGrey',
            values: [
                { name: 'warmGrey', value: '#f5f5f5' },
            ],
        },
    },
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof ChapterDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 