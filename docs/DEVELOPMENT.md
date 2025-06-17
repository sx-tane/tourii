# 🛠️ Tourii Frontend Development Guide

This guide covers development workflows, best practices, and getting started with the Tourii frontend application.

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

## 🔧 **Development Commands**

### Core Development

```bash
# Development server with hot reload
pnpm dev                    # Start with Turbopack (faster)
pnpm dev:next              # Start with standard Next.js dev server

# Production build and preview
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm preview                # Preview production build locally
```

### Code Quality & Testing

```bash
# Linting and formatting
pnpm lint                   # Run Biome linter
pnpm check                  # Run Biome check with autofix
pnpm type-check             # TypeScript type checking

# Testing
pnpm test                   # Run unit tests with Vitest
pnpm test:watch             # Run tests in watch mode
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

## 🏗️ **Project Structure**

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

// 2. Implement component
export function MyComponent({ data, onAction, variant = 'default', className }: MyComponentProps) {
  return (
    <div className={cn('base-styles', variant === 'compact' && 'compact-styles', className)}>
      {/* Implementation */}
    </div>
  );
}

// 3. Create Storybook story
export default {
  title: 'Domain/MyComponent',
  component: MyComponent,
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

## 🔒 **Environment Configuration**

### Environment Variables

```env
# Core Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NODE_ENV=development

# Backend API
TOURII_BACKEND_API_KEY=your-backend-api-key

# Web3 Integration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-id
NEXT_PUBLIC_CHAIN_ID=1116
NEXT_PUBLIC_RPC_URL=https://rpc.vara.network

# Maps and Location
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Storage
NEXT_PUBLIC_NFT_STORAGE_TOKEN=your-nft-storage-token

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### Environment Validation

The project uses Zod for environment variable validation:

```typescript
// src/env.js - Environment validation
export const env = createEnv({
  server: {
    TOURII_BACKEND_API_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  // ... rest of configuration
});
```

---

## 🧪 **Testing Strategy**

### Unit Testing with Vitest

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('handles user interaction correctly', () => {
    const onAction = vi.fn();
    render(<MyComponent onAction={onAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledWith('expected-value');
  });
});

// Hook test example
import { renderHook, waitFor } from '@testing-library/react';
import { useMyData } from './use-my-data';

describe('useMyData', () => {
  it('fetches data correctly', async () => {
    const { result } = renderHook(() => useMyData());
    
    await waitFor(() => {
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

## 🎨 **Styling Guidelines**

### Tailwind CSS Best Practices

```typescript
// Use semantic color classes
<div className="bg-warmGrey-50 text-charcoal-900">

// Mobile-first responsive design
<div className="w-full md:w-1/2 lg:w-1/3">

// Use clsx for conditional styles
import { clsx } from 'clsx';

const buttonStyles = clsx(
  'inline-flex items-center justify-center',
  {
    'bg-primary text-white': variant === 'primary',
    'bg-secondary text-gray-900': variant === 'secondary',
  },
  className
);
```

### Component Styling Patterns

```typescript
// 1. Use cn() utility for className merging
import { cn } from '@/lib/utils';

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// 2. Define style variants
const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent',
};
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

## 🔐 **Security Best Practices**

### API Security

```typescript
// ✅ CORRECT: Use Next.js API routes as proxies
export async function GET() {
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) =>
      MyService.getData(apiVersion, apiKey),
    "GET /api/my-data"
  );
}

// ❌ WRONG: Never expose API keys in client
const response = await fetch('https://api.backend.com/data', {
  headers: { 'Authorization': `Bearer ${API_KEY}` } // DON'T DO THIS
});
```

### Input Validation

```typescript
// Validate API inputs with Zod
const requestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validatedData = requestSchema.parse(body);
  // Use validatedData
}
```

---

## 🚀 **Performance Optimization**

### Code Splitting

```typescript
// Route-level splitting
const QuestPage = dynamic(() => import('./quest-page'), {
  loading: () => <QuestPageSkeleton />,
});

// Component-level splitting
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  ssr: false, // Disable SSR for client-only components
});
```

### Image Optimization

```typescript
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={400}
  height={300}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Bundle Analysis

```bash
# Analyze bundle size
pnpm build
pnpm analyze

# Check for large dependencies
npx next-bundle-analyzer
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

## 🤝 **Contributing Guidelines**

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
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Component stories added/updated
- [ ] Manual testing completed

## Screenshots
[Add screenshots for UI changes]
```

---

## 📚 **Additional Resources**

### Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [API Integration Guide](./FRONTEND_BACKEND_INTEGRATION.md)
- [Hook Usage Examples](./HOOK_USAGE_EXAMPLES.md)
- [Security Guidelines](./SECURITY_GUIDELINES.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vitest Documentation](https://vitest.dev)
- [Storybook Documentation](https://storybook.js.org/docs)

---

*Last Updated: June 17, 2025*