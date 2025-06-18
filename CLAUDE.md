# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build & Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev                    # Start development server with Turbopack
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm preview                # Preview production build

# Storybook
pnpm storybook              # Start Storybook development server
pnpm build-storybook        # Build Storybook for production
```

### Code Quality
```bash
# Linting and formatting
pnpm lint                   # Run Biome linter 
pnpm check                  # Run Biome check (lint + format)
pnpm type-check             # TypeScript type checking

# Testing
pnpm test                   # Run unit tests with Vitest
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Run tests with coverage report
```

### API Client Management
```bash
# API client operations
pnpm generate:api           # Regenerate API client from OpenAPI spec
```

## Critical Architecture Patterns

### Three-Layer API Pattern
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

### API Hook Patterns by Complexity

**Basic Pattern** (simple data fetching):
```typescript
// ✅ Use for straightforward backend data
export function useQuests(query: string): UseApiHookResult<QuestListResponseDto> & {
  quests: QuestListResponseDto | undefined;
} {
  const { data, error, isLoading, mutate } = useProxySWR<QuestListResponseDto>(query);
  return { data, isLoading, isError: Boolean(error), error: (error as Error) || null, mutate, quests: data };
}
```

**Complex Pattern** (frontend-specific needs):
```typescript
// ✅ Use when frontend needs differ from backend
export function useCheckins(
  query: CheckinsQuery = {}
): UseApiHookResult<CheckinsListResponseDto> & {
  checkins: CheckinResponseDto[] | undefined;
} {
  // Complex query building + data transformation
  const endpoint = buildQueryString(query);
  const { data: backendData, error, isLoading, mutate } = useProxySWR<BackendType>(endpoint);
  const transformedData = backendData ? transformToFrontendFormat(backendData) : undefined;
  return { data: transformedData, isLoading, isError: Boolean(error), error: (error as Error) || null, mutate, checkins: transformedData?.checkins };
}
```

**When to use Complex Pattern:**
- Frontend needs different data structure than backend
- Complex query parameter building required
- Data transformation needed for UI components
- Domain-specific filtering/sorting logic
- Multiple data sources need combining

**When to use Basic Pattern:**
- Backend data structure works well for frontend
- Simple string-based queries
- Minimal data transformation needed
- Direct API response mapping

**Core Requirements for ALL patterns:**
- Must return `UseApiHookResult<T>` interface
- Must include standardized properties: `data`, `isLoading`, `isError`, `error`, `mutate`
- Must include legacy property for backward compatibility
- Must use `Boolean(error)` and `(error as Error) || null` patterns

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

### Redux State Management  
- **Only store UI state** (selections, modal states, filters)
- **Never duplicate server data** from SWR hooks
- Feature-based slices in `src/lib/redux/features/`
- Keep state serializable and simple

## Key Development Rules

### API Client
- **Never edit** `src/api/generated/` - it's auto-generated
- Run `pnpm generate:api` when backend changes
- Use `route-helper.ts` for consistent API error handling

### Component Development
- Always create TypeScript interfaces for props
- Use Framer Motion for animations
- Follow mobile-first responsive design
- Use Tailwind semantic colors: `warmGrey`, `charcoal`, `red`

### Map Components
- Use `useMapInitialization` hook pattern
- Handle bounds fitting for multiple tourist spots
- Include proper loading states and error boundaries

## High-Level Architecture

### Frontend Framework & Patterns
This is a **Next.js 14 App Router** frontend application with the following architectural patterns:
- **Domain-Driven Design**: Components organized by business domains (story, quest, model-route, profile)
- **Three-Layer API Pattern**: SWR Hooks → Next.js API Routes → Generated Client
- **Component-First Architecture**: Every component has a corresponding `.stories.tsx` file
- **Mobile-First Design**: Responsive components using Tailwind CSS

### State Management Strategy
- **SWR for Server State**: All server data fetching through SWR hooks
- **Redux for UI State**: Client-side UI state only (selections, modals, filters)
- **Never mix server data in Redux**: Anti-pattern to store API responses in Redux

### Key Design Principles
- **Type Safety**: Full TypeScript coverage with generated API types
- **Component Isolation**: Each component is self-contained with its own story
- **Hook-Based Logic**: Custom hooks for reusable business logic
- **Proxy Pattern**: Next.js API routes protect backend API keys

## Project Context

This is **Tourii** - a sophisticated gamified tourism platform combining Japanese mythology, real-world exploration, and Web3 digital collectibles. Key features:

- **📚 Interactive Story System**: Mythological narratives that unlock real-world locations
- **🗺️ Model Routes**: GPS-based travel routes with interactive tourist spots  
- **🎮 Quest System**: Gamified challenges (GPS, QR, photo, text, group activities)
- **🎫 Digital Passport NFTs**: Blockchain-verified travel credentials and collectibles
- **⚡ Real-time Features**: WebSocket-based live interactions and memory wall
- **🌍 Map Integration**: Leaflet-based interactive maps with location services

For comprehensive documentation see `docs/` folder, particularly:
- `docs/ARCHITECTURE.md`: Complete frontend architecture patterns
- `docs/FRONTEND_BACKEND_INTEGRATION.md`: API integration patterns
- `docs/HOOK_USAGE_EXAMPLES.md`: Custom hook implementation examples

## Important Development Guidelines

### Four-Step Development Process
When working on frontend features, follow this systematic approach:

1. **System Design Mode**: Plan component structure and data flow before coding
2. **Assumption Check**: Verify API contracts and component interfaces
3. **Validation Loop**: Self-review for accessibility, mobile responsiveness, and performance
4. **Execution Mode**: Implement with proper TypeScript types and Storybook stories

### Frontend Security Considerations
- **API Key Protection**: Never expose backend API keys in client-side code
- **Input Validation**: Validate all user inputs on both client and server side
- **XSS Prevention**: Use React's built-in XSS protection, avoid `dangerouslySetInnerHTML`
- **CSRF Protection**: Leverage Next.js built-in CSRF protection
- **Environment Variables**: Use `NEXT_PUBLIC_` prefix only for truly public variables

### Performance Best Practices
- **Code Splitting**: Use dynamic imports for large components
- **Image Optimization**: Always use Next.js `next/image` component
- **Bundle Analysis**: Regularly check bundle size with `pnpm build && pnpm analyze`
- **Lazy Loading**: Implement lazy loading for non-critical components
- **Memoization**: Use React.memo, useMemo, and useCallback appropriately

### Testing Strategy
- **Component Testing**: Every component should have basic rendering tests
- **Storybook Stories**: Visual testing and component documentation
- **Custom Hook Testing**: Test custom hooks in isolation
- **Integration Testing**: Test API integration through Next.js API routes
- **E2E Testing**: Critical user flows should have end-to-end test coverage

## Team Onboarding Resources

For new frontend developers, these resources provide fast-track onboarding:
1. **Quick Start**: Follow README.md setup guide (5-minute setup)
2. **Architecture Overview**: `docs/ARCHITECTURE.md` for system understanding
3. **API Integration**: `docs/FRONTEND_BACKEND_INTEGRATION.md` for backend communication
4. **Hook Patterns**: `docs/HOOK_USAGE_EXAMPLES.md` for data fetching patterns
5. **Component Guidelines**: `docs/PROJECT_GUIDELINE.md` for code standards

---

*Last Updated: June 17, 2025*