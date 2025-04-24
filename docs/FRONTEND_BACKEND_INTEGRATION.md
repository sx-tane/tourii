# 🧩 Tourii V2 Frontend-Backend Integration Guide

This document outlines the integration points between the Tourii frontend and backend systems, ensuring seamless communication and consistent user experience across the platform.

---

# 🔗 Frontend–Backend Integration Guide (Tourii)

This document defines the key integration logic between Tourii's frontend and backend systems, mapping features to their respective APIs and ensuring smooth development alignment.

---

## 🧭 API Domain Overview

| Domain          | Endpoint Prefix           | Notes                            |
| --------------- | ------------------------- | -------------------------------- |
| Auth & Profile  | `/auth/*`                 | OAuth + Wallet login             |
| User & Passport | `/users/*`, `/passport/*` | Profile + NFT minting & metadata |
| Stories         | `/stories/*`              | Saga, Chapter, Lore              |
| Routes & Spots  | `/routes/*`, `/spots/*`   | Model route & linked locations   |
| Quests          | `/quests/*`, `/tasks/*`   | Parent quest, task submission    |
| Memory Wall     | `/memories/*`             | Memory wall logs only            |
| Rewards & Perks | `/perks/*`                | NFT-based perks + shop logic     |
| Check-in Map    | `/checkin/*`              | GPS + QR logic                   |
| Admin           | `/admin/*`                | CRUD: quests, routes, stories    |

---

## 🔁 API–Frontend Integration Mapping (by Feature)

### 1. Authentication & User Management

- **Endpoints**: `/tourii-backend/auth/*`
- **Frontend Components**:
  - `AuthProvider` - Global authentication state management
  - `LoginForm` - Multi-provider authentication (Discord, Twitter, Google)
  - `UserProfile` - Profile management and settings

### 2. Story & Tourism Features

- **Endpoints**: `/tourii-backend/stories/*`, `/tourii-backend/routes/*`, `/tourii-backend/spots/*`
- **Frontend Components**:
  - `StoryBrowser` - Browse and filter story sagas
  - `StoryViewer` - Interactive story experience
  - `RouteMap` - Interactive map with tourist spots
  - `SpotDetails` - Detailed tourist spot information
  - `ModelRouteViewer` - Display and navigate through travel routes
  - `RouteRecommendations` - Show route-specific recommendations

### 3. Gamification System

- **Endpoints**: `/tourii-backend/quests/*`, `/tourii-backend/achievements/*`
- **Frontend Components**:
  - `QuestBrowser` - Browse available quests
  - `QuestTracker` - Active quest progress
  - `AchievementDisplay` - User achievements and rewards
  - `PointsDashboard` - Magatama points tracking

### 4. Blockchain Integration

- **Endpoints**: `/tourii-backend/assets/*`
- **Frontend Components**:
  - `DigitalPassport` - Display and manage blockchain assets
  - `ItemInventory` - View and manage on-chain items
  - `TransactionHistory` - Blockchain transaction records

---

## 🧩 Component Usage Overview (Frontend → Backend)

| Component            | Backend Endpoint                                | Purpose                          |
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

## 🔁 API–Frontend Integration Mapping (by Page Route)

*(This section cross-references backend API endpoints to actual page routes based on ****`/app`**** folder structure. See also: ****`BACKEND_FRONTEND_INTEGRATION.md`****)*

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

✅ Full backend endpoint reference: `BACKEND_FRONTEND_INTEGRATION.md`
✅ DB schema reference: `schema.prisma`
✅ Component usage examples: see `/components/*`

*Last Updated: 12/04/2025*