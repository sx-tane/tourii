import type { Meta, StoryObj } from '@storybook/react';
import TouriiLogoAnimation from './tourii-logo-animation';

const meta = {
    title: 'Homepage/TouriiLogoAnimation',
    component: TouriiLogoAnimation,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' },
                { name: 'dark', value: '#21211B' },
            ],
        },
    },
    argTypes: {
        onAnimationComplete: { action: 'animationComplete' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TouriiLogoAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onAnimationComplete: undefined,
    },
};

export const WithCallback: Story = {
    args: {
        onAnimationComplete: () => console.log('Animation completed!'),
    },
}; 