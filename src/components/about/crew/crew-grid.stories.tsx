import type { Meta, StoryObj } from '@storybook/react';
import CrewGrid from './crew-grid';

const meta: Meta<typeof CrewGrid> = {
  title: 'About/Crew/CrewGrid',
  component: CrewGrid,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof CrewGrid>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grid layout displaying all crew members with animated entrance effects.',
      },
    },
  },
};

export const InViewport: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Crew grid as it appears when scrolled into view with staggered animations.',
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
        story: 'Crew grid displayed on a dark background to show contrast.',
      },
    },
  },
};