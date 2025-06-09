"use client";
import { useParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { getSagaById } from "@/hooks/stories/getSagaById";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	StoryChapterCreateRequestDto,
	StoryChapterUpdateRequestDto,
	StoryChapterResponseDto,
} from "@/api/generated";
import {
	Edit,
	Plus,
	Eye,
	ArrowLeft,
	Trash2,
	Search,
	X,
	BarChart3,
} from "lucide-react";

export default function SagaDetail() {
	const { storyId } = useParams() as { storyId: string };
	const {
		storyChapterList,
		mutateStoryChapterList,
		isLoadingStoryChapterList,
	} = getSagaById(storyId);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingChapter, setEditingChapter] =
		useState<StoryChapterResponseDto | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingChapterId, setDeletingChapterId] = useState<string | null>(
		null,
	);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

	const [form, setForm] = useState<StoryChapterCreateRequestDto>({
		touristSpotId: "",
		chapterNumber: "",
		chapterTitle: "",
		chapterDesc: "",
		chapterImage: "",
		characterNameList: [],
		realWorldImage: "",
		chapterVideoUrl: "",
		chapterVideoMobileUrl: "",
		chapterPdfUrl: "",
		isUnlocked: true,
	});

	// Quick filters configuration
	const quickFilters = [
		{ id: "unlocked", label: "Unlocked", icon: "🔓" },
		{ id: "locked", label: "Locked", icon: "🔒" },
		{ id: "no-characters", label: "No Characters", icon: "👤" },
		{ id: "many-characters", label: "5+ Characters", icon: "👥" },
		{ id: "missing-image", label: "No Chapter Image", icon: "🖼️" },
		{ id: "missing-video", label: "No Video", icon: "🎥" },
		{ id: "has-pdf", label: "Has PDF", icon: "📄" },
		{ id: "no-spot", label: "No Tourist Spot", icon: "📍" },
	];

	// Filtered and searched chapters
	const filteredChapters = useMemo(() => {
		if (!storyChapterList) return [];

		let filtered = [...storyChapterList];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(chapter) =>
					chapter.chapterTitle?.toLowerCase().includes(query) ||
					chapter.chapterDesc?.toLowerCase().includes(query) ||
					chapter.chapterNumber?.toLowerCase().includes(query) ||
					chapter.characterNameList?.some((char: string) =>
						char.toLowerCase().includes(query),
					) ||
					chapter.touristSpotId?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((chapter) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "unlocked":
							return chapter.isUnlocked === true;
						case "locked":
							return chapter.isUnlocked === false;
						case "no-characters":
							return (
								!chapter.characterNameList ||
								chapter.characterNameList.length === 0
							);
						case "many-characters":
							return (
								chapter.characterNameList &&
								chapter.characterNameList.length >= 5
							);
						case "missing-image":
							return !chapter.chapterImage;
						case "missing-video":
							return !chapter.chapterVideoUrl && !chapter.chapterVideoMobileUrl;
						case "has-pdf":
							return !!chapter.chapterPdfUrl;
						case "no-spot":
							return !chapter.touristSpotId;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [storyChapterList, searchQuery, activeFilters]);

	// Summary statistics
	const stats = useMemo(() => {
		if (!storyChapterList)
			return {
				total: 0,
				unlocked: 0,
				withCharacters: 0,
				withVideos: 0,
				withPDFs: 0,
				missingImages: 0,
			};

		const chapters = storyChapterList;

		return {
			total: chapters.length,
			unlocked: chapters.filter((c: StoryChapterResponseDto) => c.isUnlocked)
				.length,
			withCharacters: chapters.filter(
				(c: StoryChapterResponseDto) =>
					c.characterNameList && c.characterNameList.length > 0,
			).length,
			withVideos: chapters.filter(
				(c: StoryChapterResponseDto) =>
					c.chapterVideoUrl || c.chapterVideoMobileUrl,
			).length,
			withPDFs: chapters.filter((c: StoryChapterResponseDto) => c.chapterPdfUrl)
				.length,
			missingImages: chapters.filter(
				(c: StoryChapterResponseDto) => !c.chapterImage,
			).length,
		};
	}, [storyChapterList]);

	const resetForm = useCallback(() => {
		setForm({
			touristSpotId: "",
			chapterNumber: "",
			chapterTitle: "",
			chapterDesc: "",
			chapterImage: "",
			characterNameList: [],
			realWorldImage: "",
			chapterVideoUrl: "",
			chapterVideoMobileUrl: "",
			chapterPdfUrl: "",
			isUnlocked: true,
		});
		setEditingChapter(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.touristSpotId.trim() ||
			!form.chapterNumber.trim() ||
			!form.chapterTitle.trim()
		) {
			alert(
				"Please fill in required fields: Tourist Spot ID, Chapter Number, and Chapter Title",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest(`/api/stories/create-chapter/${storyId}`, form);
			resetForm();
			setShowCreateModal(false);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to create chapter:", error);
			alert("Failed to create chapter. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (
			!editingChapter ||
			!form.touristSpotId.trim() ||
			!form.chapterNumber.trim() ||
			!form.chapterTitle.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			const updateData: StoryChapterUpdateRequestDto = {
				...form,
				storyChapterId: editingChapter.storyChapterId,
				delFlag: false,
				updUserId: "admin",
			};
			await makeApiRequest(
				`/api/stories/update-chapter/${editingChapter.storyChapterId}`,
				updateData,
				"PUT",
			);
			resetForm();
			setShowCreateModal(false);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to update chapter:", error);
			alert("Failed to update chapter. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (chapter: StoryChapterResponseDto) => {
		setEditingChapter(chapter);
		setForm({
			touristSpotId: chapter.touristSpotId || "",
			chapterNumber: chapter.chapterNumber || "",
			chapterTitle: chapter.chapterTitle || "",
			chapterDesc: chapter.chapterDesc || "",
			chapterImage: chapter.chapterImage || "",
			characterNameList: chapter.characterNameList || [],
			realWorldImage: chapter.realWorldImage || "",
			chapterVideoUrl: chapter.chapterVideoUrl || "",
			chapterVideoMobileUrl: chapter.chapterVideoMobileUrl || "",
			chapterPdfUrl: chapter.chapterPdfUrl || "",
			isUnlocked: chapter.isUnlocked !== undefined ? chapter.isUnlocked : true,
		});
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleCharacterListChange = (value: string) => {
		const characters = value
			.split(",")
			.map((char) => char.trim())
			.filter((char) => char.length > 0);
		setForm({ ...form, characterNameList: characters });
	};

	const handleDelete = async (chapterId: string, chapterTitle: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the chapter "${chapterTitle}"? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingChapterId(chapterId);
		try {
			await makeApiRequest(
				`/api/stories/delete-chapter/${chapterId}`,
				{},
				"DELETE",
			);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to delete chapter:", error);
			alert(
				`Failed to delete chapter: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingChapterId(null);
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
	const toggleChapterSelection = (chapterId: string) => {
		setSelectedChapters((prev) =>
			prev.includes(chapterId)
				? prev.filter((id) => id !== chapterId)
				: [...prev, chapterId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedChapters.length === filteredChapters.length) {
			setSelectedChapters([]);
		} else {
			setSelectedChapters(filteredChapters.map((c) => c.storyChapterId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedChapters.length} selected chapters? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedChapters.map((chapterId) =>
					makeApiRequest(
						`/api/stories/delete-chapter/${chapterId}`,
						{},
						"DELETE",
					),
				),
			);
			setSelectedChapters([]);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to delete chapters:", error);
			alert("Failed to delete some chapters. Please try again.");
		}
	};

	if (isLoadingStoryChapterList) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading chapters...</div>
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
							href="/v2/admin/stories"
							className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
							title="Back to Stories"
						>
							<ArrowLeft size={18} />
						</a>
						<div>
							<h1 className="text-3xl font-bold text-charcoal">
								Chapter Management
							</h1>
							<p className="text-warmGrey3 mt-1">
								Managing chapters for Story ID:{" "}
								<span className="font-medium text-charcoal">{storyId}</span>
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Add Chapter
					</button>
				</div>

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">
								Total Chapters
							</span>
						</div>
						<div className="text-2xl font-bold text-charcoal">
							{stats.total}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🔓</span>
							<span className="text-sm font-medium text-warmGrey3">
								Unlocked
							</span>
						</div>
						<div className="text-2xl font-bold text-green-600">
							{stats.unlocked}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">👥</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Characters
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withCharacters}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">🎥</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Videos
							</span>
						</div>
						<div className="text-2xl font-bold text-blue-600">
							{stats.withVideos}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📄</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ PDFs
							</span>
						</div>
						<div className="text-2xl font-bold text-mustard">
							{stats.withPDFs}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⚠️</span>
							<span className="text-sm font-medium text-warmGrey3">
								Missing Images
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.missingImages}
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
								placeholder="Search chapters by title, description, number, characters, or tourist spot ID..."
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
							Showing {filteredChapters.length} of {stats.total} chapters
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedChapters.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedChapters.length} chapters selected
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
								onClick={() => setSelectedChapters([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Chapters Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-4 py-4 text-left font-semibold">
										<input
											type="checkbox"
											checked={
												selectedChapters.length === filteredChapters.length &&
												filteredChapters.length > 0
											}
											onChange={toggleSelectAll}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</th>
									<th className="px-6 py-4 text-left font-semibold">Chapter</th>
									<th className="px-6 py-4 text-left font-semibold">Title</th>
									<th className="px-6 py-4 text-left font-semibold">
										Tourist Spot
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Characters
									</th>
									<th className="px-6 py-4 text-left font-semibold">Status</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredChapters.map((chapter, index) => (
									<tr
										key={chapter.storyChapterId}
										className={`${
											index % 2 === 0 ? "bg-white" : "bg-warmGrey"
										} ${
											selectedChapters.includes(chapter.storyChapterId)
												? "ring-2 ring-blue-200"
												: ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={selectedChapters.includes(
													chapter.storyChapterId,
												)}
												onChange={() =>
													toggleChapterSelection(chapter.storyChapterId)
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{chapter.chapterNumber}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="font-medium text-charcoal">
												{chapter.chapterTitle}
											</div>
											<div className="max-w-xs truncate text-sm text-warmGrey3">
												{chapter.chapterDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
												{chapter.touristSpotId}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-charcoal">
												{chapter.characterNameList?.length > 0
													? chapter.characterNameList.join(", ")
													: "No characters"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${
													chapter.isUnlocked
														? "bg-green-100 text-green-800"
														: "bg-red text-warmGrey"
												}`}
											>
												{chapter.isUnlocked ? "Unlocked" : "Locked"}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(chapter)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Chapter"
													disabled={deletingChapterId !== null}
												>
													<Edit size={16} />
												</button>
												<button
													type="button"
													onClick={() =>
														handleDelete(
															chapter.storyChapterId,
															chapter.chapterTitle,
														)
													}
													className={`rounded-lg p-2 transition-all ${
														deletingChapterId === chapter.storyChapterId
															? "bg-red-200 text-red-600 cursor-not-allowed"
															: "bg-red-100 text-red-700 hover:bg-red-200"
													}`}
													title="Delete Chapter"
													disabled={deletingChapterId !== null}
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filteredChapters.length === 0 && (
									<tr>
										<td
											colSpan={7}
											className="px-6 py-8 text-center text-charcoal"
										>
											{storyChapterList?.length === 0
												? "No chapters found. Create your first chapter to get started."
												: "No chapters match your current filters."}
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
									{editingChapter ? "Edit Chapter" : "Create New Chapter"}
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
							{editingChapter && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Chapter Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Chapter ID:</span>{" "}
													{editingChapter.storyChapterId}
												</div>
												<div>
													<span className="font-medium">Story ID:</span>{" "}
													{editingChapter.storyId}
												</div>
												<div>
													<span className="font-medium">Tourist Spot ID:</span>{" "}
													{editingChapter.touristSpotId}
												</div>
												<div>
													<span className="font-medium">Saga Name:</span>{" "}
													{editingChapter.sagaName}
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps
											</h4>
											<div className="text-sm space-y-1">
												{editingChapter.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingChapter.insDateTime &&
														!Number.isNaN(
															Date.parse(editingChapter.insDateTime),
														)
															? new Date(
																	editingChapter.insDateTime,
																).toLocaleString()
															: editingChapter.insDateTime || "N/A"}
													</div>
												)}
												{editingChapter.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingChapter.updDateTime &&
														!Number.isNaN(
															Date.parse(editingChapter.updDateTime),
														)
															? new Date(
																	editingChapter.updDateTime,
																).toLocaleString()
															: editingChapter.updDateTime || "N/A"}
													</div>
												)}
												{editingChapter.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingChapter.insUserId}
													</div>
												)}
												{editingChapter.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingChapter.updUserId}
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🎬 Media URLs
											</h4>
											<div className="text-sm space-y-1">
												{editingChapter.chapterImage && (
													<div>
														<span className="font-medium">
															📷 Chapter Image:
														</span>
														<div className="truncate text-green-600">
															{editingChapter.chapterImage}
														</div>
													</div>
												)}
												{editingChapter.realWorldImage && (
													<div>
														<span className="font-medium">🌍 Real World:</span>
														<div className="truncate text-blue-600">
															{editingChapter.realWorldImage}
														</div>
													</div>
												)}
												{editingChapter.chapterVideoUrl && (
													<div>
														<span className="font-medium">
															🎥 Desktop Video:
														</span>
														<div className="truncate text-purple-600">
															{editingChapter.chapterVideoUrl}
														</div>
													</div>
												)}
												{editingChapter.chapterVideoMobileUrl && (
													<div>
														<span className="font-medium">
															📱 Mobile Video:
														</span>
														<div className="truncate text-purple-600">
															{editingChapter.chapterVideoMobileUrl}
														</div>
													</div>
												)}
												{editingChapter.chapterPdfUrl && (
													<div>
														<span className="font-medium">📄 PDF:</span>
														<div className="truncate text-red-600">
															{editingChapter.chapterPdfUrl}
														</div>
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												👥 Characters
											</h4>
											<div className="text-sm space-y-1">
												{editingChapter.characterNameList &&
												editingChapter.characterNameList.length > 0 ? (
													<div className="space-y-1">
														<div>
															<span className="font-medium">Count:</span>{" "}
															{editingChapter.characterNameList.length}
														</div>
														{editingChapter.characterNameList.map(
															(char, idx) => (
																<div
																	key={`char-${editingChapter.storyChapterId}-${char}-${idx}`}
																	className="text-blue-600"
																>
																	• {char}
																</div>
															),
														)}
													</div>
												) : (
													<div className="text-gray-500">
														No characters assigned
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Status & Settings */}
									<div className="mt-4 grid grid-cols-2 gap-4">
										<div>
											<h4 className="font-medium text-charcoal">⚙️ Settings</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Unlocked:</span>{" "}
													{editingChapter.isUnlocked ? "✅ Yes" : "❌ No"}
												</div>
												<div>
													<span className="font-medium">Del Flag:</span>{" "}
													{editingChapter.delFlag ? "❌ Deleted" : "✅ Active"}
												</div>
											</div>
										</div>
									</div>

									{/* Raw JSON Data */}
									<details className="mt-4">
										<summary className="font-medium text-purple-600 cursor-pointer">
											🔍 Raw JSON Data
										</summary>
										<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
											{JSON.stringify(editingChapter, null, 2)}
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
											htmlFor="touristSpotId"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Tourist Spot ID *
										</label>
										<input
											id="touristSpotId"
											type="text"
											value={form.touristSpotId}
											onChange={(e) =>
												setForm({ ...form, touristSpotId: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter tourist spot ID"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterNumber"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Number *
										</label>
										<input
											id="chapterNumber"
											type="text"
											value={form.chapterNumber}
											onChange={(e) =>
												setForm({ ...form, chapterNumber: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Prologue, Chapter 1"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterTitle"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Title *
										</label>
										<input
											id="chapterTitle"
											type="text"
											value={form.chapterTitle}
											onChange={(e) =>
												setForm({ ...form, chapterTitle: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter chapter title"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Description
										</label>
										<textarea
											id="chapterDesc"
											value={form.chapterDesc}
											onChange={(e) =>
												setForm({ ...form, chapterDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter chapter description"
										/>
									</div>

									<div>
										<label
											htmlFor="characterNameList"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Characters (comma-separated)
										</label>
										<input
											id="characterNameList"
											type="text"
											value={form.characterNameList.join(", ")}
											onChange={(e) =>
												handleCharacterListChange(e.target.value)
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Sakura, Takeshi, Yuki"
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
											htmlFor="chapterImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Image URL
										</label>
										<input
											id="chapterImage"
											type="url"
											value={form.chapterImage}
											onChange={(e) =>
												setForm({ ...form, chapterImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter-image.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="realWorldImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Real World Image URL
										</label>
										<input
											id="realWorldImage"
											type="url"
											value={form.realWorldImage}
											onChange={(e) =>
												setForm({ ...form, realWorldImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/real-world-image.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterVideoUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Desktop Video URL
										</label>
										<input
											id="chapterVideoUrl"
											type="url"
											value={form.chapterVideoUrl}
											onChange={(e) =>
												setForm({ ...form, chapterVideoUrl: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter-video.mp4"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterVideoMobileUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Mobile Video URL
										</label>
										<input
											id="chapterVideoMobileUrl"
											type="url"
											value={form.chapterVideoMobileUrl}
											onChange={(e) =>
												setForm({
													...form,
													chapterVideoMobileUrl: e.target.value,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/mobile-video.mp4"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterPdfUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											PDF URL
										</label>
										<input
											id="chapterPdfUrl"
											type="url"
											value={form.chapterPdfUrl}
											onChange={(e) =>
												setForm({ ...form, chapterPdfUrl: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter.pdf"
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
												checked={form.isUnlocked}
												onChange={(e) =>
													setForm({ ...form, isUnlocked: e.target.checked })
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
											<span className="text-sm font-medium text-charcoal">
												Is Unlocked
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
									onClick={editingChapter ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingChapter
											? "Update Chapter"
											: "Create Chapter"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
