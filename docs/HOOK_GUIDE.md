# 🎣 Complete Hook Guide

This comprehensive guide covers everything about hooks in the Tourii frontend: patterns, migration, examples, and best practices.

---

## 🏗️ **Hook Architecture Overview**

The Tourii frontend uses a well-organized hook structure following the three-layer API pattern:

```
src/hooks/
├── api/              # Server data fetching (SWR hooks) - 15 hooks
├── admin/            # Admin CRUD operations (SWR mutations) - 6 hooks ✅ All working
├── business/         # Business logic hooks - 4 hooks
├── map/              # Map and geolocation hooks - 2 hooks
└── ui/               # UI interaction hooks - 3 hooks
```

**Three-Layer Pattern**: SWR Hooks → Next.js API Routes → Generated SDK → Backend

---

## 🏷️ **Name Resolution Hooks** ✅ **NEW**

For admin interfaces that need to display human-readable names instead of IDs, use these specialized hooks:

### Individual Name Resolution

```typescript
// Quest name resolution
import { useQuestName } from '@/hooks/admin';

function QuestDisplay({ questId }: { questId: string }) {
  const { name, isLoading } = useQuestName(questId);
  
  if (isLoading) return <span>Loading...</span>;
  return <span>{name || `Quest #${questId.slice(-6)}`}</span>;
}

// Tourist spot name resolution
import { useTouristSpotName } from '@/hooks/admin';

function SpotDisplay({ spotId }: { spotId: string }) {
  const { name, isLoading } = useTouristSpotName(spotId);
  
  if (isLoading) return <span>Loading...</span>;
  return <span>{name || `Tourist Spot #${spotId.slice(-6)}`}</span>;
}

// Story chapter name resolution
import { useStoryChapterName } from '@/hooks/admin';

function ChapterDisplay({ chapterId }: { chapterId: string }) {
  const { name, isLoading } = useStoryChapterName(chapterId);
  
  if (isLoading) return <span>Loading...</span>;
  return <span>{name || `Chapter #${chapterId.slice(-6)}`}</span>;
}

// Task name resolution (with action context)
import { useTaskName } from '@/hooks/admin';

function TaskDisplay({ taskId, action }: { taskId: string, action?: string }) {
  const { name, isLoading } = useTaskName(taskId, action);
  
  if (isLoading) return <span>Loading...</span>;
  return <span>{name}</span>; // e.g., "Photo Upload Task #BAAA"
}
```

### Batch Name Resolution

```typescript
// Resolve multiple names at once
import { useNameResolution } from '@/hooks/admin';

function ActivityLogTable({ logs }: { logs: UserActivityLog[] }) {
  const questIds = logs.map(log => log.questId).filter(Boolean);
  const spotIds = logs.map(log => log.touristSpotId).filter(Boolean);
  const chapterIds = logs.map(log => log.storyChapterId).filter(Boolean);
  
  const {
    questNames,
    touristSpotNames,
    storyChapterNames,
    isLoading,
    error
  } = useNameResolution(questIds, spotIds, chapterIds);
  
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <table>
      {logs.map(log => (
        <tr key={log.id}>
          <td>{questNames.get(log.questId) || `Quest #${log.questId.slice(-6)}`}</td>
          <td>{touristSpotNames.get(log.touristSpotId) || `Spot #${log.touristSpotId.slice(-6)}`}</td>
        </tr>
      ))}
    </table>
  );
}
```

### ResolvedNameDisplay Component

For consistent styling across admin interfaces, use the `ResolvedNameDisplay` component:

```typescript
import ResolvedNameDisplay from '@/components/admin/users/resolved-name-display';

function UserActivityRow({ log }: { log: UserTaskLog }) {
  return (
    <tr>
      <td>
        <ResolvedNameDisplay 
          id={log.questId} 
          type="quest" 
        />
      </td>
      <td>
        <ResolvedNameDisplay 
          id={log.taskId} 
          type="task" 
          action={log.action}
        />
      </td>
      <td>
        <ResolvedNameDisplay 
          id={log.touristSpotId} 
          type="tourist-spot" 
        />
      </td>
      <td>
        <ResolvedNameDisplay 
          id={log.storyChapterId} 
          type="story-chapter" 
        />
      </td>
    </tr>
  );
}
```

**Benefits:**
- Converts `Quest #a-BAAA` → `"Discover Harajiri Falls"`
- Converts `Tourist Spot #4-BAAA` → `"Harajiri Falls"`
- Converts `Story Chapter #7-BAAA` → `"Prologue - Chapter 1"`
- Converts `Task #BAAA` → `"Photo Upload Task #BAAA"`
- Built-in caching to avoid repeated API calls
- Graceful fallback to formatted IDs if resolution fails

---

## 🔧 **Admin CRUD Hooks** ✅ **All Working**

The admin hooks provide CRUD operations for all content types with proper error handling and SWR mutation patterns.

### Story Management Hooks

