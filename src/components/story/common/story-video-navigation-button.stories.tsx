import type { Meta, StoryObj } from '@storybook/react';
import StoryVideoNavigationButtons from './story-video-navigation-button';

const meta: Meta<typeof StoryVideoNavigationButtons> = {
  title: 'Story/Common/StoryVideoNavigationButton',
  component: StoryVideoNavigationButtons,
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
  argTypes: {
    isMuted: {
      control: 'boolean',
      description: 'Whether the video sound is muted',
    },
    toggleSound: {
      action: 'sound toggled',
      description: 'Callback to toggle sound state',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-80 h-60 bg-black/50 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StoryVideoNavigationButtons>;

export const Unmuted: Story = {
  args: {
    isMuted: false,
    toggleSound: () => console.log('Sound toggled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Video navigation button with sound enabled (speaker wave icon).',
      },
    },
  },
};

export const Muted: Story = {
  args: {
    isMuted: true,
    toggleSound: () => console.log('Sound toggled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Video navigation button with sound muted (speaker X icon).',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    isMuted: false,
    toggleSound: () => console.log('Sound toggled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button to see the toggle action in the Actions panel.',
      },
    },
  },
};