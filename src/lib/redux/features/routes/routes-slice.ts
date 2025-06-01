import { ModelRouteResponseDto } from "@/api/generated";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Create a serializable type that extends the API response
interface SerializableRoute extends Omit<ModelRouteResponseDto, 'isSelected'> {
    isSelected?: boolean;
}

interface RoutesState {
    routes: SerializableRoute[];
    selectedRoute: SerializableRoute | null;
}

const initialState: RoutesState = {
    routes: [],
    selectedRoute: null,
};

/**
 * Slice for managing routes state.
 */
const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            state.routes = Array.isArray(state.routes) 
                ? state.routes.map((route) => ({
                    ...route,
                    isSelected: route.modelRouteId === action.payload
                })) 
                : [];
            state.selectedRoute = Array.isArray(state.routes) 
                ? state.routes.find((route) => route.modelRouteId === action.payload) || null 
                : null;
        },
        setSelectedRouteByRegion: (state, action: PayloadAction<string>) => {
            state.routes = Array.isArray(state.routes) 
                ? state.routes.map((route) => ({
                    ...route,
                    isSelected: route.region === action.payload
                })) 
                : [];
            state.selectedRoute = Array.isArray(state.routes) 
                ? state.routes.find((route) => route.region === action.payload) || null 
                : null;
        },
        setRoutes: (state, action: PayloadAction<ModelRouteResponseDto[]>) => {
            // Create serializable copies of the API response objects
            const serializedRoutes: SerializableRoute[] = action.payload.map(route => ({
                ...route,
                isSelected: false
            }));
            
            state.routes = serializedRoutes;
            const currentSelectedId = state.selectedRoute?.modelRouteId;
            state.selectedRoute = state.routes.find((r) => r.modelRouteId === currentSelectedId) || state.routes[0] || null;

            // Update the selected state
            state.routes = state.routes.map((route) => ({
                ...route,
                isSelected: route.modelRouteId === state.selectedRoute?.modelRouteId,
            }));
        },
    },
});

export const { setSelectedRoute, setSelectedRouteByRegion, setRoutes } = routesSlice.actions;

const selectRoutesState = (state: RootState) => state.routes;

/**
 * Selector to get the routes and selected route data.
 * @param state - The root state.
 * @returns The routes and selected route data.
 */
export const selectRoutes = createSelector(
    [selectRoutesState],
    (routeState) => {
        // Group routes by unique regions and create selection data
        const uniqueRegions = new Map<string, {
            region: string;
            temperatureCelsius: number | undefined;
            weatherName: string | undefined;
            routeCount: number;
            isSelected: boolean;
        }>();

        if (Array.isArray(routeState.routes)) {
            routeState.routes.forEach((route) => {
                if (route.region) {
                    const existing = uniqueRegions.get(route.region);
                    if (existing) {
                        // Increment count for existing region
                        existing.routeCount += 1;
                        // Update selection status if any route in this region is selected
                        if (route.region === routeState.selectedRoute?.region) {
                            existing.isSelected = true;
                        }
                    } else {
                        // Create new entry for this region
                        uniqueRegions.set(route.region, {
                            region: route.region,
                            temperatureCelsius: route.regionWeatherInfo?.temperatureCelsius,
                            weatherName: route.regionWeatherInfo?.weatherName,
                            routeCount: 1,
                            isSelected: route.region === routeState.selectedRoute?.region,
                        });
                    }
                }
            });
        }

        return {
            routes: routeState.routes,
            selectedRoute: routeState.selectedRoute,
            selectionData: Array.from(uniqueRegions.values()),
        };
    },
);

export default routesSlice.reducer;
