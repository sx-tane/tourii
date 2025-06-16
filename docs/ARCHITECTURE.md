# 🏗️ Tourii Frontend Architecture

This document provides a comprehensive overview of the Tourii frontend architecture patterns and technical decisions.

---

## 🔄 Three-Layer API Architecture

The project follows a sophisticated proxy pattern that ensures type safety and centralizes backend communication:

### Layer 1: Client-Side SWR Hooks (`src/hooks/`)
- Custom hooks that components use for data fetching
- Provide caching, error handling, and loading states
- Call internal Next.js API routes (not backend directly)
- Follow consistent naming pattern: `isLoading[Feature]`, `isError[Feature]`, `mutate[Feature]`

```typescript
export function getModelRoutes() {
  const { data, error, isLoading, mutate } = useProxySWR<ModelRouteResponseDto[]>("/api/routes/model-routes");
  return {
    modelRoutes: data,
    isLoadingModelRoutes: isLoading,
    isErrorModelRoutes: error,
    mutateModelRoutes: mutate,
  };
}
```

### Layer 2: Next.js API Routes (`src/app/api/`)
- Server-side proxy routes that handle authentication and validation
- Use the generated SDK to communicate with backend
- Centralized error handling and response formatting
- Protect API keys from client exposure

```typescript
export async function GET() {
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      RoutesService.touriiBackendControllerGetModelRoutes(apiVersion, apiKey),
    "GET /api/routes/model-routes"
  );
}
```

### Layer 3: Generated API Client (`src/api/generated/`)
- Auto-generated from OpenAPI specifications
- Provides full TypeScript coverage
- **Never manually edit** - regenerate with `pnpm generate:api`
- Used exclusively by Next.js API routes

---

## 🧩 Component Organization Patterns

### Domain-Driven Structure
Components are organized by business domain:

```
src/components/
├── model-route/          # Model route exploration
│   ├── region/           # Region selection
│   ├── route-component/  # Route carousel and cards
│   └── route-details/    # Individual route pages
├── story/                # Story and saga components
├── quest/                # Quest system components
├── common/               # Shared utilities
└── ui/                   # shadcn/ui components
```

### Component Composition Patterns
- **Hierarchical organization**: Related components grouped in subfolders
- **Index exports**: Clean imports via `index.ts` files
- **Story integration**: Every component has `.stories.tsx` for Storybook
- **Consistent naming**: kebab-case for all files

### TypeScript Patterns
```typescript
// Component props interface
interface ComponentProps {
  data: ModelRouteResponseDto;
  onAction?: (id: string) => void;
  className?: string;
}

// Strict typing from generated API models
export const MyComponent: React.FC<ComponentProps> = ({ data, onAction, className }) => {
  // Component implementation
};
```

---

## 🗃️ State Management Architecture

### Redux Toolkit with Feature Slices
State is organized by domain in `src/lib/redux/features/`:

- **stories-slice.ts** - Story and saga state
- **routes-slice.ts** - Model route state  
- **homepage-slice.ts** - Homepage data
- **character-slice.ts** - Character selection

### Redux Patterns
```typescript
// Slice example
export const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    selectedRoute: null,
    routeList: [],
    loading: false,
  },
  reducers: {
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
    setRouteList: (state, action) => {
      state.routeList = action.payload;
    },
  },
});
```

### State Management Principles
- Keep state **serializable** and **normalized**
- Use `createSelector` for memoized derived state
- Minimize state duplication - prefer API cache via SWR
- Use Redux for UI state, SWR for server state

---

## 🎯 Data Fetching Strategy

### SWR + Proxy Pattern Benefits
- **Automatic caching**: Reduces redundant API calls
- **Background revalidation**: Keeps data fresh
- **Error retry**: Built-in error recovery
- **Type safety**: End-to-end TypeScript coverage
- **Centralized auth**: API keys protected server-side