```typescript
// Story/Saga operations
import { 
  useCreateStory, 
  useUpdateStory, 
  useDeleteStory,
  useCreateStoryChapter,
  useUpdateStoryChapter,
  useDeleteStoryChapter
} from '@/hooks/admin';

function StoryManagement() {
  const { trigger: createStory, isMutating: isCreating } = useCreateStory(() => {
    alert('Story created successfully!');
    mutateStories(); // Refresh stories list
  });
  
  const { trigger: deleteStory, isMutating: isDeleting } = useDeleteStory(() => {
    alert('Story deleted successfully!');
    mutateStories();
  });
  
  const handleCreateStory = async (storyData: StoryCreateRequestDto) => {
    try {
      await createStory(storyData);
    } catch (error) {
      console.error('Failed to create story:', error);
    }
  };
  
  const handleDeleteStory = async (storyId: string) => {
    try {
      await deleteStory({ storyId });
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };
  
  return (
    <div>
      <CreateStoryForm onSubmit={handleCreateStory} isSubmitting={isCreating} />
      <StoryList onDelete={handleDeleteStory} isDeleting={isDeleting} />
    </div>
  );
}
```

### Quest Management Hooks

```typescript
// Quest and task operations
import { 
  useCreateQuest, 
  useUpdateQuest, 
  useDeleteQuest,
  useCreateQuestTask,
  useUpdateQuestTask,
  useDeleteQuestTask
} from '@/hooks/admin';

function QuestTaskManagement({ questId }: { questId: string }) {
  const { trigger: createTask, isMutating: isCreatingTask } = useCreateQuestTask(() => {
    alert('Task created successfully!');
    mutateTasks();
  });
  
  const { trigger: updateTask, isMutating: isUpdatingTask } = useUpdateQuestTask(() => {
    alert('Task updated successfully!');
    mutateTasks();
  });
  
  const handleCreateTask = async (taskData: QuestTaskCreateRequestDto) => {
    try {
      await createTask({ questId, ...taskData });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  
  const handleUpdateTask = async (taskId: string, taskData: QuestTaskUpdateRequestDto) => {
    try {
      await updateTask({ taskId, ...taskData });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  
  return (
    <div>
      <TaskForm onSubmit={handleCreateTask} isSubmitting={isCreatingTask} />
      <TaskList onUpdate={handleUpdateTask} isUpdating={isUpdatingTask} />
    </div>
  );
}
```

### Model Route Management Hooks

```typescript
// Model route and tourist spot operations
import { 
  useCreateModelRoute,
  useUpdateModelRoute,
  useDeleteModelRoute,
  useCreateTouristSpot,
  useUpdateTouristSpot,
  useDeleteTouristSpot
} from '@/hooks/admin';

function RouteManagement() {
  const { trigger: createRoute, isMutating: isCreatingRoute } = useCreateModelRoute(() => {
    alert('Route created successfully!');
    mutateRoutes();
  });
  
  const { trigger: deleteRoute, isMutating: isDeletingRoute } = useDeleteModelRoute(() => {
    alert('Route deleted successfully!');
    mutateRoutes();
  });
  
  const handleCreateRoute = async (routeData: ModelRouteCreateRequestDto) => {
    try {
      await createRoute(routeData);
    } catch (error) {
      console.error('Failed to create route:', error);
    }
  };
  
  const handleDeleteRoute = async (routeId: string) => {
    try {
      await deleteRoute({ routeId });
    } catch (error) {
      console.error('Failed to delete route:', error);
    }
  };
  
  return (
    <div>
      <RouteForm onSubmit={handleCreateRoute} isSubmitting={isCreatingRoute} />
      <RouteList onDelete={handleDeleteRoute} isDeleting={isDeletingRoute} />
    </div>
  );
}
```

### Critical Success Response Pattern

**IMPORTANT**: All delete operations must return `{ success: true }` for SWR to interpret them as successful:

```typescript
// ✅ CORRECT: Delete hook implementation
export function useDeleteStory(onSuccess?: () => void) {
  return useSWRMutation(
    "/api/stories",
    async (url: string, { arg }: { arg: { storyId: string } }) => {
      const response = await fetch(`${url}/${arg.storyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete story");
      return { success: true }; // ✅ Required for SWR success detection
    },
    {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to delete story:", error);
        alert(`Failed to delete story: ${error instanceof Error ? error.message : String(error)}`);
      },
    },
  );
}

