# 🏗️ Tourii Frontend Architecture

This document provides a high-level overview of the Tourii frontend architecture, system design decisions, and architectural patterns.

---

## 🗺️ **System Architecture Overview**

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
            AUTH_API[API Auth Routes]
            STORIES_API[API Stories Routes]
            ROUTES_API[API Routes Routes]
            QUESTS_API[API Quests Routes]
            UPLOAD_API[API Upload Routes]
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

---

## 🎯 **Architectural Principles**

### 1. Three-Layer API Pattern
Components never directly call the backend. All API communication follows:
**SWR Hooks** → **Next.js API Routes** → **Generated SDK** → **Backend**

This ensures type safety, centralized error handling, and API key protection.

### 2. State Management Strategy
- **SWR**: Server state and caching
- **Redux Toolkit**: UI state only (selections, modal states, filters)
- **React Context**: App-level configuration and theme state

### 3. Component Architecture
- **Domain-based organization**: Components grouped by business domain
- **Composition over inheritance**: Flexible, reusable component patterns
- **Mobile-first design**: Optimized for mobile with desktop enhancements

---

## 🧩 **Component Architecture**

### Domain-Based Organization

Components are organized by business domain rather than technical type:

```
src/components/
├── ui/                    # Base UI components (shadcn/ui)
├── common/                # Shared utility components
├── model-route/           # Route planning system
├── story/                 # Story and chapter system
├── quest/                 # Quest and task system
├── profile/               # User profile and achievements
├── header/                # Navigation and authentication
└── homepage/              # Landing and marketing pages
```

### Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Composition Patterns**: Components can be composed flexibly
- **Story-Driven Development**: Every component has Storybook documentation
- **Mobile-First Design**: Optimized for mobile with desktop enhancements
- **TypeScript Interfaces**: Full type safety with clear prop contracts

---

## 🎣 **Hook Architecture**

### Purpose-Based Organization

Hooks are organized by their primary purpose:

- **API Hooks**: Server data fetching with SWR (`src/hooks/api/`)
- **Business Hooks**: Domain-specific logic (`src/hooks/business/`)
- **UI Hooks**: Interface interactions (`src/hooks/ui/`)
- **Map Hooks**: Geolocation and mapping (`src/hooks/map/`)

### Pattern Consistency

All hooks follow consistent patterns:
- **API Hooks**: Return `{ data, error, isLoading, mutate }`
- **Business Hooks**: Encapsulate domain logic and state
- **UI Hooks**: Handle interface interactions and responsive behavior

---

## 🗃️ **State Management Strategy**

### Clear Separation of Concerns

- **SWR**: Server state, caching, and synchronization
- **Redux Toolkit**: UI state only (modal states, selections, filters)
- **React Context**: App-level configuration and themes

### Data Flow

```
Server Data → SWR Hooks → Components
UI State → Redux Store → Components
App Config → React Context → Components
```

---

## 🗺️ **Routing Architecture**

### Next.js App Router Structure

The application uses Next.js App Router with route groups for organization:

```
src/app/
├── (homepage)/          # Public landing page
├── (info)/             # Static info pages (/about, /world)
├── (story)/            # Character showcase (/character)
└── v2/                 # Main application
    ├── (auth)/         # Authentication flow
    ├── (dashboard)/    # User dashboard
    ├── (admin)/        # Admin panel
    ├── (quests)/       # Quest system
    ├── (routes)/       # Model routes
    └── (stories)/      # Story system
```

### Design Patterns

- **Route Groups**: `()` syntax for organization without URL impact
- **Nested Layouts**: Each route group has its own layout and navigation
- **Dynamic Routes**: `[param]` for flexible routing patterns
- **Type-Safe Navigation**: Full TypeScript support for routing

---

## 🎨 **Styling Strategy**

### Tailwind CSS Foundation

- **Custom Design System**: Extended Tailwind with brand colors (warmGrey, charcoal, red)
- **Mobile-First Approach**: All styles start with mobile and enhance for larger screens
- **Component Variants**: Consistent styling patterns across all components
- **Utility-First**: Leverage Tailwind utilities with custom component abstractions

