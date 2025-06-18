# 🛠️ Complete Development Guide

This comprehensive guide covers everything developers need to know to work effectively with the Tourii frontend: setup, workflows, coding standards, and architectural principles.

---

## 🚀 **Getting Started**

### 🧾 Prerequisites

- **Node.js v18+** (recommended: v18.17.0 or later)
- **pnpm** (recommended package manager)
- **Git** with SSH or HTTPS access
- **Backend API** running on `http://localhost:4000`
- **MetaMask or WalletConnect** for Web3 testing

### 🧪 Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd tourii

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration values

# 4. Generate API client from backend
pnpm generate:api

# 5. Start development server
pnpm dev
```

**🎯 Development server available at `http://localhost:3000`**

---

## 🎯 **Project Vision & Philosophy**

### Core Experience Principles

Tourii combines Japanese mythology, real-world travel, and digital collectibles into a sophisticated gamified platform. The frontend should embody:

- **🏔️ Japanese Aesthetic**: Clean, minimal design inspired by Japanese aesthetics
- **📚 Story-Driven Navigation**: Mythological narratives guide user journey
- **🎮 Gamification**: Quest completion, achievement tracking, and reward loops
- **🌐 Web3 Integration**: Seamless blockchain interactions without complexity
- **📱 Mobile-First**: Optimized for mobile travelers with desktop enhancement

### Technical Philosophy

- **Type Safety First**: Full TypeScript coverage with strict type checking
- **Component Isolation**: Self-contained, testable, and reusable components
- **Performance Oriented**: Optimized loading, lazy loading, and efficient rendering
- **Accessibility Focused**: WCAG 2.1 AA compliance for inclusive design
- **Maintainability**: Clear code structure with comprehensive documentation

---

## 🏗️ **Architecture Principles**

### 1. Three-Layer API Pattern

**Always follow this pattern** - never directly call backend from components:

```
Components → SWR Hooks → Next.js API Routes → Generated SDK → Backend
```

```typescript
// ✅ CORRECT: Use SWR hooks
const { data: quests, error, isLoading } = useQuests();

// ❌ WRONG: Direct API calls
const response = await fetch('/api/backend/quests');
```

### 2. State Management Strategy

```typescript
// ✅ CORRECT: SWR for server state
const { data: routes } = useModelRoutes();

// ✅ CORRECT: Redux for UI state only
const selectedRouteId = useAppSelector(selectSelectedRouteId);
dispatch(setSelectedRoute(routeId));

// ❌ WRONG: Don't store server data in Redux
dispatch(setRoutes(apiResponse)); // Anti-pattern!
```

### 3. Component Architecture

```typescript
// ✅ CORRECT: Props interface with TypeScript
interface QuestCardProps {
  quest: QuestResponseDto;
  onSelect?: (questId: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export function QuestCard({ quest, onSelect, variant = 'default', className }: QuestCardProps) {
  return (
    <div className={cn('quest-card', variants[variant], className)}>
      {/* Implementation */}
    </div>
  );
}
```

---

## 🔧 **Development Commands**

### Core Development

```bash
# Development server with hot reload
pnpm dev                    # Start with Turbopack (faster)
pnpm dev:network            # Start with network access (--hostname 192.168.0.67)

# Production build and preview
pnpm build                  # Build for production
pnpm start                  # Start production server
```

### Code Quality & Testing

```bash
# Linting and formatting
pnpm lint                   # Run Biome linter 
pnpm check                  # Run Biome check with autofix
pnpm type-check             # TypeScript type checking

# Testing
pnpm test                   # Run unit tests with Vitest
pnpm test:ui                # Run tests with UI
pnpm test:coverage          # Generate test coverage report

# Storybook
pnpm storybook              # Start Storybook dev server
pnpm build-storybook        # Build Storybook for production
```

### API Client Management

```bash
# Regenerate API client when backend changes
pnpm generate:api           # Generate TypeScript client from OpenAPI spec
```

---

## 📁 **Project Structure**

