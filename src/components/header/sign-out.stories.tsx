import type { Meta, StoryObj } from '@storybook/react';
import SignOut from './sign-out';

const meta = {
    title: 'Header/SignOut',
    component: SignOut,
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
    argTypes: {
        textColor: {
            control: 'radio',
            options: ['black', 'white'],
            description: 'Text color for the sign out link'
        },
        hoverTextColor: {
            control: 'radio',
            options: ['black', 'white'],
            description: 'Text color when hovering over the sign out link'
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SignOut>;

export default meta;
type Story = StoryObj<typeof SignOut>;

export const Light: Story = {
    args: {
        textColor: 'black',
        hoverTextColor: 'charcoal'
    },
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
};

export const Dark: Story = {
    args: {
        textColor: 'white',
        hoverTextColor: 'warmGrey3'
    },
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    }
};

// Add interaction states
export const Hover: Story = {
    args: {
        textColor: 'black',
        hoverTextColor: 'charcoal'
    },
    parameters: {
        pseudo: { hover: true }
    }
};

export const Focus: Story = {
    args: {
        textColor: 'black',
        hoverTextColor: 'charcoal'
    },
    parameters: {
        pseudo: { focus: true }
    }
}; 