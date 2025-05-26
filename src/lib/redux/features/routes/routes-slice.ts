import { ModelRouteResponseDto } from "@/api/generated";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface RoutesState {
    routes: ModelRouteResponseDto[];
    selectedRoute: ModelRouteResponseDto | null;
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
            state.routes = Array.isArray(state.routes) ? state.routes.map((route) => ({ ...route, isSelected: route.modelRouteId === action.payload })) : [];
            state.selectedRoute = Array.isArray(state.routes) ? state.routes.find((route) => route.modelRouteId === action.payload) || null : null;
        },
        setRoutes: (state, action: PayloadAction<ModelRouteResponseDto[]>) => {
            state.routes = action.payload;
            const currentSelectedId = state.selectedRoute?.modelRouteId;
            state.selectedRoute = state.routes.find((r) => r.modelRouteId === currentSelectedId) || state.routes[0] || null;

            state.routes = state.routes.map((route) => ({
                ...route,
                isSelected: route.modelRouteId === state.selectedRoute?.modelRouteId,
            }));
        },
    },
});

export const { setSelectedRoute, setRoutes } = routesSlice.actions;

const selectRoutesState = (state: RootState) => state.routes;

/**
 * Selector to get the routes and selected route data.
 * @param state - The root state.
 * @returns The routes and selected route data.
 */
export const selectRoutes = createSelector(
    [selectRoutesState],
    (routesState) => ({
        routes: routesState.routes,
        selectedRoute: routesState.selectedRoute,
        selectionData: Array.isArray(routesState.routes) ? routesState.routes.map((route) => ({
            title: route.region,
            selectedRouteId: route.modelRouteId,
            isSelected: route.modelRouteId === routesState.selectedRoute?.modelRouteId,
        })) : [],
    }),
);

export default routesSlice.reducer;
