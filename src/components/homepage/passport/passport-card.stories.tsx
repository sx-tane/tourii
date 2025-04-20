import type { Meta, StoryObj } from '@storybook/react';
import { PassportCard } from './passport-card';

const meta = {
    title: 'Homepage/Passport/PassportCard',
    component: PassportCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    tags: ['autodocs'],
    argTypes: {
        passportType: {
            control: 'select',
            options: ['BONJIN', 'AMATSUKAMI', 'KUNITSUKAMI', 'YOKAI'],
        },
        characters: {
            description: 'Array of Chinese characters to display',
            control: { type: 'object' }
        },
        avatarUrl: {
            control: 'text',
        },
        backgroundColor: {
            control: 'color',
            description: 'Background color of the passport card',
        }
    },
} satisfies Meta<typeof PassportCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        passportType: 'AMATSUKAMI',
        characters: ['天', '津', '神'],
        avatarUrl: '/image/profile/nft/19.png',
        backgroundColor: '#AE3111', // Default red color
    },
};

export const Yokai: Story = {
    args: {
        passportType: 'YOKAI',
        characters: ['妖', '怪'],
        avatarUrl: '/image/profile/nft/100.png',
        backgroundColor: '#21211B', // Purple variant
    },
};

export const Kunitsukami: Story = {
    args: {
        passportType: 'KUNITSUKAMI',
        characters: ['国', '津', '神'],
        avatarUrl: '/image/profile/nft/171.png',
        backgroundColor: '#1F4D36', // Green variant
    },
}; 