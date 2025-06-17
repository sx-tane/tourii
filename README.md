# 🌏 Tourii Frontend

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

> A sophisticated gamified tourism platform frontend combining Japanese mythology, real-world exploration, and Web3 digital collectibles with immersive storytelling.

## 🚀 **Quick Start**

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 3. Generate API client
pnpm generate:api

# 4. Start development server
pnpm dev
```

**🎯 Ready to go! App available at `http://localhost:3000`**

## 📖 **Documentation Quick Links**

| Document | Purpose | Audience |
|----------|---------|----------|
| [**🏗️ Architecture**](./docs/ARCHITECTURE.md) | Frontend architecture & patterns | All developers |
| [**🔧 Development**](./docs/DEVELOPMENT.md) | Development setup & guidelines | New developers |
| [**🔗 API Integration**](./docs/FRONTEND_BACKEND_INTEGRATION.md) | Backend integration patterns | Full-stack developers |
| [**🎣 Hook Usage**](./docs/HOOK_USAGE_EXAMPLES.md) | Custom hooks & API patterns | Frontend developers |
| [**📋 Project Guidelines**](./docs/PROJECT_GUIDELINE.md) | Code standards & conventions | All developers |
| [**🛡️ Security Guidelines**](./docs/SECURITY_GUIDELINES.md) | Frontend security practices | All developers |
| [**🔄 Hook Migration**](./docs/HOOK_MIGRATION_GUIDE.md) | Legacy hook migration | All developers |

## 🏗️ **Architecture Overview**

```mermaid
graph TB
    subgraph "User Interface Layer"
        WEB[Web Browser]
        MOBILE[Mobile Browser]
        PWA[PWA App]
    end
    
    subgraph "Next.js Frontend Application"
        subgraph "Pages & Routing"
            HOMEPAGE[Homepage Landing]
            AUTH[Authentication Pages]
            DASHBOARD[User Dashboard]
            STORIES[Story System]
            ROUTES[Model Routes]
            QUESTS[Quest System]
            ADMIN[Admin Panel]
        end
        
        subgraph "Component Architecture"
            UI[shadcn/ui Components]
            DOMAIN[Domain Components]
            COMMON[Common Components]
            STORIES_COMP[Story Components]
            ROUTE_COMP[Route Components]
            QUEST_COMP[Quest Components]
        end
        
        subgraph "State Management"
            SWR[SWR Hooks<br/>Server State]
            REDUX[Redux Toolkit<br/>UI State]
            CONTEXT[React Context<br/>App State]
        end
        
        subgraph "Custom Hooks"
            API_HOOKS[API Hooks<br/>Data Fetching]
            UI_HOOKS[UI Hooks<br/>Interactions]
            BIZ_HOOKS[Business Hooks<br/>Logic]
            MAP_HOOKS[Map Hooks<br/>Geolocation]
        end
    end
    
    subgraph "API Layer"
        subgraph "Next.js API Routes"
            AUTH_API[/api/auth/*]
            STORIES_API[/api/stories/*]
            ROUTES_API[/api/routes/*]
            QUESTS_API[/api/quests/*]
            UPLOAD_API[/api/upload/*]
        end
        
        subgraph "Generated SDK"
            OPENAPI[OpenAPI Client<br/>Auto-generated]
            TYPES[TypeScript Types<br/>Auto-generated]
        end
    end
    
    subgraph "External Services"
        BACKEND[Tourii Backend<br/>NestJS API]
        WEB3[Web3 Services<br/>Blockchain]
        STORAGE[IPFS/NFT.Storage<br/>File Storage]
        MAPS[Leaflet Maps<br/>Geolocation]
        WEBSOCKET[WebSocket<br/>Real-time]
    end
    
    %% User Flow
    WEB --> HOMEPAGE
    MOBILE --> HOMEPAGE
    PWA --> HOMEPAGE
    
    %% Page Navigation
    HOMEPAGE --> AUTH
    AUTH --> DASHBOARD
    DASHBOARD --> STORIES
    DASHBOARD --> ROUTES
    DASHBOARD --> QUESTS
    DASHBOARD --> ADMIN
    
    %% Component Dependencies
    STORIES --> STORIES_COMP
    ROUTES --> ROUTE_COMP
    QUESTS --> QUEST_COMP
    STORIES_COMP --> UI
    ROUTE_COMP --> UI
    QUEST_COMP --> UI
    
    %% State Management Flow
    DOMAIN --> SWR
    DOMAIN --> REDUX
    SWR --> API_HOOKS
    REDUX --> UI_HOOKS
    
    %% API Communication
    API_HOOKS --> AUTH_API
    API_HOOKS --> STORIES_API
    API_HOOKS --> ROUTES_API
    API_HOOKS --> QUESTS_API
    
    %% Generated SDK Usage
    AUTH_API --> OPENAPI
    STORIES_API --> OPENAPI
    ROUTES_API --> OPENAPI
    QUESTS_API --> OPENAPI
    
    %% External Service Integration
    OPENAPI --> BACKEND
    MAP_HOOKS --> MAPS
    BIZ_HOOKS --> WEB3
    UPLOAD_API --> STORAGE
    UI_HOOKS --> WEBSOCKET
    
    %% Styling
    classDef userLayer fill:#e1f5fe
    classDef frontendLayer fill:#f3e5f5
    classDef apiLayer fill:#fff3e0
    classDef externalLayer fill:#e8f5e8
    
    class WEB,MOBILE,PWA userLayer
    class HOMEPAGE,AUTH,DASHBOARD,STORIES,ROUTES,QUESTS,ADMIN,UI,DOMAIN,COMMON,SWR,REDUX,CONTEXT frontendLayer
    class AUTH_API,STORIES_API,ROUTES_API,QUESTS_API,UPLOAD_API,OPENAPI,TYPES apiLayer
    class BACKEND,WEB3,STORAGE,MAPS,WEBSOCKET externalLayer
```

