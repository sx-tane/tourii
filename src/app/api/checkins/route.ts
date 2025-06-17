import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Mock data for development - replace with actual API calls
const mockCheckins = [
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
    type: 'story' as const,
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
        imageUrl: '/image/profile/goshuin/Goshuin2.svg',
      },
    ],
    type: 'quest' as const,
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
        imageUrl: '/image/profile/goshuin/Goshuin3.svg',
      },
    ],
    type: 'route' as const,
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
        imageUrl: '/image/profile/goshuin/Goshuin1.svg',
      },
    ],
    type: 'story' as const,
  },
  {
    id: '5',
    latitude: 35.6596,
    longitude: 139.7456,
    touristSpot: {
      id: 'shibuya-crossing',
      name: 'Shibuya Crossing',
      description: 'The world\'s busiest pedestrian crossing',
      latitude: 35.6596,
      longitude: 139.7456,
    },
    quest: {
      id: 'shibuya-quest',
      name: 'Urban Explorer',
      description: 'Navigate the bustling intersection',
    },
    timestamp: '2024-06-11T18:00:00Z',
    rewards: [
      {
        id: 'reward-5',
        name: 'City Navigator Badge',
        type: 'badge',
        imageUrl: '/image/profile/goshuin/Goshuin2.svg',
      },
    ],
    type: 'quest' as const,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get session for user authentication
    const session = await getServerSession(authOptions);
    
    // In development, allow without authentication
    if (process.env.NODE_ENV === 'production' && !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = Number.parseInt(searchParams.get('page') || '1', 10);
    const limit = Number.parseInt(searchParams.get('limit') || '100', 10);
    const userId = searchParams.get('userId');
    const questId = searchParams.get('questId');
    const touristSpotId = searchParams.get('touristSpotId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type') as 'story' | 'quest' | 'route' | null;

    // Filter mock data based on query parameters
    let filteredCheckins = [...mockCheckins];

    // Filter by type
    if (type && type !== 'all') {
      filteredCheckins = filteredCheckins.filter(checkin => checkin.type === type);
    }

    // Filter by quest ID
    if (questId) {
      filteredCheckins = filteredCheckins.filter(checkin => checkin.quest?.id === questId);
    }

    // Filter by tourist spot ID
    if (touristSpotId) {
      filteredCheckins = filteredCheckins.filter(checkin => checkin.touristSpot.id === touristSpotId);
    }

    // Filter by date range
    if (startDate) {
      filteredCheckins = filteredCheckins.filter(
        checkin => new Date(checkin.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredCheckins = filteredCheckins.filter(
        checkin => new Date(checkin.timestamp) <= new Date(endDate)
      );
    }

    // Pagination
    const total = filteredCheckins.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCheckins = filteredCheckins.slice(startIndex, endIndex);

    const response = {
      checkins: paginatedCheckins,
      total,
      page,
      limit,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching checkins:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}