# 🎯 Hook Usage Examples

This document provides practical examples of how to use the standardized hooks in your components.

## 📚 API Hooks

### Basic Model Route Fetching
```typescript
import { useModelRoutes, useModelRouteById } from '@/hooks';

function RouteList() {
  // Fetch all routes
  const { data: routes, isLoading, isError, error } = useModelRoutes();
  
  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;
  
  return (
    <div>
      {routes?.map(route => (
        <RouteCard key={route.modelRouteId} route={route} />
      ))}
    </div>
  );
}

function RouteDetail({ routeId }: { routeId: string }) {
  // Fetch specific route with legacy compatibility
  const { 
    modelRoute,     // Legacy property name
    data,           // Standardized property name
    isLoading, 
    isError,
    mutate 
  } = useModelRouteById(routeId);
  
  return (
    <div>
      <h1>{modelRoute?.routeName}</h1>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

### Location Information with Options
```typescript
import { useLocationInfo } from '@/hooks';

function LocationDetails({ spot }: { spot: TouristSpotResponseDto }) {
  const { 
    data: locationInfo,
    isLoading,
    hasLocationInfo,
    isValidQuery 
  } = useLocationInfo({
    query: spot.touristSpotName,
    latitude: spot.touristSpotLatitude.toString(),
    longitude: spot.touristSpotLongitude.toString(),
    address: spot.address,
    enabled: true, // Control when API calls are made
  });
  
  if (!isValidQuery) return <div>Invalid location query</div>;
  if (isLoading) return <div>Loading location info...</div>;
  
  return (
    <div>
      {hasLocationInfo && (
        <div>
          <h3>{locationInfo?.name}</h3>
          <p>{locationInfo?.description}</p>
        </div>
      )}
    </div>
  );
}
```

## 🎨 UI Hooks

### Responsive Detection
```typescript
import { useResponsiveDetection } from '@/hooks';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop, isMobileTablet, isInitialized } = useResponsiveDetection();
  
  // Prevent hydration mismatch
  if (!isInitialized) return <div>Loading...</div>;
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
      {isMobileTablet && <MobileTabletSharedFeature />}
    </div>
  );
}
```

### Intersection Observer for Lazy Loading
```typescript
import { useIntersectionObserver } from '@/hooks';

function LazyLoadedComponent() {
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    rootMargin: '100px',
    threshold: 0.1,
    freezeOnceVisible: true, // Stop observing once visible
  });
  
  return (
    <div ref={elementRef}>
      {hasIntersected ? (
        <ExpensiveComponent />
      ) : (
        <PlaceholderComponent />
      )}
    </div>
  );
}
```

### Image Gallery Management
```typescript
import { useImageGallery } from '@/hooks';

