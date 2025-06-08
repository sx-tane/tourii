"use client";
import { useState, useCallback, useEffect } from "react";
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

				{/* Tourist Spots Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
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
								{modelRoute?.touristSpotList?.map((spot, index) => (
									<tr
										key={spot.touristSpotId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{spot.touristSpotName}
											</div>
											<div className="text-xs text-warmGrey3">
												Chapter: {spot.storyChapterId}
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
															key={`${spot.touristSpotId}-${index}`}
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
						<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
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
