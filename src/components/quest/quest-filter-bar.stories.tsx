import type { Meta, StoryObj } from '@storybook/react';
import QuestFilterBar from './quest-filter-bar';

const meta: Meta<typeof QuestFilterBar> = {
  title: 'Quest/QuestFilterBar',
  component: QuestFilterBar,
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
  argTypes: {
    filters: {
      control: 'object',
      description: 'Current filter values',
    },
    onFilterChange: {
      action: 'filter changed',
      description: 'Callback when filter values change',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestFilterBar>;

export const Default: Story = {
  args: {
    filters: {
      questType: 'all',
      unlockStatus: 'all',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};

export const TravelToEarnSelected: Story = {
  args: {
    filters: {
      questType: 'TRAVEL_TO_EARN',
      unlockStatus: 'all',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};

export const UnlockedOnly: Story = {
  args: {
    filters: {
      questType: 'all',
      unlockStatus: 'true',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};

export const PremiumOnly: Story = {
  args: {
    filters: {
      questType: 'all',
      unlockStatus: 'all',
      premiumStatus: 'true',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};

export const CampaignAndUnlocked: Story = {
  args: {
    filters: {
      questType: 'CAMPAIGN',
      unlockStatus: 'true',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};

export const CommunityEventAndFree: Story = {
  args: {
    filters: {
      questType: 'COMMUNITY_EVENT',
      unlockStatus: 'all',
      premiumStatus: 'false',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
  },
};