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
- **Domain-based folders**: `model-route/`, `story/`, `quest/`, `profile/`, `admin/`
- **kebab-case file naming** for all components
- **Every component has `.stories.tsx` file** for Storybook documentation
- **Admin components**: Organized by business logic in `src/components/admin/`
- **UI components**: Use `src/components/ui/` for shadcn components

### Hook Organization ✅ **Recently Reorganized (June 2025)**
- **API Hooks**: `src/hooks/api/` - for server data (SWR) - 15 hooks
- **Admin Hooks**: `src/hooks/admin/` - for admin CRUD operations + name resolution - 6 hooks (✅ All working)
- **UI Hooks**: `src/hooks/ui/` - for UI interactions - 3 hooks  
- **Business Hooks**: `src/hooks/business/` - for complex logic - 4 hooks
- **Map Hooks**: `src/hooks/map/` - for map functionality - 2 hooks
- All hooks use `use*` naming convention (not `get*`)
- **Total**: 30 hooks properly categorized and fully functional

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
- **Always create TypeScript interfaces** for props with proper typing
- **Use Framer Motion** for animations
- **Follow mobile-first responsive design** patterns
- **Use Tailwind semantic colors**: `warmGrey`, `charcoal`, `red`, `mustard`
- **Admin components**: Extract into reusable, composable components
- **Component isolation**: Each component should be self-contained with stories

### Map Components
- Use `useMapInitialization` hook pattern
- Handle bounds fitting for multiple tourist spots
- Include proper loading states and error boundaries

## High-Level Architecture

### Frontend Framework & Patterns
This is a **Next.js 15 App Router** frontend application with the following architectural patterns:
- **Domain-Driven Design**: Components organized by business domains (story, quest, model-route, profile, admin)
- **Three-Layer API Pattern**: SWR Hooks → Next.js API Routes → Generated Client
- **Component-First Architecture**: Every component has a corresponding `.stories.tsx` file
- **Mobile-First Design**: Responsive components using Tailwind CSS
- **Admin Dashboard**: Comprehensive management interface with analytics and CRUD operations

### State Management Strategy
- **SWR for Server State**: All server data fetching through SWR hooks
- **Redux for UI State**: Client-side UI state only (selections, modals, filters)
- **Never mix server data in Redux**: Anti-pattern to store API responses in Redux

### Key Design Principles
- **Type Safety**: Full TypeScript coverage with generated API types
- **Component Isolation**: Each component is self-contained with its own story
- **Hook-Based Logic**: Custom hooks for reusable business logic
- **Proxy Pattern**: Next.js API routes protect backend API keys

## Admin Component Architecture

### Admin Dashboard Structure
**Fully refactored admin interface with component composition pattern** organized by business logic in `src/components/admin/`:

```
src/components/admin/
├── dashboard/          # Dashboard overview components (3 components)
│   ├── admin-stats-grid.tsx
│   ├── quick-actions-grid.tsx
│   └── alerts-section.tsx
├── analytics/         # Analytics dashboard components (6 components)
│   ├── analytics-overview.tsx
│   ├── content-health-section.tsx
│   ├── distribution-section.tsx
│   ├── expandable-section.tsx
│   ├── quality-metrics-section.tsx
│   └── recommended-actions.tsx
├── users/             # User management components (5 components)
│   ├── user-stats-grid.tsx
│   ├── user-filters.tsx
│   ├── user-table.tsx
│   ├── user-details-modal.tsx
│   └── bulk-actions-bar.tsx
├── submissions/       # Submission review components (6 components)
│   ├── submission-stats-grid.tsx
│   ├── submission-filters.tsx
│   ├── submission-table.tsx
│   ├── submission-details-modal.tsx
│   ├── reject-reason-modal.tsx
│   └── task-type-icon.tsx
├── stories/          # Story management components (10 components)
│   ├── story-stats-grid.tsx
│   ├── story-search-filters.tsx
│   ├── story-bulk-actions.tsx
│   ├── story-table.tsx
│   ├── story-create-edit-modal.tsx
│   ├── story-chapter-stats-grid.tsx
│   ├── story-chapter-search-filters.tsx
│   ├── story-chapter-bulk-actions.tsx
│   ├── story-chapter-table.tsx
│   └── story-chapter-create-edit-modal.tsx
├── quests/           # Quest management components (11 components)
│   ├── quest-stats-grid.tsx
│   ├── quest-search-filters.tsx
│   ├── quest-bulk-actions.tsx
│   ├── quest-table.tsx
│   ├── quest-create-edit-modal.tsx
│   ├── quest-info-display.tsx
│   ├── quest-task-stats-grid.tsx
│   ├── quest-task-search-filters.tsx
│   ├── quest-task-bulk-actions.tsx
│   ├── quest-task-table.tsx
│   └── quest-task-create-edit-modal.tsx
└── model-routes/     # Route management components (11 components)
    ├── model-route-stats-grid.tsx
    ├── model-route-search-filters.tsx
    ├── model-route-bulk-actions.tsx
    ├── model-route-table.tsx
    ├── model-route-create-edit-modal.tsx
    ├── tourist-spot-stats-grid.tsx
    ├── tourist-spot-search-filters.tsx
    ├── tourist-spot-bulk-actions.tsx
    ├── tourist-spot-table.tsx
    ├── tourist-spot-create-edit-modal.tsx
    └── tourist-spot-data-display.tsx
```

