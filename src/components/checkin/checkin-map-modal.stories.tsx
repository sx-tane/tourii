import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckinMapModal from './checkin-map-modal';
import { Button } from '@/components/ui/button';

const ModalWrapper = ({ 
  userId,
  onNavigateToStory,
  onNavigateToQuest,
}: { 
  userId?: string;
  onNavigateToStory?: (storyId: string) => void;
  onNavigateToQuest?: (questId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="mb-4">
        Open Check-In Map
      </Button>
      <CheckinMapModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
        onNavigateToStory={onNavigateToStory}
        onNavigateToQuest={onNavigateToQuest}
      />
    </>
  );
};

const meta = {
  title: 'Checkin/CheckinMapModal',
  component: CheckinMapModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    userId: { control: 'text' },
    onClose: { action: 'onClose' },
    onNavigateToStory: { action: 'onNavigateToStory' },
    onNavigateToQuest: { action: 'onNavigateToQuest' },
  },
} satisfies Meta<typeof CheckinMapModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
  render: () => <ModalWrapper />,
};

export const WithUserId: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    userId: "user123",
  },
  render: () => <ModalWrapper userId="user123" />,
};

export const DirectlyOpen: Story = {
  args: {
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};

export const WithUsageExample: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    userId: "demo-user",
  },
  render: () => (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Check-In Map Modal Example</h2>
      <p className="text-gray-600">
        This modal shows all user check-ins on an interactive map with filtering options.
      </p>
      <ModalWrapper userId="demo-user" />
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Interactive map with zoom controls</li>
          <li>• Filter by All, Story, or Quest check-ins</li>
          <li>• Click markers to view location details</li>
          <li>• Navigate to related stories or quests</li>
          <li>• Add locations to memory wall</li>
        </ul>
      </div>
    </div>
  ),
};