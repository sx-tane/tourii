import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

/**
 * ✅ PROPER REDUX USAGE: Only store UI state, not server data
 * 
 * This slice only manages:
 * - Selected route ID (UI state)
 * - Selected region (UI state)
 * 
 * Server data (routes) comes from SWR hooks, not Redux!
 */
interface RoutesUIState {
    selectedRouteId: string | null;
    selectedRegion: string | null;
}

const initialState: RoutesUIState = {
    selectedRouteId: null,
    selectedRegion: null,
};

const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            state.selectedRouteId = action.payload;
        },
        setSelectedRouteByRegion: (state, action: PayloadAction<string>) => {
            state.selectedRegion = action.payload;
            // Clear specific route selection when selecting by region
            state.selectedRouteId = null;
        },
        clearRouteSelection: (state) => {
            state.selectedRouteId = null;
            state.selectedRegion = null;
        },
    },
});

export const { 
    setSelectedRoute, 
    setSelectedRouteByRegion, 
    clearRouteSelection 
} = routesSlice.actions;

// Simple selectors for UI state only
export const selectSelectedRouteId = (state: RootState) => state.routes.selectedRouteId;
export const selectSelectedRegion = (state: RootState) => state.routes.selectedRegion;

// Memoized selector for backward compatibility
export const selectRoutes = createSelector(
    [selectSelectedRouteId, selectSelectedRegion],
    (selectedRouteId, selectedRegion) => ({
        selectedRouteId,
        selectedRegion,
    })
);

export default routesSlice.reducer;