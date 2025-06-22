import type { Meta, StoryObj } from '@storybook/react';
import chapterSelectionMobileButton from './chapter-selection-mobile-button';

const meta: Meta<typeof chapterSelectionMobileButton> = {
  title: 'Story/ChapterPage/ChapterSelectionMobileButton',
  component: chapterSelectionMobileButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof chapterSelectionMobileButton>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mobile button for chapter selection with three dots and hover effects.',
      },
    },
  },
};

export const OnLightBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        story: 'Chapter selection mobile button displayed on a light background.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover over the button to see the color transition effects.',
      },
    },
  },
};