### Data Flow
```
Component → SWR Hook → Next.js API Route → Generated Client → Backend API
    ↑                                                               ↓
Response ← SWR Cache ← Parsed Response ← Validated Response ← API Response
```

---

## 🗂️ Route Organization (Next.js App Router)

### Route Groups Strategy
The project uses route groups for layout organization:

```
app/
├── (homepage)/           # Public pages (/, /about)
├── (auth)/              # Authentication flows
├── (dashboard)/         # User dashboard
├── (routes)/            # Model route exploration
│   └── region/          # /v2/region/[region]/[modelRouteId]
├── (stories)/           # Story content
├── (quests)/            # Quest system
└── (admin)/             # Admin panel
```

### Layout Hierarchy
- **Global layout**: Navigation, auth guards, providers
- **Route group layouts**: Feature-specific layouts
- **Page-specific**: Individual page components
- **Shared components**: Reused across layouts

---

## 🎨 Styling Architecture

### Tailwind CSS Strategy
- **Custom color palette**: Japan-inspired (`warmGrey`, `charcoal`, `red`)
- **Mobile-first**: Responsive design approach
- **Component-level**: No global styles
- **shadcn/ui integration**: Consistent design system

### Design Tokens
```css
/* Custom colors in tailwind.config.ts */
colors: {
  warmGrey: '#f5f3f0',
  warmGrey2: '#e8e3de', 
  warmGrey3: '#d4cfc7',
  charcoal: '#2c2c2c',
  red: '#c5282f',
}
```

---

## ⚡ Performance Optimizations

### Caching Strategy
- **SWR cache**: Client-side API response caching
- **Next.js caching**: Static generation where possible
- **Component memoization**: React.memo for expensive components
- **Image optimization**: Next.js Image component usage

### Code Splitting
- **Route-based**: Automatic via Next.js App Router
- **Component-based**: React.lazy for heavy components
- **Library splitting**: Vendor chunks automatically optimized

### Loading States
- **Suspense boundaries**: At layout and page levels
- **Skeleton screens**: For better perceived performance
- **Progressive enhancement**: Core functionality works without JS

---

## 🗺️ Map Integration Architecture

### Leaflet Integration Pattern
- **Custom hooks**: `useMapInitialization`, `useResponsiveDetection`
- **Responsive design**: Different layouts for mobile/desktop
- **Error boundaries**: Graceful fallbacks for map failures
- **Performance**: Bounds fitting and zoom limits

### Map Component Structure
```typescript
// Map wrapper pattern
const ModelRouteMapWrapper = ({ modelRoute, className }) => {
  const isMobileTablet = useResponsiveDetection();
  const { map, isMapReady, handleMapReady } = useMapInitialization();
  const { selectedSpot, setSelectedSpot } = useTouristSpotSelection();

  // Conditional rendering based on device
  return isMobileTablet ? <MobileView /> : <DesktopView />;
};
```

---

## 🔒 Security Considerations

### Client-Side Security
- **API key protection**: Never exposed to client
- **Route protection**: Middleware-based auth checks
- **Input validation**: Both client and server side
- **XSS prevention**: Proper data sanitization

### Environment Variables
- **Type-safe env vars**: Using T3 Env for validation
- **Build-time validation**: Errors caught during build
- **Separation**: Public vs private environment variables

---

## 🧪 Testing Strategy

### Testing Pyramid
- **Unit tests**: Vitest for utilities and hooks
- **Component tests**: Storybook as living documentation
- **Integration tests**: API route testing
- **E2E tests**: Planned with Playwright

### Testing Patterns
```typescript
// Hook testing example
import { renderHook } from '@testing-library/react';
import { getModelRoutes } from '@/hooks/routes/getModelRoutes';

test('getModelRoutes returns expected structure', () => {
  const { result } = renderHook(() => getModelRoutes());
  expect(result.current).toHaveProperty('modelRoutes');
  expect(result.current).toHaveProperty('isLoadingModelRoutes');
});
```

---

_Last Updated: June 16 2025_