### **🎯 Core Features**

- **🔐 Multi-Provider Authentication**: Discord, Google, Twitter, Web3 wallets
- **📚 Interactive Storytelling**: Chapter-based narratives with progress tracking
- **🗺️ Smart Route Planning**: GPS-based travel routes with real-world locations
- **🎮 Gamified Quests**: Location-based challenges with various task types
- **🎫 Digital Passport NFTs**: Blockchain-verified travel credentials
- **⚡ Real-time Features**: WebSocket-based live interactions
- **🌍 Weather Integration**: Location-aware weather data
- **📊 Memory Wall**: User action tracking and travel memories

### **🏗️ Three-Layer API Pattern**

**Always use this pattern** - never directly call backend from components:

1. **SWR Hooks** (`src/hooks/api/`) → 2. **Next.js API Routes** (`src/app/api/`) → 3. **Generated Client** (`src/api/generated/`)

```typescript
// ✅ CORRECT: Standardized hook pattern (use* naming)
export function useModelRoutes(): UseApiHookResult<ModelRouteResponseDto[]> {
  const { data, error, isLoading, mutate } = useProxySWR<ModelRouteResponseDto[]>("/api/routes/model-routes");
  return { data, error, isLoading, mutate };
}

// ❌ WRONG: Old get* pattern (deprecated)
export function getModelRoutes() { ... }
```

---

## 🛠️ **Tech Stack**

