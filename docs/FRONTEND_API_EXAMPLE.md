# 🧪 Tourii Frontend API Usage Examples

This document provides reference implementations for interacting with the Tourii V2 backend from the frontend codebase. These examples now focus on using the OpenAPI-generated client SDK.

---

## 🔗 API Client Setup (OpenAPI Generated SDK)

The primary way to interact with the backend API is through the generated TypeScript client SDK, located in `src/api/generated/`.

### Configuration

The SDK is automatically configured on application startup:
- **Base URL & Global Headers**: Defined in `src/api/api-client-config.ts`. This file uses environment variables (`env.NEXT_PUBLIC_BACKEND_URL`, `env.NEXT_PUBLIC_BACKEND_API_KEY`) to set the API base path and required headers like `x-api-key` and `accept-version`.
- **Initialization**: The configuration is loaded by `src/app/api-client-initializer.tsx`, which is included in the root layout.

### Regeneration

If the backend's `openapi.json` changes, regenerate the client:

```bash
pnpm generate:api
```

---

## 📚 Story Sagas Example (using SWR and Generated SDK)

This example demonstrates fetching all story sagas using a custom SWR hook (`useSagas`) that utilizes the generated `StoriesService`.

```tsx
// src/hooks/stories/useSagas.ts
import useSWR from "swr";
import { StoriesService } from "@/api/generated";
import { env } from "@/env.js";

export function useSagas() {
  const swrKey = "/api/stories/sagas"; // Unique key for SWR
  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    async () => {
      const apiKey = env.NEXT_PUBLIC_BACKEND_API_KEY;
      if (!apiKey) throw new Error("API key is not configured");
      // Call the generated SDK method directly
      return StoriesService.touriiBackendControllerGetSagas(
        '1.0.0', // accept-version
        apiKey   // x-api-key
      );
    }
  );

  return {
    sagas: data, // Data is typed by the SDK according to openapi.json
    isLoading,
    isError: error,
    mutateSagas: mutate,
  };
}

// Example usage in a component:
// import { useSagas } from '@/hooks/stories/useSagas';
//
// function MyComponent() {
//   const { sagas, isLoading, isError } = useSagas();
//
//   if (isLoading) return <p>Loading sagas...</p>;
//   if (isError) return <p>Error loading sagas.</p>;
//
//   return (
//     <ul>
//       {sagas?.map(saga => (
//         <li key={saga.storyId}>{saga.sagaName}</li>
//       ))}
//     </ul>
//   );
// }
```

This approach replaces direct `axios` calls for endpoints covered by the OpenAPI specification.

---

## 🌐 Fetching Story Chapters by ID (SWR and SDK)

```tsx
// src/hooks/stories/useSagaById.ts (fetches chapters for a saga)
import useSWR from "swr";
import { StoriesService } from "@/api/generated";
import { env } from "@/env.js";

export const useSagaById = (storyId: string | undefined) => {
  const swrKey = storyId ? `GET /api/stories/sagas/${storyId}/chapters` : null;
  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    async () => {
      if (!storyId) return undefined;
      const apiKey = env.NEXT_PUBLIC_BACKEND_API_KEY;
      if (!apiKey) throw new Error("API key is not configured");
      return StoriesService.touriiBackendControllerGetStoryChaptersByStoryId(
        storyId,
        "1.0.0",
        apiKey
      );
    },
    { shouldRetryOnError: false }
  );

  return {
    storyChapter: data, // data is an array of chapter objects, typed by the SDK
    isLoadingSaga: isLoading,
    isErrorSaga: error,
    mutateSaga: mutate,
  };
};
```

---

## Legacy API Client (`axios`)

The existing `axios` based client (`src/lib/api-client.ts`) might still be in use for:
- API calls not defined in the `openapi.json` specification.
- Specific interceptor logic (e.g., complex auth token refresh) not handled by the generated client's global configuration.

For new features or when refactoring, prefer using the generated SDK for any endpoints defined in the OpenAPI spec.

```ts
// src/lib/api-client.ts (Legacy)
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Note: ensure this aligns with env.NEXT_PUBLIC_BACKEND_URL if used
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

## 💥 Error Handling with the SDK

The generated SDK typically throws an `ApiError` (from `src/api/generated/core/ApiError.ts`) when an API call fails (e.g., 4xx or 5xx responses). This error object usually contains `status`, `statusText`, and `body` (the parsed error response from the backend).

SWR's `error` object will contain this `ApiError` if the fetcher function (the SDK call) throws it.

```ts
// Example in component using a hook
// const { data, error } = useSagas();
//
// if (error) {
//   console.error("API Error:", error.status, error.body);
//   // Display user-friendly message based on error.status or error.body.code
// }
```

Your existing `handleApiError` and `TouriiError` utilities in `src/lib/error-handler.ts` might need to be adapted or used as a wrapper if you want to standardize errors from different sources (SDK, other fetches).

---

## 📦 Types

With the OpenAPI-generated client, types for API request bodies and responses are automatically generated and available from `src/api/generated/models` (if generated as separate models) or inferred from the service methods.

It's recommended to use these SDK-provided types in your hooks and components instead of manually defined interfaces for API objects to ensure alignment with the backend contract.

For example, instead of:

```ts
// Old custom type
// export interface StorySaga {
//   id: string;
//   title: string;
//   ...
// }
```

You would rely on the type inferred by `StoriesService.touriiBackendControllerGetSagas()`.

---

_Last Updated: 07/05/2025_