```
tourii/
├── src/
│   ├── api/generated/        # Auto-generated API client (DO NOT EDIT)
│   ├── app/                  # Next.js App Router pages
│   │   ├── (homepage)/       # Landing page
│   │   ├── (info)/          # Static info pages
│   │   ├── v2/              # Main application
│   │   │   ├── (auth)/      # Authentication flow
│   │   │   ├── (dashboard)/ # User dashboard
│   │   │   ├── (admin)/     # Admin panel
│   │   │   ├── (quests)/    # Quest system
│   │   │   ├── (routes)/    # Model routes
│   │   │   └── (stories)/   # Story system
│   │   └── api/             # Next.js API routes (proxies)
│   ├── components/          # React components (domain-organized)
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── common/          # Shared utility components
│   │   ├── model-route/     # Route-specific components
│   │   ├── story/           # Story-related components
│   │   ├── quest/           # Quest-related components
│   │   └── [domain]/        # Other domain components
│   ├── hooks/               # Custom React hooks
│   │   ├── api/             # Data fetching hooks
│   │   ├── ui/              # UI interaction hooks
│   │   ├── business/        # Business logic hooks
│   │   └── map/             # Map-related hooks
│   ├── lib/                 # Utilities and configuration
│   │   ├── redux/           # Redux store configuration
│   │   ├── swr/             # SWR configuration
│   │   └── utils.ts         # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper functions
├── docs/                    # Documentation
├── public/                  # Static assets
├── .storybook/              # Storybook configuration
└── tests/                   # Test files
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `quest-card.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useModelRoutes.ts`)
- **Types**: `PascalCase.ts` (e.g., `QuestTypes.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `date-utils.ts`)
- **Stories**: `component-name.stories.tsx`
- **Tests**: `component-name.test.tsx`

---

## 🎯 **Development Workflow**

### 1. Creating New Features

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Generate any new API types if needed
pnpm generate:api

# 3. Develop using the three-layer pattern:
#    - Create SWR hook in src/hooks/api/
#    - Create Next.js API route in src/app/api/
#    - Create components in appropriate domain folder

# 4. Add Storybook stories for components
# 5. Write tests for hooks and components
# 6. Lint and type check
pnpm check && pnpm type-check

# 7. Commit and push
git add . && git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

### 2. Component Development Process

```typescript
// 1. Define component interface
interface MyComponentProps {
  data: SomeDto;
  onAction?: (id: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

// 2. Implement component with memo for performance
export const MyComponent = memo(function MyComponent({ 
  data, 
  onAction, 
  variant = 'default', 
  className 
}: MyComponentProps) {
  return (
    <div className={cn('base-styles', variants[variant], className)}>
      {/* Implementation */}
    </div>
  );
});

// 3. Create Storybook story
export default {
  title: 'Domain/MyComponent',
  component: MyComponent,
  parameters: {
    docs: {
      description: {
        component: 'A reusable component for displaying data.',
      },
    },
  },
} as Meta<typeof MyComponent>;

export const Default: Story = {
  args: {
    data: mockData,
  },
};

// 4. Write tests
describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent data={mockData} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### 3. API Integration Process

```typescript
// 1. Create SWR hook (src/hooks/api/)
export function useMyData(): UseApiHookResult<MyDataDto[]> {
  const { data, error, isLoading, mutate } = useProxySWR<MyDataDto[]>("/api/my-data");
  return { data, error, isLoading, mutate };
}

// 2. Create Next.js API route (src/app/api/my-data/route.ts)
export async function GET() {
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      MyService.getMyData(apiVersion, apiKey),
    "GET /api/my-data"
  );
}

// 3. Use in component
function MyComponent() {
  const { data, isLoading, error } = useMyData();
  
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  
  return <DataDisplay data={data} />;
}
```

---

## 🎨 **Component Development Standards**

### 1. Component Structure Template

```typescript
// 📁 src/components/quest/quest-card.tsx

import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { QuestResponseDto } from '@/api/generated';

