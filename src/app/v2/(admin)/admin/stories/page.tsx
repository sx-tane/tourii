"use client";
import { useState, useCallback } from "react";
import { getSagas } from "@/hooks/stories/getSagas";
import { makeApiRequest } from "@/utils/api-helpers";
import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import { Edit, Plus, Eye, Trash2 } from "lucide-react";

export default function AdminStories() {
	const { sagas, isLoadingSagas, mutateSagas } = getSagas();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingStory, setEditingStory] = useState<StoryResponseDto | null>(
		null,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null);

	const [form, setForm] = useState<StoryCreateRequestDto>({
		sagaName: "",
		sagaDesc: "",
		backgroundMedia: "",
		mapImage: "",
		location: "",
		order: 0,
		isPrologue: false,
		isSelected: false,
		chapterList: [],
	});

	const resetForm = useCallback(() => {
		setForm({
			sagaName: "",
			sagaDesc: "",
			backgroundMedia: "",
			mapImage: "",
			location: "",
			order: 0,
			isPrologue: false,
			isSelected: false,
			chapterList: [],
		});
		setEditingStory(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.sagaName.trim() ||
			!form.sagaDesc.trim() ||
			!form.backgroundMedia.trim()
		) {
			alert(
				"Please fill in required fields: Saga Name, Description, and Background Media",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest("/api/stories/create-saga", form);
			resetForm();
			setShowCreateModal(false);
			await mutateSagas();
		} catch (error) {
			console.error("Failed to create saga:", error);
			alert("Failed to create saga. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (!editingStory || !form.sagaName.trim() || !form.sagaDesc.trim()) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest(
				`/api/stories/update-saga/${editingStory.storyId}`,
				{
					...form,
					sagaId: editingStory.storyId,
					delFlag: false,
					updUserId: "admin",
				},
				"PUT",
			);
			resetForm();
			setShowCreateModal(false);
			await mutateSagas();
		} catch (error) {
			console.error("Failed to update saga:", error);
			alert("Failed to update saga. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (story: StoryResponseDto) => {
		setEditingStory(story);
		setForm({
			sagaName: story.sagaName || "",
			sagaDesc: story.sagaDesc || "",
			backgroundMedia: story.backgroundMedia || "",
			mapImage: story.mapImage || "",
			location: story.location || "",
			order: story.order || 0,
			isPrologue: story.isPrologue || false,
			isSelected: story.isSelected || false,
			chapterList: story.chapterList || [],
		});
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleDelete = async (storyId: string, sagaName: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the story "${sagaName}" and all its chapters? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingStoryId(storyId);
		try {
			await makeApiRequest(`/api/stories/${storyId}`, {}, "DELETE");
			await mutateSagas();
		} catch (error) {
			console.error("Failed to delete story:", error);
			alert(
				`Failed to delete story: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingStoryId(null);
		}
	};

	if (isLoadingSagas) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading stories...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-charcoal">Story Management</h1>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Create New Story
					</button>
				</div>

				{/* Stories Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-6 py-4 text-left font-semibold">
										Story Name
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Description
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Location
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Chapters
									</th>
									<th className="px-6 py-4 text-left font-semibold">Type</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{sagas?.map((story, index) => (
									<tr
										key={story.storyId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{story.sagaName}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="max-w-xs truncate text-sm text-charcoal">
												{story.sagaDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
												{story.location || "N/A"}
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="text-sm text-charcoal">
												{story.chapterList?.length || 0} chapters
											</span>
										</td>
										<td className="px-6 py-4">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${
													story.isPrologue
														? "bg-blue-100 text-blue-800"
														: "bg-green-100 text-green-800"
												}`}
											>
												{story.isPrologue ? "Prologue" : "Main Story"}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(story)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Story"
													disabled={deletingStoryId !== null}
												>
													<Edit size={16} />
												</button>
												<a
													href={`/v2/admin/stories/${story.storyId}`}
													className={`rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all ${
														deletingStoryId !== null
															? "pointer-events-none opacity-50"
															: ""
													}`}
													title="View Chapters"
												>
													<Eye size={16} />
												</a>
												<button
													type="button"
													onClick={() =>
														handleDelete(story.storyId, story.sagaName)
													}
													className={`rounded-lg p-2 transition-all ${
														deletingStoryId === story.storyId
															? "bg-red-200 text-red-600 cursor-not-allowed"
															: "bg-red-100 text-red-700 hover:bg-red-200"
													}`}
													title="Delete Story"
													disabled={deletingStoryId !== null}
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
											No stories found. Create your first story to get started.
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
									{editingStory ? "Edit Story" : "Create New Story"}
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
											htmlFor="sagaName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Saga Name *
										</label>
										<input
											id="sagaName"
											type="text"
											value={form.sagaName}
											onChange={(e) =>
												setForm({ ...form, sagaName: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter saga name"
										/>
									</div>

									<div>
										<label
											htmlFor="sagaDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Description *
										</label>
										<textarea
											id="sagaDesc"
											value={form.sagaDesc}
											onChange={(e) =>
												setForm({ ...form, sagaDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter saga description"
										/>
									</div>

									<div>
										<label
											htmlFor="location"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Location
										</label>
										<input
											id="location"
											type="text"
											value={form.location}
											onChange={(e) =>
												setForm({ ...form, location: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter real world location"
										/>
									</div>

									<div>
										<label
											htmlFor="order"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Display Order
										</label>
										<input
											id="order"
											type="number"
											value={form.order}
											onChange={(e) =>
												setForm({
													...form,
													order: Number.parseInt(e.target.value) || 0,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter display order"
											min="0"
										/>
									</div>
								</div>

								{/* Media URLs */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Media URLs
									</h3>

									<div>
										<label
											htmlFor="backgroundMedia"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Background Media URL *
										</label>
										<input
											id="backgroundMedia"
											type="url"
											value={form.backgroundMedia}
											onChange={(e) =>
												setForm({ ...form, backgroundMedia: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/background.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="mapImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Map Image URL
										</label>
										<input
											id="mapImage"
											type="url"
											value={form.mapImage}
											onChange={(e) =>
												setForm({ ...form, mapImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/map.jpg"
										/>
									</div>
								</div>

								{/* Settings */}
								<div className="md:col-span-2 space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Settings
									</h3>
									<div className="flex gap-6">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={form.isPrologue}
												onChange={(e) =>
													setForm({ ...form, isPrologue: e.target.checked })
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
											<span className="text-sm font-medium text-charcoal">
												Is Prologue
											</span>
										</label>
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={form.isSelected}
												onChange={(e) =>
													setForm({ ...form, isSelected: e.target.checked })
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
											<span className="text-sm font-medium text-charcoal">
												Is Selected
											</span>
										</label>
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
									onClick={editingStory ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingStory
											? "Update Story"
											: "Create Story"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
