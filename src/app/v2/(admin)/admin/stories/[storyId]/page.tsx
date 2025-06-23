"use client";
import type {
	StoryChapterCreateRequestDto,
	StoryChapterResponseDto,
	StoryChapterUpdateRequestDto,
} from "@/api/generated";
import {
	StoryChapterBulkActions,
	StoryChapterCreateEditModal,
	StoryChapterSearchFilters,
	StoryChapterStatsGrid,
	StoryChapterTable,
} from "@/components/admin/stories";
import { useSagaById } from "@/hooks";
import {
	useCreateStoryChapter,
	useDeleteStoryChapter,
	useUpdateStoryChapter,
} from "@/hooks/admin";
import { ArrowLeft, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useId, useMemo, useState } from "react";

export default function SagaDetail() {
	const { storyId } = useParams() as { storyId: string };
	const { storyChapterList, mutate, isLoading } = useSagaById(storyId);

	// Admin Mutation Hooks
	const { trigger: createChapter, isMutating: isCreating } =
		useCreateStoryChapter(storyId, () => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		});

	const { trigger: updateChapter, isMutating: isUpdating } =
		useUpdateStoryChapter(() => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		});

	const { trigger: deleteChapter, isMutating: isDeleting } =
		useDeleteStoryChapter(() => {
			mutate();
			setDeletingChapterId(null);
		});

	const touristSpotIdId = useId();
	const chapterNumberId = useId();
	const chapterTitleId = useId();
	const chapterDescId = useId();
	const characterNameListId = useId();
	const chapterImageId = useId();
	const realWorldImageId = useId();
	const chapterVideoUrlId = useId();
	const chapterVideoMobileUrlId = useId();
	const chapterPdfUrlId = useId();

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingChapter, setEditingChapter] =
		useState<StoryChapterResponseDto | null>(null);
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

		await createChapter(form);
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

		const updateData: StoryChapterUpdateRequestDto & {
			storyChapterId: string;
		} = {
			...form,
			storyChapterId: editingChapter.storyChapterId,
			delFlag: false,
			updUserId: "admin",
		};
		await updateChapter(updateData);
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
		await deleteChapter({ chapterId });
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
				selectedChapters.map((chapterId) => deleteChapter({ chapterId })),
			);
			setSelectedChapters([]);
		} catch (error) {
			console.error("Failed to delete chapters:", error);
			alert("Failed to delete some chapters. Please try again.");
		}
	};

	const isSubmitting = isCreating || isUpdating;

	if (isLoading) {
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
				<StoryChapterStatsGrid stats={stats} />

				{/* Search and Filters */}
				<StoryChapterSearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					quickFilters={quickFilters}
					totalCount={stats.total}
					filteredCount={filteredChapters.length}
				/>

				{/* Bulk Actions Bar */}
				<StoryChapterBulkActions
					selectedChapters={selectedChapters}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedChapters([])}
				/>

				{/* Chapters Table */}
				<StoryChapterTable
					chapters={filteredChapters}
					selectedChapters={selectedChapters}
					deletingChapterId={deletingChapterId}
					storyId={storyId}
					onToggleSelection={toggleChapterSelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>

				{/* Create/Edit Modal */}
				<StoryChapterCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingChapter={editingChapter}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingChapter ? handleUpdate : handleCreate}
					isSubmitting={isSubmitting}
					onCharacterListChange={handleCharacterListChange}
				/>
			</div>
		</div>
	);
}
