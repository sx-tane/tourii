import type { Meta, StoryObj } from '@storybook/react';
import QuestPagination from './quest-pagination';

const meta: Meta<typeof QuestPagination> = {
  title: 'Quest/QuestPagination',
  component: QuestPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof QuestPagination>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const TwoPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 2,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};