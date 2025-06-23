import type { QuestResponseDto } from "@/api/generated";
import {
	Edit,
	ExternalLink,
	Eye,
	Lock,
	MapPin,
	Star,
	Trophy,
	Users,
} from "lucide-react";

interface QuestTableProps {
	quests: QuestResponseDto[];
	selectedQuests: string[];
	onToggleSelection: (questId: string) => void;
	onToggleSelectAll: () => void;
	onEdit: (quest: QuestResponseDto) => void;
	getQuestTypeColor: (type: string) => string;
}

export default function QuestTable({
	quests,
	selectedQuests,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	getQuestTypeColor,
}: QuestTableProps) {
	const isAllSelected =
		selectedQuests.length === quests.length && quests.length > 0;

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={isAllSelected}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							<th className="px-6 py-4 text-left font-semibold">Quest Name</th>
							<th className="px-6 py-4 text-left font-semibold">Description</th>
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
						{quests.length > 0 ? (
							quests.map((quest, index) => (
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
											onChange={() => onToggleSelection(quest.questId)}
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
												onClick={() => onEdit(quest)}
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
							))
						) : (
							<tr>
								<td colSpan={9} className="px-6 py-8 text-center text-charcoal">
									No quests found. Create your first quest to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