// ❌ WRONG: Missing return statement causes SWR to treat as failure
export function useDeleteStoryWrong(onSuccess?: () => void) {
  return useSWRMutation(
    "/api/stories",
    async (url: string, { arg }: { arg: { storyId: string } }) => {
      const response = await fetch(`${url}/${arg.storyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete story");
      // ❌ Missing return - SWR interprets undefined as failure
    },
    // ...rest of config
  );
}
```

### Error Handling Best Practices

```typescript
// Comprehensive error handling pattern
function AdminContentManager() {
  const { trigger: deleteItem, isMutating: isDeleting, error: deleteError } = useDeleteStory((storyId) => {
    // Success callback
    setSelectedStory(null);
    showSuccessToast('Story deleted successfully');
  });
  
  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    try {
      await deleteItem({ storyId });
    } catch (error) {
      // Error is already handled by the hook's onError callback
      // Additional error handling can be done here if needed
      console.error('Delete operation failed:', error);
    }
  };
  
  return (
    <div>
      {deleteError && (
        <ErrorAlert error={deleteError} onDismiss={() => {/* clear error */}} />
      )}
      
      <DeleteButton 
        onClick={() => handleDelete(story.id)}
        isLoading={isDeleting}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Story'}
      </DeleteButton>
    </div>
  );
}
```

---

## 🔄 **Migration Guide: Old vs New Patterns**

### Hook Naming Convention Change

```typescript
// ❌ OLD: get* pattern (deprecated)
import { getModelRoutes } from '@/hooks/routes/getModelRoutes';
import { getModelRouteById } from '@/hooks/routes/getModelRouteById';

// ✅ NEW: use* pattern (current standard)
import { useModelRoutes, useModelRouteById } from '@/hooks/api';
```

### Return Value Structure Change

```typescript
// ❌ OLD: Custom property names
const {
  modelRoutes,           // Custom property name
  isLoadingModelRoutes,  // Verbose loading state
  isErrorModelRoutes,    // Verbose error state
  mutateModelRoutes,     // Verbose mutate function
} = getModelRoutes();

// ✅ NEW: Standardized property names
const {
  data: modelRoutes,     // or just `data` 
  isLoading,            // Standard SWR property
  error,                // Standard SWR property
  mutate,               // Standard SWR function
} = useModelRoutes();
```

### Directory Structure Migration

```typescript
// ❌ OLD: Feature-based organization
src/hooks/
├── routes/
│   ├── getModelRoutes.ts
│   └── getModelRouteById.ts
├── quests/
│   ├── getQuests.ts
│   └── getQuestById.ts
└── stories/
    ├── getSagas.ts
    └── getSagaById.ts

// ✅ NEW: Purpose-based organization  
src/hooks/
├── api/                   # All API data fetching
│   ├── useModelRoutes.ts
│   ├── useModelRouteById.ts
│   ├── useQuests.ts
│   ├── useQuestById.ts
│   ├── useCheckins.ts
│   ├── useSagas.ts
│   ├── useSagaById.ts
│   └── index.ts
├── business/              # Business logic
├── map/                   # Map functionality
└── ui/                    # UI interactions
```

### Migration Checklist

- [ ] Replace all `get*` hooks with `use*` equivalents
- [ ] Update import paths to new structure
- [ ] Change destructuring to use standard SWR properties
- [ ] Update error handling to use `error` instead of `isError*`
- [ ] Move hooks to appropriate category folders

---

## 📚 **API Hooks - Complete Examples**

### Basic Data Fetching Pattern

```typescript
// src/hooks/api/useModelRoutes.ts
import { useProxySWR, type UseApiHookResult } from '@/lib/swr/useProxySWR';
import type { ModelRouteResponseDto } from '@/api/generated';

export function useModelRoutes(): UseApiHookResult<ModelRouteResponseDto[]> {
  const { data, error, isLoading, mutate } = useProxySWR<ModelRouteResponseDto[]>(
    "/api/routes/model-routes"
  );
  
  return { data, error, isLoading, mutate };
}

// Usage in components
function RouteList() {
  const { data: routes, error, isLoading, mutate } = useModelRoutes();
  
  if (isLoading) return <RouteListSkeleton />;
  if (error) return <ErrorDisplay error={error} retry={mutate} />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {routes?.map(route => (
        <RouteCard key={route.modelRouteId} route={route} />
      ))}
    </div>
  );
}
```

### Parameterized Hook Pattern

```typescript
// src/hooks/api/useModelRouteById.ts
export function useModelRouteById(routeId: string | null): UseApiHookResult<ModelRouteResponseDto> {
  const { data, error, isLoading, mutate } = useProxySWR<ModelRouteResponseDto>(
    routeId ? `/api/routes/${routeId}` : null // Conditional fetching
  );
  
  return { data, error, isLoading, mutate };
}

// Usage with conditional fetching
function RouteDetail({ routeId }: { routeId: string | null }) {
  const { data: route, error, isLoading } = useModelRouteById(routeId);
  
  if (!routeId) return <RouteSelection />;
  if (isLoading) return <RouteDetailSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!route) return <NotFound />;
  
  return <RouteDisplay route={route} />;
}
```

### Query Parameters Hook Pattern

```typescript
// src/hooks/api/useQuests.ts
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

// Usage with filters
function QuestBrowser() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    isPremium: undefined,
    questType: undefined,
  });
  
  const { data: questData, error, isLoading, mutate } = useQuests(filters);
  
  const handleFilterChange = (newFilters: Partial<QuestFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  if (isLoading) return <QuestGridSkeleton />;
  if (error) return <ErrorDisplay error={error} retry={mutate} />;
  
  return (
    <div>
      <QuestFilters filters={filters} onChange={handleFilterChange} />
      <QuestGrid 
        quests={questData?.quests} 
        totalPages={questData?.totalPages}
        currentPage={filters.page}
        onPageChange={(page) => handleFilterChange({ page })}
      />
    </div>
  );
}
```

### Story System Hook Pattern

```typescript
// src/hooks/api/useSagas.ts
export function useSagas(): UseApiHookResult<StoryResponseDto[]> {
  const { data, error, isLoading, mutate } = useProxySWR<StoryResponseDto[]>(
    "/api/stories/sagas"
  );
  
  return { data, error, isLoading, mutate };
}

// src/hooks/api/useSagaById.ts
export function useSagaById(storyId: string | null): UseApiHookResult<StoryResponseDto> {
  const { data, error, isLoading, mutate } = useProxySWR<StoryResponseDto>(
    storyId ? `/api/stories/${storyId}` : null
  );
  
  return { data, error, isLoading, mutate };
}

// Combined usage
function ChapterViewer({ storyId, chapterId }: { storyId: string; chapterId: string }) {
  const { data: saga, error: sagaError, isLoading: isSagaLoading } = useSagaById(storyId);
  const { data: chapters, error: chaptersError, isLoading: isChaptersLoading } = useChaptersByStory(storyId);
  
  const isLoading = isSagaLoading || isChaptersLoading;
  const error = sagaError || chaptersError;
  
  if (isLoading) return <ChapterViewerSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  
  const currentChapter = chapters?.find(ch => ch.chapterId === chapterId);
  
  return (
    <div className="chapter-viewer">
      <ChapterNavigation saga={saga} chapters={chapters} currentChapterId={chapterId} />
      <ChapterContent chapter={currentChapter} />
    </div>
  );
}
```

### Admin User Management Hook Pattern

```typescript
// src/hooks/api/useAdminUsers.ts
interface AdminUserFilters {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: 'USER' | 'MODERATOR' | 'ADMIN';
  isPremium?: string;
  isBanned?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'username' | 'registered_at' | 'total_quest_completed' | 'total_travel_distance';
  sortOrder?: 'asc' | 'desc';
}

export function useAdminUsers(filters?: AdminUserFilters): UseApiHookResult<AdminUserListResponseDto> {
  const queryParams = new URLSearchParams();
  
  if (filters?.page) queryParams.set('page', String(filters.page));
  if (filters?.limit) queryParams.set('limit', String(filters.limit));
  if (filters?.searchTerm) queryParams.set('searchTerm', filters.searchTerm);
  if (filters?.role) queryParams.set('role', filters.role);
  if (filters?.isPremium) queryParams.set('isPremium', filters.isPremium);
  if (filters?.isBanned) queryParams.set('isBanned', filters.isBanned);
  if (filters?.startDate) queryParams.set('startDate', filters.startDate);
  if (filters?.endDate) queryParams.set('endDate', filters.endDate);
  if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
  if (filters?.sortOrder) queryParams.set('sortOrder', filters.sortOrder);
  
  const { data, error, isLoading, mutate } = useProxySWR<AdminUserListResponseDto>(
    `/api/admin/users?${queryParams.toString()}`
  );
  
  return { data, error, isLoading, mutate };
}

// Usage in admin dashboard
function AdminUserManagement() {
  const [filters, setFilters] = useState<AdminUserFilters>({
    page: 1,
    limit: 20,
    sortBy: 'registered_at',
    sortOrder: 'desc',
  });
  
  const { data: userData, error, isLoading, mutate } = useAdminUsers(filters);
  
  const handleFilterChange = (newFilters: Partial<AdminUserFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); // Reset to page 1 on filter change
  };
  
  const handleExportUsers = () => {
    // Export filtered users to CSV
    const csvData = generateCSV(userData?.users);
    downloadFile(csvData, 'users-export.csv');
  };
  
  if (isLoading) return <AdminUserTableSkeleton />;
  if (error) return <ErrorDisplay error={error} retry={mutate} />;
  
  return (
    <div className="admin-user-management">
      <div className="admin-header">
        <h1>User Management</h1>
        <button onClick={handleExportUsers} className="export-btn">
          Export Users
        </button>
      </div>
      
      <AdminUserFilters filters={filters} onChange={handleFilterChange} />
      
      <AdminUserTable 
        users={userData?.users} 
        totalUsers={userData?.totalUsers}
        totalPages={userData?.totalPages}
        currentPage={filters.page}
        onPageChange={(page) => handleFilterChange({ page })}
        onUserUpdate={mutate} // Refresh data after user actions
      />
    </div>
  );
}
```

### Location Search Hook Pattern

```typescript
// src/hooks/api/useLocationInfo.ts
export function useLocationInfo(query: string | null): UseApiHookResult<LocationInfoResponseDto> {
  const { data, error, isLoading, mutate } = useProxySWR<LocationInfoResponseDto>(
    query && query.length > 2 ? `/api/location-info?query=${encodeURIComponent(query)}` : null
  );
  
  return { data, error, isLoading, mutate };
}

// Usage with debouncing
function LocationSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  
  const { data: locationInfo, error, isLoading } = useLocationInfo(debouncedQuery);
  
  return (
    <div>
      <SearchInput 
        value={query} 
        onChange={setQuery} 
        placeholder="Search locations..." 
      />
      
      {isLoading && <SearchSpinner />}
      {error && <SearchError error={error} />}
      {locationInfo && <LocationResults results={locationInfo} />}
    </div>
  );
}
```

---

## 🏢 **Business Logic Hooks**

### Tourist Spot Selection Hook

```typescript
// src/hooks/business/useTouristSpotSelection.ts
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

// Usage in map components
function RouteMap({ routeId }: { routeId: string }) {
  const { data: route } = useModelRouteById(routeId);
  
  const {
    selectedSpotId,
    selectedSpot,
    selectSpot,
    clearSelection
  } = useTouristSpotSelection(route?.touristSpots);
  
  return (
    <div>
      <MapContainer>
        {route?.touristSpots?.map(spot => (
          <TouristSpotMarker
            key={spot.touristSpotId}
            spot={spot}
            isSelected={spot.touristSpotId === selectedSpotId}
            onClick={() => selectSpot(spot.touristSpotId)}
          />
        ))}
      </MapContainer>
      
      {selectedSpot && (
        <SpotDetailModal
          spot={selectedSpot}
          onClose={clearSelection}
        />
      )}
    </div>
  );
}
```

### Spot Image Management Hook

```typescript
// src/hooks/business/useSpotImage.ts
import { useMemo } from 'react';
import type { TouristSpotResponseDto } from '@/api/generated';

export function useSpotImage(spot: TouristSpotResponseDto) {
  const { imageUrl, isLoading, error } = useMemo(() => {
    if (!spot) {
      return { imageUrl: null, isLoading: false, error: 'No spot data' };
    }
    
    if (spot.imageUrl) {
      return { imageUrl: spot.imageUrl, isLoading: false, error: null };
    }
    
    // Generate fallback image URL based on spot location or name
    const fallbackUrl = `/images/spots/fallback-${spot.spotName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    
    return { imageUrl: fallbackUrl, isLoading: false, error: null };
  }, [spot]);
  
  return { imageUrl, isLoading, error };
}

// Usage in components
function TouristSpotCard({ spot }: { spot: TouristSpotResponseDto }) {
  const { imageUrl, isLoading: imageLoading, error: imageError } = useSpotImage(spot);
  
  return (
    <div className="spot-card">
      <div className="spot-image">
        {imageLoading ? (
          <ImageSkeleton />
        ) : imageError ? (
          <ImageFallback />
        ) : (
          <Image
            src={imageUrl}
            alt={spot.spotName}
            width={300}
            height={200}
            className="rounded-lg"
          />
        )}
      </div>
      
      <div className="spot-content">
        <h3>{spot.spotName}</h3>
        <p>{spot.description}</p>
      </div>
    </div>
  );
}
```

---

## 🗺️ **Map Hooks**

### Leaflet Loader Hook

```typescript
// src/hooks/map/useLeafletLoader.ts
import { useState, useEffect } from 'react';

export function useLeafletLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if Leaflet is already loaded
    if (window.L) {
      setIsLoaded(true);
      return;
    }

    const loadLeaflet = async () => {
      try {
        // Dynamic import for client-side only
        await import('leaflet/dist/leaflet.css');
        const L = await import('leaflet');
        
        // Fix default markers
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        });

        setIsLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load Leaflet'));
      }
    };

    loadLeaflet();
  }, []);

  return { isLoaded, error };
}
```

### Map Initialization Hook

```typescript
// src/hooks/map/useMapInitialization.ts
import { useState, useEffect, useRef } from 'react';
import type { TouristSpotResponseDto } from '@/api/generated';

