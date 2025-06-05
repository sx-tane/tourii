# 🧩 Tourii V2 Frontend-Backend Integration Guide

This document outlines the integration points between the Tourii frontend and backend systems.

---

# 🔗 Frontend–Backend Integration Guide (Tourii)

This document defines the key integration logic between Tourii's frontend and backend systems, mapping features to their respective APIs and ensuring smooth development alignment.

---

## 🧭 API Domain Overview


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

This section maps frontend features to the relevant backend API path groupings. These paths are targeted by the SDK (typically from server-side Next.js API Routes) and are relative to `OpenAPI.BASE`.

### 1. Authentication & User Management

- **Backend API Paths**: `/auth/*`
- **Frontend Routes (Examples)**: `/v2/auth/login`, `/v2/auth/register` (Actual components: `AuthProvider`, `LoginForm`, `UserProfile`)

### 2. Story & Tourism Features

- **Backend API Paths**: `/stories/*`, `/routes/*`, `/spots/*`
- **Frontend Routes (Examples)**: `/v2/stories`, `/v2/routes`, `/model-route` (Actual components: `StoryBrowser`, `StoryViewer`, `RouteMap`, `SpotDetails`, `ModelRouteViewer`, `RouteRecommendations`)

### 3. Gamification System

- **Backend API Paths**: `/quests/*`, `/achievements/*`
- **Frontend Routes (Examples)**: `/v2/quests` (Actual components: `QuestBrowser`, `QuestTracker`, `AchievementDisplay`, `PointsDashboard`)

### 4. Blockchain Integration

- **Backend API Paths**: `/assets/*`
- **Frontend Routes (Examples)**: `/profile-dev` (related to Digital Passport), `/v2/shop/inventory` (Actual components: `DigitalPassport`, `ItemInventory`, `TransactionHistory`)

---

## 🧩 Component Usage Overview (Frontend → Backend)

This table maps conceptual frontend features/pages (and the SWR hooks they might use) to the backend API paths. Frontend paths are now generally prefixed with `/v2/` or have specific names like `/profile-dev`. API calls are made via Next.js proxy routes.

| Feature/Page (Example Frontend Path) | Backend Endpoint (Path targeted by SDK from proxy) | Purpose                          |
| ------------------------------------ | ----------------------------------------------- | -------------------------------- |
| Login/Auth (`/v2/auth/...`)          | `/auth/login`, `/auth/register`, `/auth/wallet` | OAuth + wallet login             |
| Session Management (`AuthProvider`)  | `/auth/refresh`, `/auth/logout`                 | Persist session, auto-refresh    |
| Story Browser (`/v2/stories`)        | `/stories/sagas`                                | Browse all sagas                 |
| Story Viewer (`/v2/stories/...`)     | `/stories/chapters/{id}`                        | View chapter + content           |
| Model Route Viewer (`/v2/routes/{id}` or `/model-route/{id}`) | `/routes/{id}`, `/routes/{id}/spots`            | View route with spot map         |
| Route Map Weather (`/v2/routes/...`) | `/routes/{id}/weather`                          | Region or route weather          |
| Quest Browser (`/v2/quests`)         | `/quests/`, `/quests/{id}`                      | List or explore quests           |
| Quest Tracker (`/v2/quests/...`)     | `/tasks/{id}/submit`, `/tasks/{id}/verify`      | Active quest progression         |
| Achievements (`/profile-dev` or other) | `/achievements`, `/achievements/milestones`     | User achievement board           |
| Digital Passport (`/profile-dev`)    | `/assets/passport`, `/assets/stamps`            | NFT passport + stamps            |
| Item Inventory (`/v2/shop/inventory`)| `/assets/perks`, `/assets/perks/history`        | List all owned perks             |
| Memory Wall (`/memory-wall` - *Route not found, TBD*) | `/social/feed`, `/social/memory-wall`           | Feed view, post/comment          |
| Profile Overview (`/profile-dev`)    | `/users/me`, `/logs/*`, `/wallet`               | Self profile dashboard           |
| Admin Panel (`/admin` - *Route not found, TBD*) | `/admin/*`                                      | All backend CRUD/admin endpoints |

### `/v2/auth/...` (formerly /launch-app)

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/wallet`
- `POST /auth/verify-signature`

### `/v2/dashboard`

- `GET /users/me`
- `GET /wallet`
- `GET /quests/progress`
- `GET /stories/progress`
- `GET /social/feed` (Potentially for dashboard, if not for a separate memory wall)

### `/v2/stories/[sagaId]/[chapterId]`

- `GET /stories/sagas`
- `GET /stories/chapters/{id}`
- `POST /stories/chapters/{id}/progress`

### `/v2/routes/[regionId]/[routeId]` (and potentially `/model-route/[routeId]`)

- `GET /routes/{id}`
- `GET /routes/{id}/spots`
- `GET /routes/{id}/recommendations`
- `GET /routes/{id}/weather`

### `/v2/quests/[questId]`

- `GET /quests/{id}`
- `GET /quests/{id}/tasks`
- `POST /quests/{id}/start`

### `/v2/quests/[questId]/[taskId]`

- `POST /tasks/{id}/submit`
- `POST /tasks/{id}/verify`

### `/v2/quests/[questId]/complete`

- `GET /quests/{id}/rewards`

### `/check-in` (*Route not found, TBD*)

- `POST /check-in/location`
- `GET /check-in/map`
- `GET /check-in/nearby`
- `GET /check-in/history`

### `/v2/shop`

- `GET /shop/items`
- `POST /shop/items/{id}/purchase`

### `/v2/shop/inventory`

- `GET /assets/perks`
- `GET /assets/perks/history`

### `/memory-wall` (*Route not found, TBD*)

- `GET /social/feed`
- `POST /social/memory-wall`
- `GET /social/memory-wall/{id}`

### `/profile-dev` (formerly /profile)

- `GET /users/me`
- `GET /wallet`
- `GET /assets/passport`
- `GET /achievements`
- `GET /logs/travel`
- `GET /logs/quests`
- `GET /logs/stories`

### `/admin` (*Route not found, TBD*)

- `GET /admin/dashboard`
- `GET/POST/PUT /admin/quests`

✅ Full backend endpoint reference: `openapi.json` (this is the source of truth for API paths and SDK generation)
✅ DB schema reference: `schema.prisma`
✅ Component usage examples: see `/components/*` and API usage examples in `FRONTEND_API_EXAMPLE.md`

_Last Updated: May 8 2025_
