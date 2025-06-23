import type { Meta, StoryObj } from '@storybook/react';
import QuestFilters from './quest-filters';

const meta: Meta<typeof QuestFilters> = {
  title: 'Quest/QuestFilters',
  component: QuestFilters,
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
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page number',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    onPageChange: {
      action: 'page changed',
      description: 'Callback when page is changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestFilters>;

export const Default: Story = {
  args: {
    filters: {
      questType: 'all',
      unlockStatus: 'all',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    filters: {
      questType: 'TRAVEL_TO_EARN',
      unlockStatus: 'true',
      premiumStatus: 'all',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
    currentPage: 3,
    totalPages: 8,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    filters: {
      questType: 'CAMPAIGN',
      unlockStatus: 'all',
      premiumStatus: 'true',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const SinglePageWithFilters: Story = {
  args: {
    filters: {
      questType: 'COMMUNITY_EVENT',
      unlockStatus: 'false',
      premiumStatus: 'false',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const ManyPagesWithFilters: Story = {
  args: {
    filters: {
      questType: 'EARN_TO_TRAVEL',
      unlockStatus: 'true',
      premiumStatus: 'true',
    },
    onFilterChange: (filters) => console.log('Filter changed:', filters),
    currentPage: 15,
    totalPages: 25,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};