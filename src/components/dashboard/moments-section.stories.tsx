import type { Meta, StoryObj } from '@storybook/react';
import { MomentsSection } from './moments-section';

const meta: Meta<typeof MomentsSection> = {
  title: 'Dashboard/MomentsSection',
  component: MomentsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MomentsSection>;

// Mock SWR to avoid API calls in Storybook
const mockSWRResponse = {
  data: {
    moments: [
      {
        imageUrl: '/image/model-route/1/miyazaki/1.jpg',
        username: 'TravelExplorer',
        description: 'Just visited this amazing shrine in Miyazaki! The architecture is breathtaking.',
        rewardText: 'Earned 50 Tourii Points',
        insDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        imageUrl: '/image/model-route/2/fukoji-temple/1.jpg',
        username: 'AdventureSeeker',
        description: 'Completed the temple visit quest. Such a peaceful experience!',
        rewardText: 'Earned Temple Visitor Badge',
        insDateTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        imageUrl: '/image/model-route/3/inazumi-cave/1.jpg',
        username: 'CaveExplorer',
        description: 'The Inazumi Cave was incredible! Perfect for the underground quest.',
        rewardText: 'Earned 75 Tourii Points',
        insDateTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 5,
      totalItems: 23,
    },
  },
  isLoading: false,
  isError: false,
};

export const Default: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/moments*',
        method: 'GET',
        status: 200,
        response: mockSWRResponse.data,
      },
    ],
  },
};

export const Loading: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/moments*',
        method: 'GET',
        status: 200,
        response: mockSWRResponse.data,
        delay: 'infinite', // Simulate loading state
      },
    ],
  },
};

export const EmptyState: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/moments*',
        method: 'GET',
        status: 200,
        response: {
          moments: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
          },
        },
      },
    ],
  },
};

export const ErrorState: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/moments*',
        method: 'GET',
        status: 500,
        response: { error: 'Internal server error' },
      },
    ],
  },
};