### Admin Component Patterns
- **Consistent naming**: `[Domain][Component]` (e.g., `UserStatsGrid`, `SubmissionTable`)
- **Reusable statistics grids**: Standardized stat card layouts with consistent metrics
- **Modal patterns**: Consistent modal designs for detailed views and CRUD operations
- **Filter components**: Standardized search and filter interfaces with clear/reset actions
- **Table components**: Consistent data table layouts with selection, sorting, and bulk actions
- **Bulk operations**: Selection and bulk action patterns with confirmation dialogs
- **Component composition**: All admin pages use composed components instead of inline code

### Recent Admin Refactoring (June 2025)
**Major code reduction achieved through component extraction:**
- **Quest Detail Page**: 929 → 472 lines (48% reduction)
- **Quest Task Page**: 1500+ → 470 lines (69% reduction) ✅ **Recently completed**
- **Stories Detail Page**: 734 → 460 lines (37% reduction) 
- **Submissions Page**: 1010 → 315 lines (69% reduction)
- **Users Page**: 1583 → 234 lines (85% reduction)
- **Total lines reduced**: 5756+ → 1951 lines (66% overall reduction)

**Key Improvements:**
- ✅ **All admin CRUD operations now fully functional** (delete operations fixed)
- ✅ **Admin hooks properly organized** in `/src/hooks/admin/` folder
- Eliminated code duplication across admin pages
- Standardized component interfaces and prop patterns
- Improved maintainability through component reuse
- Enhanced consistency in UI/UX across admin interface
- Easier testing with isolated, composable components
- **Consistent error messaging** across all admin operations

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
- `docs/API_INTEGRATION.md`: API integration patterns and three-layer approach
- `docs/HOOK_GUIDE.md`: Custom hook implementation examples and patterns

## Recent Critical Fixes (June 2025) ✅

### **Hooks Organization & Admin CRUD Resolution**

**✅ Successfully completed comprehensive hooks reorganization and admin functionality fixes:**

#### **1. Hooks Folder Reorganization**
```diff
# MOVED: Admin hooks to proper location
- /src/hooks/api/useAdminUsers.ts
- /src/hooks/api/useAdminSubmissions.ts
+ /src/hooks/admin/useAdminUsers.ts  
+ /src/hooks/admin/useAdminSubmissions.ts

# UPDATED: Export structure
- Removed admin exports from /hooks/api/index.ts
+ Added proper exports to /hooks/admin/index.ts
```

#### **2. Fixed Admin Delete Operations**
**Root Issue**: Delete hooks weren't returning success responses, causing SWR to treat them as failures.

