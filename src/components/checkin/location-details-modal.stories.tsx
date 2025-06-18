import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import LocationDetailsModal from './location-details-modal';
import { Button } from '@/components/ui/button';
import type { CheckinResponseDto } from '@/hooks/api/useCheckins';

const mockStoryCheckin: CheckinResponseDto = {
  id: '1',
  latitude: 35.0116,
  longitude: 135.7681,
  touristSpot: {
    id: 'fushimi-inari',
    name: 'Fushimi Inari Shrine',
    description: 'Famous shrine with thousands of torii gates',
    latitude: 35.0116,
    longitude: 135.7681,
  },
  quest: {
    id: 'shrine-quest-1',
    name: 'Sacred Torii Trail',
    description: 'Climb the mountain following the torii gates',
  },
  story: {
    id: 'inari-story',
    name: 'The Fox Guardian',
    description: 'Learn about Inari, the rice deity',
  },
  timestamp: '2024-06-15T14:30:00Z',
  rewards: [
    {
      id: 'reward-1',
      name: 'Inari Shrine Stamp',
      type: 'goshuin',
      imageUrl: '/image/profile/goshuin/Goshuin1.svg',
    },
    {
      id: 'reward-1b',
      name: 'Fox Spirit Badge',
      type: 'badge',
    },
  ],
  type: 'story',
};

const mockQuestCheckin: CheckinResponseDto = {
  id: '2',
  latitude: 35.6762,
  longitude: 139.6503,
  touristSpot: {
    id: 'tokyo-tower',
    name: 'Tokyo Tower',
    description: 'Iconic red and white tower in Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
  },
  quest: {
    id: 'tokyo-quest-1',
    name: 'City Heights Challenge',
    description: 'Reach the observation deck',
  },
  timestamp: '2024-06-14T10:15:00Z',
  rewards: [
    {
      id: 'reward-2',
      name: 'Tokyo Tower Badge',
      type: 'badge',
    },
  ],
  type: 'quest',
};

const mockRouteCheckin: CheckinResponseDto = {
  id: '3',
  latitude: 34.9949,
  longitude: 135.7851,
  touristSpot: {
    id: 'kiyomizu-temple',
    name: 'Kiyomizu-dera Temple',
    description: 'Historic temple with wooden stage',
    latitude: 34.9949,
    longitude: 135.7851,
  },
  timestamp: '2024-06-13T16:45:00Z',
  rewards: [
    {
      id: 'reward-3',
      name: 'Temple Visit Stamp',
      type: 'goshuin',
    },
  ],
  type: 'route',
};

const ModalWrapper = ({ checkin }: { checkin: CheckinResponseDto }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open {checkin.touristSpot.name} Details
      </Button>
      <LocationDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        checkin={checkin}
        onViewStory={() => {}}
        onReplayQuest={() => {}}
        onAddToMemoryWall={() => {}}
      />
    </>
  );
};

const meta = {
  title: 'Checkin/LocationDetailsModal',
  component: LocationDetailsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    checkin: { control: 'object' },
    onClose: { action: 'onClose' },
    onViewStory: { action: 'onViewStory' },
    onReplayQuest: { action: 'onReplayQuest' },
    onAddToMemoryWall: { action: 'onAddToMemoryWall' },
  },
} satisfies Meta<typeof LocationDetailsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StoryCheckin: Story = {
  args: {
    isOpen: false,
    checkin: mockStoryCheckin,
    onClose: () => {},
    onViewStory: () => {},
    onReplayQuest: () => {},
    onAddToMemoryWall: () => {},
  },
  render: () => <ModalWrapper checkin={mockStoryCheckin} />,
};

export const QuestCheckin: Story = {
  args: {
    isOpen: false,
    checkin: mockQuestCheckin,
    onClose: () => {},
    onViewStory: () => {},
    onReplayQuest: () => {},
    onAddToMemoryWall: () => {},
  },
  render: () => <ModalWrapper checkin={mockQuestCheckin} />,
};

export const RouteCheckin: Story = {
  args: {
    isOpen: false,
    checkin: mockRouteCheckin,
    onClose: () => {},
    onViewStory: () => {},
    onReplayQuest: () => {},
    onAddToMemoryWall: () => {},
  },
  render: () => <ModalWrapper checkin={mockRouteCheckin} />,
};

export const DirectlyOpen: Story = {
  args: {
    isOpen: true,
    checkin: mockStoryCheckin,
    onClose: () => {},
    onViewStory: () => {},
    onReplayQuest: () => {},
    onAddToMemoryWall: () => {},
  },
};

export const NoRewards: Story = {
  args: {
    isOpen: true,
    checkin: {
      ...mockRouteCheckin,
      rewards: [],
    },
    onClose: () => {},
    onViewStory: () => {},
    onReplayQuest: () => {},
    onAddToMemoryWall: () => {},
  },
};