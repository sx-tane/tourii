"use client";
import { useState, useCallback, useMemo } from "react";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	ModelRouteCreateRequestDto,
	ModelRouteResponseDto,
} from "@/api/generated";
import {
	Edit,
	Plus,
	Eye,
	MapPin,
	Trash2,
	Search,
	X,
	BarChart3,
} from "lucide-react";

export default function AdminModelRoutes() {
	const { modelRoutes, isLoadingModelRoutes, mutateModelRoutes } =
		getModelRoutes();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingRoute, setEditingRoute] =
		useState<ModelRouteResponseDto | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingRouteId, setDeletingRouteId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);

	const [form, setForm] = useState<ModelRouteCreateRequestDto>({
		storyId: "",
		routeName: "",
		region: "",
		regionDesc: "",
		regionBackgroundMedia: "",
		recommendation: [],
		touristSpotList: [],
	});

	// Store recommendation as string for easier editing
	const [recommendationText, setRecommendationText] = useState("");

	// Quick filters configuration
	const quickFilters = [
		{ id: "no-spots", label: "No Tourist Spots", icon: "❌" },
		{ id: "no-recommendations", label: "No Recommendations", icon: "💡" },
		{ id: "missing-media", label: "Missing Background", icon: "🖼️" },
		{ id: "no-description", label: "No Description", icon: "📝" },
		{ id: "many-spots", label: "5+ Spots", icon: "🏖️" },
		{ id: "recent", label: "Recently Updated", icon: "🕐" },
	];

	// Filtered and searched routes
	const filteredRoutes = useMemo(() => {
		if (!modelRoutes || !Array.isArray(modelRoutes)) return [];

		let filtered = [...modelRoutes];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(route) =>
					route.routeName?.toLowerCase().includes(query) ||
					route.region?.toLowerCase().includes(query) ||
					route.regionDesc?.toLowerCase().includes(query) ||
					route.storyId?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((route) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "no-spots":
							return (
								!route.touristSpotList || route.touristSpotList.length === 0
							);
						case "no-recommendations":
							return !route.recommendation || route.recommendation.length === 0;
						case "missing-media":
							return !route.regionBackgroundMedia;
						case "no-description":
							return !route.regionDesc;
						case "many-spots":
							return route.touristSpotList && route.touristSpotList.length >= 5;
						case "recent":
							// Since we don't have timestamp data, just return true for now
							return true;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [modelRoutes, searchQuery, activeFilters]);

	// Summary statistics
	const stats = useMemo(() => {
		if (!modelRoutes || !Array.isArray(modelRoutes))
			return {
				total: 0,
				withSpots: 0,
				withRecommendations: 0,
				missingMedia: 0,
				regions: 0,
				totalSpots: 0,
			};

		const regions = new Set(modelRoutes.map((r) => r.region)).size;
		const totalSpots = modelRoutes.reduce(
			(sum, r) => sum + (r.touristSpotList?.length || 0),
			0,
		);

		return {
			total: modelRoutes.length,
			withSpots: modelRoutes.filter(
				(r) => r.touristSpotList && r.touristSpotList.length > 0,
			).length,
			withRecommendations: modelRoutes.filter(
				(r) => r.recommendation && r.recommendation.length > 0,
			).length,
			missingMedia: modelRoutes.filter((r) => !r.regionBackgroundMedia).length,
			regions,
			totalSpots,
		};
	}, [modelRoutes]);

	const resetForm = useCallback(() => {
		setForm({
			storyId: "",
			routeName: "",
			region: "",
			regionDesc: "",
			regionBackgroundMedia: "",
			recommendation: [],
			touristSpotList: [],
		});
		setRecommendationText("");
		setEditingRoute(null);
	}, []);

	const handleCreate = async () => {
		if (!form.storyId.trim() || !form.routeName.trim() || !form.region.trim()) {
			alert("Please fill in required fields: Story ID, Route Name, and Region");
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert recommendation text to array before submitting
			const recommendations = recommendationText
				.split(",")
				.map((rec) => rec.trim())
				.filter((rec) => rec.length > 0);

			await makeApiRequest("/api/routes/create-model-route", {
				...form,
				recommendation: recommendations,
			});
			resetForm();
			setShowCreateModal(false);
			await mutateModelRoutes();
		} catch (error) {
			console.error("Failed to create model route:", error);
			alert("Failed to create model route. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (
			!editingRoute ||
			!form.storyId.trim() ||
			!form.routeName.trim() ||
			!form.region.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert recommendation text to array before submitting
			const recommendations = recommendationText
				.split(",")
				.map((rec) => rec.trim())
				.filter((rec) => rec.length > 0);

			await makeApiRequest(
				"/api/routes/update-model-route",
				{
					...form,
					recommendation: recommendations,
					modelRouteId: editingRoute.modelRouteId,
					delFlag: false,
					updUserId: "admin",
				},
				"POST",
			);
			resetForm();
			setShowCreateModal(false);
			await mutateModelRoutes();
		} catch (error) {
			console.error("Failed to update model route:", error);
			alert("Failed to update model route. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (route: ModelRouteResponseDto) => {
		setEditingRoute(route);
		setForm({
			storyId: route.storyId || "",
			routeName: route.routeName || "",
			region: route.region || "",
			regionDesc: route.regionDesc || "",
			regionBackgroundMedia: route.regionBackgroundMedia || "",
			recommendation: route.recommendation || [],
			touristSpotList: route.touristSpotList || [],
		});
		// Set the recommendation text from the array
		setRecommendationText((route.recommendation || []).join(", "));
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleDelete = async (modelRouteId: string, routeName: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the route "${routeName}" and all its tourist spots? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingRouteId(modelRouteId);
		try {
			await makeApiRequest(`/api/routes/${modelRouteId}`, {}, "DELETE");
			await mutateModelRoutes();
		} catch (error) {
			console.error("Failed to delete model route:", error);
			alert(
				`Failed to delete model route: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingRouteId(null);
		}
	};

	// Filter functions
	const toggleFilter = (filterId: string) => {
		setActiveFilters((prev) =>
			prev.includes(filterId)
				? prev.filter((f) => f !== filterId)
				: [...prev, filterId],
		);
	};

	const clearAllFilters = () => {
		setActiveFilters([]);
		setSearchQuery("");
	};

	// Bulk operations
	const toggleRouteSelection = (routeId: string) => {
		setSelectedRoutes((prev) =>
			prev.includes(routeId)
				? prev.filter((id) => id !== routeId)
				: [...prev, routeId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedRoutes.length === filteredRoutes.length) {
			setSelectedRoutes([]);
		} else {
			setSelectedRoutes(filteredRoutes.map((r) => r.modelRouteId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedRoutes.length} selected routes? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedRoutes.map((routeId) =>
					makeApiRequest(`/api/routes/${routeId}`, {}, "DELETE"),
				),
			);
			setSelectedRoutes([]);
			await mutateModelRoutes();
		} catch (error) {
			console.error("Failed to delete routes:", error);
			alert("Failed to delete some routes. Please try again.");
		}
	};

	if (isLoadingModelRoutes) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Loading model routes...
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-charcoal">
						Model Route Management
					</h1>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Create New Route
					</button>
				</div>

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">
								Total Routes
							</span>
						</div>
						<div className="text-2xl font-bold text-charcoal">
							{stats.total}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🏖️</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Spots
							</span>
						</div>
						<div className="text-2xl font-bold text-green-600">
							{stats.withSpots}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">💡</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Tips
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withRecommendations}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🌍</span>
							<span className="text-sm font-medium text-warmGrey3">
								Regions
							</span>
						</div>
						<div className="text-2xl font-bold text-mustard">
							{stats.regions}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📍</span>
							<span className="text-sm font-medium text-warmGrey3">
								Total Spots
							</span>
						</div>
						<div className="text-2xl font-bold text-blue-600">
							{stats.totalSpots}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⚠️</span>
							<span className="text-sm font-medium text-warmGrey3">
								Missing Media
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.missingMedia}
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="mb-6 space-y-4">
					{/* Search Bar */}
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								size={20}
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmGrey3"
							/>
							<input
								type="text"
								placeholder="Search routes by name, region, story ID, or description..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 rounded-lg border border-warmGrey2 focus:border-red focus:outline-none"
							/>
						</div>
						{(searchQuery || activeFilters.length > 0) && (
							<button
								type="button"
								onClick={clearAllFilters}
								className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Clear All
							</button>
						)}
					</div>

					{/* Quick Filters */}
					<div className="flex flex-wrap gap-2">
						{quickFilters.map((filter) => (
							<button
								type="button"
								key={filter.id}
								onClick={() => toggleFilter(filter.id)}
								className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
									activeFilters.includes(filter.id)
										? "bg-red text-white"
										: "bg-white text-charcoal hover:bg-warmGrey2"
								}`}
							>
								<span>{filter.icon}</span>
								{filter.label}
							</button>
						))}
					</div>

					{/* Active Filters Display */}
					{activeFilters.length > 0 && (
						<div className="text-sm text-warmGrey3">
							Showing {filteredRoutes.length} of {stats.total} routes
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedRoutes.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedRoutes.length} routes selected
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handleBulkDelete}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
							>
								<Trash2 size={16} />
								Delete Selected
							</button>
							<button
								type="button"
								onClick={() => setSelectedRoutes([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Routes Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-4 py-4 text-left font-semibold">
										<input
											type="checkbox"
											checked={
												selectedRoutes.length === filteredRoutes.length &&
												filteredRoutes.length > 0
											}
											onChange={toggleSelectAll}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Route Name
									</th>
									<th className="px-6 py-4 text-left font-semibold">Region</th>
									<th className="px-6 py-4 text-left font-semibold">
										Story ID
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Tourist Spots
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Recommendations
									</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredRoutes?.map((route, index) => (
									<tr
										key={route.modelRouteId}
										className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
											selectedRoutes.includes(route.modelRouteId)
												? "ring-2 ring-blue-200"
												: ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={selectedRoutes.includes(route.modelRouteId)}
												onChange={() =>
													toggleRouteSelection(route.modelRouteId)
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{route.routeName}
											</div>
											<div className="max-w-xs truncate text-sm text-warmGrey3">
												{route.regionDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
												{route.region}
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="text-sm text-charcoal">
												{route.storyId}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 text-sm text-charcoal">
												<MapPin size={14} />
												<span>{route.touristSpotList?.length || 0} spots</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-charcoal">
												{route.recommendation?.length > 0
													? `${route.recommendation.length} recommendations`
													: "No recommendations"}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(route)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Route"
													disabled={deletingRouteId !== null}
												>
													<Edit size={16} />
												</button>
												<a
													href={`/v2/admin/model-routes/${route.modelRouteId}`}
													className={`rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all ${
														deletingRouteId !== null
															? "pointer-events-none opacity-50"
															: ""
													}`}
													title="Manage Tourist Spots"
												>
													<Eye size={16} />
												</a>
												<button
													type="button"
													onClick={() =>
														handleDelete(route.modelRouteId, route.routeName)
													}
													className={`rounded-lg p-2 transition-all ${
														deletingRouteId === route.modelRouteId
															? "bg-red-200 text-red-600 cursor-not-allowed"
															: "bg-red-100 text-red-700 hover:bg-red-200"
													}`}
													title="Delete Route"
													disabled={deletingRouteId !== null}
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								)) || (
									<tr>
										<td
											colSpan={7}
											className="px-6 py-8 text-center text-charcoal"
										>
											{modelRoutes?.length === 0
												? "No model routes found. Create your first route to get started."
												: "No routes match your current filters."}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold text-charcoal">
									{editingRoute ? "Edit Model Route" : "Create New Model Route"}
								</h2>
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
								>
									✕
								</button>
							</div>

							{/* Show comprehensive data when editing */}
							{editingRoute && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Route Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Route ID:</span>{" "}
													{editingRoute.modelRouteId}
												</div>
												<div>
													<span className="font-medium">Story ID:</span>{" "}
													{editingRoute.storyId}
												</div>
												<div>
													<span className="font-medium">Region:</span>{" "}
													{editingRoute.region}
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">🌍 Location</h4>
											<div className="text-sm space-y-1">
												{editingRoute.regionLatitude !== undefined && (
													<div>
														<span className="font-medium">Latitude:</span>{" "}
														{editingRoute.regionLatitude}°
													</div>
												)}
												{editingRoute.regionLongitude !== undefined && (
													<div>
														<span className="font-medium">Longitude:</span>{" "}
														{editingRoute.regionLongitude}°
													</div>
												)}
												{editingRoute.regionWeatherInfo?.temperatureCelsius !==
													undefined && (
													<div>
														<span className="font-medium">Temperature:</span>{" "}
														{editingRoute.regionWeatherInfo.temperatureCelsius}
														°C
													</div>
												)}
												{editingRoute.regionWeatherInfo?.weatherName && (
													<div>
														<span className="font-medium">Weather:</span>{" "}
														{editingRoute.regionWeatherInfo.weatherName}
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">🖼️ Media</h4>
											<div className="text-sm space-y-1">
												{editingRoute.regionBackgroundMedia && (
													<div>
														<span className="font-medium">Background:</span>
														<div className="truncate text-blue-600">
															{editingRoute.regionBackgroundMedia}
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">📅 Metadata</h4>
											<div className="text-sm space-y-1">
												{editingRoute.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingRoute.insDateTime &&
														!Number.isNaN(Date.parse(editingRoute.insDateTime))
															? new Date(
																	editingRoute.insDateTime,
																).toLocaleString()
															: editingRoute.insDateTime || "N/A"}
													</div>
												)}
												{editingRoute.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingRoute.updDateTime &&
														!Number.isNaN(Date.parse(editingRoute.updDateTime))
															? new Date(
																	editingRoute.updDateTime,
																).toLocaleString()
															: editingRoute.updDateTime || "N/A"}
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Tourist Spots List */}
									{editingRoute.touristSpotList &&
										editingRoute.touristSpotList.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium text-charcoal mb-2">
													📍 Tourist Spots (
													{editingRoute.touristSpotList.length})
												</h4>
												<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
													{editingRoute.touristSpotList.map((spot, idx) => (
														<div
															key={`modal-spot-${editingRoute.modelRouteId}-${spot.touristSpotId || idx}`}
															className="flex justify-between py-1 border-b last:border-b-0"
														>
															<span className="text-sm">
																{spot.touristSpotName}
															</span>
															<span className="text-xs text-gray-500">
																ID: {spot.touristSpotId}
															</span>
														</div>
													))}
												</div>
											</div>
										)}

									{/* Recommendations */}
									{editingRoute.recommendation &&
										editingRoute.recommendation.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium text-charcoal mb-2">
													💡 Recommendations (
													{editingRoute.recommendation.length})
												</h4>
												<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
													{editingRoute.recommendation.map((rec, idx) => (
														<div
															key={`modal-rec-${editingRoute.modelRouteId}-${idx}`}
															className="py-1 border-b last:border-b-0"
														>
															<span className="text-sm">{rec}</span>
														</div>
													))}
												</div>
											</div>
										)}

									{/* Raw JSON Data */}
									<details className="mt-4">
										<summary className="font-medium text-purple-600 cursor-pointer">
											🔍 Raw JSON Data
										</summary>
										<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
											{JSON.stringify(editingRoute, null, 2)}
										</pre>
									</details>
								</div>
							)}

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{/* Basic Information */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Basic Information
									</h3>

									<div>
										<label
											htmlFor="storyId"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Story ID *
										</label>
										<input
											id="storyId"
											type="text"
											value={form.storyId}
											onChange={(e) =>
												setForm({ ...form, storyId: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter story ID"
										/>
									</div>

									<div>
										<label
											htmlFor="routeName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Route Name *
										</label>
										<input
											id="routeName"
											type="text"
											value={form.routeName}
											onChange={(e) =>
												setForm({ ...form, routeName: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter route name"
										/>
									</div>

									<div>
										<label
											htmlFor="region"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Region *
										</label>
										<input
											id="region"
											type="text"
											value={form.region}
											onChange={(e) =>
												setForm({ ...form, region: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter region name"
										/>
									</div>

									<div>
										<label
											htmlFor="regionDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Region Description
										</label>
										<textarea
											id="regionDesc"
											value={form.regionDesc}
											onChange={(e) =>
												setForm({ ...form, regionDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter region description"
										/>
									</div>
								</div>

								{/* Media & Settings */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Media & Recommendations
									</h3>

									<div>
										<label
											htmlFor="regionBackgroundMedia"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Background Media URL
										</label>
										<input
											id="regionBackgroundMedia"
											type="url"
											value={form.regionBackgroundMedia}
											onChange={(e) =>
												setForm({
													...form,
													regionBackgroundMedia: e.target.value,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/background.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="recommendation"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Recommendations (comma-separated)
										</label>
										<textarea
											id="recommendation"
											value={recommendationText}
											onChange={(e) => setRecommendationText(e.target.value)}
											rows={6}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Visit during cherry blossom season, Try local cuisine, Bring comfortable shoes"
										/>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="mt-8 flex justify-end gap-4">
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
									disabled={isSubmitting}
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={editingRoute ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingRoute
											? "Update Route"
											: "Create Route"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
