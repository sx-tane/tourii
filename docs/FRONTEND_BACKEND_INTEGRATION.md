# Frontend-Backend Integration Guide (recheck the endpoint at backend)

## Overview

This document outlines the integration points between the Tourii frontend and backend systems, ensuring seamless communication and consistent user experience across the platform.

## API Integration Points

### 1. Authentication & User Management
- **Endpoints**: `/api/auth/*` (endpoint check again)
- **Frontend Components**:
  - `AuthProvider` - Global authentication state management
  - `LoginForm` - Multi-provider authentication (Discord, Twitter, Google)
  - `UserProfile` - Profile management and settings

### 2. Story & Tourism Features
- **Endpoints**: `/api/stories/*`, `/api/routes/*`, `/api/spots/*` (endpoint check again)
- **Frontend Components**:
  - `StoryBrowser` - Browse and filter story sagas
  - `StoryViewer` - Interactive story experience
  - `RouteMap` - Interactive map with tourist spots
  - `SpotDetails` - Detailed tourist spot information
  - `ModelRouteViewer` - Display and navigate through travel routes
  - `RouteRecommendations` - Show route-specific recommendations

### 3. Gamification System
- **Endpoints**: `/api/quests/*`, `/api/achievements/*` (endpoint check again)
- **Frontend Components**:
  - `QuestBrowser` - Browse available quests
  - `QuestTracker` - Active quest progress
  - `AchievementDisplay` - User achievements and rewards
  - `PointsDashboard` - Magatama points tracking

### 4. Blockchain Integration
- **Endpoints**: `/api/blockchain/*` (endpoint check again)
- **Frontend Components**:
  - `DigitalPassport` - Display and manage blockchain assets
  - `ItemInventory` - View and manage on-chain items
  - `TransactionHistory` - Blockchain transaction records

## Data Flow Architecture

### 1. API Client Setup
```typescript
// src/lib/api-client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### 2. Type Definitions
```typescript
// src/types/api.ts
export interface StorySaga {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  region: string;
  // ... other fields
}

export interface ModelRoute {
  id: string;
  routeName: string;
  recommendations: {
    category: string;
    items: string[];
  }[];
  touristSpots: TouristSpot[];
  storySaga: StorySaga;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  bestVisitTime?: string;
  address?: string;
  storyChapterLink?: string;
  hashtags: string[];
  imageSet?: {
    main: string;
    small: string[];
  };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  tasks: QuestTask[];
  // ... other fields
}

// ... other type definitions
```

### 3. State Management
```typescript
// src/lib/store.ts
import { create } from 'zustand';

interface AppState {
  user: User | null;
  activeStory: StorySaga | null;
  activeRoute: ModelRoute | null;
  activeQuest: Quest | null;
  // ... other state
}

export const useStore = create<AppState>((set) => ({
  user: null,
  activeStory: null,
  activeRoute: null,
  activeQuest: null,
  // ... other state
}));
```

## Component Integration Examples

### 1. Story Browser Component
```typescript
// src/components/StoryBrowser.tsx
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import type { StorySaga } from '@/types/api';

export const StoryBrowser = () => {
  const [stories, setStories] = useState<StorySaga[]>([]);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await apiClient.get('/api/stories');
        setStories(response.data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };
    
    fetchStories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};
```

### 2. Model Route Viewer Component
```typescript
// src/components/ModelRouteViewer.tsx
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import type { ModelRoute } from '@/types/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const ModelRouteViewer = ({ routeId }: { routeId: string }) => {
  const [route, setRoute] = useState<ModelRoute | null>(null);
  
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await apiClient.get(`/api/routes/${routeId}`);
        setRoute(response.data);
      } catch (error) {
        console.error('Failed to fetch route:', error);
      }
    };
    
    fetchRoute();
  }, [routeId]);

  if (!route) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{route.routeName}</h2>
          <div className="space-y-4">
            {route.recommendations.map((rec, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{rec.category}</h3>
                <ul className="list-disc list-inside">
                  {rec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px]">
          <MapContainer
            center={[route.touristSpots[0]?.latitude || 35.6762, route.touristSpots[0]?.longitude || 139.6503]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route.touristSpots.map((spot) => (
              <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
                <Popup>
                  <div>
                    <h3 className="font-semibold">{spot.name}</h3>
                    <p className="text-sm">{spot.description}</p>
                    {spot.bestVisitTime && (
                      <p className="text-sm mt-2">
                        Best time to visit: {spot.bestVisitTime}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {route.touristSpots.map((spot) => (
          <TouristSpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};
```

### 3. Tourist Spot Card Component
```typescript
// src/components/TouristSpotCard.tsx
import type { TouristSpot } from '@/types/api';

export const TouristSpotCard = ({ spot }: { spot: TouristSpot }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {spot.imageSet && (
        <img
          src={spot.imageSet.main}
          alt={spot.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{spot.description}</p>
        {spot.bestVisitTime && (
          <p className="text-sm text-gray-500 mb-2">
            Best time to visit: {spot.bestVisitTime}
          </p>
        )}
        {spot.address && (
          <p className="text-sm text-gray-500 mb-2">{spot.address}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {spot.hashtags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## Error Handling & Loading States

### 1. API Error Handling
```typescript
// src/lib/error-handler.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // Handle unauthorized
        break;
      case 403:
        // Handle forbidden
        break;
      case 404:
        // Handle not found
        break;
      default:
        // Handle other errors
        break;
    }
  }
};
```

### 2. Loading States
```typescript
// src/components/LoadingState.tsx
export const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);
```

## Testing Strategy

### 1. API Integration Tests
```typescript
// src/__tests__/api.test.ts
import apiClient from '@/lib/api-client';

describe('API Integration', () => {
  it('should fetch stories successfully', async () => {
    const response = await apiClient.get('/api/stories');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
```

### 2. Component Integration Tests
```typescript
// src/__tests__/StoryBrowser.test.tsx
import { render, screen } from '@testing-library/react';
import { StoryBrowser } from '@/components/StoryBrowser';

describe('StoryBrowser', () => {
  it('should display loading state initially', () => {
    render(<StoryBrowser />);
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });
});
```

## Deployment Considerations

1. **Environment Variables**
   - `NEXT_PUBLIC_API_URL` - Backend API endpoint
   - `NEXT_PUBLIC_BLOCKCHAIN_RPC` - Blockchain RPC endpoint
   - `NEXT_PUBLIC_AUTH_REDIRECT_URL` - Authentication redirect URL

2. **Build Process**
   - API type generation from OpenAPI specs
   - Environment-specific configuration
   - Asset optimization and bundling

3. **Monitoring & Analytics**
   - API performance tracking
   - Error reporting
   - User interaction analytics

## Security Considerations

1. **Authentication**
   - Secure token storage
   - Token refresh mechanism
   - Session management

2. **Data Protection**
   - Input validation
   - XSS prevention
   - CSRF protection

3. **API Security**
   - Rate limiting
   - Request validation
   - Error message sanitization

## Performance Optimization

1. **API Caching**
   - Implement SWR/React Query for data fetching
   - Cache invalidation strategies
   - Background data prefetching

2. **Asset Optimization**
   - Image optimization
   - Code splitting
   - Lazy loading

3. **State Management**
   - Efficient state updates
   - Memoization
   - Selective re-rendering

## Future Considerations

1. **Real-time Updates**
   - WebSocket integration
   - Push notifications
   - Live quest updates

2. **Offline Support**
   - Service Worker implementation
   - Local storage caching
   - Background sync

3. **Internationalization**
   - Multi-language support
   - Region-specific content
   - Currency conversion

---

Last Updated: [Current Date] 