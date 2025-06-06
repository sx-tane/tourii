# 🧪 Tourii Frontend API Usage Examples

This document provides reference implementations for interacting with the Tourii V2 backend from the frontend codebase. The primary pattern involves using client-side SWR hooks to call Next.js API routes (proxies), which in turn use the OpenAPI-generated client SDK to communicate with the backend.

---

## 🔗 API Interaction Pattern

The main way the frontend interacts with the backend API involves three key parts:

1.  **Client-Side SWR Hooks (e.g., in `src/hooks/`)**:
    *   These hooks (like `getSagas.ts` or `getSagaById.ts`) are used in UI components.
    *   They call internal Next.js API routes (e.g., `/api/stories/sagas`) using the `useProxySWR` helper which wraps a `proxyFetcher` for standardized error handling.

2.  **Next.js API Routes (Proxy Routes - e.g., in `src/app/api/`)**:
    *   These server-side routes (e.g., `src/app/api/stories/sagas/route.ts`) receive requests from the client-side hooks.
    *   They utilize the **OpenAPI-generated TypeScript client SDK** (located in `src/api/generated/`) to make the actual calls to the backend Tourii API.
    *   Common logic for these routes, including SDK configuration and error handling, is often centralized in helper functions (e.g., `executeValidatedServiceCall` in `src/app/api/lib/route-helper.ts`).

3.  **SDK Configuration (Server-Side)**:
    *   The OpenAPI client SDK (e.g., `StoriesService`) is configured *within the Next.js API routes* just before a call is made.
    *   This typically involves setting `OpenAPI.BASE` (the backend URL) and providing the API key. These values are sourced from server-side environment variables (e.g., `env.NEXT_PUBLIC_BACKEND_URL`, `env.BACKEND_API_KEY` via `src/env.js`).
    *   This server-side handling protects the API key and allows for centralized control over backend communication.
    *   A global, static `src/api/api-client-config.ts` file for SDK initialization at app startup is generally not used for this proxied data-fetching pattern.

### SDK Regeneration

If the backend's `openapi.json` changes, regenerate the client SDK:

```bash
pnpm generate:api
```

---

## 📚 Story Sagas Example (SWR Hook with Proxy API Route)

This example demonstrates fetching all story sagas using a custom SWR hook (`getSagas`) that calls a Next.js API proxy route. The proxy route then uses the generated `StoriesService`.

**1. Client-Side SWR Hook:**
```tsx
// src/hooks/stories/getSagas.ts
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";

export function getSagas() {
  const swrKey = "/api/stories/sagas"; // Calls the Next.js API proxy route

  const { data, error, isLoading, mutate } =
    useProxySWR<StoryResponseDto[]>(swrKey);

  return {
    sagas: data, // Data is typed by the SDK according to openapi.json (via the proxy)
    isLoading,
    isError: error,
    mutateSagas: mutate,
  };
}

// Example usage in a component:
// import { getSagas } from '@/hooks/stories/getSagas';
//
// function MyComponent() {
//   const { sagas, isLoading, isError } = getSagas();
//
//   if (isLoading) return <p>Loading sagas...</p>;
//   if (isError) return <p>Error loading sagas: {isError.message}</p>;
//
//   return (
//     <ul>
//       {sagas?.map(saga => (
//         <li key={saga.storyId}>{saga.sagaName}</li> // Assuming StoryResponseDto has storyId and sagaName
//       ))}
//     </ul>
//   );
// }
```

**2. Next.js API Proxy Route (Server-Side):**
```typescript
// src/app/api/stories/sagas/route.ts
import { StoriesService } from "@/api/generated";
import { executeValidatedServiceCall } from "../../lib/route-helper"; // Path to your helper

export async function GET() {
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      StoriesService.touriiBackendControllerGetSagas(apiVersion, apiKey),
    "GET /api/stories/sagas"
  );
}
```

