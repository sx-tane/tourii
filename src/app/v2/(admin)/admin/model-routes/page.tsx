"use client";
import { useState, useCallback, useMemo } from "react";
import { useModelRoutes } from "@/hooks";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	ModelRouteCreateRequestDto,
	ModelRouteResponseDto,
} from "@/api/generated";
import { Edit, Eye, MapPin, Trash2, BarChart3 } from "lucide-react";
import {
	AdminLayout,
	StatsCards,
	SearchAndFilters,
	DataTable,
	BulkActions,
	AdminModal,
	type StatCard,
	type QuickFilter,
	type TableColumn,
	type BulkAction,
} from "@/components/admin/common";
import { RouteForm, RouteDetails } from "@/components/admin/model-routes";

export default function AdminModelRoutes() {
	const { data: modelRoutes, isLoading, mutate } = useModelRoutes();
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
	const quickFilters: QuickFilter[] = [
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
	const statsCards: StatCard[] = useMemo(() => {
		if (!modelRoutes || !Array.isArray(modelRoutes)) {
			return [
				{ label: "Total Routes", value: 0, icon: BarChart3, color: "text-blue-600" },
				{ label: "w/ Spots", value: 0, icon: "🏖️", className: "text-green-600" },
				{ label: "w/ Tips", value: 0, icon: "💡", className: "text-purple-600" },
				{ label: "Regions", value: 0, icon: "🌍", className: "text-mustard" },
				{ label: "Total Spots", value: 0, icon: "📍", className: "text-blue-600" },
				{ label: "Missing Media", value: 0, icon: "⚠️", className: "text-red-600" },
			];
		}

		const regions = new Set(modelRoutes.map((r) => r.region)).size;
		const totalSpots = modelRoutes.reduce(
			(sum, r) => sum + (r.touristSpotList?.length || 0),
			0,
		);

		return [
			{ label: "Total Routes", value: modelRoutes.length, icon: BarChart3, color: "text-blue-600" },
			{ label: "w/ Spots", value: modelRoutes.filter((r) => r.touristSpotList && r.touristSpotList.length > 0).length, icon: "🏖️", className: "text-green-600" },
			{ label: "w/ Tips", value: modelRoutes.filter((r) => r.recommendation && r.recommendation.length > 0).length, icon: "💡", className: "text-purple-600" },
			{ label: "Regions", value: regions, icon: "🌍", className: "text-mustard" },
			{ label: "Total Spots", value: totalSpots, icon: "📍", className: "text-blue-600" },
			{ label: "Missing Media", value: modelRoutes.filter((r) => !r.regionBackgroundMedia).length, icon: "⚠️", className: "text-red-600" },
		];
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
			await mutate();
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
			await mutate();
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
			await mutate();
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
			await mutate();
		} catch (error) {
			console.error("Failed to delete routes:", error);
			alert("Failed to delete some routes. Please try again.");
		}
	};

	// Bulk actions configuration
	const bulkActions: BulkAction[] = [
		{
			id: "delete",
			label: "Delete Selected",
			onClick: handleBulkDelete,
			variant: "danger",
		},
	];

	// Table columns configuration
	const columns: TableColumn<ModelRouteResponseDto>[] = [
		{
			key: "name",
			header: "Route Name",
			render: (route) => (
				<div>
					<div className="font-semibold text-charcoal">{route.routeName}</div>
					<div className="max-w-xs truncate text-sm text-warmGrey3">
						{route.regionDesc || "No description"}
					</div>
				</div>
			),
		},
		{
			key: "region",
			header: "Region",
			render: (route) => (
				<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
					{route.region}
				</span>
			),
		},
		{
			key: "storyId",
			header: "Story ID",
			render: (route) => (
				<span className="text-sm text-charcoal">{route.storyId}</span>
			),
		},
		{
			key: "touristSpots",
			header: "Tourist Spots",
			render: (route) => (
				<div className="flex items-center gap-1 text-sm text-charcoal">
					<MapPin size={14} />
					<span>{route.touristSpotList?.length || 0} spots</span>
				</div>
			),
		},
		{
			key: "recommendations",
			header: "Recommendations",
			render: (route) => (
				<div className="text-sm text-charcoal">
					{route.recommendation?.length > 0
						? `${route.recommendation.length} recommendations`
						: "No recommendations"}
				</div>
			),
		},
		{
			key: "actions",
			header: "Actions",
			render: (route) => (
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
						className={`rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all inline-flex items-center justify-center ${
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
						onClick={() => handleDelete(route.modelRouteId, route.routeName)}
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
			),
		},
	];

	if (isLoading) {
		return (
			<AdminLayout title="Model Route Management">
				<div className="text-center text-charcoal">Loading model routes...</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout
			title="Model Route Management"
			description="Create and manage travel routes"
			onCreateClick={openCreateModal}
			createButtonText="Create New Route"
		>
			{/* Summary Statistics Cards */}
			<StatsCards stats={statsCards} />

			{/* Search and Filters */}
			<SearchAndFilters
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="Search routes by name, region, story ID, or description..."
				quickFilters={quickFilters}
				activeFilters={activeFilters}
				onFilterToggle={toggleFilter}
				onClearAll={clearAllFilters}
				resultsCount={filteredRoutes.length}
				totalCount={modelRoutes?.length || 0}
			/>

			{/* Bulk Actions Bar */}
			<BulkActions
				selectedCount={selectedRoutes.length}
				onClear={() => setSelectedRoutes([])}
				actions={bulkActions}
			/>

			{/* Routes Table */}
			<DataTable
				columns={columns}
				data={filteredRoutes}
				selectedIds={selectedRoutes}
				onToggleSelect={toggleRouteSelection}
				onToggleSelectAll={toggleSelectAll}
				getItemId={(route) => route.modelRouteId}
				emptyMessage={
					modelRoutes?.length === 0
						? "No model routes found. Create your first route to get started."
						: "No routes match your current filters."
				}
			/>

			{/* Create/Edit Modal */}
			<AdminModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				title={editingRoute ? "Edit Model Route" : "Create New Model Route"}
				isSubmitting={isSubmitting}
				onSubmit={editingRoute ? handleUpdate : handleCreate}
				isEdit={!!editingRoute}
			>
				{/* Show comprehensive data when editing */}
				{editingRoute && <RouteDetails route={editingRoute} />}

				{/* Route Form */}
				<RouteForm
					form={form}
					onChange={setForm}
					recommendationText={recommendationText}
					onRecommendationChange={setRecommendationText}
					isSubmitting={isSubmitting}
				/>
			</AdminModal>
		</AdminLayout>
	);
}