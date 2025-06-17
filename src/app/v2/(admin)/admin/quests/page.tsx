"use client";
import { useState, useCallback } from "react";
import { getQuests } from "@/hooks/quests/getQuests";
import { makeApiRequest } from "@/utils/api-helpers";
import type { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import { Edit, Plus, Eye, MapPin, Star, Trophy, Users } from "lucide-react";

export default function AdminQuests() {
	const { quests, isLoadingQuests, mutateQuests } = getQuests("/api/quests");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingQuest, setEditingQuest] = useState<QuestResponseDto | null>(
		null,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-red/90 transition-all"
					>
						<Plus size={18} />
						Create New Quest
					</button>
				</div>

				{/* Quests Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
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
								{quests?.quests?.map((quest, index) => (
									<tr
										key={quest.questId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
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
												{quest.isUnlocked && (
													<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
														<Star size={10} />
														Unlocked
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
												{quest.tasks && quest.tasks.length > 0 && (
													<a
														href={`/v2/admin/quests/${quest.questId}`}
														className="rounded-lg bg-mustard p-2 text-charcoal hover:bg-mustard/80 transition-all inline-flex items-center justify-center"
														title="Manage Tasks"
													>
														<Eye size={16} />
													</a>
												)}
											</div>
										</td>
									</tr>
								)) || (
									<tr>
										<td
											colSpan={8}
											className="px-6 py-8 text-center text-charcoal"
										>
											No quests found. Create your first quest to get started.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
						<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
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
											htmlFor="questName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Name *
										</label>
										<input
											id="questName"
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
											htmlFor="questDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Description *
										</label>
										<textarea
											id="questDesc"
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
											htmlFor="questImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Image URL
										</label>
										<input
											id="questImage"
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
											htmlFor="questType"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Quest Type *
										</label>
										<select
											id="questType"
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
											htmlFor="rewardType"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Reward Type *
										</label>
										<select
											id="rewardType"
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
											id="magatamaPoints"
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
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-red/90 disabled:opacity-50"
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
