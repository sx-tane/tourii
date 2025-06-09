"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getModelRouteById } from "@/hooks/routes/getModelRouteById";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	TouristSpotCreateRequestDto,
	TouristSpotResponseDto,
} from "@/api/generated";
import {
	ArrowLeft,
	Edit,
	Plus,
	MapPin,
	Camera,
	Tag,
	Trash2,
	Search,
	X,
	BarChart3,
} from "lucide-react";

interface Props {
	params: Promise<{ routeId: string }>;
}

export default function TouristSpotManagement({ params }: Props) {
	const router = useRouter();
	const [routeId, setRouteId] = useState<string>("");
	const [isParamsLoaded, setIsParamsLoaded] = useState(false);

	// Initialize params
	useEffect(() => {
		params.then((p) => {
			setRouteId(p.routeId);
			setIsParamsLoaded(true);
		});
	}, [params]);

	const { modelRoute, isLoadingModelRoute, mutateModelRoute } =
		getModelRouteById(routeId);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingSpot, setEditingSpot] = useState<TouristSpotResponseDto | null>(
		null,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingSpotId, setDeletingSpotId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedSpots, setSelectedSpots] = useState<string[]>([]);

	const [form, setForm] = useState<TouristSpotCreateRequestDto>({
		storyChapterId: "",
		touristSpotName: "",
		touristSpotDesc: "",
		bestVisitTime: "",
		touristSpotHashtag: [],
		imageSet: {
			main: "",
			small: [],
		},
	});

	// Store comma-separated fields as strings for easier editing
	const [hashtagText, setHashtagText] = useState("");
	const [smallImagesText, setSmallImagesText] = useState("");

	// Quick filters configuration
	const quickFilters = [
		{ id: "no-hashtags", label: "No Hashtags", icon: "🏷️" },
		{ id: "many-hashtags", label: "5+ Hashtags", icon: "📌" },
		{ id: "no-main-image", label: "No Main Image", icon: "🖼️" },
		{ id: "no-small-images", label: "No Small Images", icon: "📷" },
		{ id: "no-visit-time", label: "No Visit Time", icon: "⏰" },
		{ id: "no-description", label: "No Description", icon: "📝" },
	];

	// Filtered and searched spots
	const filteredSpots = useMemo(() => {
		if (!modelRoute?.touristSpotList) return [];

		let filtered = [...modelRoute.touristSpotList];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(spot) =>
					spot.touristSpotName?.toLowerCase().includes(query) ||
					spot.touristSpotDesc?.toLowerCase().includes(query) ||
					spot.bestVisitTime?.toLowerCase().includes(query) ||
					spot.touristSpotHashtag?.some((tag) =>
						tag.toLowerCase().includes(query),
					) ||
					spot.storyChapterId?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((spot) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "no-hashtags":
							return (
								!spot.touristSpotHashtag || spot.touristSpotHashtag.length === 0
							);
						case "many-hashtags":
							return (
								spot.touristSpotHashtag && spot.touristSpotHashtag.length >= 5
							);
						case "no-main-image":
							return !spot.imageSet?.main;
						case "no-small-images":
							return !spot.imageSet?.small || spot.imageSet.small.length === 0;
						case "no-visit-time":
							return !spot.bestVisitTime;
						case "no-description":
							return !spot.touristSpotDesc;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [modelRoute?.touristSpotList, searchQuery, activeFilters]);

	// Summary statistics
	const stats = useMemo(() => {
		if (!modelRoute?.touristSpotList)
			return {
				total: 0,
				withHashtags: 0,
				withMainImage: 0,
				withSmallImages: 0,
				withVisitTime: 0,
				noDescription: 0,
			};

		const spots = modelRoute.touristSpotList;

		return {
			total: spots.length,
			withHashtags: spots.filter(
				(s) => s.touristSpotHashtag && s.touristSpotHashtag.length > 0,
			).length,
			withMainImage: spots.filter((s) => s.imageSet?.main).length,
			withSmallImages: spots.filter(
				(s) => s.imageSet?.small && s.imageSet.small.length > 0,
			).length,
			withVisitTime: spots.filter((s) => s.bestVisitTime).length,
			noDescription: spots.filter((s) => !s.touristSpotDesc).length,
		};
	}, [modelRoute?.touristSpotList]);

	const resetForm = useCallback(() => {
		setForm({
			storyChapterId: "",
			touristSpotName: "",
			touristSpotDesc: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
			imageSet: {
				main: "",
				small: [],
			},
		});
		setHashtagText("");
		setSmallImagesText("");
		setEditingSpot(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.storyChapterId.trim() ||
			!form.touristSpotName.trim() ||
			!form.touristSpotDesc.trim()
		) {
			alert(
				"Please fill in required fields: Story Chapter ID, Spot Name, and Description",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert text fields to arrays
			const hashtags = hashtagText
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);

			const smallImages = smallImagesText
				.split(",")
				.map((img) => img.trim())
				.filter((img) => img.length > 0);

			const spotData = {
				...form,
				touristSpotHashtag: hashtags,
				imageSet: {
					...form.imageSet,
					small: smallImages,
				},
			};

			await makeApiRequest(
				`/api/routes/create-tourist-spot/${routeId}`,
				spotData,
			);
			resetForm();
			setShowCreateModal(false);
			await mutateModelRoute();
		} catch (error) {
			console.error("Failed to create tourist spot:", error);
			alert("Failed to create tourist spot. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (
			!editingSpot ||
			!form.storyChapterId.trim() ||
			!form.touristSpotName.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert text fields to arrays
			const hashtags = hashtagText
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);

			const smallImages = smallImagesText
				.split(",")
				.map((img) => img.trim())
				.filter((img) => img.length > 0);

			const spotData = {
				...form,
				touristSpotHashtag: hashtags,
				imageSet: {
					...form.imageSet,
					small: smallImages,
				},
				touristSpotId: editingSpot.touristSpotId,
				delFlag: false,
				updUserId: "admin",
			};

			await makeApiRequest("/api/routes/update-tourist-spot", spotData, "POST");
			resetForm();
			setShowCreateModal(false);
			await mutateModelRoute();
		} catch (error) {
			console.error("Failed to update tourist spot:", error);
			alert("Failed to update tourist spot. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (spot: TouristSpotResponseDto) => {
		setEditingSpot(spot);
		setForm({
			storyChapterId: spot.storyChapterId || "",
			touristSpotName: spot.touristSpotName || "",
			touristSpotDesc: spot.touristSpotDesc || "",
			bestVisitTime: spot.bestVisitTime || "",
			touristSpotHashtag: spot.touristSpotHashtag || [],
			imageSet: spot.imageSet || { main: "", small: [] },
		});
		// Set text fields for editing
		setHashtagText(spot.touristSpotHashtag?.join(", ") || "");
		setSmallImagesText(spot.imageSet?.small?.join(", ") || "");
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleDelete = async (touristSpotId: string, spotName: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the tourist spot "${spotName}"? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingSpotId(touristSpotId);
		try {
			await makeApiRequest(
				`/api/routes/delete-tourist-spot/${touristSpotId}`,
				{},
				"DELETE",
			);
			await mutateModelRoute();
		} catch (error) {
			console.error("Failed to delete tourist spot:", error);
			alert(
				`Failed to delete tourist spot: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingSpotId(null);
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
	const toggleSpotSelection = (spotId: string) => {
		setSelectedSpots((prev) =>
			prev.includes(spotId)
				? prev.filter((id) => id !== spotId)
				: [...prev, spotId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedSpots.length === filteredSpots.length) {
			setSelectedSpots([]);
		} else {
			setSelectedSpots(filteredSpots.map((s) => s.touristSpotId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedSpots.length} selected tourist spots? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedSpots.map((spotId) =>
					makeApiRequest(
						`/api/routes/delete-tourist-spot/${spotId}`,
						{},
						"DELETE",
					),
				),
			);
			setSelectedSpots([]);
			await mutateModelRoute();
		} catch (error) {
			console.error("Failed to delete tourist spots:", error);
			alert("Failed to delete some tourist spots. Please try again.");
		}
	};

	if (!isParamsLoaded || isLoadingModelRoute) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Loading tourist spots...
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
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => router.back()}
							className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
						>
							<ArrowLeft size={20} />
						</button>
						<div>
							<h1 className="text-3xl font-bold text-charcoal">
								Tourist Spot Management
							</h1>
							<p className="text-warmGrey3 mt-1">
								Managing spots for:{" "}
								<span className="font-medium text-charcoal">
									{modelRoute?.routeName}
								</span>
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Add Tourist Spot
					</button>
				</div>

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">
								Total Spots
							</span>
						</div>
						<div className="text-2xl font-bold text-charcoal">
							{stats.total}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🏷️</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Hashtags
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withHashtags}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🖼️</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Main Image
							</span>
						</div>
						<div className="text-2xl font-bold text-green-600">
							{stats.withMainImage}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📷</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Gallery
							</span>
						</div>
						<div className="text-2xl font-bold text-blue-600">
							{stats.withSmallImages}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⏰</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Visit Time
							</span>
						</div>
						<div className="text-2xl font-bold text-mustard">
							{stats.withVisitTime}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⚠️</span>
							<span className="text-sm font-medium text-warmGrey3">
								No Description
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.noDescription}
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
								placeholder="Search spots by name, description, visit time, hashtags, or chapter ID..."
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
							Showing {filteredSpots.length} of {stats.total} tourist spots
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedSpots.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedSpots.length} spots selected
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
								onClick={() => setSelectedSpots([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Tourist Spots Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-4 py-4 text-left font-semibold">
										<input
											type="checkbox"
											checked={
												selectedSpots.length === filteredSpots.length &&
												filteredSpots.length > 0
											}
											onChange={toggleSelectAll}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Spot Name
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Description
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Best Visit Time
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Hashtags
									</th>
									<th className="px-6 py-4 text-left font-semibold">Images</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredSpots.map((spot, index) => (
									<tr
										key={spot.touristSpotId}
										className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
											selectedSpots.includes(spot.touristSpotId)
												? "ring-2 ring-blue-200"
												: ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={selectedSpots.includes(spot.touristSpotId)}
												onChange={() => toggleSpotSelection(spot.touristSpotId)}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{spot.touristSpotName}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="max-w-xs truncate text-sm text-charcoal">
												{spot.touristSpotDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
												{spot.bestVisitTime || "Anytime"}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex flex-wrap gap-1">
												{spot.touristSpotHashtag
													?.slice(0, 2)
													.map((tag, index) => (
														<span
															key={`${spot.touristSpotId}-tag-${index}`}
															className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
														>
															<Tag size={10} />
															{tag}
														</span>
													))}
												{spot.touristSpotHashtag &&
													spot.touristSpotHashtag.length > 2 && (
														<span className="text-xs text-warmGrey3">
															+{spot.touristSpotHashtag.length - 2} more
														</span>
													)}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 text-sm text-charcoal">
												<Camera size={14} />
												<span>
													{spot.imageSet?.main ? 1 : 0} main,{" "}
													{spot.imageSet?.small?.length || 0} small
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(spot)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Tourist Spot"
													disabled={deletingSpotId !== null}
												>
													<Edit size={16} />
												</button>
												<button
													type="button"
													onClick={() =>
														handleDelete(
															spot.touristSpotId,
															spot.touristSpotName,
														)
													}
													className={`rounded-lg p-2 transition-all ${
														deletingSpotId === spot.touristSpotId
															? "bg-red-200 text-red-600 cursor-not-allowed"
															: "bg-red-100 text-red-700 hover:bg-red-200"
													}`}
													title="Delete Tourist Spot"
													disabled={deletingSpotId !== null}
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								)) || (
									<tr>
										<td
											colSpan={6}
											className="px-6 py-8 text-center text-charcoal"
										>
											No tourist spots found. Add your first spot to get
											started.
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
									{editingSpot ? "Edit Tourist Spot" : "Add New Tourist Spot"}
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
							{editingSpot && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Tourist Spot Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Spot ID:</span>{" "}
													{editingSpot.touristSpotId}
												</div>
												<div>
													<span className="font-medium">Chapter ID:</span>{" "}
													{editingSpot.storyChapterId}
												</div>
												<div>
													<span className="font-medium">Best Visit:</span>{" "}
													{editingSpot.bestVisitTime || "Anytime"}
												</div>
												{editingSpot.address && (
													<div>
														<span className="font-medium">Address:</span>{" "}
														{editingSpot.address}
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🌍 Location & Weather
											</h4>
											<div className="text-sm space-y-1">
												{editingSpot.touristSpotLatitude !== undefined && (
													<div>
														<span className="font-medium">Latitude:</span>{" "}
														{editingSpot.touristSpotLatitude}°
													</div>
												)}
												{editingSpot.touristSpotLongitude !== undefined && (
													<div>
														<span className="font-medium">Longitude:</span>{" "}
														{editingSpot.touristSpotLongitude}°
													</div>
												)}
												{editingSpot.weatherInfo?.temperatureCelsius !==
													undefined && (
													<div>
														<span className="font-medium">Temperature:</span>{" "}
														{editingSpot.weatherInfo.temperatureCelsius}°C
													</div>
												)}
												{editingSpot.weatherInfo?.weatherName && (
													<div>
														<span className="font-medium">Weather:</span>{" "}
														{editingSpot.weatherInfo.weatherName}
													</div>
												)}
												{editingSpot.weatherInfo?.weatherDesc && (
													<div>
														<span className="font-medium">Description:</span>{" "}
														{editingSpot.weatherInfo.weatherDesc}
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps
											</h4>
											<div className="text-sm space-y-1">
												{editingSpot.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingSpot.insDateTime &&
														!Number.isNaN(Date.parse(editingSpot.insDateTime))
															? new Date(
																	editingSpot.insDateTime,
																).toLocaleString()
															: editingSpot.insDateTime || "N/A"}
													</div>
												)}
												{editingSpot.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingSpot.updDateTime &&
														!Number.isNaN(Date.parse(editingSpot.updDateTime))
															? new Date(
																	editingSpot.updDateTime,
																).toLocaleString()
															: editingSpot.updDateTime || "N/A"}
													</div>
												)}
												{editingSpot.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingSpot.insUserId}
													</div>
												)}
												{editingSpot.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingSpot.updUserId}
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Images Section */}
									<div className="mt-4 space-y-2">
										<h4 className="font-medium text-charcoal">🖼️ Images</h4>
										<div className="text-sm space-y-1">
											{editingSpot.imageSet?.main && (
												<div>
													<span className="font-medium">Main Image:</span>
													<div className="truncate text-green-600">
														{editingSpot.imageSet.main}
													</div>
												</div>
											)}
											{editingSpot.imageSet?.small &&
												editingSpot.imageSet.small.length > 0 && (
													<div>
														<span className="font-medium">
															Small Images ({editingSpot.imageSet.small.length}
															):
														</span>
														<div className="max-h-24 overflow-y-auto space-y-1 mt-1">
															{editingSpot.imageSet.small.map((img, idx) => (
																<div
																	key={`spot-img-${editingSpot.touristSpotId}-${idx}`}
																	className="truncate text-blue-600 text-xs"
																>
																	{idx + 1}. {img}
																</div>
															))}
														</div>
													</div>
												)}
										</div>
									</div>

									{/* Hashtags */}
									{editingSpot.touristSpotHashtag &&
										editingSpot.touristSpotHashtag.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium text-charcoal mb-2">
													🏷️ Hashtags ({editingSpot.touristSpotHashtag.length})
												</h4>
												<div className="flex flex-wrap gap-2">
													{editingSpot.touristSpotHashtag.map((tag, idx) => (
														<span
															key={`spot-tag-${editingSpot.touristSpotId}-${tag}-${idx}`}
															className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
														>
															#{tag}
														</span>
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
											{JSON.stringify(editingSpot, null, 2)}
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
											htmlFor="storyChapterId"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Story Chapter ID *
										</label>
										<input
											id="storyChapterId"
											type="text"
											value={form.storyChapterId}
											onChange={(e) =>
												setForm({ ...form, storyChapterId: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter story chapter ID"
										/>
									</div>

									<div>
										<label
											htmlFor="touristSpotName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Spot Name *
										</label>
										<input
											id="touristSpotName"
											type="text"
											value={form.touristSpotName}
											onChange={(e) =>
												setForm({ ...form, touristSpotName: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter tourist spot name"
										/>
									</div>

									<div>
										<label
											htmlFor="touristSpotDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Description *
										</label>
										<textarea
											id="touristSpotDesc"
											value={form.touristSpotDesc}
											onChange={(e) =>
												setForm({ ...form, touristSpotDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter tourist spot description"
										/>
									</div>

									<div>
										<label
											htmlFor="bestVisitTime"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Best Visit Time
										</label>
										<input
											id="bestVisitTime"
											type="text"
											value={form.bestVisitTime}
											onChange={(e) =>
												setForm({ ...form, bestVisitTime: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Spring morning, Summer evening"
										/>
									</div>
								</div>

								{/* Media & Tags */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Media & Tags
									</h3>

									<div>
										<label
											htmlFor="mainImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Main Image URL
										</label>
										<input
											id="mainImage"
											type="url"
											value={form.imageSet?.main || ""}
											onChange={(e) =>
												setForm({
													...form,
													imageSet: {
														...(form.imageSet || { main: "", small: [] }),
														main: e.target.value,
													},
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/main.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="smallImages"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Small Images (comma-separated URLs)
										</label>
										<textarea
											id="smallImages"
											value={smallImagesText}
											onChange={(e) => setSmallImagesText(e.target.value)}
											rows={3}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="hashtags"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Hashtags (comma-separated)
										</label>
										<textarea
											id="hashtags"
											value={hashtagText}
											onChange={(e) => setHashtagText(e.target.value)}
											rows={3}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., #temple, #historical, #peaceful"
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
									onClick={editingSpot ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingSpot
											? "Update Spot"
											: "Add Spot"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
