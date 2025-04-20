import type { Meta, StoryObj } from '@storybook/react';
import Prologue from './prologue';

const meta = {
    title: 'World/Video/Prologue',
    component: Prologue,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Prologue>;

export default meta;
type Story = StoryObj<typeof Prologue>;

export const Default: Story = {};

export const OnDark: Story = {
    parameters: {
        backgrounds: { default: 'dark' }
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
}; 