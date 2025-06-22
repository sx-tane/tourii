import type { Meta, StoryObj } from '@storybook/react';
import { PopularQuestSection } from './popular-quest-section';

const meta: Meta<typeof PopularQuestSection> = {
  title: 'Homepage/PopularQuestSection',
  component: PopularQuestSection,
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof PopularQuestSection>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popular Quest Section with featured quests displayed in a grid layout.',
      },
    },
  },
};

export const WithApiData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popular Quest Section showing how it looks when API data is available.',
      },
    },
    mockData: {
      popularQuests: [
        {
          questId: "api-quest-1",
          title: "Temple Exploration Quest",
          imageUrl: "/image/touriiverse/bungo-ono/chapter2.png",
          link: "/v2/quests/api-quest-1",
        },
        {
          questId: "api-quest-2",
          title: "Festival Photography Quest",
          imageUrl: "/image/touriiverse/bungo-ono/chapter3.png",
          link: "/v2/quests/api-quest-2",
        },
        {
          questId: "api-quest-3",
          title: "Cultural Heritage Hunt",
          imageUrl: "/image/touriiverse/bungo-ono/chapter4.png",
          link: "/v2/quests/api-quest-3",
        },
      ],
    },
  },
};

export const FallbackState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popular Quest Section showing fallback demo quests when API is unavailable.',
      },
    },
    mockData: null, // Simulate no API data
  },
};