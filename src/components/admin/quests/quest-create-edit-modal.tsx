import type { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import { useId } from "react";

interface QuestCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingQuest: QuestResponseDto | null;
	form: QuestCreateRequestDto;
	onFormChange: (updates: Partial<QuestCreateRequestDto>) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
}

export default function QuestCreateEditModal({
	isOpen,
	onClose,
	editingQuest,
	form,
	onFormChange,
	onSubmit,
	isSubmitting,
}: QuestCreateEditModalProps) {
	const touristSpotIdId = useId();
	const questNameId = useId();
	const questDescId = useId();
	const questImageId = useId();
	const questTypeId = useId();
	const rewardTypeId = useId();
	const magatamaPointsId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						{editingQuest ? "Edit Quest" : "Create New Quest"}
					</h2>
					<button
						type="button"
						onClick={onClose}
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
															: editingQuest.questType === "COMMUNITY_EVENT"
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
												{editingQuest.touristSpot.bestVisitTime || "Anytime"}
											</div>
										</>
									) : (
										<div className="text-red-600">No tourist spot linked</div>
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
											{editingQuest.insDateTime || "N/A"}
										</div>
									)}
									{editingQuest.updDateTime && (
										<div>
											<span className="font-medium">Updated:</span>{" "}
											{editingQuest.updDateTime || "N/A"}
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
								<h4 className="font-medium text-charcoal">🖼️ Quest Image</h4>
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
											key={`quest-task-${editingQuest.questId}-${task.taskId || idx}`}
											className="bg-white p-3 rounded border"
										>
											<div className="flex items-center justify-between">
												<div className="font-medium text-sm">
													{idx + 1}. {task.taskName}
												</div>
												<div className="flex items-center gap-2">
													<span className="text-blue-600 text-xs">
														{task.isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}
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
									onFormChange({ touristSpotId: e.target.value })
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
								onChange={(e) => onFormChange({ questName: e.target.value })}
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
								onChange={(e) => onFormChange({ questDesc: e.target.value })}
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
								onChange={(e) => onFormChange({ questImage: e.target.value })}
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
									onFormChange({
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
									onFormChange({
										rewardType: e.target
											.value as QuestCreateRequestDto.rewardType,
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
							>
								<option value="UNKNOWN">Select reward type</option>
								<option value="LOCAL_EXPERIENCES">Local Experiences</option>
								<option value="CULINARY">Culinary</option>
								<option value="ADVENTURE_NATURE">Adventure & Nature</option>
								<option value="CULTURAL_COMMUNITY">Cultural & Community</option>
								<option value="HIDDEN_PERKS">Hidden Perks</option>
								<option value="SURPRISE_TREATS">Surprise Treats</option>
								<option value="BONUS_UPGRADES">Bonus Upgrades</option>
								<option value="SOCIAL_RECOGNITION">Social Recognition</option>
								<option value="RETURNING_VISITOR_BONUS">
									Returning Visitor Bonus
								</option>
								<option value="ELITE_EXPERIENCES">Elite Experiences</option>
								<option value="WELLNESS">Wellness</option>
								<option value="SHOPPING">Shopping</option>
								<option value="ENTERTAINMENT">Entertainment</option>
								<option value="TRANSPORT_CONNECTIVITY">
									Transport & Connectivity
								</option>
								<option value="LOCAL_PARTNERSHIPS">Local Partnerships</option>
							</select>
						</div>

						<div>
							<label
								htmlFor={magatamaPointsId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Magatama Points Awarded
							</label>
							<input
								id={magatamaPointsId}
								type="number"
								value={form.totalMagatamaPointAwarded}
								onChange={(e) =>
									onFormChange({
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
											onFormChange({ isUnlocked: e.target.checked })
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
											onFormChange({ isPremium: e.target.checked })
										}
										className="rounded border-warmGrey2 text-red focus:ring-red"
									/>
									<span className="text-sm font-medium text-charcoal">
										Is Premium
									</span>
								</label>
							</div>
						</div>

						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
							<h4 className="font-medium text-yellow-800 mb-2">
								📝 Note about Tasks
							</h4>
							<p className="text-sm text-yellow-700">
								Tasks for this quest can be managed after creation by clicking
								the "Manage Tasks" action in the quest table.
							</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="mt-8 flex justify-end gap-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onSubmit}
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
	);
}
