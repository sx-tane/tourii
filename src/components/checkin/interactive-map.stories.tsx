import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InteractiveMap from './interactive-map';
import type { CheckinResponseDto } from '@/hooks/api/useCheckins';

const mockCheckins: CheckinResponseDto[] = [
  {
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
    ],
    type: 'story',
  },
  {
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
  },
  {
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
  },
  {
    id: '4',
    latitude: 35.7267,
    longitude: 139.7201,
    touristSpot: {
      id: 'asakusa-temple',
      name: 'Sensoji Temple',
      description: 'Ancient Buddhist temple in Asakusa',
      latitude: 35.7267,
      longitude: 139.7201,
    },
    quest: {
      id: 'asakusa-quest',
      name: 'Temple Guardian Quest',
      description: 'Find the hidden guardian statues',
    },
    story: {
      id: 'sensoji-story',
      name: 'The Thunder Gate Legend',
      description: 'Discover the history of Kaminarimon',
    },
    timestamp: '2024-06-12T09:20:00Z',
    rewards: [
      {
        id: 'reward-4',
        name: 'Thunder Gate Seal',
        type: 'goshuin',
      },
    ],
    type: 'story',
  },
];

const meta = {
  title: 'Checkin/InteractiveMap',
  component: InteractiveMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InteractiveMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checkins: mockCheckins,
    onMarkerClick: action('onMarkerClick'),
  },
  decorators: [
    (Story) => (
      <div className="h-screen p-4">
        <Story />
      </div>
    ),
  ],
};

export const EmptyState: Story = {
  args: {
    checkins: [],
    onMarkerClick: action('onMarkerClick'),
  },
  decorators: [
    (Story) => (
      <div className="h-96 p-4">
        <Story />
      </div>
    ),
  ],
};

export const SingleCheckin: Story = {
  args: {
    checkins: [mockCheckins[0]],
    onMarkerClick: action('onMarkerClick'),
  },
  decorators: [
    (Story) => (
      <div className="h-96 p-4">
        <Story />
      </div>
    ),
  ],
};

export const CompactSize: Story = {
  args: {
    checkins: mockCheckins.slice(0, 2),
    onMarkerClick: action('onMarkerClick'),
    className: 'h-64 w-96',
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};