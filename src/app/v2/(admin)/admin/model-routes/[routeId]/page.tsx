"use client";
import type {
	TouristSpotCreateRequestDto,
	TouristSpotResponseDto,
} from "@/api/generated";
import {
	TouristSpotBulkActions,
	TouristSpotCreateEditModal,
	TouristSpotSearchFilters,
	TouristSpotStatsGrid,
	TouristSpotTable,
} from "@/components/admin";
import { useModelRouteById } from "@/hooks";
import {
	useCreateTouristSpot,
	useDeleteTouristSpot,
	useUpdateTouristSpot,
} from "@/hooks/admin";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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

	const {
		data: modelRoute,
		isLoading,
		mutate: mutateModelRoute,
	} = useModelRouteById(routeId);

	// Admin Mutation Hooks
	const { trigger: createSpot, isMutating: isCreating } = useCreateTouristSpot(
		() => {
			mutateModelRoute();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: updateSpot, isMutating: isUpdating } = useUpdateTouristSpot(
		() => {
			mutateModelRoute();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: deleteSpot, isMutating: isDeleting } = useDeleteTouristSpot(
		() => {
			mutateModelRoute();
			setDeletingSpotId(null);
		},
	);

	// Add a refresh trigger as fallback
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const forceRefresh = useCallback(() => {
		setRefreshTrigger((prev) => prev + 1);
		mutateModelRoute();
	}, [mutateModelRoute]);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingSpot, setEditingSpot] = useState<TouristSpotResponseDto | null>(
		null,
	);
	const [deletingSpotId, setDeletingSpotId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedSpots, setSelectedSpots] = useState<string[]>([]);

	const [form, setForm] = useState<TouristSpotCreateRequestDto>({
		storyChapterId: "",
		touristSpotName: "",
		address: "",
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
					spot.address?.toLowerCase().includes(query) ||
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
			address: "",
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
			!form.touristSpotDesc.trim() ||
			!form.address?.trim()
		) {
			alert(
				"Please fill in required fields: Story Chapter ID, Spot Name, and Description",
			);
			return;
		}

		// Convert comma-separated fields to arrays before submitting
		const hashtags = hashtagText
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);
		const smallImages = smallImagesText
			.split(",")
			.map((img) => img.trim())
			.filter((img) => img.length > 0);

		await createSpot({
			...form,
			touristSpotHashtag: hashtags,
			imageSet: {
				main: form.imageSet?.main || "",
				small: smallImages,
			},
			modelRouteId: routeId,
		});
	};

	const handleUpdate = async () => {
		if (
			!editingSpot ||
			!form.storyChapterId.trim() ||
			!form.touristSpotName.trim() ||
			!form.touristSpotDesc.trim() ||
			!form.address?.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		// Convert comma-separated fields to arrays before submitting
		const hashtags = hashtagText
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);
		const smallImages = smallImagesText
			.split(",")
			.map((img) => img.trim())
			.filter((img) => img.length > 0);

		await updateSpot({
			...form,
			touristSpotHashtag: hashtags,
			imageSet: {
				main: form.imageSet?.main || "",
				small: smallImages,
			},
			touristSpotId: editingSpot.touristSpotId,
			delFlag: false,
			updUserId: "admin",
		});
	};

	const handleEdit = (spot: TouristSpotResponseDto) => {
		setEditingSpot(spot);
		setForm({
			storyChapterId: spot.storyChapterId || "",
			touristSpotName: spot.touristSpotName || "",
			address: spot.address || "",
			touristSpotDesc: spot.touristSpotDesc || "",
			bestVisitTime: spot.bestVisitTime || "",
			touristSpotHashtag: spot.touristSpotHashtag || [],
			imageSet: spot.imageSet || { main: "", small: [] },
		});
		// Set comma-separated text from arrays
		setHashtagText((spot.touristSpotHashtag || []).join(", "));
		setSmallImagesText((spot.imageSet?.small || []).join(", "));
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
		await deleteSpot({ spotId: touristSpotId });
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
			await Promise.all(selectedSpots.map((spotId) => deleteSpot({ spotId })));
			setSelectedSpots([]);
		} catch (error) {
			console.error("Failed to delete tourist spots:", error);
			alert("Failed to delete some tourist spots. Please try again.");
		}
	};

	const isSubmitting = isCreating || isUpdating;

	if (isLoading || !isParamsLoaded) {
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

	if (!modelRoute) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Model route not found.
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
						<a
							href="/v2/admin/model-routes"
							className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
							title="Back to Model Routes"
						>
							<ArrowLeft size={18} />
						</a>
						<div>
							<h1 className="text-3xl font-bold text-charcoal">
								Tourist Spot Management
							</h1>
							<p className="text-warmGrey3 mt-1">
								Managing spots for route:{" "}
								<span className="font-medium text-charcoal">
									{modelRoute.routeName || routeId}
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
				<TouristSpotStatsGrid stats={stats} />

				{/* Search and Filters */}
				<TouristSpotSearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					quickFilters={quickFilters}
					totalSpots={stats.total}
					filteredCount={filteredSpots.length}
				/>

				{/* Bulk Actions Bar */}
				<TouristSpotBulkActions
					selectedCount={selectedSpots.length}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedSpots([])}
				/>

				{/* Tourist Spots Table */}
				<TouristSpotTable
					spots={filteredSpots}
					selectedSpots={selectedSpots}
					deletingSpotId={deletingSpotId}
					onToggleSelection={toggleSpotSelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>

				{/* Create/Edit Modal */}
				<TouristSpotCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingSpot={editingSpot}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingSpot ? handleUpdate : handleCreate}
					isSubmitting={isSubmitting}
					hashtagText={hashtagText}
					onHashtagTextChange={setHashtagText}
					smallImagesText={smallImagesText}
					onSmallImagesTextChange={setSmallImagesText}
				/>
			</div>
		</div>
	);
}