interface MapInitOptions {
  center?: [number, number];
  zoom?: number;
  spots?: TouristSpotResponseDto[];
}

export function useMapInitialization(options: MapInitOptions = {}) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    try {
      const { center = [35.6762, 139.6503], zoom = 10 } = options;
      
      const mapInstance = L.map(mapRef.current).setView(center, zoom);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      // Fit bounds to spots if provided
      if (options.spots && options.spots.length > 0) {
        const bounds = L.latLngBounds(
          options.spots.map(spot => [spot.latitude, spot.longitude])
        );
        mapInstance.fitBounds(bounds, { padding: [20, 20] });
      }

      setMap(mapInstance);
      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize map'));
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [options.spots, options.center?.[0], options.center?.[1], options.zoom]);

  return { map, isInitialized, error, mapRef };
}

// Usage in map components
function InteractiveMap({ spots, onSpotSelect }: MapProps) {
  const { isLoaded: isLeafletLoaded, error: leafletError } = useLeafletLoader();
  
  const { 
    map, 
    isInitialized, 
    error: mapError,
    mapRef 
  } = useMapInitialization({
    center: [35.6762, 139.6503],
    zoom: 10,
    spots
  });
  
  if (leafletError || mapError) {
    return <MapError error={leafletError || mapError} />;
  }
  
  if (!isLeafletLoaded || !isInitialized) {
    return <MapSkeleton />;
  }
  
  return (
    <div ref={mapRef} className="w-full h-96">
      {spots.map(spot => (
        <TouristSpotMarker
          key={spot.touristSpotId}
          spot={spot}
          onClick={() => onSpotSelect(spot)}
        />
      ))}
    </div>
  );
}
```

---

## 🎨 **UI Hooks**

### Responsive Detection Hook

```typescript
// src/hooks/ui/useResponsiveDetection.ts
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

