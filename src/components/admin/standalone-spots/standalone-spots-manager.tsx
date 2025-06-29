"use client";

import { useState, useMemo } from "react";
import type { TouristSpotCreateRequestDto } from "@/api/generated";
import { 
	useAllTouristSpots, 
	useCreateStandaloneTouristSpot,
	useTouristSpotRoutes,
	useModelRoutes 
} from "@/hooks/api";
import StandaloneSpotCreateModal from "./standalone-spot-create-modal";

export default function StandaloneSpotsManager() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
	
	// Form state
	const [form, setForm] = useState<TouristSpotCreateRequestDto>({
		touristSpotName: "",
		touristSpotDesc: "",
		bestVisitTime: "",
		touristSpotHashtag: [],
		address: "",
		storyChapterId: undefined,
		imageSet: { main: "", small: [] },
	});
	const [hashtagText, setHashtagText] = useState("");
	const [smallImagesText, setSmallImagesText] = useState("");

	// Data hooks
	const { data: allSpots, isLoading, mutate } = useAllTouristSpots();
	const { data: modelRoutes } = useModelRoutes();
	const { data: spotRoutes } = useTouristSpotRoutes(selectedSpotId || undefined);

	// Create mutation with improved error handling
	const createSpot = useCreateStandaloneTouristSpot(
		(data) => {
			// Success callback
			setIsCreateModalOpen(false);
			resetForm();
			mutate(); // Refresh the list
			
			// Show success message
			alert(`Successfully created tourist spot: ${data.touristSpotName}`);
		},
		(error) => {
			// Error callback with detailed error message
			const errorMessage = error.message || "Failed to create standalone tourist spot";
			alert(`Error: ${errorMessage}`);
		}
	);

	// Filter spots based on search
	const filteredSpots = useMemo(() => {
		if (!allSpots || !searchTerm.trim()) return allSpots || [];
		
		const term = searchTerm.toLowerCase();
		return allSpots.filter(spot => 
			spot.touristSpotName?.toLowerCase().includes(term) ||
			spot.address?.toLowerCase().includes(term) ||
			spot.touristSpotHashtag?.some(tag => tag.toLowerCase().includes(term))
		);
	}, [allSpots, searchTerm]);

	// Get route count for each spot
	const getRouteCount = (spotId: string) => {
		if (!modelRoutes) return 0;
		return modelRoutes.filter(route => 
			route.touristSpotList?.some(spot => spot.touristSpotId === spotId)
		).length;
	};

	const resetForm = () => {
		setForm({
			touristSpotName: "",
			touristSpotDesc: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
			address: "",
			storyChapterId: undefined,
			imageSet: { main: "", small: [] },
		});
		setHashtagText("");
		setSmallImagesText("");
	};

	const handleFormChange = (updates: Partial<TouristSpotCreateRequestDto>) => {
		setForm(prev => ({ ...prev, ...updates }));
	};

	const handleSubmit = () => {
		// Process hashtags and small images
		const hashtags = hashtagText
			.split(",")
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0);

		const smallImages = smallImagesText
			.split(",")
			.map(url => url.trim())
			.filter(url => url.length > 0);

		const finalForm = {
			...form,
			touristSpotHashtag: hashtags,
			imageSet: {
				main: form.imageSet?.main || "",
				small: smallImages,
			},
		};

		createSpot.trigger(finalForm);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-charcoal">Standalone Tourist Spots</h1>
					<p className="text-warmGrey3 mt-1">
						Manage tourist spots independently of routes. Spots can be added to multiple routes later.
					</p>
				</div>
				<button
					onClick={() => setIsCreateModalOpen(true)}
					className="rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90"
				>
					+ Create Standalone Spot
				</button>
			</div>

			{/* Info Banner */}
			<div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
				<h3 className="font-semibold text-charcoal mb-2">✅ Standalone Tourist Spots</h3>
				<p className="text-sm text-charcoal text-opacity-80">
					Create tourist spots independently of routes using the new standalone API. 
					These spots can be added to multiple routes and exist as standalone entities in the system.
					Use the Route Matching tab to assign spots to routes as needed.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white rounded-lg border border-warmGrey2 p-4">
					<h3 className="text-lg font-semibold text-charcoal">Total Spots</h3>
					<p className="text-2xl font-bold text-red">{allSpots?.length || 0}</p>
				</div>
				<div className="bg-white rounded-lg border border-warmGrey2 p-4">
					<h3 className="text-lg font-semibold text-charcoal">In Multiple Routes</h3>
					<p className="text-2xl font-bold text-red">
						{allSpots?.filter(spot => getRouteCount(spot.touristSpotId) > 1).length || 0}
					</p>
				</div>
				<div className="bg-white rounded-lg border border-warmGrey2 p-4">
					<h3 className="text-lg font-semibold text-charcoal">Unassigned</h3>
					<p className="text-2xl font-bold text-mustard">
						{allSpots?.filter(spot => getRouteCount(spot.touristSpotId) === 0).length || 0}
					</p>
				</div>
			</div>

			{/* Search */}
			<div className="bg-white rounded-lg border border-warmGrey2 p-4">
				<input
					type="text"
					placeholder="Search spots by name, address, or hashtags..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
				/>
			</div>

			{/* Spots Table */}
			<div className="bg-white rounded-lg border border-warmGrey2 overflow-hidden">
				{isLoading ? (
					<div className="p-8 text-center text-warmGrey3">Loading spots...</div>
				) : filteredSpots.length === 0 ? (
					<div className="p-8 text-center text-warmGrey3">
						{searchTerm ? "No spots match your search" : "No standalone spots yet"}
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-warmGrey bg-opacity-50">
								<tr>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Name</th>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Address</th>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Routes</th>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Hashtags</th>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Story Link</th>
									<th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredSpots.map((spot) => {
									const routeCount = getRouteCount(spot.touristSpotId);
									return (
										<tr key={spot.touristSpotId} className="hover:bg-warmGrey hover:bg-opacity-25">
											<td className="px-4 py-3">
												<div className="font-medium text-charcoal">{spot.touristSpotName}</div>
												<div className="text-sm text-warmGrey3 line-clamp-2">{spot.touristSpotDesc}</div>
											</td>
											<td className="px-4 py-3 text-sm text-warmGrey3">{spot.address}</td>
											<td className="px-4 py-3">
												<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
													routeCount > 0 
														? 'bg-red bg-opacity-10 text-red' 
														: 'bg-mustard bg-opacity-10 text-mustard'
												}`}>
													{routeCount} route{routeCount !== 1 ? 's' : ''}
												</span>
											</td>
											<td className="px-4 py-3">
												<div className="flex flex-wrap gap-1">
													{spot.touristSpotHashtag?.slice(0, 3).map((tag, index) => (
														<span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-warmGrey2 text-charcoal">
															{tag}
														</span>
													))}
													{(spot.touristSpotHashtag?.length || 0) > 3 && (
														<span className="text-xs text-warmGrey3">
															+{(spot.touristSpotHashtag?.length || 0) - 3} more
														</span>
													)}
												</div>
											</td>
											<td className="px-4 py-3">
												{spot.storyChapterId ? (
													<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-charcoal bg-opacity-10 text-charcoal">
														Linked
													</span>
												) : (
													<span className="text-xs text-warmGrey3">None</span>
												)}
											</td>
											<td className="px-4 py-3">
												<button
													onClick={() => setSelectedSpotId(
														selectedSpotId === spot.touristSpotId ? null : spot.touristSpotId
													)}
													className="text-red hover:text-red-600 text-sm font-medium"
												>
													{selectedSpotId === spot.touristSpotId ? 'Hide Routes' : 'View Routes'}
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Route Details Panel */}
			{selectedSpotId && spotRoutes && (
				<div className="bg-white rounded-lg border border-warmGrey2 p-6">
					<h3 className="text-lg font-semibold text-charcoal mb-4">
						Routes containing this spot ({spotRoutes.length})
					</h3>
					{spotRoutes.length === 0 ? (
						<p className="text-warmGrey3">This spot is not included in any routes yet.</p>
					) : (
						<div className="space-y-3">
							{spotRoutes.map((route) => (
								<div key={route.modelRouteId} className="border border-warmGrey2 rounded-lg p-4">
									<h4 className="font-medium text-charcoal">{route.routeName}</h4>
									<p className="text-sm text-warmGrey3">{route.region}</p>
									<p className="text-sm text-warmGrey3 mt-1">{route.touristSpotList?.length} spots total</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Create Modal */}
			<StandaloneSpotCreateModal
				isOpen={isCreateModalOpen}
				onClose={() => {
					setIsCreateModalOpen(false);
					resetForm();
				}}
				form={form}
				onFormChange={handleFormChange}
				hashtagText={hashtagText}
				onHashtagTextChange={setHashtagText}
				smallImagesText={smallImagesText}
				onSmallImagesTextChange={setSmallImagesText}
				onSubmit={handleSubmit}
				isSubmitting={createSpot.isMutating}
			/>
		</div>
	);
}