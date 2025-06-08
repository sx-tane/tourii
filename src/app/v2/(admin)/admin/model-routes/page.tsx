"use client";
import { useState, useCallback } from "react";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	ModelRouteCreateRequestDto,
	ModelRouteResponseDto,
} from "@/api/generated";
import { Edit, Plus, Eye, MapPin } from "lucide-react";

export default function AdminModelRoutes() {
	const { modelRoutes, isLoadingModelRoutes, mutateModelRoutes } =
		getModelRoutes();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingRoute, setEditingRoute] =
		useState<ModelRouteResponseDto | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

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

				{/* Routes Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
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
								{modelRoutes?.map((route, index) => (
									<tr
										key={route.modelRouteId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
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
												>
													<Edit size={16} />
												</button>
												<a
													href={`/v2/admin/model-routes/${route.modelRouteId}`}
													className="rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all"
													title="View Tourist Spots"
												>
													<Eye size={16} />
												</a>
											</div>
										</td>
									</tr>
								)) || (
									<tr>
										<td
											colSpan={6}
											className="px-6 py-8 text-center text-charcoal"
										>
											No model routes found. Create your first route to get
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
						<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
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
