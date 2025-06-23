"use client";
import type { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import {
	QuestBulkActions,
	QuestCreateEditModal,
	QuestSearchFilters,
	QuestStatsGrid,
	QuestTable,
} from "@/components/admin";
import { useQuests } from "@/hooks";
import { useCreateQuest, useDeleteQuest, useUpdateQuest } from "@/hooks/admin";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function AdminQuests() {
	const {
		data: quests,
		isLoading: isLoadingQuests,
		mutate: mutateQuests,
	} = useQuests("/api/quests?page=1&limit=100");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingQuest, setEditingQuest] = useState<QuestResponseDto | null>(
		null,
	);
	// Admin Mutation Hooks
	const { trigger: createQuest, isMutating: isCreating } = useCreateQuest(
		() => {
			mutateQuests();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: updateQuest, isMutating: isUpdating } = useUpdateQuest(
		() => {
			mutateQuests();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: deleteQuest, isMutating: isDeleting } = useDeleteQuest(
		() => {
			mutateQuests();
			setSelectedQuests([]);
		},
	);

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
	const quickFilters = [
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
		if (!quests?.quests) return [] as QuestResponseDto[];

		let filtered = [...quests.quests] as QuestResponseDto[];

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
	const stats = useMemo(() => {
		if (!quests?.quests)
			return {
				total: 0,
				unlocked: 0,
				premium: 0,
				withTasks: 0,
				totalPoints: 0,
				noTouristSpot: 0,
			};

		const questList = quests.quests;
		const totalPoints = questList.reduce(
			(sum, q) => sum + (q.totalMagatamaPointAwarded || 0),
			0,
		);

		return {
			total: questList.length,
			unlocked: questList.filter((q) => q.isUnlocked).length,
			premium: questList.filter((q) => q.isPremium).length,
			withTasks: questList.filter((q) => q.tasks && q.tasks.length > 0).length,
			totalPoints,
			noTouristSpot: questList.filter((q) => !q.touristSpot).length,
		};
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

		await createQuest(form);
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

		const updateData = {
			...form,
			questId: editingQuest.questId,
			updUserId: "admin-user", // TODO: Replace with actual user ID from auth
		};
		await updateQuest(updateData);
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
			rewardType: "UNKNOWN" as QuestCreateRequestDto.rewardType, // Default as it's not in response
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
				selectedQuests.map((questId) => deleteQuest({ questId })),
			);
		} catch (error) {
			console.error("Failed to delete quests:", error);
			alert("Failed to delete some quests. Please try again.");
		}
	};

	if (isLoadingQuests) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading quests...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-charcoal">Quest Management</h1>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Create New Quest
					</button>
				</div>

				<QuestStatsGrid stats={stats} />

				<QuestSearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					quickFilters={quickFilters}
					totalQuests={stats.total}
					filteredCount={filteredQuests.length}
				/>

				<QuestBulkActions
					selectedCount={selectedQuests.length}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedQuests([])}
				/>

				<QuestTable
					quests={filteredQuests}
					selectedQuests={selectedQuests}
					onToggleSelection={toggleQuestSelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					getQuestTypeColor={getQuestTypeColor}
				/>

				<QuestCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingQuest={editingQuest}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingQuest ? handleUpdate : handleCreate}
					isSubmitting={isCreating || isUpdating}
				/>
			</div>
		</div>
	);
}
