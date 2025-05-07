# 🧩 Tourii V2 Frontend-Backend Integration Guide

This document outlines the integration points between the Tourii frontend and backend systems.

**Key Change**: Frontend interaction with the backend API endpoints (defined in `openapi.json`) is now primarily managed through an OpenAPI-generated client SDK (`src/api/generated/`). This SDK, configured via `src/api/api-client-config.ts` with `OpenAPI.BASE = env.NEXT_PUBLIC_BACKEND_URL` (e.g., `http://host/tourii-backend`), provides type-safe methods for direct API calls. Custom SWR hooks (e.g., in `src/hooks/`) typically wrap these SDK calls, often replacing previous Next.js API proxy routes.

---

# 🔗 Frontend–Backend Integration Guide (Tourii)

This document defines the key integration logic between Tourii's frontend and backend systems, mapping features to their respective APIs and ensuring smooth development alignment.

---

## 🧭 API Domain Overview

This table provides a high-level overview of the backend API domains. The "Endpoint Prefix" indicates the general path segments that follow the configured `OpenAPI.BASE` (which includes common prefixes like `/tourii-backend`).

| Domain          | Endpoint Prefix (relative to `OpenAPI.BASE`) | Notes                            |
| --------------- | --------------------------------------------- | -------------------------------- |
| Auth & Profile  | `/auth/*`                                     | OAuth + Wallet login             |
| User & Passport | `/users/*`                                    | Profile + NFT minting & metadata |
| Stories         | `/stories/*`                                  | Saga, Chapter, Lore              |
| Routes & Spots  | `/routes/*`                                   | Model route & linked locations   |
| Quests          | `/quests/*`                                   | Parent quest, task submission    |
| Memory Wall     | `/memories/*`                                 | Memory wall logs only            |
| Rewards & Perks | `/perks/*`                                    | NFT-based perks + shop logic     |
| Check-in Map    | `/checkin/*`                                  | GPS + QR logic                   |
| Admin           | `/admin/*`                                    | CRUD: quests, routes, stories    |

---

## 🔁 API–Frontend Integration Mapping (by Feature)

This section maps frontend features to the relevant backend API path groupings. These paths are targeted by the SDK and are relative to `OpenAPI.BASE`.

### 1. Authentication & User Management

- **Backend API Paths**: `/auth/*`
- **Frontend Components**:
  - `AuthProvider` - Global authentication state management
  - `LoginForm` - Multi-provider authentication (Discord, Twitter, Google)
  - `UserProfile` - Profile management and settings

### 2. Story & Tourism Features

- **Backend API Paths**: `/stories/*`, `/routes/*`, `/spots/*`
- **Frontend Components**:
  - `StoryBrowser` - Browse and filter story sagas
  - `StoryViewer` - Interactive story experience
  - `RouteMap` - Interactive map with tourist spots
  - `SpotDetails` - Detailed tourist spot information
  - `ModelRouteViewer` - Display and navigate through travel routes
  - `RouteRecommendations` - Show route-specific recommendations

### 3. Gamification System

- **Backend API Paths**: `/quests/*`, `/achievements/*`
- **Frontend Components**:
  - `QuestBrowser` - Browse available quests
  - `QuestTracker` - Active quest progress
  - `AchievementDisplay` - User achievements and rewards
  - `PointsDashboard` - Magatama points tracking

### 4. Blockchain Integration

- **Backend API Paths**: `/assets/*`
- **Frontend Components**:
  - `DigitalPassport` - Display and manage blockchain assets
  - `ItemInventory` - View and manage on-chain items
  - `TransactionHistory` - Blockchain transaction records

---

## 🧩 Component Usage Overview (Frontend → Backend)

This table maps frontend components (or the SWR hooks they use) to the conceptual backend API paths they interact with. These paths are relative to the backend's base URL (e.g., `env.NEXT_PUBLIC_BACKEND_URL`) and are targeted directly by the generated API SDK.