interface QuestCardProps {
  quest: QuestResponseDto;
  onSelect?: (questId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const variants = {
  default: 'p-4 border border-gray-200 rounded-lg',
  compact: 'p-2 border border-gray-100 rounded-md',
  featured: 'p-6 border-2 border-primary rounded-xl shadow-lg',
};

export const QuestCard = memo(function QuestCard({
  quest,
  onSelect,
  variant = 'default',
  className
}: QuestCardProps) {
  const handleClick = () => {
    onSelect?.(quest.questId);
  };

  return (
    <div 
      className={cn(variants[variant], className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Select quest: ${quest.title}`}
    >
      <h3 className="font-semibold text-lg">{quest.title}</h3>
      <p className="text-gray-600 text-sm mt-2">{quest.description}</p>
      {/* Additional content */}
    </div>
  );
});
```

### 2. Storybook Story Template

```typescript
// 📁 src/components/quest/quest-card.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { QuestCard } from './quest-card';

const meta: Meta<typeof QuestCard> = {
  title: 'Quest/QuestCard',
  component: QuestCard,
  parameters: {
    docs: {
      description: {
        component: 'A reusable card component for displaying quest information.',
      },
    },
  },
  args: {
    quest: {
      questId: '1',
      title: 'Temple Discovery',
      description: 'Find the hidden temple in Kyoto',
      questType: 'SOLO',
      isPremium: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestCard>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
  },
};

export const Interactive: Story = {
  args: {
    onSelect: (questId) => alert(`Selected quest: ${questId}`),
  },
};
```

### 3. Component Requirements Checklist

- [ ] **TypeScript Props Interface**: Clear, well-documented props
- [ ] **Default Props**: Sensible defaults where appropriate
- [ ] **Error Handling**: Graceful handling of missing/invalid data
- [ ] **Loading States**: Skeleton or spinner for async content
- [ ] **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- [ ] **Responsive Design**: Mobile-first with desktop enhancements
- [ ] **Storybook Story**: All variants and states documented
- [ ] **CSS Classes**: Use Tailwind with `cn()` utility for merging
- [ ] **Memo Optimization**: Use `React.memo` for performance
- [ ] **Testing**: Unit tests for user interactions

---

## 🎣 **Hook Development Standards**

### 1. API Hook Pattern

```typescript
// 📁 src/hooks/api/useQuests.ts

import { useProxySWR, type UseApiHookResult } from '@/lib/swr/useProxySWR';
import type { QuestListResponseDto } from '@/api/generated';

interface QuestFilters {
  page?: number;
  limit?: number;
  isPremium?: boolean;
  questType?: string;
  userId?: string;
}

export function useQuests(filters?: QuestFilters): UseApiHookResult<QuestListResponseDto> {
  const queryParams = new URLSearchParams();
  
  if (filters?.page) queryParams.set('page', String(filters.page));
  if (filters?.limit) queryParams.set('limit', String(filters.limit));
  if (filters?.isPremium !== undefined) queryParams.set('isPremium', String(filters.isPremium));
  if (filters?.questType) queryParams.set('questType', filters.questType);
  if (filters?.userId) queryParams.set('userId', filters.userId);
  
  const { data, error, isLoading, mutate } = useProxySWR<QuestListResponseDto>(
    `/api/quests?${queryParams.toString()}`
  );
  
  return { data, error, isLoading, mutate };
}
```

### 2. Business Logic Hook Pattern

```typescript
// 📁 src/hooks/business/useTouristSpotSelection.ts

import { useState, useCallback, useMemo } from 'react';
import type { TouristSpotResponseDto } from '@/api/generated';

export function useTouristSpotSelection(spots?: TouristSpotResponseDto[]) {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  const selectSpot = useCallback((spotId: string | null) => {
    setSelectedSpotId(spotId);
  }, []);

  const selectedSpot = useMemo(() => {
    if (!selectedSpotId || !spots) return null;
    return spots.find(spot => spot.touristSpotId === selectedSpotId) || null;
  }, [selectedSpotId, spots]);

  return {
    selectedSpotId,
    selectedSpot,
    selectSpot,
    clearSelection: () => selectSpot(null),
  };
}
```

### 3. UI Hook Pattern

```typescript
// 📁 src/hooks/ui/useResponsiveDetection.ts

import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useResponsiveDetection(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1024,
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      setState({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    updateState();
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, []);

  return state;
}
```

---

## 🔒 **Environment Configuration**

### Environment Variables

```env
# Core Application
NODE_ENV=development
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

# Backend API
BACKEND_API_KEY=your-backend-api-key
BACKEND_API_VERSION=1.0.0

# Google Services
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Environment Validation (optional)
SKIP_ENV_VALIDATION=false
```

### Environment Validation

```typescript
// src/env.js - Environment validation with Zod
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TOURII_BACKEND_API_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
  },
  runtimeEnv: {
    TOURII_BACKEND_API_KEY: process.env.TOURII_BACKEND_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
});
```

---

## 🎨 **Styling Guidelines**

### 1. Tailwind CSS Best Practices

```typescript
// ✅ CORRECT: Use semantic color classes
<div className="bg-warmGrey-50 text-charcoal-900">

// ✅ CORRECT: Mobile-first responsive design
<div className="w-full md:w-1/2 lg:w-1/3">

// ✅ CORRECT: Use cn() utility for conditional styles
import { cn } from '@/lib/utils';

const buttonStyles = cn(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    'bg-primary text-white': variant === 'primary',
    'bg-secondary text-gray-900': variant === 'secondary',
  },
  className
);
```

### 2. Color System

```typescript
// Tourii Brand Colors (tailwind.config.ts)
const colors = {
  primary: {
    50: '#fef7ee',
    500: '#f97316',
    900: '#9a3412',
  },
  warmGrey: {
    50: '#fafaf9',
    500: '#737373',
    900: '#171717',
  },
  charcoal: {
    50: '#f6f6f6',
    500: '#525252',
    900: '#0a0a0a',
  },
};
```

### 3. Component Styling Patterns

```typescript
// Define style variants as objects
const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-gray-900 hover:bg-secondary/90',
  outline: 'border border-input bg-background hover:bg-accent',
};

const sizeVariants = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

// Use in component
<button className={cn(buttonVariants[variant], sizeVariants[size], className)} />
```

---

## 🧪 **Testing Strategy**

### Unit Testing with Vitest

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestCard } from './quest-card';

const mockQuest = {
  questId: '1',
  title: 'Test Quest',
  description: 'Test Description',
  questType: 'SOLO' as const,
  isPremium: false,
};

describe('QuestCard', () => {
  it('renders quest information correctly', () => {
    render(<QuestCard quest={mockQuest} />);
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<QuestCard quest={mockQuest} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('applies correct variant styling', () => {
    const { container } = render(<QuestCard quest={mockQuest} variant="compact" />);
    
    expect(container.firstChild).toHaveClass('p-2');
  });
});

// Hook test example
import { renderHook, waitFor } from '@testing-library/react';
import { useQuests } from './use-quests';

describe('useQuests', () => {
  it('fetches quests with filters', async () => {
    const { result } = renderHook(() => 
      useQuests({ page: 1, limit: 10, isPremium: true })
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
});
```

### Storybook for Visual Testing

```typescript
// Story file example
export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    docs: {
      description: {
        component: 'A reusable component for displaying data.',
      },
    },
  },
} as Meta<typeof MyComponent>;

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Loading: Story = {
  args: {
    data: undefined,
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: new Error('Failed to load'),
  },
};
```

---

## 🔐 **Security Best Practices**

### API Security

```typescript
// ✅ CORRECT: Use Next.js API routes as proxies
export async function GET() {
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      QuestService.getQuests(apiVersion, apiKey),
    "GET /api/quests"
  );
}

// ❌ WRONG: Never expose API keys in client code
const response = await fetch('https://api.backend.com/quests', {
  headers: { 'Authorization': `Bearer ${API_KEY}` } // DON'T DO THIS
});
```

### Input Validation

```typescript
// Always validate inputs with Zod
import { z } from 'zod';

const questFiltersSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  isPremium: z.boolean().optional(),
  questType: z.enum(['SOLO', 'GROUP']).optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = questFiltersSchema.parse({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
    isPremium: searchParams.get('isPremium') === 'true',
    questType: searchParams.get('questType'),
  });
  
  // Use validated filters
}
```

### XSS Prevention

```typescript
// ✅ CORRECT: React automatically escapes content
<div>{userContent}</div>

// ⚠️ CAUTION: Only use with trusted, sanitized content
import DOMPurify from 'dompurify';

function SafeHTML({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

---

## ⚡ **Performance Optimization**

### Code Splitting

```typescript
// Route-level code splitting
const QuestPage = dynamic(() => import('./quest-page'), {
  loading: () => <QuestPageSkeleton />,
});

// Component-level code splitting for heavy components
const QuestMapView = dynamic(() => import('./quest-map-view'), {
  ssr: false, // Disable SSR for client-only components
});
```

### Image Optimization

```typescript
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/quest-banner.jpg"
  alt="Quest banner"
  width={800}
  height={400}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg"
/>
```

### Memoization

```typescript
// Memoize expensive computations
const processedQuests = useMemo(() => {
  if (!quests) return [];
  
  return quests.map(quest => ({
    ...quest,
    formattedDate: formatDate(quest.createdAt),
    isCompleted: quest.status === 'COMPLETED',
  }));
}, [quests]);

// Memoize components to prevent unnecessary re-renders
export const QuestCard = memo(function QuestCard(props: QuestCardProps) {
  // Component implementation
});
```

### Bundle Analysis

```bash
# Analyze bundle size  
pnpm analyze

# Additional analysis tools
npx depcheck                # Check for unused dependencies
```

---

## 📱 **Mobile-First Development**

### 1. Responsive Design Patterns

```typescript
// Mobile-first CSS classes
<div className="
  w-full          // Mobile: full width
  md:w-1/2        // Tablet: half width
  lg:w-1/3        // Desktop: third width
  p-4             // Mobile: padding 16px
  md:p-6          // Tablet+: padding 24px
">

// Use responsive hooks
function QuestGrid() {
  const { isMobile } = useResponsiveDetection();
  
  return (
    <div className={`grid gap-4 ${
      isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'
    }`}>
      {/* Grid content */}
    </div>
  );
}
```

### 2. Touch-Friendly Design

```typescript
// Minimum 44px touch targets
<button className="h-11 px-4 py-2 min-w-[44px]">
  Submit
</button>

// Appropriate spacing for touch
<div className="space-y-4"> // 16px spacing between elements
  <TouchableCard />
  <TouchableCard />
</div>
```

---

## 🗺️ **Map Integration Guidelines**

### Leaflet Map Implementation

```typescript
// Map initialization hook
export function useMapInitialization() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize map
    }
  }, []);
  
  return { map, isLoading };
}

// Map component pattern
export function InteractiveMap({ spots, onSpotSelect }: MapProps) {
  const { map, isLoading } = useMapInitialization();
  
  if (isLoading) return <MapSkeleton />;
  
  return (
    <MapContainer>
      {spots.map(spot => (
        <TouristSpotMarker 
          key={spot.id} 
          spot={spot} 
          onClick={() => onSpotSelect(spot)} 
        />
      ))}
    </MapContainer>
  );
}
```

---

## 🐛 **Debugging and Troubleshooting**

### Common Issues

#### 1. API Client Out of Sync
```bash
# Solution: Regenerate API client
pnpm generate:api
```

#### 2. TypeScript Errors After Backend Changes
```bash
# Solution: Clear Next.js cache and regenerate
rm -rf .next
pnpm generate:api
pnpm dev
```

#### 3. Storybook Build Failures
```bash
# Solution: Clear Storybook cache
rm -rf node_modules/.cache/storybook
pnpm storybook
```

#### 4. Map Not Loading
```typescript
// Ensure dynamic import for client-side only
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
});
```

### Development Tools

```typescript
// Enable React DevTools Profiler
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{/* component */}</div>;
});

// Use console.log sparingly, prefer proper logging
import { logger } from '@/utils/logger';
logger.debug('Debug information', { data });
```

---

## 🚀 **Deployment & Production**

### Production Checklist

- [ ] **Environment Variables**: All production values set
- [ ] **API Keys**: Secure and properly rotated
- [ ] **Bundle Size**: Analyzed and optimized
- [ ] **Performance**: Lighthouse score > 90
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **SEO**: Meta tags and structured data
- [ ] **Error Tracking**: Sentry or similar configured
- [ ] **Analytics**: Google Analytics or alternative
- [ ] **Security Headers**: CSP, HSTS, etc.

---

## 📋 **Code Review Checklist**

### Before Submitting PR

- [ ] **API client regenerated** if backend changes were made
- [ ] **Storybook stories** created for new components
- [ ] **Tests written** for new functionality
- [ ] **TypeScript checks** pass (`pnpm type-check`)
- [ ] **Linting** passes (`pnpm check`)
- [ ] **Build** succeeds (`pnpm build`)
- [ ] **Responsive design** tested on mobile and desktop
- [ ] **Accessibility** considerations addressed
- [ ] **Performance impact** considered

### Component Requirements

- [ ] **Props interface** defined with proper types
- [ ] **Default props** provided where appropriate
- [ ] **Error boundaries** implemented for error handling
- [ ] **Loading states** handled gracefully
- [ ] **Mobile-first** responsive design
- [ ] **Semantic HTML** used correctly
- [ ] **ARIA labels** provided for accessibility

---

## 🤝 **Collaboration Guidelines**

### Branch Naming

```bash
feature/component-name      # New features
fix/bug-description        # Bug fixes
refactor/area-name         # Code refactoring
docs/update-description    # Documentation updates
```

### Commit Messages

```bash
feat: add quest completion modal
fix: resolve map marker positioning issue
refactor: extract common map utilities
docs: update API integration guide
style: improve mobile responsiveness for quest cards
```

### Pull Request Template

```markdown
## 🎯 Purpose
Brief description of the changes and why they're needed.

## 🔄 Changes Made
- [ ] Added/modified components
- [ ] Updated hooks
- [ ] API integration changes
- [ ] Documentation updates

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Component stories updated
- [ ] Manual testing completed
- [ ] Responsive design tested
- [ ] Accessibility verified

## 📱 Screenshots
[Include screenshots for UI changes]

## 📋 Checklist
- [ ] Follows project guidelines
- [ ] TypeScript checks pass
- [ ] Storybook stories included
- [ ] Tests written/updated
- [ ] Documentation updated
```

---

## 📚 **Documentation Requirements**

### Component Documentation

Every component must have:

- **Props Interface**: Clearly documented with TSDoc comments
- **Storybook Story**: All variants and states
- **Usage Examples**: In the component file or separate guide
- **Accessibility Notes**: ARIA patterns and keyboard navigation

### TSDoc Comments

```typescript
/**
 * A reusable card component for displaying quest information.
 * 
 * @param quest - The quest data to display
 * @param onSelect - Callback fired when the quest is selected
 * @param variant - Visual variant of the card
 * @param className - Additional CSS classes for custom styling
 * 
 * @example
 * ```tsx
 * <QuestCard 
 *   quest={questData} 
 *   onSelect={(id) => navigate(`/quests/${id}`)}
 *   variant="featured" 
 * />
 * ```
 */
export function QuestCard({ quest, onSelect, variant, className }: QuestCardProps) {
  // Implementation
}
```

---

## 🐛 **Error Handling Standards**

### Component Error Boundaries

```typescript
// Wrap critical components with error boundaries
<ErrorBoundary
  fallback={<QuestListError />}
  onError={(error, errorInfo) => {
    console.error('Quest list error:', error, errorInfo);
    // Log to error tracking service
  }}
>
  <QuestList />
</ErrorBoundary>
```

### Graceful Degradation

```typescript
function QuestCard({ quest }: QuestCardProps) {
  // Handle missing data gracefully
  if (!quest) {
    return <QuestCardSkeleton />;
  }

  return (
    <div className="quest-card">
      <h3>{quest.title || 'Untitled Quest'}</h3>
      <p>{quest.description || 'No description available'}</p>
      {quest.imageUrl && (
        <Image 
          src={quest.imageUrl} 
          alt={quest.title || 'Quest image'}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
```

---

## 📚 **Additional Resources**

### Documentation Links

- [Complete Hook Guide](./HOOK_GUIDE.md)
- [API Integration Guide](./API_INTEGRATION.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Security Guidelines](./SECURITY_GUIDELINES.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vitest Documentation](https://vitest.dev)
- [Storybook Documentation](https://storybook.js.org/docs)

---

*Last Updated: June 18, 2025*