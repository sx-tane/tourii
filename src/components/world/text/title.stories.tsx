import type { Meta, StoryObj } from '@storybook/react';
import Title from './title';

const meta = {
    title: 'World/Text/Title',
    component: Title,
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
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
    args: {
        smallTitle: "Welcome to",
        title: "TOURII WORLD"
    }
};

export const LongTitle: Story = {
    args: {
        smallTitle: "Discover the magic of",
        title: "JAPANESE CULTURE AND TRADITION"
    }
};

export const OnDark: Story = {
    args: {
        smallTitle: "Experience",
        title: "THE JOURNEY"
    },
    parameters: {
        backgrounds: { default: 'dark' }
    }
};

export const Mobile: Story = {
    args: {
        smallTitle: "Welcome to",
        title: "TOURII WORLD"
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
}; 