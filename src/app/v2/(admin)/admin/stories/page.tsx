"use client";
import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import { useSagas } from "@/hooks";
import { makeApiRequest } from "@/utils/api-helpers";
import {
	BarChart3,
	Edit,
	ExternalLink,
	Eye,
	Plus,
	Search,
	Trash2,
	X,
} from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export default function AdminStories() {
	const sagaNameId = useId();
	const sagaDescId = useId();
	const locationId = useId();
	const orderId = useId();
	const backgroundMediaId = useId();
	const mapImageId = useId();
	const {
		data: sagas,
		isLoading: isLoadingSagas,
		mutate: mutateSagas,
	} = useSagas();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingStory, setEditingStory] = useState<StoryResponseDto | null>(
		null,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedStories, setSelectedStories] = useState<string[]>([]);
	const [showBulkActions, setShowBulkActions] = useState(false);

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

	// Quick filters configuration
	const quickFilters = [
		{ id: "prologue", label: "Prologue", icon: "📖" },
		{ id: "main-story", label: "Main Story", icon: "📚" },
		{ id: "selected", label: "Selected", icon: "⭐" },
		{ id: "no-chapters", label: "No Chapters", icon: "❌" },
		{ id: "missing-media", label: "Missing Media", icon: "🖼️" },
		{ id: "no-location", label: "No Location", icon: "📍" },
	];

	// Filtered and searched stories
	const filteredStories = useMemo(() => {
		if (!sagas) return [];

		let filtered = [...sagas];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(story) =>
					story.sagaName?.toLowerCase().includes(query) ||
					story.sagaDesc?.toLowerCase().includes(query) ||
					story.location?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((story) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "prologue":
							return story.isPrologue === true;
						case "main-story":
							return story.isPrologue === false;
						case "selected":
							return story.isSelected === true;
						case "no-chapters":
							return !story.chapterList || story.chapterList.length === 0;
						case "missing-media":
							return !story.backgroundMedia || !story.mapImage;
						case "no-location":
							return !story.location;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [sagas, searchQuery, activeFilters]);

	// Summary statistics
	const stats = useMemo(() => {
		if (!sagas)
			return {
				total: 0,
				prologue: 0,
				mainStory: 0,
				selected: 0,
				withChapters: 0,
				missingMedia: 0,
			};

		return {
			total: sagas.length,
			prologue: sagas.filter((s) => s.isPrologue).length,
			mainStory: sagas.filter((s) => !s.isPrologue).length,
			selected: sagas.filter((s) => s.isSelected).length,
			withChapters: sagas.filter(
				(s) => s.chapterList && s.chapterList.length > 0,
			).length,
			missingMedia: sagas.filter((s) => !s.backgroundMedia || !s.mapImage)
				.length,
		};
	}, [sagas]);

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
	const toggleStorySelection = (storyId: string) => {
		setSelectedStories((prev) =>
			prev.includes(storyId)
				? prev.filter((id) => id !== storyId)
				: [...prev, storyId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedStories.length === filteredStories.length) {
			setSelectedStories([]);
		} else {
			setSelectedStories(filteredStories.map((s) => s.storyId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedStories.length} selected stories? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedStories.map((storyId) =>
					makeApiRequest(`/api/stories/${storyId}`, {}, "DELETE"),
				),
			);
			setSelectedStories([]);
			setShowBulkActions(false);
			await mutateSagas();
		} catch (error) {
			console.error("Failed to delete stories:", error);
			alert("Failed to delete some stories. Please try again.");
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

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">Total</span>
						</div>
						<div className="text-2xl font-bold text-charcoal">
							{stats.total}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📖</span>
							<span className="text-sm font-medium text-warmGrey3">
								Prologue
							</span>
						</div>
						<div className="text-2xl font-bold text-blue-600">
							{stats.prologue}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📚</span>
							<span className="text-sm font-medium text-warmGrey3">Main</span>
						</div>
						<div className="text-2xl font-bold text-green-600">
							{stats.mainStory}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⭐</span>
							<span className="text-sm font-medium text-warmGrey3">
								Selected
							</span>
						</div>
						<div className="text-2xl font-bold text-mustard">
							{stats.selected}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📄</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Chapters
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withChapters}
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
								placeholder="Search stories by name, description, or location..."
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
							Showing {filteredStories.length} of {stats.total} stories
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedStories.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedStories.length} stories selected
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
								onClick={() => setSelectedStories([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Stories Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-4 py-4 text-left font-semibold">
										<input
											type="checkbox"
											checked={
												selectedStories.length === filteredStories.length &&
												filteredStories.length > 0
											}
											onChange={toggleSelectAll}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</th>
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
								{filteredStories?.map((story, index) => (
									<tr
										key={story.storyId}
										className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
											selectedStories.includes(story.storyId)
												? "ring-2 ring-blue-200"
												: ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={selectedStories.includes(story.storyId)}
												onChange={() => toggleStorySelection(story.storyId)}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
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
													title="Manage Chapters"
												>
													<Eye size={16} />
												</a>
												<a
													href={`/v2/touriiverse/${story.storyId}`}
													className={`rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all ${
														deletingStoryId !== null
															? "pointer-events-none opacity-50"
															: ""
													}`}
													title="Jump to Story Page"
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink size={16} />
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
											colSpan={7}
											className="px-6 py-8 text-center text-charcoal"
										>
											{sagas?.length === 0
												? "No stories found. Create your first story to get started."
												: "No stories match your current filters."}
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

							{/* Show comprehensive data when editing */}
							{editingStory && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Story Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Story ID:</span>{" "}
													{editingStory.storyId}
												</div>
												<div>
													<span className="font-medium">Order:</span>{" "}
													{editingStory.order || 0}
												</div>
												<div>
													<span className="font-medium">Is Selected:</span>{" "}
													{editingStory.isSelected ? "✅ Yes" : "❌ No"}
												</div>
												<div>
													<span className="font-medium">Is Prologue:</span>{" "}
													{editingStory.isPrologue ? "✅ Yes" : "❌ No"}
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps
											</h4>
											<div className="text-sm space-y-1">
												{editingStory.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingStory.insDateTime &&
														!Number.isNaN(Date.parse(editingStory.insDateTime))
															? new Date(
																	editingStory.insDateTime,
																).toLocaleString()
															: editingStory.insDateTime || "N/A"}
													</div>
												)}
												{editingStory.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingStory.updDateTime &&
														!Number.isNaN(Date.parse(editingStory.updDateTime))
															? new Date(
																	editingStory.updDateTime,
																).toLocaleString()
															: editingStory.updDateTime || "N/A"}
													</div>
												)}
												{editingStory.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingStory.insUserId}
													</div>
												)}
												{editingStory.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingStory.updUserId}
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🖼️ Media URLs
											</h4>
											<div className="text-sm space-y-1">
												{editingStory.backgroundMedia && (
													<div>
														<span className="font-medium">Background:</span>
														<div className="truncate text-blue-600">
															{editingStory.backgroundMedia}
														</div>
													</div>
												)}
												{editingStory.mapImage && (
													<div>
														<span className="font-medium">Map Image:</span>
														<div className="truncate text-green-600">
															{editingStory.mapImage}
														</div>
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Chapters List */}
									{editingStory.chapterList &&
										editingStory.chapterList.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium text-charcoal mb-2">
													📚 Chapters ({editingStory.chapterList.length})
												</h4>
												<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
													{editingStory.chapterList.map((chapter, idx) => (
														<div
															key={`modal-chapter-${editingStory.storyId}-${chapter.storyChapterId || idx}`}
															className="flex justify-between py-1 border-b last:border-b-0"
														>
															<span className="text-sm">
																{chapter.chapterNumber}: {chapter.chapterTitle}
															</span>
															<span className="text-xs text-gray-500">
																ID: {chapter.storyChapterId}
															</span>
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
											{JSON.stringify(editingStory, null, 2)}
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
											htmlFor="sagaName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Saga Name *
										</label>
										<input
											id={sagaNameId}
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
											id={sagaDescId}
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
											id={locationId}
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
											id={orderId}
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
											id={backgroundMediaId}
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
											id={mapImageId}
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
