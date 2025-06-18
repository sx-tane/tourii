import React from "react";
import type { QuestCreateRequestDto } from "@/api/generated";

interface QuestFormProps {
	form: QuestCreateRequestDto;
	onChange: (form: QuestCreateRequestDto) => void;
	isSubmitting?: boolean;
}

export function QuestForm({ form, onChange, isSubmitting = false }: QuestFormProps) {
	const updateForm = (updates: Partial<QuestCreateRequestDto>) => {
		onChange({ ...form, ...updates });
	};

	return (
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
						onChange={(e) => updateForm({ touristSpotId: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter tourist spot ID"
						disabled={isSubmitting}
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
						onChange={(e) => updateForm({ questName: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter quest name"
						disabled={isSubmitting}
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
						onChange={(e) => updateForm({ questDesc: e.target.value })}
						rows={4}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter quest description"
						disabled={isSubmitting}
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
						onChange={(e) => updateForm({ questImage: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="https://example.com/quest-image.jpg"
						disabled={isSubmitting}
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
							updateForm({
								questType: e.target.value as QuestCreateRequestDto.questType,
							})
						}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						disabled={isSubmitting}
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
							updateForm({
								rewardType: e.target.value as QuestCreateRequestDto.rewardType,
							})
						}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						disabled={isSubmitting}
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
						<option value="RETURNING_VISITOR_BONUS">Returning Visitor Bonus</option>
						<option value="ELITE_EXPERIENCES">Elite Experiences</option>
						<option value="WELLNESS">Wellness</option>
						<option value="SHOPPING">Shopping</option>
						<option value="ENTERTAINMENT">Entertainment</option>
						<option value="TRANSPORT_CONNECTIVITY">Transport & Connectivity</option>
						<option value="LOCAL_PARTNERSHIPS">Local Partnerships</option>
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
							updateForm({
								totalMagatamaPointAwarded: Number.parseInt(e.target.value) || 0,
							})
						}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter points awarded"
						min="0"
						disabled={isSubmitting}
					/>
				</div>

				<div className="space-y-3">
					<h4 className="text-md font-semibold text-charcoal">Quest Flags</h4>
					<div className="flex gap-6">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={form.isUnlocked}
								onChange={(e) => updateForm({ isUnlocked: e.target.checked })}
								className="rounded border-warmGrey2 text-red focus:ring-red"
								disabled={isSubmitting}
							/>
							<span className="text-sm font-medium text-charcoal">
								Is Unlocked
							</span>
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={form.isPremium}
								onChange={(e) => updateForm({ isPremium: e.target.checked })}
								className="rounded border-warmGrey2 text-red focus:ring-red"
								disabled={isSubmitting}
							/>
							<span className="text-sm font-medium text-charcoal">
								Is Premium
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}