---

## 🌐 **Web3 Integration Architecture**

### Wallet Connection Flow

The application integrates with Web3 wallets for authentication and NFT functionality:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant W as Wallet
    participant B as Backend
    participant BC as Blockchain
    
    U->>F: Connect Wallet
    F->>W: Request Connection
    W->>F: Return Address
    F->>U: Request Signature
    U->>W: Sign Message
    W->>F: Return Signature
    F->>B: Verify Signature
    B->>BC: Validate on Chain
    BC->>B: Confirmation
    B->>F: JWT Token
    F->>U: Authenticated
```

### Integration Strategy

- **Wallet Abstraction**: Support for MetaMask, WalletConnect, and other providers
- **Signature-Based Auth**: Users authenticate by signing messages
- **NFT Integration**: Display and manage digital collectibles
- **Progressive Enhancement**: Web3 features enhance but don't block core functionality

---

## 📊 **Performance Strategy**

### Optimization Techniques

- **Code Splitting**: Route-based and component-based lazy loading
- **Image Optimization**: Next.js Image component with responsive sizing
- **Bundle Analysis**: Regular monitoring of bundle size and dependencies
- **SSR/SSG**: Static generation for marketing pages, SSR for dynamic content

### Caching Strategy

- **SWR Caching**: Intelligent client-side caching with revalidation
- **Next.js Caching**: Built-in caching for API routes and static assets
- **CDN Integration**: Global content delivery for optimal performance

---

## 🔒 **Security Strategy**

### Multi-Layer Security

- **API Proxy Pattern**: Backend API keys never exposed to client
- **Input Validation**: Zod schemas validate all user inputs
- **XSS Prevention**: DOMPurify for safe HTML rendering
- **CSRF Protection**: Built-in Next.js security features
- **Type Safety**: TypeScript prevents many runtime errors

### Authentication Security

- **JWT Tokens**: Secure token-based authentication
- **Wallet Signatures**: Cryptographic proof of wallet ownership
- **Rate Limiting**: Protection against API abuse
- **Environment Isolation**: Secure environment variable management

---

## 🚀 **Deployment Architecture**

### Build Process

The application follows a modern JAMstack deployment pattern:

```mermaid
graph LR
    A[Source Code] --> B[TypeScript Compilation]
    B --> C[Tailwind Processing]
    C --> D[Bundle Optimization]
    D --> E[Static Generation]
    E --> F[Deployment]
    
    subgraph "Build Steps"
        B
        C
        D
        E
    end
```

### Environment Strategy

- **Environment Validation**: Zod schemas ensure all required environment variables
- **Type-Safe Configuration**: Full TypeScript support for environment variables
- **Secure Secrets**: API keys and sensitive data properly isolated
- **Multi-Environment Support**: Development, staging, and production configurations

### Production Considerations

- **Static Generation**: Marketing pages pre-generated for optimal performance
- **Server-Side Rendering**: Dynamic content rendered on-demand
- **CDN Distribution**: Global content delivery for reduced latency
- **Health Monitoring**: Application health checks and error tracking

---

## 📚 **Documentation & Resources**

### Related Documentation

- **[Complete Hook Guide](./HOOK_GUIDE.md)**: Comprehensive hook patterns and examples
- **[API Integration Guide](./API_INTEGRATION.md)**: Complete API implementation guide
- **[Development Guide](./DEVELOPMENT_GUIDE.md)**: Setup, workflows, and coding standards
- **[Security Guidelines](./SECURITY_GUIDELINES.md)**: Security best practices

### Architecture Decision Records

Key architectural decisions are documented for future reference:

- **Three-Layer API Pattern**: Ensures type safety and security
- **Domain-Based Component Organization**: Improves maintainability
- **SWR for Server State**: Optimizes data fetching and caching
- **Mobile-First Design**: Prioritizes mobile user experience
- **TypeScript-First Development**: Prevents runtime errors and improves developer experience

---

*Last Updated: June 17, 2025*