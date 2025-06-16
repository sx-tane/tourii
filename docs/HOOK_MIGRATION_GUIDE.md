# 🔄 Hook Standardization Migration Guide

This guide helps you migrate from the old hook patterns to the new standardized patterns.

## 📋 Migration Summary

### Old vs New Hook Imports
```typescript
// ❌ Old pattern
import { getModelRoutes } from '@/hooks/routes/getModelRoutes';
import { getModelRouteById } from '@/hooks/routes/getModelRouteById';

// ✅ New standardized pattern
import { useModelRoutes, useModelRouteById } from '@/hooks';
```

### Old vs New Hook Usage
```typescript
// ❌ Old pattern
const {
  modelRoutes,
  isLoadingModelRoutes,
  isErrorModelRoutes,
  mutateModelRoutes,
} = getModelRoutes();

// ✅ New standardized pattern
const {
  data: modelRoutes,        // or use legacy: modelRoutes
  isLoading,
  isError,
  error,
  mutate,
} = useModelRoutes();
```

## 🗂️ New Hook Directory Structure
```
src/hooks/
├── api/              # API data fetching hooks
│   ├── useModelRoutes.ts
│   ├── useModelRouteById.ts
│   └── index.ts
├── ui/               # UI/UX related hooks
│   ├── useResponsiveDetection.ts
│   ├── useIntersectionObserver.ts
│   └── index.ts
├── map/              # Map-specific hooks
│   ├── useMapInitialization.ts
│   └── index.ts
├── business/         # Business logic hooks
│   ├── useTouristSpotSelection.ts
│   └── index.ts
├── types.ts          # Shared hook types
└── index.ts          # Main exports
```

## 🔄 Component-by-Component Migration

### 1. Model Route Map Wrapper
```typescript
// ❌ Before: Embedded hooks
const useResponsiveDetection = () => { /* ... */ };
const useTouristSpotSelection = () => { /* ... */ };
const useMapInitialization = () => { /* ... */ };

// ✅ After: Import standardized hooks
import { 
  useResponsiveDetection, 
  useMapInitialization, 
  useTouristSpotSelection 
} from '@/hooks';

// Usage change
const isMobileTablet = useResponsiveDetection(); // Old
const { isMobileTablet } = useResponsiveDetection(); // New
```

### 2. Pages Using API Hooks
```typescript
// ❌ Before
import { getModelRouteById } from '@/hooks/routes/getModelRouteById';

const {
  modelRoute,
  isLoadingModelRoute,
  isErrorModelRoute,
  mutateModelRoute,
} = getModelRouteById(id);

// ✅ After
import { useModelRouteById } from '@/hooks';

const {
  modelRoute,           // legacy compatibility
  data,                 // standardized
  isLoading,           // standardized
  isError,             // standardized
  error,               // standardized
  mutate,              // standardized
} = useModelRouteById(id);
```

## 📝 Migration Steps

### Step 1: Update Hook Imports
Replace all old hook imports with new standardized imports:

```bash
# Find all files using old imports
grep -r "from '@/hooks/routes/" src/
grep -r "from '@/hooks/stories/" src/
grep -r "from '@/hooks/quests/" src/
```

### Step 2: Update Hook Names
```typescript
// API Hooks
getModelRoutes() → useModelRoutes()
getModelRouteById() → useModelRouteById()
getLocationInfo() → useLocationInfo()
getQuests() → useQuests()
getQuestById() → useQuestById()
getSagas() → useSagas()
getSagaById() → useSagaById()
```

### Step 3: Update Return Value Destructuring
```typescript
// Choose one approach for consistency:

// Option A: Use standardized names
const { data, isLoading, isError, error, mutate } = useModelRoutes();

// Option B: Use legacy compatibility
const { modelRoutes, isLoading, isError, error, mutate } = useModelRoutes();
```

### Step 4: Remove Embedded Hooks
Extract any remaining custom hooks from components to appropriate directories.

## 🎯 Best Practices

### 1. Consistent Naming
Always use `use*` prefix for React hooks (not `get*`).

### 2. Standardized Returns
All API hooks return: `{ data, isLoading, isError, error, mutate }`

### 3. Type Safety
Use the provided TypeScript interfaces from `@/hooks/types`.

### 4. Clean Imports
Use the main index file: `import { useHook } from '@/hooks'`

## 🔧 Remaining Tasks

### Files Still Using Old Patterns
1. **Route destination component** - Extract `useSpotImage`
2. **Location info panel** - Extract custom hooks
3. **Tourist spot markers** - Extract Leaflet hooks
4. **Remaining API hooks** - Convert to `use*` pattern

### Priority Order
1. **High**: API hooks (most used across app)
2. **Medium**: Map-related hooks (complex but localized)
3. **Low**: UI utility hooks (simple but many files)

## 📊 Progress Tracking

### ✅ Completed
- [x] Created new hook directory structure
- [x] Standardized useModelRoutes and useModelRouteById
- [x] Extracted useResponsiveDetection
- [x] Extracted useMapInitialization
- [x] Extracted useTouristSpotSelection
- [x] Updated ModelRouteMapWrapper component
- [x] Updated model route page

### 🔄 In Progress
- [ ] Convert remaining API hooks
- [ ] Extract remaining embedded hooks
- [ ] Update all component imports

### ⏳ Pending
- [ ] Remove old hook files
- [ ] Update documentation
- [ ] Add hook unit tests

## 🧪 Testing Migration
After migrating each component:
1. Check TypeScript compilation
2. Test component functionality
3. Verify Storybook stories still work
4. Run existing tests

Remember: The new hooks provide backward compatibility, so migration can be gradual!