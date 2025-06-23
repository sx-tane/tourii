import type { Meta, StoryObj } from '@storybook/react';
import AboutCoin from './about-coin';

const meta: Meta<typeof AboutCoin> = {
  title: 'About/AboutMenu/AboutCoin',
  component: AboutCoin,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AboutCoin>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive coin that reveals about menu on hover. Hover over the coin to see the menu appear.',
      },
    },
  },
};

export const HoverToRevealMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the hover interaction that reveals the about menu with a smooth 3D flip animation.',
      },
    },
  },
};

export const OnDarkBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'About coin displayed on a dark background to show contrast.',
      },
    },
  },
};