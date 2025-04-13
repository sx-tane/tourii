# 🌏 Tourii Frontend

---

## 📘 About Tourii

Tourii is a gamified Web3 tourism platform that combines Japanese mythology, real-world exploration, and digital collectibles.

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

| Layer              | Technology                                                                      |
| ------------------ | ------------------------------------------------------------------------------- |
| Frontend Framework | [Next.js 14 (App Router)](https://nextjs.org)                                   |
| Styling            | [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)     |
| Animations         | [Framer Motion](https://www.framer.com/motion)                                  |
| State Management   | [Redux Toolkit + createSlice](https://redux-toolkit.js.org)                     |
| Data Fetching      | [React Query](https://tanstack.com/query)                                       |
| Web3 Integration   | [viem](https://viem.sh), [WalletConnect/Web3Modal](https://web3modal.com)       |
| Mapping            | [Leaflet](https://leafletjs.com), [React Leaflet](https://react-leaflet.js.org) |
| File Storage       | [NFT.Storage](https://nft.storage), IPFS                                        |
| Realtime Events    | WebSocket with custom event types                                               |

---

## 📁 Directory Overview

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (homepage)
│   ├── launch-app/           ← Auth Modal (OAuth + Wallet)
│   ├── dashboard/            ← Personal Hub
│   ├── stories/              ← Story system
│   ├── quests/               ← Quest system
│   ├── routes/               ← Wander log system
│   ├── check-in/             ← Check-in map & timeline
│   ├── shop/                 ← NFT reward shop
│   ├── memory-wall/          ← Travel memory log
│   ├── profile/              ← Profile + passport + perks
│   └── admin/                ← Admin Panel (secured)
├── components/               ← UI modules by domain
├── lib/
│   ├── api-client.ts         ← Axios config with headers
│   ├── websocket.ts          ← WebSocket wrapper
│   ├── blockchain/           ← EVM wallet logic
├── store/                    ← Redux slices
├── types/                    ← Global type declarations
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

### 🌍 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.tourii.xyz
NEXT_PUBLIC_WS_URL=wss://api.tourii.xyz/ws
NEXT_PUBLIC_MAPBOX_TOKEN=optional_if_used
NEXT_PUBLIC_WALLET_CONNECT_ID=your_id
NEXT_PUBLIC_NFT_STORAGE_KEY=your_storage_key
```

---

## 🧪 Testing

### Unit Tests

```bash
pnpm test
```

### E2E / Integration

```bash
pnpm test:e2e
```

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

