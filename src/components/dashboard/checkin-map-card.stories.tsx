import type { Meta, StoryObj } from '@storybook/react';
import CheckinMapCard from './checkin-map-card';

const meta = {
  title: 'Dashboard/CheckinMapCard',
  component: CheckinMapCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
    className: { control: 'text' },
    onNavigateToStory: { action: 'onNavigateToStory' },
    onNavigateToQuest: { action: 'onNavigateToQuest' },
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckinMapCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithUserId: Story = {
  args: {
    userId: 'user123',
  },
};

export const CustomClass: Story = {
  args: {
    className: 'border-l-4 border-l-indigo-500',
  },
};

export const InDashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Current Chapter</h3>
        <p className="text-3xl font-bold text-indigo-600">Kyoto Tales</p>
        <p className="text-sm text-gray-500">Chapter 2 of 5</p>
      </div>
      
      <CheckinMapCard
        userId="demo-user"
        onNavigateToStory={() => {}}
        onNavigateToQuest={() => {}}
      />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tourii Points</h3>
        <p className="text-3xl font-bold text-indigo-600">750</p>
        <p className="text-sm text-gray-500">Level 3 Explorer</p>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-full max-w-6xl">
        <Story />
      </div>
    ),
  ],
};

export const LoadingState: Story = {
  render: () => (
    <div className="w-80">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <div className="w-5 h-5 bg-indigo-600 rounded" />
            </div>
            <h3 className="font-semibold text-gray-900">Check-In Map</h3>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  ),
};