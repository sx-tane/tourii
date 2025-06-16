# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
pnpm dev                    # Start development server with Turbopack
pnpm build                 # Build for production
pnpm lint                  # Run Biome linter 
pnpm check                 # Run Biome check (lint + format)
pnpm test                  # Run unit tests with Vitest
pnpm generate:api          # Regenerate API client from OpenAPI spec
pnpm storybook             # Start Storybook development server
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

## Project Context

This is **Tourii** - a gamified tourism platform combining Japanese mythology, real-world exploration, and NFT collectibles. Key features:

- **Story System**: Mythological narratives unlock locations
- **Model Routes**: GPS-based travel routes with tourist spots  
- **Quest System**: Various task types (GPS, QR, photo, text)
- **Digital Passport**: NFT collectibles and reward redemption

For detailed documentation see `docs/` folder and README.md.