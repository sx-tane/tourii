import type { Meta, StoryObj } from '@storybook/react';
import BackToTop from './back-to-top';

const meta = {
    title: 'About/BackToTop',
    component: BackToTop,
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
    decorators: [
        (Story) => (
            <div style={{ minHeight: '200vh', paddingTop: '100vh' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof BackToTop>;

// Mobile view (where the component is visible)
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
};

// Desktop view (where the component is hidden)
export const Desktop: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop'
        }
    }
}; 