**3. SDK Configuration and Execution Helper (Server-Side):**
(Simplified from `src/app/api/lib/route-helper.ts`)
```typescript
// Part of src/app/api/lib/route-helper.ts
import { OpenAPI, ApiError } from "@/api/generated";
import { env } from "@/env.js";
import { NextResponse } from "next/server";

export async function executeValidatedServiceCall<T>(
  serviceCall: (apiKey: string, apiVersion: string) => Promise<T>,
  routeNameForLogging: string,
): Promise<NextResponse> {
  OpenAPI.BASE = env.NEXT_PUBLIC_BACKEND_URL; // Configured here
  const apiKey = env.BACKEND_API_KEY;          // Configured here
  const apiVersion = env.BACKEND_API_VERSION || "1.0.0";

  if (!OpenAPI.BASE || !apiKey) {
    // ... error handling ...
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }
  try {
    const data = await serviceCall(apiKey, apiVersion);
    return NextResponse.json(data);
  } catch (error) {
    // ... sophisticated error handling using ApiError ...
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.body || error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
```

This proxy pattern ensures API keys are not exposed client-side and centralizes backend API interaction.

---

## 🌐 Fetching Story Chapters by ID (SWR Hook with Proxy)

This follows the same pattern. The client-side hook `getSagaById` (from `src/hooks/stories/getSagaById.ts`) would call a Next.js API route like `/api/stories/[storyId]/chapters`.

**Client-Side SWR Hook:**
```tsx
// src/hooks/stories/getSagaById.ts
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryChapterResponseDto } from "@/api/generated";

export const getSagaById = (storyId: string | undefined) => {
  const swrKey = storyId ? `/api/stories/${storyId}/chapters` : null;
  const { data, error, isLoading, mutate } =
    useProxySWR<StoryChapterResponseDto[]>(swrKey, { shouldRetryOnError: false });

  return {
    storyChapter: data,
    isLoadingSaga: isLoading,
    isErrorSaga: error,
    mutateSaga: mutate,
  };
};
```

**Next.js API Proxy Route (Server-Side):**
```typescript
// src/app/api/stories/[storyId]/chapters/route.ts
import { StoriesService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper"; // Adjusted path

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ storyId: string }> }
) {
  const { storyId } = await params;
  // ... validation for storyId ...
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      StoriesService.touriiBackendControllerGetStoryChaptersByStoryId(
        storyId,
        apiVersion,
        apiKey,
      ),
    `GET /api/stories/${storyId}/chapters`,
  );
}
```

---

## Legacy API Client (`axios`)

(This section describes a legacy `axios`-based client that was previously located at `src/lib/api-client.ts`. This client appears to have been removed from the project. For new features or when refactoring, always prefer using the generated SDK for any endpoints defined in the OpenAPI spec. If you encounter parts of the application potentially still attempting to use a legacy client, they should be updated to use the OpenAPI SDK.)

```ts
// src/lib/api-client.ts (Legacy - Believed to be removed)
// import axios from 'axios';
//
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Note: ensure this aligns with env.NEXT_PUBLIC_BACKEND_URL if used
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
//
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('auth_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
//
// export default apiClient;
```

---

## 💥 Error Handling

When using the proxy pattern:
- **Client-Side**: The `useProxySWR` hook wraps a `proxyFetcher` that parses errors from the Next.js API route. The `error` object returned by SWR will be the `StructuredError` (defined in `src/lib/swr/fetcher.ts`) if the proxy route returns an error.
- **Server-Side (in API Route)**: The `executeValidatedServiceCall` helper catches errors from the SDK call (e.g., `ApiError` from `@/api/generated/core/ApiError.ts`). It then transforms these into a standardized JSON response (e.g., using `touriiErrorResponse`).

```ts
// Example in component using a hook (client-side)
// const { data, error } = getSagas(); // or getSagaById
//
// if (error) { // error is StructuredError
//   console.error("Proxy API Error:", error.status, error.message, error.code, error.details);
//   // Display user-friendly message based on error.message or error.code
// }
```
Your `src/lib/errors.ts` utilities might be used by the `proxyFetcher` (via `useProxySWR`) or for other client-side error handling needs if necessary, but primary SDK errors are handled server-side first.

---

## 📦 Types

With the OpenAPI-generated client, types for API request bodies and responses are automatically generated (e.g., `StoryResponseDto`, `StoryChapterResponseDto`).

It's recommended to use these SDK-provided types in your client-side hooks (for the expected data from the proxy) and in your Next.js API routes to ensure alignment with the backend contract.

For example, instead of:

```ts
// Old custom type
// export interface StorySaga { // ... }
```

You would rely on types like `StoryResponseDto` provided by or composed from the SDK.

---

_Last Updated: May 8, 2025_

