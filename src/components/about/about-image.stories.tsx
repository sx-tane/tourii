import type { Meta, StoryObj } from '@storybook/react';
import AboutImage from './about-image';

const meta = {
    title: 'About/AboutImage',
    component: AboutImage,
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
} satisfies Meta<typeof AboutImage>;

export default meta;
type Story = StoryObj<typeof AboutImage>;

export const Desktop: Story = {};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
};

export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}; 