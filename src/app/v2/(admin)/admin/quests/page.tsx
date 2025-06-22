"use client";
import type { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import { useQuests } from "@/hooks";
import { makeApiRequest } from "@/utils/api-helpers";
import {
	BarChart3,
	Edit,
	Eye,
	ExternalLink,
	Lock,
	MapPin,
	Plus,
	Search,
	Star,
	Trash2,
	Trophy,
	Users,
	X,
} from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export default function AdminQuests() {
	const touristSpotIdId = useId();
	const questNameId = useId();
	const questDescId = useId();
	const questImageId = useId();
	const questTypeId = useId();
	const rewardTypeId = useId();
	const magatamaPointsId = useId();

	const {
		data: quests,
		isLoading: isLoadingQuests,
		mutate: mutateQuests,
	} = useQuests("/api/quests?page=1&limit=100");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingQuest, setEditingQuest] = useState<QuestResponseDto | null>(
		null,
	);
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

		console.log("Creating quest with data:", form);
		setIsSubmitting(true);
		try {
			const result = await makeApiRequest("/api/quests/create-quest", form);
			console.log("Quest creation successful:", result);
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
				updUserId: "admin-user", // TODO: Replace with actual user ID from auth
			};
			await makeApiRequest(
				"/api/quests/update-quest",
				updateData,
				"POST", // Note: The API uses POST for updates
			);
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

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">
								Total Quests
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
							<span className="text-sm">⭐</span>
							<span className="text-sm font-medium text-warmGrey3">
								Premium
							</span>
						</div>
						<div className="text-2xl font-bold text-mustard">
							{stats.premium}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📋</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Tasks
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withTasks}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">💰</span>
							<span className="text-sm font-medium text-warmGrey3">
								Total Points
							</span>
						</div>
						<div className="text-2xl font-bold text-blue-600">
							{stats.totalPoints}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⚠️</span>
							<span className="text-sm font-medium text-warmGrey3">
								No Spot
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.noTouristSpot}
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
								placeholder="Search quests by name, description, tourist spot, or type..."
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
							Showing {filteredQuests.length} of {stats.total} quests
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedQuests.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedQuests.length} quests selected
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
								onClick={() => setSelectedQuests([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Quests Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-4 py-4 text-left font-semibold">
										<input
											type="checkbox"
											checked={
												selectedQuests.length === filteredQuests.length &&
												filteredQuests.length > 0
											}
											onChange={toggleSelectAll}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Quest Name
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Description
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Tourist Spot
									</th>
									<th className="px-6 py-4 text-left font-semibold">Type</th>
									<th className="px-6 py-4 text-left font-semibold">Rewards</th>
									<th className="px-6 py-4 text-left font-semibold">Status</th>
									<th className="px-6 py-4 text-left font-semibold">Tasks</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredQuests.map((quest, index) => (
									<tr
										key={quest.questId}
										className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
											selectedQuests.includes(quest.questId)
												? "ring-2 ring-blue-200"
												: ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={selectedQuests.includes(quest.questId)}
												onChange={() => toggleQuestSelection(quest.questId)}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{quest.questName}
											</div>
											{quest.questImage && (
												<div className="text-xs text-warmGrey3 mt-1">
													Has image
												</div>
											)}
										</td>
										<td className="px-6 py-4">
											<div className="max-w-xs truncate text-sm text-charcoal">
												{quest.questDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
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
										</td>
										<td className="px-6 py-4">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${getQuestTypeColor(quest.questType)}`}
											>
												{quest.questType.replace(/_/g, " ")}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 text-sm text-charcoal">
												<Trophy size={14} />
												<span className="font-medium">
													{quest.totalMagatamaPointAwarded || 0}
												</span>
												<span className="text-warmGrey3">points</span>
											</div>
										</td>
										<td className="px-6 py-4">
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
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 text-sm text-charcoal">
												<Users size={14} />
												<span>{quest.tasks?.length || 0} tasks</span>
											</div>
										</td>
										<td className="px-6 py-4">
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
												<a
													href={`/v2/quests/${quest.questId}`}
													className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all inline-flex items-center justify-center"
													title="Jump to Quest Page"
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink size={16} />
												</a>
											</div>
										</td>
									</tr>
								))}
							</tbody>
							{filteredQuests.length === 0 && (
								<tbody>
									<tr>
										<td
											colSpan={9}
											className="px-6 py-8 text-center text-charcoal"
										>
											{quests?.quests?.length === 0
												? "No quests found. Create your first quest to get started."
												: "No quests match your current filters."}
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold text-charcoal">
									{editingQuest ? "Edit Quest" : "Create New Quest"}
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
							{editingQuest && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Quest Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers & Status
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Quest ID:</span>{" "}
													{editingQuest.questId}
												</div>
												<div>
													<span className="font-medium">Type:</span>{" "}
													<span
														className={`px-2 py-1 rounded-full text-xs ${
															editingQuest.questType === "TRAVEL_TO_EARN"
																? "bg-green-100 text-green-800"
																: editingQuest.questType === "EARN_TO_TRAVEL"
																	? "bg-blue-100 text-blue-800"
																	: editingQuest.questType === "CAMPAIGN"
																		? "bg-orange-100 text-orange-800"
																		: editingQuest.questType ===
																				"COMMUNITY_EVENT"
																			? "bg-purple-100 text-purple-800"
																			: "bg-gray-100 text-gray-800"
														}`}
													>
														{editingQuest.questType}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-medium">Status:</span>
													{editingQuest.isUnlocked ? (
														<span className="flex items-center gap-1 text-green-600">
															🔓 Unlocked
														</span>
													) : (
														<span className="flex items-center gap-1 text-red-600">
															🔒 Locked
														</span>
													)}
													{editingQuest.isPremium && (
														<span className="flex items-center gap-1 text-yellow-600">
															⭐ Premium
														</span>
													)}
												</div>

												<div>
													<span className="font-medium">Points:</span>{" "}
													<span className="font-bold text-green-600">
														{editingQuest.totalMagatamaPointAwarded || 0}
													</span>
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🏖️ Tourist Spot Info
											</h4>
											<div className="text-sm space-y-1">
												{editingQuest.touristSpot ? (
													<>
														<div>
															<span className="font-medium">Spot ID:</span>{" "}
															{editingQuest.touristSpot.touristSpotId}
														</div>
														<div>
															<span className="font-medium">Spot Name:</span>{" "}
															{editingQuest.touristSpot.touristSpotName}
														</div>
														<div>
															<span className="font-medium">Description:</span>
															<div className="max-h-20 overflow-y-auto text-xs mt-1 p-2 bg-white rounded">
																{editingQuest.touristSpot.touristSpotDesc ||
																	"No description"}
															</div>
														</div>
														<div>
															<span className="font-medium">Best Visit:</span>{" "}
															{editingQuest.touristSpot.bestVisitTime ||
																"Anytime"}
														</div>
													</>
												) : (
													<div className="text-red-600">
														No tourist spot linked
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps & Users
											</h4>
											<div className="text-sm space-y-1">
												{editingQuest.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingQuest.insDateTime &&
														!Number.isNaN(Date.parse(editingQuest.insDateTime))
															? new Date(
																	editingQuest.insDateTime,
																).toLocaleString()
															: editingQuest.insDateTime || "N/A"}
													</div>
												)}
												{editingQuest.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingQuest.updDateTime &&
														!Number.isNaN(Date.parse(editingQuest.updDateTime))
															? new Date(
																	editingQuest.updDateTime,
																).toLocaleString()
															: editingQuest.updDateTime || "N/A"}
													</div>
												)}
												{editingQuest.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingQuest.insUserId}
													</div>
												)}
												{editingQuest.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingQuest.updUserId}
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Quest Image */}
									{editingQuest.questImage && (
										<div className="mt-4 space-y-2">
											<h4 className="font-medium text-charcoal">
												🖼️ Quest Image
											</h4>
											<div className="text-sm">
												<div className="truncate text-blue-600">
													{editingQuest.questImage}
												</div>
											</div>
										</div>
									)}

									{/* Tasks Section */}
									{editingQuest.tasks && editingQuest.tasks.length > 0 && (
										<div className="mt-4">
											<h4 className="font-medium text-charcoal mb-2">
												📋 Quest Tasks ({editingQuest.tasks.length})
											</h4>
											<div className="max-h-40 overflow-y-auto space-y-2">
												{editingQuest.tasks.map((task, idx) => (
													<div
														key={`quest-task-${editingQuest.questId}-${task.taskId}`}
														className="bg-white p-3 rounded border"
													>
														<div className="flex items-center justify-between">
															<div className="font-medium text-sm">
																{idx + 1}. {task.taskName}
															</div>
															<div className="flex items-center gap-2">
																<span className="text-blue-600 text-xs">
																	{task.isUnlocked
																		? "🔓 Unlocked"
																		: "🔒 Locked"}
																</span>
															</div>
														</div>
														{task.taskDesc && (
															<div className="text-xs text-gray-600 mt-1">
																{task.taskDesc}
															</div>
														)}
														<div className="text-xs text-purple-600 mt-1">
															Theme: {task.taskTheme} | Type: {task.taskType}
														</div>
														{task.requiredAction && (
															<div className="text-xs text-blue-600 mt-1 truncate">
																Action: {task.requiredAction}
															</div>
														)}
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
											{JSON.stringify(editingQuest, null, 2)}
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
											htmlFor={touristSpotIdId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Tourist Spot ID *
										</label>
										<input
											id={touristSpotIdId}
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
											htmlFor={questNameId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Name *
										</label>
										<input
											id={questNameId}
											type="text"
											value={form.questName}
											onChange={(e) =>
												setForm({ ...form, questName: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter quest name"
										/>
									</div>

									<div>
										<label
											htmlFor={questDescId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Description *
										</label>
										<textarea
											id={questDescId}
											value={form.questDesc}
											onChange={(e) =>
												setForm({ ...form, questDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter quest description"
										/>
									</div>

									<div>
										<label
											htmlFor={questImageId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Image URL
										</label>
										<input
											id={questImageId}
											type="url"
											value={form.questImage}
											onChange={(e) =>
												setForm({ ...form, questImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/quest-image.jpg"
										/>
									</div>
								</div>

								{/* Settings & Rewards */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Settings & Rewards
									</h3>

									<div>
										<label
											htmlFor={questTypeId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Type *
										</label>
										<select
											id={questTypeId}
											value={form.questType}
											onChange={(e) =>
												setForm({
													...form,
													questType: e.target
														.value as QuestCreateRequestDto.questType,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
										>
											<option value="UNKNOWN">Select quest type</option>
											<option value="TRAVEL_TO_EARN">Travel to Earn</option>
											<option value="EARN_TO_TRAVEL">Earn to Travel</option>
											<option value="CAMPAIGN">Campaign</option>
											<option value="COMMUNITY_EVENT">Community Event</option>
										</select>
									</div>

									<div>
										<label
											htmlFor={rewardTypeId}
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Reward Type *
										</label>
										<select
											id={rewardTypeId}
											value={form.rewardType}
											onChange={(e) =>
												setForm({
													...form,
													rewardType: e.target
														.value as QuestCreateRequestDto.rewardType,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
										>
											<option value="UNKNOWN">Select reward type</option>
											<option value="LOCAL_EXPERIENCES">
												Local Experiences
											</option>
											<option value="CULINARY">Culinary</option>
											<option value="ADVENTURE_NATURE">
												Adventure & Nature
											</option>
											<option value="CULTURAL_COMMUNITY">
												Cultural & Community
											</option>
											<option value="HIDDEN_PERKS">Hidden Perks</option>
											<option value="SURPRISE_TREATS">Surprise Treats</option>
											<option value="BONUS_UPGRADES">Bonus Upgrades</option>
											<option value="SOCIAL_RECOGNITION">
												Social Recognition
											</option>
											<option value="RETURNING_VISITOR_BONUS">
												Returning Visitor Bonus
											</option>
											<option value="ELITE_EXPERIENCES">
												Elite Experiences
											</option>
											<option value="WELLNESS">Wellness</option>
											<option value="SHOPPING">Shopping</option>
											<option value="ENTERTAINMENT">Entertainment</option>
											<option value="TRANSPORT_CONNECTIVITY">
												Transport & Connectivity
											</option>
											<option value="LOCAL_PARTNERSHIPS">
												Local Partnerships
											</option>
										</select>
									</div>

									<div>
										<label
											htmlFor="magatamaPoints"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Magatama Points Awarded
										</label>
										<input
											id={magatamaPointsId}
											type="number"
											value={form.totalMagatamaPointAwarded}
											onChange={(e) =>
												setForm({
													...form,
													totalMagatamaPointAwarded:
														Number.parseInt(e.target.value) || 0,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter points awarded"
											min="0"
										/>
									</div>

									<div className="space-y-3">
										<h4 className="text-md font-semibold text-charcoal">
											Quest Flags
										</h4>
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
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={form.isPremium}
													onChange={(e) =>
														setForm({ ...form, isPremium: e.target.checked })
													}
													className="rounded border-warmGrey2 text-red focus:ring-red"
												/>
												<span className="text-sm font-medium text-charcoal">
													Is Premium
												</span>
											</label>
										</div>
									</div>
								</div>
							</div>

							{/* Show comprehensive data when editing */}
							{editingQuest && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Quest Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Quest ID:</span>{" "}
													{editingQuest.questId}
												</div>
												<div>
													<span className="font-medium">Tourist Spot ID:</span>{" "}
													{editingQuest.touristSpot?.touristSpotId || "N/A"}
												</div>
												<div>
													<span className="font-medium">Quest Type:</span>{" "}
													{editingQuest.questType}
												</div>
												<div>
													<span className="font-medium">Reward Type:</span> N/A
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps
											</h4>
											<div className="text-sm space-y-1">
												{editingQuest.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingQuest.insDateTime &&
														!Number.isNaN(Date.parse(editingQuest.insDateTime))
															? new Date(
																	editingQuest.insDateTime,
																).toLocaleString()
															: editingQuest.insDateTime || "N/A"}
													</div>
												)}
												{editingQuest.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingQuest.updDateTime &&
														!Number.isNaN(Date.parse(editingQuest.updDateTime))
															? new Date(
																	editingQuest.updDateTime,
																).toLocaleString()
															: editingQuest.updDateTime || "N/A"}
													</div>
												)}
												{editingQuest.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingQuest.insUserId}
													</div>
												)}
												{editingQuest.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingQuest.updUserId}
													</div>
												)}
											</div>
											<div className="text-sm space-y-1">
												{editingQuest.tasks &&
													editingQuest.tasks.length > 0 && (
														<div>
															<span className="font-medium">Tasks:</span>{" "}
															{editingQuest.tasks.length}
														</div>
													)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🏖️ Tourist Spot
											</h4>
											<div className="text-sm space-y-1">
												{editingQuest.touristSpot ? (
													<>
														<div>
															<span className="font-medium">Name:</span>{" "}
															{editingQuest.touristSpot.touristSpotName}
														</div>
														<div>
															<span className="font-medium">Description:</span>
															<div className="truncate text-blue-600">
																{editingQuest.touristSpot.touristSpotDesc ||
																	"N/A"}
															</div>
														</div>
														{editingQuest.touristSpot.bestVisitTime && (
															<div>
																<span className="font-medium">Best Visit:</span>{" "}
																{editingQuest.touristSpot.bestVisitTime}
															</div>
														)}
													</>
												) : (
													<div className="text-gray-500">
														No tourist spot assigned
													</div>
												)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												⚙️ Settings & Rewards
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Unlocked:</span>{" "}
													{editingQuest.isUnlocked ? "✅ Yes" : "❌ No"}
												</div>
												<div>
													<span className="font-medium">Premium:</span>{" "}
													{editingQuest.isPremium ? "✅ Yes" : "❌ No"}
												</div>
												<div>
													<span className="font-medium">Points:</span>{" "}
													{editingQuest.totalMagatamaPointAwarded || 0}
												</div>
												<div>
													<span className="font-medium">Status:</span> ✅ Active
												</div>
											</div>
										</div>
									</div>

									{/* Quest Image */}
									{editingQuest.questImage && (
										<div className="mt-4">
											<h4 className="font-medium text-charcoal mb-2">
												🖼️ Quest Image
											</h4>
											<div className="text-sm">
												<div className="truncate text-green-600">
													{editingQuest.questImage}
												</div>
											</div>
										</div>
									)}

									{/* Tasks List */}
									{editingQuest.tasks && editingQuest.tasks.length > 0 && (
										<div className="mt-4">
											<h4 className="font-medium text-charcoal mb-2">
												📋 Tasks ({editingQuest.tasks.length})
											</h4>
											<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
												{editingQuest.tasks.map((task, idx) => (
													<div
														key={`modal-task-${editingQuest.questId}-${task.taskId || idx}`}
														className="flex justify-between py-1 border-b last:border-b-0"
													>
														<span className="text-sm">{task.taskName}</span>
														<div className="flex gap-2 text-xs">
															<span className="text-blue-600">
																{task.taskTheme}
															</span>
															<span className="text-purple-600">
																{task.magatamaPointAwarded || 0}pts
															</span>
														</div>
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
											{JSON.stringify(editingQuest, null, 2)}
										</pre>
									</details>
								</div>
							)}

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
									onClick={editingQuest ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingQuest
											? "Update Quest"
											: "Create Quest"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
