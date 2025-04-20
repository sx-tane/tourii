import type { Meta, StoryObj } from '@storybook/react';
import TouriiEcosystem from './tourii-ecosystem';

const meta = {
    title: 'About/TouriiEcosystem/TouriiEcosystem',
    component: TouriiEcosystem,
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
} satisfies Meta<typeof TouriiEcosystem>;

export default meta;
type Story = StoryObj<typeof TouriiEcosystem>;

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