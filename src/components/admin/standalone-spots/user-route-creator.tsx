"use client";

import { useState, useMemo } from "react";
import { 
	useAllTouristSpots, 
	useCreateUserTouristRoute,
	useModelRoutes 
} from "@/hooks/api";

interface UserRouteCreatorProps {
	onUpdate?: () => void;
}

export default function UserRouteCreator({ onUpdate }: UserRouteCreatorProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
	const [routeName, setRouteName] = useState("");
	const [regionDesc, setRegionDesc] = useState("");
	const [recommendations, setRecommendations] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");

	// Mock user ID for now - in real app this would come from auth
	const userId = "admin-user";

	// Data hooks
	const { data: allSpots, isLoading: spotsLoading } = useAllTouristSpots();
	const { mutate: mutateRoutes } = useModelRoutes();

	// Create route mutation
	const createRoute = useCreateUserTouristRoute(
		userId,
		(data) => {
			// Success callback
			setIsModalOpen(false);
			resetForm();
			mutateRoutes();
			onUpdate?.();
			alert(`Successfully created route: ${data.routeName}`);
		},
		(error) => {
			// Error callback
			const errorMessage = error.message || "Failed to create user tourist route";
			alert(`Error: ${errorMessage}`);
		}
	);

	// Filter available spots
	const filteredSpots = useMemo(() => {
		if (!allSpots || !searchTerm.trim()) return allSpots || [];
		
		const term = searchTerm.toLowerCase();
		return allSpots.filter(spot => 
			spot.touristSpotName?.toLowerCase().includes(term) ||
			spot.address?.toLowerCase().includes(term) ||
			spot.touristSpotHashtag?.some(tag => tag.toLowerCase().includes(term))
		);
	}, [allSpots, searchTerm]);

	const resetForm = () => {
		setSelectedSpots([]);
		setRouteName("");
		setRegionDesc("");
		setRecommendations("");
		setSearchTerm("");
	};

	const handleSpotToggle = (spotId: string) => {
		setSelectedSpots(prev => 
			prev.includes(spotId)
				? prev.filter(id => id !== spotId)
				: [...prev, spotId]
		);
	};

	const handleSubmit = () => {
		if (!routeName.trim() || !regionDesc.trim() || selectedSpots.length === 0) {
			alert("Please fill in all required fields and select at least one tourist spot.");
			return;
		}

		const recommendationsList = recommendations
			.split(",")
			.map(rec => rec.trim())
			.filter(rec => rec.length > 0);

		if (recommendationsList.length === 0) {
			alert("Please provide at least one recommendation.");
			return;
		}

		createRoute.trigger({
			routeName: routeName.trim(),
			regionDesc: regionDesc.trim(),
			recommendations: recommendationsList,
			touristSpotIds: selectedSpots
		});
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold text-charcoal">User Route Creator</h2>
					<p className="text-warmGrey3 mt-1">
						Create custom routes by combining existing tourist spots.
					</p>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					+ Create User Route
				</button>
			</div>

			{/* Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white rounded-lg border border-warmGrey2 p-4">
					<h3 className="text-lg font-semibold text-charcoal">Available Spots</h3>
					<p className="text-2xl font-bold text-blue-600">{allSpots?.length || 0}</p>
				</div>
				<div className="bg-white rounded-lg border border-warmGrey2 p-4">
					<h3 className="text-lg font-semibold text-charcoal">Selected Spots</h3>
					<p className="text-2xl font-bold text-green-600">{selectedSpots.length}</p>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-2xl font-bold text-charcoal">Create User Tourist Route</h2>
							<button
								type="button"
								onClick={() => {
									setIsModalOpen(false);
									resetForm();
								}}
								className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
							>
								✕
							</button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Route Information */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-charcoal">Route Information</h3>
								
								<div>
									<label className="block text-sm font-medium text-charcoal mb-2">
										Route Name *
									</label>
									<input
										type="text"
										value={routeName}
										onChange={(e) => setRouteName(e.target.value)}
										className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-blue-600 focus:outline-none"
										placeholder="Enter route name (1-100 characters)"
										maxLength={100}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-charcoal mb-2">
										Description *
									</label>
									<textarea
										value={regionDesc}
										onChange={(e) => setRegionDesc(e.target.value)}
										rows={4}
										className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-blue-600 focus:outline-none"
										placeholder="Describe this route (1-500 characters)"
										maxLength={500}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-charcoal mb-2">
										Recommendations * (comma-separated)
									</label>
									<textarea
										value={recommendations}
										onChange={(e) => setRecommendations(e.target.value)}
										rows={3}
										className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-blue-600 focus:outline-none"
										placeholder="e.g., Best for families, Morning visit recommended, Bring camera"
									/>
									<p className="mt-1 text-xs text-warmGrey3">
										Provide 1-10 recommendations, separated by commas
									</p>
								</div>
							</div>

							{/* Tourist Spot Selection */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold text-charcoal">
										Select Tourist Spots ({selectedSpots.length}/20)
									</h3>
								</div>

								<input
									type="text"
									placeholder="Search tourist spots..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-blue-600 focus:outline-none"
								/>

								<div className="max-h-96 overflow-y-auto space-y-2">
									{spotsLoading ? (
										<p className="text-warmGrey3 text-center py-4">Loading spots...</p>
									) : filteredSpots.length === 0 ? (
										<p className="text-warmGrey3 text-center py-4">No spots found</p>
									) : (
										filteredSpots.map((spot) => (
											<div 
												key={spot.touristSpotId} 
												className={`border rounded-lg p-3 cursor-pointer transition-colors ${
													selectedSpots.includes(spot.touristSpotId)
														? 'border-blue-600 bg-blue-50'
														: 'border-warmGrey2 hover:bg-warmGrey'
												}`}
												onClick={() => handleSpotToggle(spot.touristSpotId)}
											>
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
													<div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
														selectedSpots.includes(spot.touristSpotId)
															? 'bg-blue-600 border-blue-600'
															: 'border-warmGrey2'
													}`}>
														{selectedSpots.includes(spot.touristSpotId) && (
															<span className="text-white text-xs">✓</span>
														)}
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 flex justify-end gap-4">
							<button
								type="button"
								onClick={() => {
									setIsModalOpen(false);
									resetForm();
								}}
								className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
								disabled={createRoute.isMutating}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSubmit}
								disabled={createRoute.isMutating || selectedSpots.length === 0 || !routeName.trim() || !regionDesc.trim()}
								className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{createRoute.isMutating ? "Creating..." : "Create Route"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}