// Usage examples
function AdaptiveComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsiveDetection();
  
  if (isMobile) return <MobileLayout />;
  if (isTablet) return <TabletLayout />;
  return <DesktopLayout />;
}

function ResponsiveQuestGrid() {
  const { isMobile } = useResponsiveDetection();
  const { data: quests } = useQuests();
  
  return (
    <div className={`grid gap-4 ${
      isMobile 
        ? 'grid-cols-1' 
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }`}>
      {quests?.map(quest => (
        <QuestCard key={quest.questId} quest={quest} compact={isMobile} />
      ))}
    </div>
  );
}
```

### Image Gallery Hook

```typescript
// src/hooks/ui/useImageGallery.ts
import { useState, useCallback } from 'react';

export function useImageGallery(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openGallery = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return {
    currentIndex,
    isOpen,
    openGallery,
    closeGallery,
    nextImage,
    prevImage,
  };
}

// Usage in components
function SpotGallery({ images }: { images: string[] }) {
  const {
    currentIndex,
    isOpen,
    openGallery,
    closeGallery,
    nextImage,
    prevImage
  } = useImageGallery(images);
  
  return (
    <div>
      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="thumbnail cursor-pointer"
            onClick={() => openGallery(index)}
          />
        ))}
      </div>
      
      {isOpen && (
        <ImageModal
          image={images[currentIndex]}
          onClose={closeGallery}
          onNext={nextImage}
          onPrev={prevImage}
          currentIndex={currentIndex}
          totalImages={images.length}
        />
      )}
    </div>
  );
}
```

### Intersection Observer Hook

```typescript
// src/hooks/ui/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
        root: options.root ?? null,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return [ref, isVisible];
}

