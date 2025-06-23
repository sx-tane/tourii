"use client";
import type {
	ModelRouteCreateRequestDto,
	ModelRouteResponseDto,
} from "@/api/generated";
import {
	ModelRouteBulkActions,
	ModelRouteCreateEditModal,
	ModelRouteSearchFilters,
	ModelRouteStatsGrid,
	ModelRouteTable,
} from "@/components/admin";
import { useModelRoutes } from "@/hooks";
import {
	useCreateModelRoute,
	useDeleteModelRoute,
	useUpdateModelRoute,
} from "@/hooks/admin";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function AdminModelRoutes() {
	const { data: modelRoutes, isLoading, mutate } = useModelRoutes();

	// Admin Mutation Hooks
	const { trigger: createRoute, isMutating: isCreating } = useCreateModelRoute(
		() => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: updateRoute, isMutating: isUpdating } = useUpdateModelRoute(
		() => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: deleteRoute, isMutating: isDeleting } = useDeleteModelRoute(
		() => {
			mutate();
			setDeletingRouteId(null);
		},
	);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingRoute, setEditingRoute] =
		useState<ModelRouteResponseDto | null>(null);
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

		// Convert recommendation text to array before submitting
		const recommendations = recommendationText
			.split(",")
			.map((rec) => rec.trim())
			.filter((rec) => rec.length > 0);

		await createRoute({
			...form,
			recommendation: recommendations,
		});
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

		// Convert recommendation text to array before submitting
		const recommendations = recommendationText
			.split(",")
			.map((rec) => rec.trim())
			.filter((rec) => rec.length > 0);

		await updateRoute({
			...form,
			recommendation: recommendations,
			modelRouteId: editingRoute.modelRouteId,
			delFlag: false,
			updUserId: "admin",
		});
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
		await deleteRoute({ routeId: modelRouteId });
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
				selectedRoutes.map((routeId) => deleteRoute({ routeId })),
			);
			setSelectedRoutes([]);
		} catch (error) {
			console.error("Failed to delete routes:", error);
			alert("Failed to delete some routes. Please try again.");
		}
	};

	const isSubmitting = isCreating || isUpdating;

	if (isLoading) {
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

				<ModelRouteStatsGrid stats={stats} />

				<ModelRouteSearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					filteredCount={filteredRoutes.length}
					totalRoutes={stats.total}
					quickFilters={quickFilters}
				/>

				<ModelRouteBulkActions
					selectedCount={selectedRoutes.length}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedRoutes([])}
				/>

				<ModelRouteTable
					routes={filteredRoutes}
					selectedRoutes={selectedRoutes}
					onToggleSelection={toggleRouteSelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					onDelete={handleDelete}
					deletingRouteId={deletingRouteId}
				/>

				<ModelRouteCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingRoute={editingRoute}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingRoute ? handleUpdate : handleCreate}
					isSubmitting={isSubmitting}
					recommendationText={recommendationText}
					onRecommendationTextChange={setRecommendationText}
				/>
			</div>
		</div>
	);
}
