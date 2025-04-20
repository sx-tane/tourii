import type { Meta, StoryObj } from '@storybook/react';
import BigSection from './big-section';

const meta = {
    title: 'World/Place/BigSection',
    component: BigSection,
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
} satisfies Meta<typeof BigSection>;

export default meta;
type Story = StoryObj<typeof BigSection>;

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