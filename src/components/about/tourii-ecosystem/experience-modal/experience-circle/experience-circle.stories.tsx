import type { Meta, StoryObj } from '@storybook/react';
import ExperienceCircle from './experience-circle';

const meta = {
    title: 'About/TouriiEcosystem/ExperienceCircle',
    component: ExperienceCircle,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ExperienceCircle>;

export default meta;
type Story = StoryObj<typeof ExperienceCircle>;

export const Default: Story = {
    args: {
        title: 'Community Building',
        image: '/image/about/experience/kojiki-item.png'
    }
};

export const WithLongTitle: Story = {
    args: {
        title: 'Decentralized Governance Implementation',
        image: '/image/about/experience/gachapon.png'
    }
}; 