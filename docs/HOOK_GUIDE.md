# 🎣 Complete Hook Guide

This comprehensive guide covers everything about hooks in the Tourii frontend: patterns, migration, examples, and best practices.

---

## 🏗️ **Hook Architecture Overview**

The Tourii frontend uses a well-organized hook structure following the three-layer API pattern:

```
src/hooks/
├── api/              # Server data fetching (SWR hooks)
├── business/         # Business logic hooks  
├── map/              # Map and geolocation hooks
└── ui/               # UI interaction hooks
```

**Three-Layer Pattern**: SWR Hooks → Next.js API Routes → Generated SDK → Backend

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
- `useModelRoutes()` - Fetch all model routes
- `useModelRouteById(id)` - Fetch specific route
- `useQuests(filters?)` - Fetch quests with optional filters
- `useQuestById(id)` - Fetch specific quest
- `useSagas()` - Fetch all story sagas
- `useSagaById(id)` - Fetch specific saga
- `useLocationInfo(query)` - Search locations

### Business Logic Hooks
- `useTouristSpotSelection(spots)` - Manage spot selection
- `useSpotImage(spot)` - Handle spot image URLs

### Map Hooks
- `useLeafletLoader()` - Dynamic Leaflet loading
- `useMapInitialization(options)` - Initialize Leaflet maps

### UI Hooks
- `useResponsiveDetection()` - Responsive breakpoint detection
- `useImageGallery(images)` - Image gallery management
- `useIntersectionObserver(options)` - Visibility detection

---

*Last Updated: June 18, 2025*