| Component            | Backend Endpoint (Path targeted by SDK)        | Purpose                          |
| -------------------- | ----------------------------------------------- | -------------------------------- |
| `LoginForm`          | `/auth/login`, `/auth/register`, `/auth/wallet` | OAuth + wallet login             |
| `AuthProvider`       | `/auth/refresh`, `/auth/logout`                 | Persist session, auto-refresh    |
| `StoryBrowser`       | `/stories/sagas`                                | Browse all sagas                 |
| `StoryViewer`        | `/stories/chapters/{id}`                        | View chapter + content           |
| `ModelRouteViewer`   | `/routes/{id}`, `/routes/{id}/spots`            | View route with spot map         |
| `RouteMap`           | `/routes/{id}/weather`                          | Region or route weather          |
| `QuestBrowser`       | `/quests/`, `/quests/{id}`                      | List or explore quests           |
| `QuestTracker`       | `/tasks/{id}/submit`, `/tasks/{id}/verify`      | Active quest progression         |
| `AchievementDisplay` | `/achievements`, `/achievements/milestones`     | User achievement board           |
| `DigitalPassport`    | `/assets/passport`, `/assets/stamps`            | NFT passport + stamps            |
| `ItemInventory`      | `/assets/perks`, `/assets/perks/history`        | List all owned perks             |
| `MemoryWallFeed`     | `/social/feed`, `/social/memory-wall`           | Feed view, post/comment          |
| `ProfileOverview`    | `/users/me`, `/logs/*`, `/wallet`               | Self profile dashboard           |
| `AdminDashboardTabs` | `/admin/*`                                      | All backend CRUD/admin endpoints |

### `/launch-app`

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/wallet`
- `POST /auth/verify-signature`

### `/dashboard`

- `GET /users/me`
- `GET /wallet`
- `GET /quests/progress`
- `GET /stories/progress`
- `GET /social/feed`

### `/stories/[sagaId]/[chapterId]`

- `GET /stories/sagas`
- `GET /stories/chapters/{id}`
- `POST /stories/chapters/{id}/progress`

### `/routes/[regionId]/[routeId]`

- `GET /routes/{id}`
- `GET /routes/{id}/spots`
- `GET /routes/{id}/recommendations`
- `GET /routes/{id}/weather`

### `/quests/[questId]`

- `GET /quests/{id}`
- `GET /quests/{id}/tasks`
- `POST /quests/{id}/start`

### `/quests/[questId]/[taskId]`

- `POST /tasks/{id}/submit`
- `POST /tasks/{id}/verify`

### `/quests/[questId]/complete`

- `GET /quests/{id}/rewards`

### `/check-in`

- `POST /check-in/location`
- `GET /check-in/map`
- `GET /check-in/nearby`
- `GET /check-in/history`

### `/shop`

- `GET /shop/items`
- `POST /shop/items/{id}/purchase`

### `/shop/inventory`

- `GET /assets/perks`
- `GET /assets/perks/history`

### `/memory-wall`

- `GET /social/feed`
- `POST /social/memory-wall`
- `GET /social/memory-wall/{id}`

### `/profile`

- `GET /users/me`
- `GET /wallet`
- `GET /assets/passport`
- `GET /achievements`
- `GET /logs/travel`
- `GET /logs/quests`
- `GET /logs/stories`

### `/admin` (Tabs)

- `GET /admin/dashboard`
- `GET/POST/PUT /admin/quests`
- `GET/POST/PUT /admin/stories`
- `GET/POST/PUT /admin/routes`
- `GET/PUT /admin/users`
- `GET/POST /admin/perks`
- `POST /admin/social`

---

✅ Full backend endpoint reference: `openapi.json` (this is the source of truth for API paths and SDK generation)
✅ DB schema reference: `schema.prisma`
✅ Component usage examples: see `/components/*` and API usage examples in `FRONTEND_API_EXAMPLE.md`

*Last Updated: 07/05/2025* Please update this date.