| Category | Tech |
|----------|------|
| Framework | [Next.js 14 (App Router)](https://nextjs.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org) + [SWR](https://swr.vercel.app) |
| API Client | Generated via [OpenAPI TypeScript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) |
| Web3 | [viem](https://viem.sh) + [WalletConnect/Web3Modal](https://web3modal.com) |
| Mapping | [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) |
| Storage | [NFT.Storage](https://nft.storage) + IPFS |
| Testing | [Vitest](https://vitest.dev) + [Storybook](https://storybook.js.org) |

---

## 🚧 **Getting Started**

### 🧾 Prerequisites

- Node.js 18+
- pnpm (preferred)
- MetaMask or WalletConnect
- Backend API running on `http://localhost:4000`

### 🧪 Setup

```bash
pnpm install
cp .env.example .env.local
pnpm generate:api
pnpm dev
```

---

## 🔐 **Environment Variables**

```env
# Core App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# API Keys
TOURII_BACKEND_API_KEY=your-api-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Web3
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
NEXT_PUBLIC_CHAIN_ID=1116
NEXT_PUBLIC_RPC_URL=https://rpc.vara.network

# Storage
NEXT_PUBLIC_NFT_STORAGE_TOKEN=your-nft-storage-token
```

---

## 🔧 **Common Commands**

```bash
# Development
pnpm dev                          # Start development server
pnpm build                        # Build for production
pnpm start                        # Start production server
pnpm preview                      # Preview production build

# Code Quality
pnpm lint                         # Run ESLint
pnpm check                        # Run Biome check
pnpm type-check                   # TypeScript check

# Testing
pnpm test                         # Run unit tests
pnpm test:watch                   # Run tests in watch mode
pnpm storybook                    # Start Storybook

# API Client
pnpm generate:api                 # Regenerate API client from OpenAPI spec
```

---

## 📁 **Project Structure**

```
tourii/
├── src/
│   ├── api/generated/        # OpenAPI generated client SDK
│   ├── app/                  # Next.js App Router
│   │   ├── (homepage)/       # Homepage (path: /)
│   │   ├── v2/               # Main application features
│   │   │   ├── (auth)/       # Authentication pages
│   │   │   ├── (dashboard)/  # User dashboard
│   │   │   ├── (stories)/    # Story system
│   │   │   ├── (routes)/     # Model routes
│   │   │   └── (quests)/     # Quest system
│   │   └── api/              # Next.js API Routes (proxies)
│   ├── components/           # Domain-based UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── model-route/      # Route-specific components
│   │   ├── story/            # Story-related components
│   │   └── quest/            # Quest-related components
│   ├── hooks/                # Custom React hooks
│   │   ├── api/              # SWR API hooks
│   │   ├── ui/               # UI interaction hooks
│   │   ├── business/         # Business logic hooks
│   │   └── map/              # Map-related hooks
│   ├── lib/                  # Utilities and providers
│   │   ├── redux/            # Redux Toolkit store
│   │   ├── swr/              # SWR configuration
│   │   └── utils.ts          # Common utilities
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── docs/                     # Documentation
├── public/                   # Static assets
└── .storybook/               # Storybook configuration
```

---

## 🚀 **Core Capabilities**

### 🔐 Authentication & User Management

- Social logins (Discord, Google, Twitter)
- Web3 wallet login with signature verification
- JWT with session management
- User profile and preferences

### 📖 Interactive Story System

- Saga/chapter/story progression
- Media-rich storytelling (videos, images)
- Character references and world lore
- Location unlocking through story completion

### 🗺️ Model Routes & Tourism

- GPS-based route planning and visualization
- Interactive maps with tourist spot markers
- Weather integration for location planning
- Real-time distance and walking time calculations

### 🎮 Quest & Gamification Engine

- Multi-step quests with various task types:
  - GPS location check-ins
  - QR code scanning
  - Photo submissions
  - Text input and multiple choice
  - Group activities
- Points-based progression system
- Achievement tracking and rewards

### 🎫 Web3 & NFT Integration

- Digital Passport NFT minting on signup
- Travel Log NFT generation
- Blockchain-verified collectibles
- NFT-based reward redemption system

### ⚡ Real-time Features

- WebSocket-based live interactions
- Memory wall with travel logging
- Real-time quest progress updates
- Live user activity tracking

---

## 🧪 **Development Guidelines**

### Component Organization
- Domain-based folders: `model-route/`, `story/`, `quest/`, `profile/`
- kebab-case file naming
- Every component has `.stories.tsx` file
- Use `src/components/ui/` for shadcn components

### Hook Organization
- **API Hooks**: `src/hooks/api/` - for server data (SWR)
- **UI Hooks**: `src/hooks/ui/` - for UI interactions  
- **Business Hooks**: `src/hooks/business/` - for complex logic
- **Map Hooks**: `src/hooks/map/` - for map functionality
- All hooks use `use*` naming convention (not `get*`)

### Redux vs SWR Usage Guide
```typescript
// ✅ CORRECT: Use SWR for server data
const { data: quests, isLoading, mutate } = useQuests();

// ✅ CORRECT: Use Redux only for UI state
const selectedQuestId = useAppSelector(selectSelectedQuestId);
dispatch(setSelectedQuest(questId));

// ❌ WRONG: Don't store server data in Redux
dispatch(setQuests(apiResponse)); // Anti-pattern!
```

### Code Style
- Always create TypeScript interfaces for props
- Use Framer Motion for animations
- Follow mobile-first responsive design
- Use Tailwind semantic colors: `warmGrey`, `charcoal`, `red`
- NEVER edit `src/api/generated/` - it's auto-generated

---

## ⚙️ **Deployment**

### Build & Run

```bash
pnpm build
pnpm start
```

### Production Checklist

- Environment variables configured
- API routes secured with proper authentication
- Web3 wallet connections tested
- Image/media CDN working
- WebSocket URLs set correctly
- Maps and location services functional

---

## 🤝 **Contributing**

1. Fork this repository
2. Create a feature branch
3. Follow the code style guidelines
4. Write tests for new features
5. Submit PR with detailed description
6. Ensure all checks pass

---

## 📬 **Contact**

Email: `dev@tourii.com`  
Security: `security@tourii.com`

License: [MIT](LICENSE)

_Last Updated: June 17, 2025_

