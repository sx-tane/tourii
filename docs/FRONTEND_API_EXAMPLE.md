# 🧪 Tourii Frontend API Usage Examples

This document provides reference implementations for interacting with the Tourii V2 backend from the frontend codebase. These examples supplement the `FRONTEND_BACKEND_INTEGRATION.md` with practical usage patterns, type definitions, and error-handling strategies.

---

## 🔗 API Client Setup

```ts
// src/lib/api-client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
```

---

## 📚 Story Browser Example

```tsx
// src/components/StoryBrowser.tsx
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import type { StorySaga } from '@/types/api';

export const StoryBrowser = () => {
  const [stories, setStories] = useState<StorySaga[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await apiClient.get('/tourii-backend/stories/sagas');
      setStories(response.data);
    };
    fetchStories();
  }, []);

  return <>{/* display stories */}</>;
};
```

---

## 🌐 Model Route Viewer Example

```tsx
// src/components/ModelRouteViewer.tsx
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import type { ModelRoute } from '@/types/api';

export const ModelRouteViewer = ({ routeId }: { routeId: string }) => {
  const [route, setRoute] = useState<ModelRoute | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const response = await apiClient.get(`/tourii-backend/routes/${routeId}`);
      setRoute(response.data);
    };
    fetchRoute();
  }, [routeId]);

  return <>{/* display route */}</>;
};
```

---

## ⚔️ Quest Tracker Example

```tsx
// src/components/QuestTracker.tsx
import apiClient from '@/lib/api-client';

export const startQuest = async (questId: string) => {
  await apiClient.post(`/tourii-backend/quests/${questId}/start`);
};

export const submitTask = async (taskId: string, payload: any) => {
  await apiClient.post(`/tourii-backend/tasks/${taskId}/submit`, payload);
};
```

---

## 💥 Error Handling Utilities

```ts
// src/lib/error-handler.ts
export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

export class TouriiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'TouriiError';
  }
}

export const handleApiError = (error: any): TouriiError => {
  if (error.response) {
    const { status, data } = error.response;
    return new TouriiError(status, data.message || 'API Error');
  }
  return new TouriiError(0, 'Unknown error');
};
```

---

## 🔄 WebSocket Integration Sample

```ts
// src/lib/websocket.ts
export class TouriiWebSocket {
  socket: WebSocket | null = null;
  constructor(public url: string) {}

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => console.log('Connected');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // handle event types here
    };
  }
}
```

---

## 📦 Using apiClient in Components with Error Handling

```tsx
// src/hooks/useStories.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { handleApiError, TouriiError } from '@/lib/error-handler';
import type { StorySaga } from '@/types/api';

export const useStories = () => {
  return useQuery<StorySaga[], TouriiError>(['stories'], async () => {
    try {
      const res = await apiClient.get('/tourii-backend/stories/sagas');
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  });
};
```

---

## 🌐 Advanced WebSocket Usage Example with Events & Reconnects

```ts
// src/lib/websocket.ts
export interface WebSocketConfig {
  url: string;
  reconnectInterval: number;
  maxRetries: number;
}

export class TouriiWebSocket {
  private socket: WebSocket | null = null;
  private retries = 0;
  private listeners: Map<string, (data: any) => void> = new Map();

  constructor(private config: WebSocketConfig) {}

  connect() {
    this.socket = new WebSocket(this.config.url);

    this.socket.onopen = () => {
      console.log('[WS] Connected');
      this.retries = 0;
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const handler = this.listeners.get(msg.type);
      if (handler) handler(msg.data);
    };

    this.socket.onclose = () => {
      console.warn('[WS] Disconnected. Retrying...');
      this.tryReconnect();
    };
  }

  private tryReconnect() {
    if (this.retries < this.config.maxRetries) {
      setTimeout(() => {
        this.retries++;
        this.connect();
      }, this.config.reconnectInterval);
    }
  }

  send(eventType: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: eventType, data: payload }));
    }
  }

  on(eventType: string, handler: (data: any) => void) {
    this.listeners.set(eventType, handler);
  }

  off(eventType: string) {
    this.listeners.delete(eventType);
  }
}

// Usage
const touriiWs = new TouriiWebSocket({
  url: 'ws://localhost:3000/tourii-backend/ws',
  reconnectInterval: 5000,
  maxRetries: 5
});

touriiWs.connect();
touriiWs.on('quest:completed', (data) => console.log('[Quest Completed]', data));
```

---

## 📦 Types (examples)

```ts
export interface StorySaga {
  id: string;
  title: string;
  region: string;
  coverImage: string;
}

export interface ModelRoute {
  id: string;
  routeName: string;
  touristSpots: TouristSpot[];
}

export interface TouristSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
```
_Last updated: 12/04/2025_

