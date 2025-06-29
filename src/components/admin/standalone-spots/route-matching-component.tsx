"use client";

import { useState, useMemo } from "react";
import type { TouristSpotResponseDto, ModelRouteResponseDto } from "@/api/generated";
import { 
	useAllTouristSpots, 
	useModelRoutes,
	useAddSpotToRoute,
	useRemoveSpotFromRoute 
} from "@/hooks/api";

interface RouteMatchingComponentProps {
	onUpdate?: () => void;
}

export default function RouteMatchingComponent({ onUpdate }: RouteMatchingComponentProps) {
	const [selectedRouteId, setSelectedRouteId] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showOnlyUnassigned, setShowOnlyUnassigned] = useState(false);

	// Data hooks
	const { data: allSpots, mutate: mutateSpots } = useAllTouristSpots();
	const { data: modelRoutes, mutate: mutateRoutes } = useModelRoutes();

	// Mutation hooks
	const addSpotToRoute = useAddSpotToRoute(() => {
		mutateSpots();
		mutateRoutes();
		onUpdate?.();
	});

	const removeSpotFromRoute = useRemoveSpotFromRoute(() => {
		mutateSpots();
		mutateRoutes();
		onUpdate?.();
	});

	// Get the selected route
	const selectedRoute = useMemo(() => {
		return modelRoutes?.find(route => route.modelRouteId === selectedRouteId);
	}, [modelRoutes, selectedRouteId]);

	// Get spots in the selected route
	const spotsInRoute = useMemo(() => {
		return selectedRoute?.touristSpotList || [];
	}, [selectedRoute]);

	// Get available spots (not in the selected route)
	const availableSpots = useMemo(() => {
		if (!allSpots || !selectedRoute) return allSpots || [];
		
		const spotsInRouteIds = new Set(spotsInRoute.map(spot => spot.touristSpotId));
		return allSpots.filter(spot => !spotsInRouteIds.has(spot.touristSpotId));
	}, [allSpots, spotsInRoute]);

	// Filter available spots based on search and filters
	const filteredAvailableSpots = useMemo(() => {
		if (!availableSpots) return [];
		
		let filtered = availableSpots;

		// Apply search filter
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(spot => 
				spot.touristSpotName?.toLowerCase().includes(term) ||
				spot.address?.toLowerCase().includes(term) ||
				spot.touristSpotHashtag?.some(tag => tag.toLowerCase().includes(term))
			);
		}

		// Apply unassigned filter
		if (showOnlyUnassigned && modelRoutes) {
			filtered = filtered.filter(spot => {
				// Check if spot is in any route
				return !modelRoutes.some(route => 
					route.touristSpotList?.some(routeSpot => routeSpot.touristSpotId === spot.touristSpotId)
				);
			});
		}

		return filtered;
	}, [availableSpots, searchTerm, showOnlyUnassigned, modelRoutes]);

	const handleAddSpotToRoute = (spotId: string) => {
		if (!selectedRouteId) return;
		addSpotToRoute.trigger({ routeId: selectedRouteId, touristSpotId: spotId });
	};

	const handleRemoveSpotFromRoute = (spotId: string) => {
		if (!selectedRouteId) return;
		removeSpotFromRoute.trigger({ routeId: selectedRouteId, touristSpotId: spotId });
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-xl font-bold text-charcoal">Route Matching</h2>
				<p className="text-warmGrey3 mt-1">
					Add or remove tourist spots from routes. Manage which spots belong to which routes.
				</p>
			</div>

			{/* Route Selection */}
			<div className="bg-white rounded-lg border border-warmGrey2 p-4">
				<label className="block text-sm font-medium text-charcoal mb-2">
					Select Route to Manage
				</label>
				<select
					value={selectedRouteId}
					onChange={(e) => setSelectedRouteId(e.target.value)}
					className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
				>
					<option value="">Choose a route...</option>
					{modelRoutes?.map((route) => (
						<option key={route.modelRouteId} value={route.modelRouteId}>
							{route.routeName} ({route.touristSpotList?.length || 0} spots)
						</option>
					))}
				</select>
			</div>

			{selectedRoute && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Current Spots in Route */}
					<div className="bg-white rounded-lg border border-warmGrey2 p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-charcoal">
								Current Spots in Route ({spotsInRoute.length})
							</h3>
						</div>

						{spotsInRoute.length === 0 ? (
							<p className="text-warmGrey3 text-center py-8">
								No spots in this route yet
							</p>
						) : (
							<div className="space-y-3">
								{spotsInRoute.map((spot) => (
									<div key={spot.touristSpotId} className="border border-warmGrey2 rounded-lg p-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h4 className="font-medium text-charcoal">{spot.touristSpotName}</h4>
												<p className="text-sm text-warmGrey3 mt-1">{spot.address}</p>
												<div className="flex flex-wrap gap-1 mt-2">
													{spot.touristSpotHashtag?.slice(0, 3).map((tag, index) => (
														<span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-warmGrey2 text-charcoal">
															{tag}
														</span>
													))}
												</div>
											</div>
											<button
												onClick={() => handleRemoveSpotFromRoute(spot.touristSpotId)}
												disabled={removeSpotFromRoute.isMutating}
												className="ml-3 text-red hover:text-red-600 text-sm font-medium disabled:opacity-50"
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Available Spots to Add */}
					<div className="bg-white rounded-lg border border-warmGrey2 p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-charcoal">
								Available Spots ({filteredAvailableSpots.length})
							</h3>
						</div>

						{/* Filters */}
						<div className="space-y-3 mb-4">
							<input
								type="text"
								placeholder="Search available spots..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
							/>
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={showOnlyUnassigned}
									onChange={(e) => setShowOnlyUnassigned(e.target.checked)}
									className="mr-2"
								/>
								<span className="text-sm text-charcoal">Show only unassigned spots</span>
							</label>
						</div>

						{filteredAvailableSpots.length === 0 ? (
							<p className="text-warmGrey3 text-center py-8">
								{searchTerm || showOnlyUnassigned 
									? "No spots match your filters" 
									: "All spots are already in this route"
								}
							</p>
						) : (
							<div className="space-y-3 max-h-96 overflow-y-auto">
								{filteredAvailableSpots.map((spot) => (
									<div key={spot.touristSpotId} className="border border-warmGrey2 rounded-lg p-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h4 className="font-medium text-charcoal">{spot.touristSpotName}</h4>
												<p className="text-sm text-warmGrey3 mt-1">{spot.address}</p>
												<div className="flex flex-wrap gap-1 mt-2">
													{spot.touristSpotHashtag?.slice(0, 3).map((tag, index) => (
														<span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-warmGrey2 text-charcoal">
															{tag}
														</span>
													))}
												</div>
											</div>
											<button
												onClick={() => handleAddSpotToRoute(spot.touristSpotId)}
												disabled={addSpotToRoute.isMutating}
												className="ml-3 rounded-lg bg-red px-3 py-1 text-white text-sm hover:bg-opacity-90 disabled:opacity-50"
											>
												Add
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}