# 🌏 Tourii

---

## 📘 About Tourii

Tourii is a gamified tourism platform that combines Japanese mythology, real-world exploration, and digital collectibles.

This frontend app, built with **Next.js App Router**, powers an immersive user journey through story chapters, quests, and interactive check-ins — with a focus on social sharing and reward redemption.

---

## 🧩 Core Features

- **📚 Interactive Story System**\
  Unlock locations by progressing through mythological story sagas.

- **🧭 Model Routes (Wander Log)**\
  Visualized, region-based routes tied to real-world GPS locations.

- **🧠 Quest System**\
  Online/offline challenges for points and perks (text, QR, group, photo).

- **🎖 Digital Passport & NFTs**\
  Earn on-chain collectibles, perks, and achievement stamps.

- **🌸 Memory Wall**\
  Track user actions as travel memories (logging only, no social reactions).

- **📍 Check-In Map**\
  GPS and QR-code check-in for tourist locations.

- **🛍️ Reward Shop**\
  Spend points or redeem NFTs for real-world food, access, or discounts.

---

## 🧱 Tech Stack

| Layer              | Technology                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Frontend Framework | [Next.js 14 (App Router)](https://nextjs.org)                                                                     |
| Styling            | [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)                                       |
| Animations         | [Framer Motion](https://www.framer.com/motion)                                                                    |
| State Management   | [Redux Toolkit + createSlice](https://redux-toolkit.js.org)                                                       |
| Data Fetching      | [React Query](https://tanstack.com/query), SWR                                                                    |
| API Client         | Generated via [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) using Fetch |
| Web3 Integration   | [viem](https://viem.sh), [WalletConnect/Web3Modal](https://web3modal.com)                                         |
| Mapping            | [Leaflet](https://leafletjs.com), [React Leaflet](https://react-leaflet.js.org)                                   |
| File Storage       | [NFT.Storage](https://nft.storage), IPFS                                                                          |
| Realtime Events    | WebSocket with custom event types                                                                                 |

---

## 📞 API Client (OpenAPI Generated)

The frontend utilizes a TypeScript client generated from the backend's OpenAPI specification. This SDK is primarily used within Next.js API Routes (server-side proxies) to ensure type-safe API calls to the Tourii backend.

### API Interaction Pattern

1.  **Client-Side Hooks (SWR):** UI components use SWR hooks (e.g., in `src/hooks/`) that call internal Next.js API routes.
2.  **Next.js API Routes (Proxies):** These routes (in `src/app/api/...`) receive requests from the client. They use the generated SDK to call the actual backend.
3.  **SDK Configuration (Server-Side):** The SDK (e.g., `StoriesService`) is configured within these API routes (typically in a helper like `src/app/api/lib/route-helper.ts`) by setting `OpenAPI.BASE` and the API key using server-side environment variables from `src/env.js`. A global `src/api/api-client-config.ts` is generally not used for this pattern.

### SDK Regeneration

If the backend API changes, the client needs to be regenerated:

```bash
pnpm generate:api
```
This command uses `openapi-typescript-codegen` to update the client SDK located in `src/api/generated`.

### Basic Usage (SWR Hooks calling Proxy Routes)

Client-side SWR hooks call Next.js API routes. The API routes then use the SDK.

```typescript
// Example: src/hooks/stories/getSagas.ts (Client-Side)
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";

export function getSagas() {
  const swrKey = "/api/stories/sagas"; // Points to your Next.js API proxy
  const { data, error, isLoading, mutate } =
    useProxySWR<StoryResponseDto[]>(swrKey);

  return {
    sagas: data, // Data is typed via the proxy
    isLoading,
    isError: error,
    mutateSagas: mutate,
  };
}

// The corresponding Next.js API route (e.g., src/app/api/stories/sagas/route.ts) 
// would then use the generated StoriesService.touriiBackendControllerGetSagas().
```

---

## 📁 Directory Overview

```
src/
├── api/
│   └── generated/          ← OpenAPI generated client SDK (primarily used server-side in API routes)
// Note: src/api/api-client-config.ts is likely unused/deprecated for the main SWR proxy flow.
├── app/
│   ├── layout.tsx
│   ├── providers.tsx         ← Handles global setup
│   ├── (homepage)/           ← Homepage (Landing, path: /)
│   │   └── page.tsx
│   ├── model-route/          ← Defines /model-route and /model-route/:modelRouteId
│   ├── profile-dev/          ← Profile pages (path: /profile-dev)
│   ├── v2/                   ← Main application features with v2 prefix
│   │   ├── (auth)/           ← Authentication pages
│   │   ├── (dashboard)/      ← User dashboard (path: /v2/dashboard)
│   │   ├── (stories)/        ← Story system (path: /v2/stories)
│   │   ├── (routes)/         ← Model routes (path: /v2/routes)
│   │   ├── (quests)/         ← Quest system (path: /v2/quests)
│   │   └── (shop)/           ← Shop (path: /v2/shop)
│   ├── api/                  ← Next.js API Routes (proxies using the SDK)
// Other routes like check-in, memory-wall, admin might be structured differently or pending.
├── components/               ← UI modules by domain
├── hooks/                    ← Custom React hooks (calling proxy API routes)
├── lib/
│   ├── swr/                  ← SWR utilities (`useProxySWR`, `proxyFetcher`)
│   ├── websocket.ts          ← WebSocket wrapper
│   ├── blockchain/           ← EVM wallet logic
│   └── redux/                ← Redux Toolkit store, with features/slices in ./features/
├── types/                    ← Global type declarations
├── utils/                    ← Utility helpers (logger, geo utils)
└── public/                   ← Static assets
```

---

## 🧪 Setup & Dev

### 🛠 Prerequisites

- Node.js v18+
- pnpm (recommended)
- MetaMask or WalletConnect
- Mapbox token (if not using Leaflet)

### 🚀 Local Dev

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```


## 🧪 Testing

### Unit Tests

```bash
pnpm test
```

### E2E / Integration

```bash
pnpm test:e2e
```

### Geo Utilities

```ts
import { calculateDistanceKm, estimateWalkingMinutes } from '@/utils/geo-utils';

const distance = calculateDistanceKm(
  { latitude: 35.6895, longitude: 139.6917 },
  { latitude: 34.6937, longitude: 135.5023 },
);
const minutes = estimateWalkingMinutes(distance);
```

When viewing a route page, `<ModelRouteMapWrapper>` renders a list of tourist
spots via `<RouteDestination>`. The component uses these helpers to display the
distance and walking time between each stop on the connecting lines.

---

## ✨ Feature Details

### 🔐 Authentication Flow

- Social login: Discord / Twitter / Google
- Wallet login: signature + nonce
- Upon signup:
  - Mint Digital Passport NFT (auto)
  - Mint Travel Log NFT (auto)
  - Create user profile
- Redirect to dashboard

---

### 📖 Story System

- Story Saga listing (per region)
- Chapter unlock via progression
- Toggle between storyboard / video mode
- Character & world lore tabs
- Completion triggers:
  - Location unlock
  - Quest availability

---

### 🧠 Quest System

- Parent quest view with progress bar
- Task types supported:
  - Location visit (GPS)
  - QR code scan
  - Text input / multiple choice
  - Photo submission
  - Group activity
- Rewards: points, stamps, NFT perks

---

### 🗺️ Model Route (Wander Log Style)

- Region selector (with weather + cost idea)
- Route viewer: left = travel log, right = map
- Route includes linked locations
- Each spot shows quest unlocks and stamp progress

---

### 📍 Check-In System

- GPS or QR-based validation
- Real-time map with pins
- Timeline view of check-in history
- Anti-fraud distance validation

---

### 🛍️ Shop System

- Filter by perk type (Food, Discount, Access, Experience)
- Buy with Magatama points or redeem NFTs
- Used perks can be exported to Apple/Google Wallet
- Burn-on-redeem logic for NFT perks

---

### 👤 Profile

- Show travel logs, completed quests, story logs
- Display unlocked achievements
- View perk history (active / used / expired)
- View perk redemption history (active / used / expired)

---

### 🛠 Admin Panel

- Dashboard with metrics (users, quests, stories)
- Quest Manager (CRUD + tasks + rewards)
- Story Manager (sagas, chapters, characters)
- Route Manager (regions, locations)
- Perk Manager (NFT metadata, stock)
- User Manager (ban/unban, logs)
- Social Upload (Twitter, TikTok, etc.)

---

## 🧠 WebSocket Events

- `quest:started`, `quest:completed`, `task:completed`
- `memory:new` (log only)
- `nft:minted`, `perk:redeemed`
- `achievement:unlocked`, `level:up`

---

## ✅ Deployment

```bash
pnpm build
pnpm start
```

### Production Checklist

- Env variables are configured
- Contracts deployed & verified
- API routes secured
- WalletConnect + WebSocket URLs set
- Image/media CDN working

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Submit PR with details
4. Keep commits conventional

---

## 📄 License

MIT License – Copyright © Tane

