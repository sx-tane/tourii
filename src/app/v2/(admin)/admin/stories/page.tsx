"use client";
import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import {
	StoryBulkActions,
	StoryCreateEditModal,
	StorySearchFilters,
	StoryStatsGrid,
	StoryTable,
} from "@/components/admin";
import { useSagas } from "@/hooks";
import { useCreateStory, useDeleteStory, useUpdateStory } from "@/hooks/admin";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function AdminStories() {
	const {
		data: sagas,
		isLoading: isLoadingSagas,
		mutate: mutateSagas,
	} = useSagas();

	// Admin Mutation Hooks
	const { trigger: createSaga, isMutating: isCreating } = useCreateStory(() => {
		mutateSagas();
		resetForm();
		setShowCreateModal(false);
	});

	const { trigger: updateSaga, isMutating: isUpdating } = useUpdateStory(() => {
		mutateSagas();
		resetForm();
		setShowCreateModal(false);
	});

	const { trigger: deleteSaga, isMutating: isDeleting } = useDeleteStory(() => {
		mutateSagas();
		setDeletingStoryId(null);
	});

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingStory, setEditingStory] = useState<StoryResponseDto | null>(
		null,
	);
	const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedStories, setSelectedStories] = useState<string[]>([]);

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

		await createSaga(form);
	};

	const handleUpdate = async () => {
		if (!editingStory || !form.sagaName.trim() || !form.sagaDesc.trim()) {
			alert("Please fill in required fields");
			return;
		}

		await updateSaga({
			...form,
			sagaId: editingStory.storyId,
			delFlag: false,
			updUserId: "admin",
		});
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
				`Are you sure you want to delete the saga "${sagaName}" and all its chapters? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingStoryId(storyId);
		await deleteSaga({ storyId });
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
				`Are you sure you want to delete ${selectedStories.length} selected sagas? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedStories.map((storyId) => deleteSaga({ storyId })),
			);
			setSelectedStories([]);
		} catch (error) {
			console.error("Failed to delete sagas:", error);
			alert("Failed to delete some sagas. Please try again.");
		}
	};

	const isSubmitting = isCreating || isUpdating;

	if (isLoadingSagas) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading sagas...</div>
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

				<StoryStatsGrid stats={stats} />

				<StorySearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					filteredCount={filteredStories.length}
					totalStories={stats.total}
					quickFilters={quickFilters}
				/>

				<StoryBulkActions
					selectedCount={selectedStories.length}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedStories([])}
				/>

				<StoryTable
					stories={filteredStories}
					selectedStories={selectedStories}
					onToggleSelection={toggleStorySelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					onDelete={handleDelete}
					deletingStoryId={deletingStoryId}
				/>

				<StoryCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingStory={editingStory}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingStory ? handleUpdate : handleCreate}
					isSubmitting={isSubmitting}
				/>
			</div>
		</div>
	);
}