function ImageCarousel({ images }: { images: Array<{ url: string }> }) {
  const {
    currentImageIndex,
    currentImage,
    hasMultipleImages,
    goToNext,
    goToPrevious,
    goToImage,
    totalImages,
  } = useImageGallery({ images });
  
  return (
    <div>
      <img src={currentImage?.url} alt="Gallery" />
      
      {hasMultipleImages && (
        <div>
          <button onClick={goToPrevious}>Previous</button>
          <span>{currentImageIndex + 1} of {totalImages}</span>
          <button onClick={goToNext}>Next</button>
        </div>
      )}
      
      {/* Thumbnail navigation */}
      <div>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={index === currentImageIndex ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## 🗺️ Map Hooks

### Map Initialization
```typescript
import { useMapInitialization } from '@/hooks';

function MapComponent({ touristSpots }: { touristSpots: TouristSpotResponseDto[] }) {
  const { map, isMapReady, handleMapReady } = useMapInitialization(touristSpots);
  
  return (
    <div>
      <LeafletMapView onMapReady={handleMapReady}>
        {isMapReady && (
          <TouristSpotMarkers 
            touristSpots={touristSpots}
            map={map}
          />
        )}
      </LeafletMapView>
    </div>
  );
}
```

### Leaflet Dynamic Loading
```typescript
import { useLeafletLoader } from '@/hooks';

function MapWrapper() {
  const { leaflet, isLoaded, error } = useLeafletLoader();
  
  if (error) return <div>Failed to load map</div>;
  if (!isLoaded) return <div>Loading map...</div>;
  
  // Now you can safely use leaflet
  return <MapComponent leaflet={leaflet} />;
}
```

## 🏢 Business Logic Hooks

### Tourist Spot Selection
```typescript
import { useTouristSpotSelection } from '@/hooks';

function InteractiveMap({ touristSpots }: { touristSpots: TouristSpotResponseDto[] }) {
  const {
    selectedTouristSpotId,
    setSelectedTouristSpotId,
    selectedSpot,
    displayedSelectedSpot,
    selectFirstSpot,
  } = useTouristSpotSelection(touristSpots);
  
  return (
    <div>
      <button onClick={selectFirstSpot}>Select First Spot</button>
      
      <MapView
        spots={touristSpots}
        selectedSpotId={selectedTouristSpotId}
        onSpotSelect={setSelectedTouristSpotId}
      />
      
      {displayedSelectedSpot && (
        <SpotInfoPanel spot={displayedSelectedSpot} />
      )}
    </div>
  );
}
```

### Smart Image Loading
```typescript
import { useSpotImage } from '@/hooks';

function TouristSpotCard({ spot, visible }: { 
  spot: TouristSpotResponseDto; 
  visible: boolean; 
}) {
  const { imageUrl, usingGoogleImage, isLoading, hasValidImage } = useSpotImage(
    spot, 
    visible // Only load when visible
  );
  
  return (
    <div>
      {isLoading ? (
        <div>Loading image...</div>
      ) : hasValidImage ? (
        <img 
          src={imageUrl!} 
          alt={spot.touristSpotName}
          // Google images need unoptimized flag
          {...(usingGoogleImage && { unoptimized: true })}
        />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
}
```

## 🔄 Migration Examples

### Before: Old Pattern
```typescript
// ❌ Old embedded hook pattern
const MyComponent = () => {
  const useMyCustomHook = () => {
    // Hook logic embedded in component
    const [state, setState] = useState();
    // ... logic
    return { state, setState };
  };
  
  const { state } = useMyCustomHook();
  // ... component logic
};
```

### After: Standardized Pattern
```typescript
// ✅ New extracted hook pattern
// In src/hooks/ui/useMyCustomHook.ts
export const useMyCustomHook = () => {
  const [state, setState] = useState();
  // ... logic
  return { state, setState };
};

// In component
import { useMyCustomHook } from '@/hooks';

const MyComponent = () => {
  const { state } = useMyCustomHook();
  // ... component logic
};
```

## 💡 Best Practices

### 1. Always Use TypeScript
```typescript
// Define clear interfaces for hook options
interface UseMyHookOptions {
  enabled?: boolean;
  refreshInterval?: number;
}

export const useMyHook = (options: UseMyHookOptions) => {
  // Implementation
};
```

### 2. Provide Legacy Compatibility
```typescript
export const useModelRoutes = () => {
  const { data, isLoading, error } = useProxySWR(...);
  
  return {
    // Standardized properties
    data,
    isLoading,
    error,
    // Legacy compatibility
    modelRoutes: data,
    isLoadingModelRoutes: isLoading,
  };
};
```

### 3. Handle Edge Cases
```typescript
export const useConditionalData = (enabled: boolean) => {
  const { data, error, isLoading } = useProxySWR(
    enabled ? '/api/endpoint' : null // Conditional fetching
  );
  
  return {
    data: enabled ? data : undefined,
    isLoading: enabled ? isLoading : false,
    // ... other properties
  };
};
```

### 4. Clean Imports
```typescript
// ✅ Use main index for clean imports
import { 
  useModelRoutes, 
  useResponsiveDetection, 
  useMapInitialization 
} from '@/hooks';

// ❌ Avoid direct path imports
import { useModelRoutes } from '@/hooks/api/useModelRoutes';
```

This standardized approach ensures consistency across your entire application while maintaining backward compatibility during migration.