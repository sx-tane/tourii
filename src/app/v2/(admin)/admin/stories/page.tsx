"use client";
import { useState, useCallback, useMemo } from "react";
import { useSagas } from "@/hooks";
import { makeApiRequest } from "@/utils/api-helpers";
import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import { Edit, Eye, Trash2, BarChart3 } from "lucide-react";
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
import { StoryForm, StoryDetails } from "@/components/admin/stories";

export default function AdminStories() {
	const { 
		data: sagas, 
		isLoading: isLoadingSagas, 
		mutate: mutateSagas 
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
	const quickFilters: QuickFilter[] = [
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
	const statsCards: StatCard[] = useMemo(() => {
		if (!sagas) {
			return [
				{ label: "Total", value: 0, icon: BarChart3, color: "text-blue-600" },
				{ label: "Prologue", value: 0, icon: "📖", className: "text-blue-600" },
				{ label: "Main", value: 0, icon: "📚", className: "text-green-600" },
				{ label: "Selected", value: 0, icon: "⭐", className: "text-mustard" },
				{ label: "w/ Chapters", value: 0, icon: "📄", className: "text-purple-600" },
				{ label: "Missing Media", value: 0, icon: "⚠️", className: "text-red-600" },
			];
		}

		const total = sagas.length;
		const prologue = sagas.filter((s) => s.isPrologue).length;
		const mainStory = sagas.filter((s) => !s.isPrologue).length;
		const selected = sagas.filter((s) => s.isSelected).length;
		const withChapters = sagas.filter(
			(s) => s.chapterList && s.chapterList.length > 0,
		).length;
		const missingMedia = sagas.filter((s) => !s.backgroundMedia || !s.mapImage).length;

		return [
			{ label: "Total", value: total, icon: BarChart3, color: "text-blue-600" },
			{ label: "Prologue", value: prologue, icon: "📖", className: "text-blue-600" },
			{ label: "Main", value: mainStory, icon: "📚", className: "text-green-600" },
			{ label: "Selected", value: selected, icon: "⭐", className: "text-mustard" },
			{ label: "w/ Chapters", value: withChapters, icon: "📄", className: "text-purple-600" },
			{ label: "Missing Media", value: missingMedia, icon: "⚠️", className: "text-red-600" },
		];
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
			await mutateSagas();
		} catch (error) {
			console.error("Failed to delete stories:", error);
			alert("Failed to delete some stories. Please try again.");
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
	const columns: TableColumn<StoryResponseDto>[] = [
		{
			key: "name",
			header: "Story Name",
			render: (story) => (
				<div className="font-semibold text-charcoal">{story.sagaName}</div>
			),
		},
		{
			key: "description",
			header: "Description",
			render: (story) => (
				<div className="max-w-xs truncate text-sm text-charcoal">
					{story.sagaDesc || "No description"}
				</div>
			),
		},
		{
			key: "location",
			header: "Location",
			render: (story) => (
				<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
					{story.location || "N/A"}
				</span>
			),
		},
		{
			key: "chapters",
			header: "Chapters",
			render: (story) => (
				<span className="text-sm text-charcoal">
					{story.chapterList?.length || 0} chapters
				</span>
			),
		},
		{
			key: "type",
			header: "Type",
			render: (story) => (
				<span
					className={`rounded-full px-2 py-1 text-xs font-medium ${
						story.isPrologue
							? "bg-blue-100 text-blue-800"
							: "bg-green-100 text-green-800"
					}`}
				>
					{story.isPrologue ? "Prologue" : "Main Story"}
				</span>
			),
		},
		{
			key: "actions",
			header: "Actions",
			render: (story) => (
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
							deletingStoryId !== null ? "pointer-events-none opacity-50" : ""
						}`}
						title="Manage Chapters"
					>
						<Eye size={16} />
					</a>
					<button
						type="button"
						onClick={() => handleDelete(story.storyId, story.sagaName)}
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
			),
		},
	];

	if (isLoadingSagas) {
		return (
			<AdminLayout title="Story Management">
				<div className="text-center text-charcoal">Loading stories...</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout
			title="Story Management"
			description="Manage your tourism content platform efficiently"
			onCreateClick={openCreateModal}
			createButtonText="Create New Story"
		>
			{/* Summary Statistics Cards */}
			<StatsCards stats={statsCards} />

			{/* Search and Filters */}
			<SearchAndFilters
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="Search stories by name, description, or location..."
				quickFilters={quickFilters}
				activeFilters={activeFilters}
				onFilterToggle={toggleFilter}
				onClearAll={clearAllFilters}
				resultsCount={filteredStories.length}
				totalCount={sagas?.length || 0}
			/>

			{/* Bulk Actions Bar */}
			<BulkActions
				selectedCount={selectedStories.length}
				onClear={() => setSelectedStories([])}
				actions={bulkActions}
			/>

			{/* Stories Table */}
			<DataTable
				columns={columns}
				data={filteredStories}
				selectedIds={selectedStories}
				onToggleSelect={toggleStorySelection}
				onToggleSelectAll={toggleSelectAll}
				getItemId={(story) => story.storyId}
				emptyMessage={
					sagas?.length === 0
						? "No stories found. Create your first story to get started."
						: "No stories match your current filters."
				}
			/>

			{/* Create/Edit Modal */}
			<AdminModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				title={editingStory ? "Edit Story" : "Create New Story"}
				isSubmitting={isSubmitting}
				onSubmit={editingStory ? handleUpdate : handleCreate}
				isEdit={!!editingStory}
			>
				{/* Show comprehensive data when editing */}
				{editingStory && <StoryDetails story={editingStory} />}

				{/* Story Form */}
				<StoryForm
					form={form}
					onChange={setForm}
					isSubmitting={isSubmitting}
				/>
			</AdminModal>
		</AdminLayout>
	);
}