**Fixed in these hooks:**
- ✅ `useDeleteStory` - now returns `{ success: true }`
- ✅ `useDeleteStoryChapter` - now returns `{ success: true }`
- ✅ `useDeleteModelRoute` - now returns `{ success: true }`
- ✅ `useDeleteTouristSpot` - now returns `{ success: true }`
- ✅ `useDeleteQuest` & `useDeleteQuestTask` - already working correctly

#### **3. Error Message Consistency**
Fixed inconsistent error messages:
```diff
# Story hooks
- "Failed to delete saga" 
+ "Failed to delete story"

# Model route hooks  
- "Failed to create route"
+ "Failed to create model route"
```

#### **4. User Activity Logs Name Resolution** ✅ **COMPLETE**
**Root Issue**: Admin user logs were showing internal IDs instead of human-readable names.

**Fixed name resolution for:**
- ✅ **Quest names**: `Quest #a-BAAA` → `"Discover Harajiri Falls"` 
- ✅ **Tourist spot names**: `Tourist Spot #4-BAAA` → `"Harajiri Falls"`
- ✅ **Story chapter names**: `Story Chapter #7-BAAA` → `"Prologue - Chapter 1"`
- ✅ **Task names**: `Task #BAAA` → `"Photo Upload Task #BAAA"`

**Implementation details:**
- Created comprehensive `src/hooks/admin/useNameResolution.ts` hook system
- Added specialized hooks: `useQuestName`, `useTouristSpotName`, `useStoryChapterName`, `useTaskName`
- Implemented `ResolvedNameDisplay` component with loading states and fallbacks
- User activity logs now show meaningful names instead of cryptic IDs

#### **5. Final Hook Organization Structure**
```
/src/hooks/
├── /api/           (15 hooks) - Pure SWR hooks for server data
├── /admin/         (6 hooks)  - Admin CRUD operations + SWR hooks + name resolution  
├── /business/      (4 hooks)  - Complex business logic
├── /ui/            (3 hooks)  - UI interactions & states
├── /map/           (2 hooks)  - Map functionality
├── types.ts                   - Shared hook interfaces
└── index.ts                   - Clean barrel exports
```

**Result**: All admin CRUD operations now work perfectly with proper error handling and consistent patterns! Admin user logs show human-readable names via comprehensive name resolution system! 🚀

#### **6. Performance Optimizations (June 23, 2025)** ✅ **COMPLETE**
**Major performance improvements implemented:**

**N+1 Query Resolution:**
- ✅ **Fixed admin submissions N+1 problem** - Sequential API calls replaced with `Promise.all()` parallel fetching
- ✅ **Optimized quest details fetching** - Reduced from 100+ sequential calls to parallel batch processing
- ✅ **Performance impact**: Admin submissions page now loads 5-10x faster with large datasets

**Configuration Management:**
- ✅ **Centralized admin configuration** - Created `/src/config/admin.ts` for all admin settings
- ✅ **Eliminated hardcoded values** - Dashboard limits, pagination settings, performance thresholds
- ✅ **Type-safe configuration** - Full TypeScript interfaces for all config options

**Bundle Optimization:**
- ✅ **Next.js config optimized** - Fixed deprecated `experimental.turbo` warnings
- ✅ **Webpack code splitting** - Admin components in separate bundle chunks
- ✅ **Dynamic imports** - Heavy analytics components load on-demand

**Implementation highlights:**
```typescript
// ✅ N+1 Query Fix Example
const questPromises = questIds.map(async (questId) => {
  // Parallel processing instead of sequential
});
const questResults = await Promise.all(questPromises);

// ✅ Configuration Centralization
import { ADMIN_CONFIG } from '@/config/admin';
const limit = ADMIN_CONFIG.DASHBOARD.INITIAL_USER_LIMIT; // 30
```

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
3. **API Integration**: `docs/API_INTEGRATION.md` for backend communication patterns
4. **Hook Patterns**: `docs/HOOK_GUIDE.md` for data fetching and business logic patterns
5. **Security Guidelines**: `docs/SECURITY_GUIDELINES.md` for security best practices
6. **Development Guide**: `docs/DEVELOPMENT_GUIDE.md` for workflows and coding standards

---

*Last Updated: June 23, 2025 - Performance Optimization & Configuration Management Edition*