# 🛍️ Tourii V2 Frontend Project Guideline

This guide outlines the core frontend journey and development focus for Tourii's gamified, Web3-powered travel platform.

---

## 🎯 Tourii Experience Philosophy

Tourii combines mythology, real-world travel, and digital collectibles into a social quest experience. Its frontend experience should be:

- Clean, minimal, and culturally respectful (inspired by Japanese aesthetics)
- Focused on story-driven navigation and reward loops
- Built with reactivity and scalability in mind (Next.js + Redux + Web3 wallets)

---

## 🗜️ User Flow Overview

1. **Landing Page** (`/`)
   - Hero section
   - "Explore / Earn / Connect" with visual walkthrough
   - NFT Digital Passport teaser
   - Featured: latest story chapter, popular quests
   - Call to action: Launch App

2. **Authentication Modal** (`/launch-app` → modal)
   - Login & Sign Up (OAuth + Web3 wallet connect)
   - On signup: create wallet, mint Passport NFT + Log NFT

3. **Dashboard (Post-Login Hub)**
   - Accessible sections:
     - Story System
     - Model Routes
     - Quests
     - Digital Passport
     - Check-In Map
     - Shop
     - Memory Wall
     - Profile Page

4. **Exploration Loop**
   - Read story → complete chapter → unlock location → trigger model route + online/offline quests → complete tasks → earn Tourii points/perks → repeat

---

## 🔧 Component/Feature Breakdown

### 🏠 Homepage
| Section                              | Status | Description                                 |
| ------------------------------------ | ------ | ------------------------------------------- |
| Hero                                 | ✅      | Background image, brand tagline, CTA button |
| Three Pillars (Explore/Earn/Connect) | ✅      | Icon + summary display                      |
| Digital Passport Teaser              | ⭕️      | NFT preview, benefits, how it works         |
| Featured Chapter & Quests            | ⏳      | Story carousel, quest cards                 |
| Footer                               | ⏳      | Legal, social, contact links                |

### 📚 Story System
| Page               | Status | Description                                                |
| ------------------ | ------ | ---------------------------------------------------------- |
| Saga Selection     | ⏳      | Browse stories by region (map planned)                     |
| Chapter List       | ⏳      | Chapters per saga, progress shown                          |
| Chapter Page       | ⏳      | Toggle: video/storyboard. Tabs: Characters, World, Content |
| Completion Trigger | ⏳      | Unlock new location + related quests upon finish           |

### 🧱 Model Route
| Page            | Status | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| Region Selector | ⏳      | Display weather, region intro                    |
| Route Overview  | ⏳      | Map of spots, description, unlock gating         |
| Route Detail    | ⏳      | Tourist spot cards (linked to quests), GPS logic |

### 🤩 Quest System
| Page              | Status | Description                                                |
| ----------------- | ------ | ---------------------------------------------------------- |
| Quest List        | ⏳      | Filterable list (location / type / reward)                 |
| Quest Parent      | ⏳      | Overview + toggle (online vs offline tasks)                |
| Task Types        | ⏳      | Auto-render per type: photo, visit, text, group            |
| Completion Screen | ⏳      | Stamp celebration + CTA: View Passport, Add to Memory Wall |

### 🌸 Memory Wall
| Page                | Status | Description                   |
| ------------------- | ------ | ----------------------------- |
| Feed                | ⏳      | Latest logs (no like/comment) |
| Author Profile Link | ⏳      | Click avatar → Profile Page   |

### 🧳️ Check-In Map
| Page         | Status | Description                       |
| ------------ | ------ | --------------------------------- |
| Map Display  | ⏳      | GPS-based check-in, colored pins  |
| QR Mode      | ⏳      | Modal scan popup (event triggers) |
| History View | ⏳      | Past check-ins (timeline, badges) |

### 👤 Profile Page
| Section          | Status | Description                                                                 |
| ---------------- | ------ | --------------------------------------------------------------------------- |
| Travel Logs      | ⏳      | Location, story, and quest logs                                             |
| Achievements     | ⏳      | Unlocked badges and perks                                                   |
| Perk Redemption  | ⏳      | NFT-based redemption, Apple/Google Wallet export                            |
| Digital Passport | ⏳      | NFT display, QR code, redemption history, Add Apple Wallet or Google Wallet |

### 🛒 Shop
| Section        | Status | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| Shop Home      | ⏳      | Browse perks by category (Food, Access, Discount)       |
| Purchase Flow  | ⏳      | NFT minting or token burning based on purchase          |
| Inventory View | ⏳      | Used/perk history shown by status (Active/Used/Expired) |

