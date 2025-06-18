"use client";
import { useState, useCallback, useMemo } from "react";
import { useQuests } from "@/hooks";
import { makeApiRequest } from "@/utils/api-helpers";
import type { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import { Edit, Eye, MapPin, Star, Trophy, Users, Lock, BarChart3 } from "lucide-react";
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
import { QuestForm, QuestDetails } from "@/components/admin/quests";

export default function AdminQuests() {
	const {
		data: quests,
		isLoading: isLoadingQuests,
		mutate: mutateQuests,
	} = useQuests("/api/quests?page=1&limit=100");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingQuest, setEditingQuest] = useState<QuestResponseDto | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedQuests, setSelectedQuests] = useState<string[]>([]);

	const [form, setForm] = useState<QuestCreateRequestDto>({
		touristSpotId: "",
		questName: "",
		questDesc: "",
		questImage: "",
		questType: "UNKNOWN" as QuestCreateRequestDto.questType,
		isUnlocked: true,
		isPremium: false,
		totalMagatamaPointAwarded: 0,
		rewardType: "UNKNOWN" as QuestCreateRequestDto.rewardType,
		delFlag: false,
	});

	// Quick filters configuration
	const quickFilters: QuickFilter[] = [
		{ id: "unlocked", label: "Unlocked", icon: "🔓" },
		{ id: "locked", label: "Locked", icon: "🔒" },
		{ id: "premium", label: "Premium", icon: "⭐" },
		{ id: "no-tasks", label: "No Tasks", icon: "❌" },
		{ id: "many-tasks", label: "5+ Tasks", icon: "📋" },
		{ id: "high-points", label: "100+ Points", icon: "💰" },
		{ id: "no-image", label: "No Image", icon: "🖼️" },
		{ id: "no-spot", label: "No Tourist Spot", icon: "🏖️" },
	];

	// Filtered and searched quests
	const filteredQuests = useMemo(() => {
		if (!quests?.quests) return [];

		let filtered = [...quests.quests];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(quest) =>
					quest.questName?.toLowerCase().includes(query) ||
					quest.questDesc?.toLowerCase().includes(query) ||
					quest.touristSpot?.touristSpotName?.toLowerCase().includes(query) ||
					quest.questType?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((quest) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "unlocked":
							return quest.isUnlocked === true;
						case "locked":
							return quest.isUnlocked === false;
						case "premium":
							return quest.isPremium === true;
						case "no-tasks":
							return !quest.tasks || quest.tasks.length === 0;
						case "many-tasks":
							return quest.tasks && quest.tasks.length >= 5;
						case "high-points":
							return (
								quest.totalMagatamaPointAwarded &&
								quest.totalMagatamaPointAwarded >= 100
							);
						case "no-image":
							return !quest.questImage;
						case "no-spot":
							return !quest.touristSpot;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [quests?.quests, searchQuery, activeFilters]);

	// Summary statistics
	const statsCards: StatCard[] = useMemo(() => {
		if (!quests?.quests) {
			return [
				{ label: "Total Quests", value: 0, icon: BarChart3, color: "text-blue-600" },
				{ label: "Unlocked", value: 0, icon: "🔓", className: "text-green-600" },
				{ label: "Premium", value: 0, icon: "⭐", className: "text-mustard" },
				{ label: "w/ Tasks", value: 0, icon: "📋", className: "text-purple-600" },
				{ label: "Total Points", value: 0, icon: "💰", className: "text-blue-600" },
				{ label: "No Spot", value: 0, icon: "⚠️", className: "text-red-600" },
			];
		}

		const questList = quests.quests;
		const totalPoints = questList.reduce(
			(sum, q) => sum + (q.totalMagatamaPointAwarded || 0),
			0,
		);

		return [
			{ label: "Total Quests", value: questList.length, icon: BarChart3, color: "text-blue-600" },
			{ label: "Unlocked", value: questList.filter((q) => q.isUnlocked).length, icon: "🔓", className: "text-green-600" },
			{ label: "Premium", value: questList.filter((q) => q.isPremium).length, icon: "⭐", className: "text-mustard" },
			{ label: "w/ Tasks", value: questList.filter((q) => q.tasks && q.tasks.length > 0).length, icon: "📋", className: "text-purple-600" },
			{ label: "Total Points", value: totalPoints, icon: "💰", className: "text-blue-600" },
			{ label: "No Spot", value: questList.filter((q) => !q.touristSpot).length, icon: "⚠️", className: "text-red-600" },
		];
	}, [quests?.quests]);

	const resetForm = useCallback(() => {
		setForm({
			touristSpotId: "",
			questName: "",
			questDesc: "",
			questImage: "",
			questType: "UNKNOWN" as QuestCreateRequestDto.questType,
			isUnlocked: true,
			isPremium: false,
			totalMagatamaPointAwarded: 0,
			rewardType: "UNKNOWN" as QuestCreateRequestDto.rewardType,
			delFlag: false,
		});
		setEditingQuest(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.touristSpotId.trim() ||
			!form.questName.trim() ||
			!form.questDesc.trim()
		) {
			alert(
				"Please fill in required fields: Tourist Spot ID, Quest Name, and Description",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest("/api/quests/create-quest", form);
			resetForm();
			setShowCreateModal(false);
			await mutateQuests();
		} catch (error) {
			console.error("Failed to create quest:", error);
			alert(
				`Failed to create quest: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (
			!editingQuest ||
			!form.touristSpotId.trim() ||
			!form.questName.trim() ||
			!form.questDesc.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			const updateData = {
				...form,
				questId: editingQuest.questId,
				updUserId: "admin-user",
			};
			await makeApiRequest("/api/quests/update-quest", updateData, "POST");
			resetForm();
			setShowCreateModal(false);
			await mutateQuests();
		} catch (error) {
			console.error("Failed to update quest:", error);
			alert("Failed to update quest. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (quest: QuestResponseDto) => {
		setEditingQuest(quest);
		setForm({
			touristSpotId: quest.touristSpot?.touristSpotId || "",
			questName: quest.questName || "",
			questDesc: quest.questDesc || "",
			questImage: quest.questImage || "",
			questType: quest.questType as QuestCreateRequestDto.questType,
			isUnlocked: quest.isUnlocked || false,
			isPremium: quest.isPremium || false,
			totalMagatamaPointAwarded: quest.totalMagatamaPointAwarded || 0,
			rewardType: "UNKNOWN" as QuestCreateRequestDto.rewardType,
			delFlag: false,
		});
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const getQuestTypeColor = (type: string) => {
		switch (type) {
			case "TRAVEL_TO_EARN":
				return "bg-green-100 text-green-800";
			case "EARN_TO_TRAVEL":
				return "bg-blue-100 text-blue-800";
			case "CAMPAIGN":
				return "bg-purple-100 text-purple-800";
			case "COMMUNITY_EVENT":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
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
	const toggleQuestSelection = (questId: string) => {
		setSelectedQuests((prev) =>
			prev.includes(questId)
				? prev.filter((id) => id !== questId)
				: [...prev, questId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedQuests.length === filteredQuests.length) {
			setSelectedQuests([]);
		} else {
			setSelectedQuests(filteredQuests.map((q) => q.questId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedQuests.length} selected quests? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedQuests.map((questId) =>
					makeApiRequest(`/api/quests/${questId}`, {}, "DELETE"),
				),
			);
			setSelectedQuests([]);
			await mutateQuests();
		} catch (error) {
			console.error("Failed to delete quests:", error);
			alert("Failed to delete some quests. Please try again.");
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
	const columns: TableColumn<QuestResponseDto>[] = [
		{
			key: "name",
			header: "Quest Name",
			render: (quest) => (
				<div>
					<div className="font-semibold text-charcoal">{quest.questName}</div>
					{quest.questImage && (
						<div className="text-xs text-warmGrey3 mt-1">Has image</div>
					)}
				</div>
			),
		},
		{
			key: "description",
			header: "Description",
			render: (quest) => (
				<div className="max-w-xs truncate text-sm text-charcoal">
					{quest.questDesc || "No description"}
				</div>
			),
		},
		{
			key: "touristSpot",
			header: "Tourist Spot",
			render: (quest) => (
				<div className="text-sm text-charcoal">
					{quest.touristSpot ? (
						<div className="flex items-center gap-1">
							<MapPin size={14} />
							<span className="font-medium">
								{quest.touristSpot.touristSpotName}
							</span>
						</div>
					) : (
						<span className="text-warmGrey3">Not assigned</span>
					)}
				</div>
			),
		},
		{
			key: "type",
			header: "Type",
			render: (quest) => (
				<span
					className={`rounded-full px-2 py-1 text-xs font-medium ${getQuestTypeColor(quest.questType)}`}
				>
					{quest.questType.replace(/_/g, " ")}
				</span>
			),
		},
		{
			key: "rewards",
			header: "Rewards",
			render: (quest) => (
				<div className="flex items-center gap-1 text-sm text-charcoal">
					<Trophy size={14} />
					<span className="font-medium">
						{quest.totalMagatamaPointAwarded || 0}
					</span>
					<span className="text-warmGrey3">points</span>
				</div>
			),
		},
		{
			key: "status",
			header: "Status",
			render: (quest) => (
				<div className="flex items-center gap-2">
					{quest.isUnlocked ? (
						<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
							<Star size={10} />
							Unlocked
						</span>
					) : (
						<span className="inline-flex items-center gap-1 rounded-full bg-red px-2 py-1 text-xs text-white text-center justify-center">
							<Lock size={10} />
							Locked
						</span>
					)}
					{quest.isPremium && (
						<span className="inline-flex items-center gap-1 rounded-full bg-mustard px-2 py-1 text-xs text-charcoal">
							<Star size={10} />
							Premium
						</span>
					)}
				</div>
			),
		},
		{
			key: "tasks",
			header: "Tasks",
			render: (quest) => (
				<div className="flex items-center gap-1 text-sm text-charcoal">
					<Users size={14} />
					<span>{quest.tasks?.length || 0} tasks</span>
				</div>
			),
		},
		{
			key: "actions",
			header: "Actions",
			render: (quest) => (
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => handleEdit(quest as QuestResponseDto)}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
						title="Edit Quest"
					>
						<Edit size={16} />
					</button>
					<a
						href={`/v2/admin/quests/${quest.questId}`}
						className="rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all inline-flex items-center justify-center"
						title="Manage Tasks"
					>
						<Eye size={16} />
					</a>
				</div>
			),
		},
	];

	if (isLoadingQuests) {
		return (
			<AdminLayout title="Quest Management">
				<div className="text-center text-charcoal">Loading quests...</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout
			title="Quest Management"
			description="Create and manage user quests"
			onCreateClick={openCreateModal}
			createButtonText="Create New Quest"
		>
			{/* Summary Statistics Cards */}
			<StatsCards stats={statsCards} />

			{/* Search and Filters */}
			<SearchAndFilters
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="Search quests by name, description, tourist spot, or type..."
				quickFilters={quickFilters}
				activeFilters={activeFilters}
				onFilterToggle={toggleFilter}
				onClearAll={clearAllFilters}
				resultsCount={filteredQuests.length}
				totalCount={quests?.quests?.length || 0}
			/>

			{/* Bulk Actions Bar */}
			<BulkActions
				selectedCount={selectedQuests.length}
				onClear={() => setSelectedQuests([])}
				actions={bulkActions}
			/>

			{/* Quests Table */}
			<DataTable
				columns={columns}
				data={filteredQuests as QuestResponseDto[]}
				selectedIds={selectedQuests}
				onToggleSelect={toggleQuestSelection}
				onToggleSelectAll={toggleSelectAll}
				getItemId={(quest) => quest.questId}
				emptyMessage={
					quests?.quests?.length === 0
						? "No quests found. Create your first quest to get started."
						: "No quests match your current filters."
				}
			/>

			{/* Create/Edit Modal */}
			<AdminModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				title={editingQuest ? "Edit Quest" : "Create New Quest"}
				isSubmitting={isSubmitting}
				onSubmit={editingQuest ? handleUpdate : handleCreate}
				isEdit={!!editingQuest}
			>
				{/* Show comprehensive data when editing */}
				{editingQuest && <QuestDetails quest={editingQuest} />}

				{/* Quest Form */}
				<QuestForm
					form={form}
					onChange={setForm}
					isSubmitting={isSubmitting}
				/>
			</AdminModal>
		</AdminLayout>
	);
}