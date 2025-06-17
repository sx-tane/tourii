import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MapMarker from './map-marker';
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

const meta = {
  title: 'Checkin/MapMarker',
  component: MapMarker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StoryMarker: Story = {
  args: {
    checkin: mockStoryCheckin,
    onClick: action('onMarkerClick'),
  },
};

export const QuestMarker: Story = {
  args: {
    checkin: mockQuestCheckin,
    onClick: action('onMarkerClick'),
  },
};

export const RouteMarker: Story = {
  args: {
    checkin: mockRouteCheckin,
    onClick: action('onMarkerClick'),
  },
};

export const AllMarkersComparison: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <MapMarker
          checkin={mockStoryCheckin}
          onClick={action('onStoryMarkerClick')}
        />
        <p className="mt-2 text-sm text-gray-600">Story</p>
      </div>
      <div className="text-center">
        <MapMarker
          checkin={mockQuestCheckin}
          onClick={action('onQuestMarkerClick')}
        />
        <p className="mt-2 text-sm text-gray-600">Quest</p>
      </div>
      <div className="text-center">
        <MapMarker
          checkin={mockRouteCheckin}
          onClick={action('onRouteMarkerClick')}
        />
        <p className="mt-2 text-sm text-gray-600">Route</p>
      </div>
    </div>
  ),
};