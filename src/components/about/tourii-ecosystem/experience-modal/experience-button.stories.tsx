import type { Meta, StoryObj } from '@storybook/react';
import ExperienceButton from './experience-button';

const meta = {
    title: 'About/TouriiEcosystem/ExperienceButton',
    component: ExperienceButton,
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
} satisfies Meta<typeof ExperienceButton>;

export default meta;
type Story = StoryObj<typeof ExperienceButton>;

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