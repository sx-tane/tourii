import type { Meta, StoryObj } from '@storybook/react';
import Prologue from './prologue';

const meta = {
    title: 'Story/Prologue',
    component: Prologue,
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
} satisfies Meta<typeof Prologue>;

export default meta;
type ComponentStory = StoryObj<typeof Prologue>;

export const Default: ComponentStory = {};

export const OnLight: ComponentStory = {
    parameters: {
        backgrounds: { default: 'light' }
    }
};

export const Mobile: ComponentStory = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
}; 