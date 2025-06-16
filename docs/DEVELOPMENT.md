# 🛠️ Tourii Development Guide

This guide covers common development workflows and best practices for the Tourii frontend.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- pnpm (recommended package manager)
- Git

### Initial Setup
```bash
# Clone and install
git clone <repository-url>
cd tourii
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your local values

# Start development
pnpm dev
```

---

## 📋 Daily Development Commands

### Development Server
```bash
pnpm dev                    # Start with Turbopack (fastest)
pnpm dev:network           # Accessible on local network
```

### Code Quality
```bash
pnpm lint                  # Check for issues
pnpm check                 # Lint + format check
pnpm format                # Auto-format code
```

### Testing
```bash
pnpm test                  # Run all tests
pnpm test:ui              # Interactive test UI
pnpm test:coverage        # With coverage report
```

### Component Development
```bash
pnpm storybook            # Start Storybook
pnpm build-storybook      # Build for production
```

---

## 🏗️ Creating New Features

### 1. New Component Workflow
```bash
# 1. Create component file (kebab-case)
touch src/components/feature-name/my-component.tsx

# 2. Create Storybook story
touch src/components/feature-name/my-component.stories.tsx

# 3. Add to index.ts (if exporting)
echo "export { default as MyComponent } from './my-component';" >> src/components/feature-name/index.ts

# 4. Test in Storybook
pnpm storybook
```

### 2. New API Hook Workflow
```bash
# 1. Create hook file
touch src/hooks/domain/getMyData.ts

# 2. Create Next.js API route
mkdir -p src/app/api/my-endpoint
touch src/app/api/my-endpoint/route.ts

# 3. Follow the three-layer pattern
# Hook → API Route → Generated Client
```

### 3. New Page Workflow
```bash
# 1. Create page in appropriate route group
touch src/app/v2/(feature)/my-page/page.tsx

# 2. Add layout if needed
touch src/app/v2/(feature)/layout.tsx

# 3. Create page components
mkdir -p src/components/my-page
touch src/components/my-page/my-page-component.tsx
```

---

## 🔄 API Development Workflow

### When Backend API Changes
```bash
# 1. Update OpenAPI spec
# Backend team updates docs/api-specs/openapi.json

# 2. Regenerate client
pnpm generate:api

# 3. Update hooks and routes as needed
# No manual editing of src/api/generated/
```

### Adding New API Endpoint
```bash
# 1. Create SWR hook
# src/hooks/domain/getNewData.ts

# 2. Create Next.js API route
# src/app/api/new-endpoint/route.ts

# 3. Use executeValidatedServiceCall helper
# Follow existing patterns in route-helper.ts
```

---

## 🎨 Styling Guidelines

### Component Styling Pattern
```tsx
// Use Tailwind classes with semantic naming
const MyComponent = ({ className }) => {
  return (
    <div className={cn(
      "bg-warmGrey2 rounded-3xl p-6",
      "md:p-8 lg:p-12",              // Responsive
      "hover:shadow-lg transition-shadow", // Interactions
      className                           // Override support
    )}>
      {/* Content */}
    </div>
  );
};
```

### Color Usage
```tsx
// Use semantic color names
"bg-warmGrey"     // Light background
"bg-warmGrey2"    // Medium background  
"bg-charcoal"     // Dark background
"text-red"        // Brand accent
"border-warmGrey3" // Subtle borders
```

---

## 🗃️ State Management Patterns

### When to Use Redux vs SWR
```tsx
// Redux: UI state, user preferences, app-level state
const selectedTheme = useSelector(state => state.ui.theme);
const dispatch = useDispatch();

// SWR: Server data, API responses
const { modelRoutes, isLoading } = getModelRoutes();
```

### Redux Slice Pattern
```typescript
// Feature-based slices in src/lib/redux/features/
export const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    setMyData: (state, action) => {
      state.myData = action.payload;
    },
  },
});
```

---

## 🧪 Testing Best Practices

### Component Testing with Storybook
```tsx
// my-component.stories.tsx
export default {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export const Default = {
  args: {
    title: "Default state",
    isLoading: false,
  },
};

export const Loading = {
  args: {
    title: "Loading state", 
    isLoading: true,
  },
};
```

### Hook Testing
```typescript
// Test custom hooks
import { renderHook } from '@testing-library/react';
import { getMyData } from '@/hooks/getMyData';

test('hook returns expected structure', () => {
  const { result } = renderHook(() => getMyData());
  expect(result.current).toHaveProperty('data');
  expect(result.current).toHaveProperty('isLoading');
});
```

---

## 🚢 Deployment Workflow

### Pre-deployment Checklist
```bash
# 1. Run all checks
pnpm lint && pnpm test && pnpm build

# 2. Check bundle size
pnpm build && npx @next/bundle-analyzer

# 3. Test production build locally
pnpm start

# 4. Update environment variables on platform
# 5. Deploy to staging first
# 6. Run smoke tests
# 7. Deploy to production
```

---

## 🐛 Debugging Tips

### Common Issues
```bash
# API generation issues
rm -rf src/api/generated && pnpm generate:api

# SWR cache issues
# Add `mutate()` calls or clear browser cache

# Map rendering issues  
# Check console for Leaflet errors
# Verify tourist spot coordinates

# Build issues
pnpm clean && pnpm install && pnpm build
```

### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State debugging  
- **SWR DevTools**: Cache inspection
- **Storybook**: Component isolation
- **Leaflet DevTools**: Map debugging

---

## 📝 Git Workflow

### Branch Naming
```bash
feature/add-new-component
fix/resolve-map-rendering
refactor/update-api-hooks
docs/update-readme
```

### Commit Messages
```bash
feat: add model route map component
fix: resolve tourist spot marker positioning  
refactor: update API hook patterns
docs: update development guide
style: format with Biome
test: add component tests
```

---

## 🆘 Getting Help

### Documentation Order
1. **This file** - Common development tasks
2. **README.md** - Project overview and setup
3. **docs/ARCHITECTURE.md** - Technical architecture details
4. **docs/FRONTEND_API_EXAMPLE.md** - API usage patterns
5. **Storybook** - Component documentation

### Team Communication
- Create GitHub issues for bugs and features
- Use PR discussions for code review
- Document decisions in appropriate `.md` files

---

_Last Updated: June 16 2025_