### 🛠️ Admin Panel
| Section            | Status | Description                                                      |
| ------------------ | ------ | ---------------------------------------------------------------- |
| Dashboard Overview | ⏳      | Show stats: users, quests, stories, routes, completions, traffic |
| Quest Manager      | ⏳      | CRUD quests (with task config & reward settings)                 |
| Story Manager      | ⏳      | CRUD story sagas + chapters, character/world info                |
| Route Manager      | ⏳      | CRUD model routes, assign locations, weather sync                |
| User Manager       | ⏳      | Edit user roles, view logs, ban/unban                            |
| Social Upload      | ⏳      | Push updates to TikTok, Twitter, Instagram, YouTube              |
| Perk Manager       | ⏳      | Upload NFT perks, set redemption metadata, stock controls        |

---

## 🗂️ Routing Structure (Next.js App Router)

```
/app
├── layout.tsx                  ← Global layout (Nav, AuthGuard, etc.)
├── page.tsx                    ← Homepage (Landing)

/launch-app
├── page.tsx                    ← Auth Modal Page (Login/Signup overlay)

dashboard/
├── page.tsx                    ← Post-login user hub

stories/
├── layout.tsx                  ← Shared layout for story saga/chapter pages
├── page.tsx                    ← Saga Selection
├── [sagaId]/page.tsx          ← Chapter List
├── [sagaId]/[chapterId]/page.tsx ← Chapter Page (tabs: content, character, map)

routes/
├── layout.tsx
├── page.tsx                    ← Region Selector Page
├── [regionId]/page.tsx        ← Model Route List
├── [regionId]/[routeId]/page.tsx ← Model Route Detail (map, spots, quests)

quests/
├── page.tsx                    ← All Quests List
├── [questId]/page.tsx         ← Quest Parent Page (online/offline toggle)
├── [questId]/[taskId]/page.tsx ← Task Interaction Page
├── [questId]/complete/page.tsx ← Completion Page (passport/stamp/reward popup)

check-in/
├── page.tsx                    ← Map View (GPS + QR)
├── history/page.tsx           ← Check-in timeline/history

shop/
├── page.tsx                    ← Browse all perks
├── [itemId]/page.tsx          ← Item detail / buy modal
├── inventory/page.tsx         ← User-owned perks + status

memory-wall/
├── page.tsx                    ← Feed View
├── [postId]/page.tsx          ← Memory Detail Page

profile/
├── page.tsx                    ← Personal profile dashboard
├── [userId]/page.tsx          ← Public profile (via username/post)

admin/
├── layout.tsx
├── page.tsx                    ← Admin Dashboard Overview
├── quests/page.tsx            ← Quest Manager
├── stories/page.tsx           ← Story Manager
├── routes/page.tsx            ← Route Manager
├── users/page.tsx             ← User Manager
├── perks/page.tsx             ← Perk Manager
├── media/page.tsx             ← Social Media Upload Panel
```

---

## 📊 Dev System & Standards

### Frontend Stack
- `Next.js 14`
- `TypeScript`
- `TailwindCSS`
- `Redux` with `createSlice`
- `ethers.js` or `viem` (Web3 interaction)
- **API Client**: OpenAPI-generated client (`openapi-typescript-codegen` with Fetch) for type-safe backend communication. See `src/api/generated/`.
- `axios` (Legacy API wrapper in `src/lib/api-client.ts`, may still be used for calls not covered by OpenAPI spec or specific interceptor needs).
- `framer-motion`, `lucide-react`, `shadcn/ui`

### Design System
- Base typography: Japanese serif + modern sans-serif
- Iconography: Lucide
- Layout: Grid-first, mobile optimized
- Theme: Light mode only (for now)

### Coding Conventions
- File naming: kebab-case
- Component folders: `/components/feature-name`
- Pages: Flat routes in `/app/`
- **API SDK & Config**: `src/api/generated/` (generated client), `src/api/api-client-config.ts` (SDK configuration).
- **API Hooks**: Custom SWR hooks (e.g., in `src/hooks/`) are preferred for interacting with the API SDK.
- Legacy API utils: `src/lib/api-client.ts` (axios based).
- Redux store: `/lib/store/slices/*`

---

### ✅ Status Key
| Icon | Meaning     |
| ---- | ----------- |
| ✅    | Complete    |
| ⭕️    | In Progress |
| ⏳    | Not Started |

---

_Last Updated: 12/04/2025_

