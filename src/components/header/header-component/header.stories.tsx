import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta = {
    title: 'Header/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '360px',
                        height: '640px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '1440px',
                        height: '900px',
                    },
                },
            },
        },
    },
    argTypes: {
        theme: {
            control: 'radio',
            options: ['black', 'white'],
            description: 'Header theme variant'
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Light: Story = {
    args: {
        theme: 'white'
    },
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
};

export const Dark: Story = {
    args: {
        theme: 'black'
    },
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    }
};

export const Mobile: Story = {
    args: {
        theme: 'white'
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
};

export const Tablet: Story = {
    args: {
        theme: 'white'
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}; 