// Usage examples
function LazyLoadedSection({ children }: { children: React.ReactNode }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  return (
    <div ref={ref}>
      {isVisible ? children : <SectionSkeleton />}
    </div>
  );
}

function InfiniteQuestList() {
  const [page, setPage] = useState(1);
  const { data: quests, mutate } = useQuests({ page, limit: 20 });
  
  const [loadMoreRef, isLoadMoreVisible] = useIntersectionObserver({
    threshold: 1.0
  });
  
  useEffect(() => {
    if (isLoadMoreVisible && quests?.hasMore) {
      setPage(prev => prev + 1);
    }
  }, [isLoadMoreVisible, quests?.hasMore]);
  
  return (
    <div>
      <QuestGrid quests={quests?.quests} />
      <div ref={loadMoreRef}>
        {quests?.hasMore ? <LoadingSpinner /> : <EndOfList />}
      </div>
    </div>
  );
}
```

---

## 🔄 **Combined Hook Patterns**

### Complex Data Fetching with UI State

```typescript
function QuestManagement() {
  // API hooks
  const { data: quests, error, isLoading, mutate } = useQuests();
  
  // UI hooks
  const { isMobile } = useResponsiveDetection();
  
  // Local state management
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const { data: selectedQuest } = useQuestById(selectedQuestId);
  
  const handleQuestSelect = (questId: string) => {
    setSelectedQuestId(questId);
  };
  
  const handleQuestUpdate = async (questData: QuestUpdateData) => {
    try {
      await updateQuest(questData);
      mutate(); // Refresh quest list
      setSelectedQuestId(null);
    } catch (error) {
      console.error('Failed to update quest:', error);
    }
  };
  
  if (isLoading) return <QuestManagementSkeleton />;
  if (error) return <ErrorDisplay error={error} retry={mutate} />;
  
  return (
    <div className={`quest-management ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}>
      <QuestList 
        quests={quests}
        selectedQuestId={selectedQuestId}
        onQuestSelect={handleQuestSelect}
      />
      
      {selectedQuest && (
        <QuestEditor
          quest={selectedQuest}
          onUpdate={handleQuestUpdate}
          onCancel={() => setSelectedQuestId(null)}
        />
      )}
    </div>
  );
}
```

### Route Map with Multiple Data Sources

```typescript
function RouteMapWithQuests({ routeId }: { routeId: string }) {
  // API hooks
  const { data: route, error: routeError, isLoading: routeLoading } = useModelRouteById(routeId);
  const { data: routeQuests, error: questsError, isLoading: questsLoading } = useQuestsByRoute(routeId);
  
  // Map hooks
  const { isLoaded: isLeafletLoaded } = useLeafletLoader();
  const { map, isInitialized } = useMapInitialization({
    center: route?.coordinates ? [route.coordinates.lat, route.coordinates.lng] : undefined,
    zoom: 12,
    spots: route?.touristSpots
  });
  
  // Business hooks
  const { selectedSpotId, selectSpot, selectedSpot } = useTouristSpotSelection(route?.touristSpots);
  
  // UI hooks
  const { isMobile } = useResponsiveDetection();
  
  const isLoading = routeLoading || questsLoading || !isLeafletLoaded || !isInitialized;
  const error = routeError || questsError;
  
  if (isLoading) return <RouteMapSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <div className={`route-map-container ${isMobile ? 'mobile' : 'desktop'}`}>
      <MapContainer ref={map} className="flex-1">
        {route?.touristSpots?.map(spot => {
          const spotQuests = routeQuests?.filter(q => q.touristSpotId === spot.touristSpotId);
          
          return (
            <TouristSpotMarker
              key={spot.touristSpotId}
              spot={spot}
              quests={spotQuests}
              isSelected={spot.touristSpotId === selectedSpotId}
              onClick={() => selectSpot(spot.touristSpotId)}
            />
          );
        })}
      </MapContainer>
      
      {selectedSpot && (
        <SpotDetailSidebar
          spot={selectedSpot}
          quests={routeQuests?.filter(q => q.touristSpotId === selectedSpotId)}
          onClose={() => selectSpot(null)}
        />
      )}
    </div>
  );
}
```

---

## 🚨 **Error Handling Patterns**

### Hook-Level Error Handling

```typescript
function useQuestsWithErrorHandling(filters?: QuestFilters) {
  const { data, error, isLoading, mutate } = useQuests(filters);
  const [retryCount, setRetryCount] = useState(0);
  
  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    mutate();
  }, [mutate]);
  
  const shouldShowError = error && retryCount < 3;
  const shouldShowRetry = error && retryCount >= 3;
  
  return {
    data,
    error,
    isLoading,
    retry,
    shouldShowError,
    shouldShowRetry
  };
}
```

### Component-Level Error Boundaries

```typescript
function QuestListWithErrorBoundary() {
  return (
    <ErrorBoundary
      fallback={<QuestListError />}
      onError={(error, errorInfo) => {
        console.error('Quest list error:', error, errorInfo);
      }}
    >
      <QuestList />
    </ErrorBoundary>
  );
}
```

---

## ⚡ **Performance Patterns**

### Memoized Hook Results

```typescript
function useOptimizedQuests(filters: QuestFilters) {
  const { data, error, isLoading, mutate } = useQuests(filters);
  
  // Memoize processed data
  const processedQuests = useMemo(() => {
    if (!data?.quests) return [];
    
    return data.quests.map(quest => ({
      ...quest,
      formattedDate: formatDate(quest.createdAt),
      isCompleted: quest.status === 'COMPLETED'
    }));
  }, [data?.quests]);
  
  return {
    quests: processedQuests,
    total: data?.total,
    error,
    isLoading,
    mutate
  };
}
```

### Conditional Hook Loading

```typescript
function useConditionalData(shouldLoad: boolean, params: any) {
  const { data, error, isLoading } = useQuests(shouldLoad ? params : null);
  
  return {
    data: shouldLoad ? data : null,
    error: shouldLoad ? error : null,
    isLoading: shouldLoad ? isLoading : false
  };
}
```

---

## 🧪 **Testing Hook Examples**

### Testing API Hooks

```typescript
// useModelRoutes.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useModelRoutes } from '../useModelRoutes';

describe('useModelRoutes', () => {
  it('fetches model routes successfully', async () => {
    const { result } = renderHook(() => useModelRoutes());
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
  
  it('handles errors correctly', async () => {
    const { result } = renderHook(() => useModelRoutes());
    
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
```

### Testing Business Hooks

```typescript
// useTouristSpotSelection.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTouristSpotSelection } from '../useTouristSpotSelection';

const mockSpots = [
  { touristSpotId: '1', spotName: 'Spot 1' },
  { touristSpotId: '2', spotName: 'Spot 2' }
];

describe('useTouristSpotSelection', () => {
  it('manages spot selection correctly', () => {
    const { result } = renderHook(() => useTouristSpotSelection(mockSpots));
    
    expect(result.current.selectedSpotId).toBeNull();
    
    act(() => {
      result.current.selectSpot('1');
    });
    
    expect(result.current.selectedSpotId).toBe('1');
    expect(result.current.selectedSpot?.spotName).toBe('Spot 1');
  });
});
```

---

## 📋 **Best Practices Checklist**

### ✅ Do's

- **Use the `use*` naming convention** for all custom hooks
- **Implement proper loading states** for all async operations
- **Handle errors gracefully** with user-friendly messages
- **Use conditional fetching** to avoid unnecessary API calls
- **Memoize expensive computations** in custom hooks
- **Follow the three-layer pattern** for all API communication
- **Use TypeScript interfaces** for all hook return types
- **Test hooks in isolation** with proper mock data

### ❌ Don'ts

- **Never use the deprecated `get*` pattern** for hooks
- **Don't call hooks conditionally** (violates Rules of Hooks)
- **Don't store server data in Redux** (use SWR instead)
- **Don't make direct API calls** from components
- **Don't forget to handle loading and error states**
- **Don't expose API keys** in client-side code
- **Don't create hooks without proper TypeScript types**
- **Don't skip testing for complex business logic hooks**

---

## 📚 **Hook Index**

### API Hooks

#### **Core Data Hooks**
- `useModelRoutes()` - Fetch all model routes
- `useModelRouteById(id)` - Fetch specific route  
- `useQuests(filters?)` - Fetch quests with optional filters
- `useQuestById(id)` - Fetch specific quest
- `useCheckins(query?)` - Fetch user checkins/travel logs with filtering
- `useSagas()` - Fetch all story sagas
- `useSagaById(id)` - Fetch specific saga
- `useStoryCompletion()` - Complete story chapters and handle quest unlocks
- `usePassport()` - Fetch user's digital passport data with achievements and travel history
- `useLocationInfo(query)` - Search locations with Google Places integration
- `useHomepageHighlights()` - Fetch homepage highlights and featured content
- `useMoments()` - Fetch latest traveler moments and social content

#### **Admin SWR Hooks**
- `useAdminUsers(filters?)` - Fetch all users with admin filtering and pagination
- `useAdminSubmissions(filters?)` - Fetch user submissions for review and approval

#### **Admin CRUD Hooks** ✅ **All Working**
- `useCreateStory(onSuccess?)` - Create new story/saga
- `useUpdateStory(onSuccess?)` - Update existing story/saga
- `useDeleteStory(onSuccess?)` - Delete story/saga
- `useCreateStoryChapter(storyId, onSuccess?)` - Create new story chapter
- `useUpdateStoryChapter(onSuccess?)` - Update existing story chapter
- `useDeleteStoryChapter(onSuccess?)` - Delete story chapter
- `useCreateQuest(onSuccess?)` - Create new quest
- `useUpdateQuest(onSuccess?)` - Update existing quest
- `useDeleteQuest(onSuccess?)` - Delete quest
- `useCreateQuestTask(onSuccess?)` - Create new quest task
- `useUpdateQuestTask(onSuccess?)` - Update existing quest task
- `useDeleteQuestTask(onSuccess?)` - Delete quest task
- `useCreateModelRoute(onSuccess?)` - Create new model route
- `useUpdateModelRoute(onSuccess?)` - Update existing model route
- `useDeleteModelRoute(onSuccess?)` - Delete model route
- `useCreateTouristSpot(onSuccess?)` - Create new tourist spot
- `useUpdateTouristSpot(onSuccess?)` - Update existing tourist spot
- `useDeleteTouristSpot(onSuccess?)` - Delete tourist spot

#### **Admin Name Resolution Hooks** ✅ **NEW**
- `useQuestName(questId)` - Resolve quest ID to human-readable name
- `useTouristSpotName(spotId)` - Resolve tourist spot ID to name
- `useStoryChapterName(chapterId)` - Resolve story chapter ID to name
- `useTaskName(taskId, action?)` - Resolve task ID to name with action context
- `useNameResolution(questIds, spotIds, chapterIds)` - Batch resolve multiple IDs

### Business Logic Hooks
- `useTouristSpotSelection(spots)` - Manage spot selection state
- `useSpotImage(spot)` - Handle spot image URLs with fallback logic
- `useQuestUnlock()` - Manage quest unlock modal state and navigation
- `useVideoCompletion(onComplete?)` - YouTube video completion detection with progress tracking

### Map Hooks
- `useLeafletLoader()` - Dynamic Leaflet loading with proper cleanup
- `useMapInitialization(options)` - Initialize Leaflet maps with spot fitting

### UI Hooks
- `useResponsiveDetection()` - Responsive breakpoint detection
- `useImageGallery(images)` - Image gallery management with navigation
- `useIntersectionObserver(options)` - Visibility detection for lazy loading and infinite scroll

---

*Last Updated: June 23, 2025 - Admin CRUD Hooks & Name Resolution Edition*