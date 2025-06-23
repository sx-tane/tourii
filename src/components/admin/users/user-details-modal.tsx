import type { AdminUserListResponseDto } from "@/api/generated";
import { ResolvedNameDisplay } from "@/components/admin/users";
import {
	Award,
	Coins,
	Edit,
	History,
	Share2,
	User,
	UserCheck,
	Wallet,
} from "lucide-react";
import { useState } from "react";

type UserData = AdminUserListResponseDto["users"][0];

interface UserDetailsModalProps {
	user: UserData | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function UserDetailsModal({
	user,
	isOpen,
	onClose,
}: UserDetailsModalProps) {
	const [activeTab, setActiveTab] = useState("overview");

	if (!isOpen || !user) return null;

	const _formatDate = (dateStr: unknown) => {
		if (!dateStr) return "N/A";
		try {
			const dateString = String(dateStr);
			// Handle backend date format like "20250621 14:36"
			if (dateString.match(/^\d{8}\s\d{2}:\d{2}$/)) {
				const year = dateString.slice(0, 4);
				const month = dateString.slice(4, 6);
				const day = dateString.slice(6, 8);
				const time = dateString.slice(9);
				return `${month}/${day}/${year} ${time}`;
			}
			// Return as-is if it's already formatted or in other formats
			return dateString;
		} catch {
			return String(dateStr);
		}
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: User },
		{ id: "wallet", label: "Wallet & Blockchain", icon: Wallet },
		{ id: "achievements", label: "Achievements", icon: Award },
		{ id: "items", label: "Onchain Items", icon: Coins },
		{ id: "activity", label: "Activity Logs", icon: History },
		{ id: "discord", label: "Discord", icon: Share2 },
		{ id: "invites", label: "Invites", icon: UserCheck },
		{ id: "raw", label: "Raw Data", icon: Edit },
	];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						User Details: {user.username}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
					>
						✕
					</button>
				</div>

				{/* Tab Navigation */}
				<div className="border-b border-warmGrey2 mb-6">
					<nav className="flex space-x-8">
						{tabs.map((tab) => {
							const IconComponent = tab.icon;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
										activeTab === tab.id
											? "border-red text-red"
											: "border-transparent text-warmGrey3 hover:text-charcoal hover:border-warmGrey2"
									}`}
								>
									<IconComponent size={16} />
									{tab.label}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Tab Content */}
				<div className="space-y-6">
					{/* Overview Tab */}
					{activeTab === "overview" && (
						<>
							{/* Basic Info */}
							<div className="rounded-lg bg-gray-50 p-4">
								<h3 className="text-lg font-semibold text-charcoal mb-4">
									👤 Basic Information
								</h3>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<div>
										<span className="font-medium">User ID:</span> {user.userId}
									</div>
									<div>
										<span className="font-medium">Username:</span>{" "}
										{user.username}
									</div>
									<div>
										<span className="font-medium">Email:</span>{" "}
										{user.email || "N/A"}
									</div>
									<div>
										<span className="font-medium">Role:</span> {user.role}
									</div>
									<div>
										<span className="font-medium">Premium:</span>{" "}
										{user.isPremium ? "Yes" : "No"}
									</div>
									<div>
										<span className="font-medium">Banned:</span>{" "}
										{user.isBanned ? "Yes" : "No"}
									</div>
								</div>
							</div>

							{/* User Stats */}
							{user.userInfo && (
								<div className="rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Game Statistics
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
										<div>
											<span className="font-medium">Level:</span>{" "}
											{user.userInfo.level || "N/A"}
										</div>
										<div>
											<span className="font-medium">Magatama Points:</span>{" "}
											{user.userInfo.magatamaPoints}
										</div>
										<div>
											<span className="font-medium">Quests Completed:</span>{" "}
											{user.totalQuestCompleted}
										</div>
										<div>
											<span className="font-medium">Travel Distance:</span>{" "}
											{user.totalTravelDistance.toFixed(1)} km
										</div>
									</div>
								</div>
							)}

							{/* Summary Stats */}
							{user.summaryStats && (
								<div className="rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📈 Activity Summary
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div>
											<span className="font-medium">Achievements:</span>{" "}
											{user.summaryStats.achievementCount}
										</div>
										<div>
											<span className="font-medium">Onchain Items:</span>{" "}
											{user.summaryStats.onchainItemCount}
										</div>
										<div>
											<span className="font-medium">Stories Completed:</span>{" "}
											{user.summaryStats.storyCompletedCount}
										</div>
									</div>
								</div>
							)}
						</>
					)}

					{/* Wallet & Blockchain Tab */}
					{activeTab === "wallet" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								💼 Wallet & Blockchain Data
							</h3>
							<div className="space-y-6">
								{/* Wallet Addresses */}
								<div className="bg-white p-4 rounded-lg border">
									<h4 className="font-semibold text-charcoal mb-3">
										Wallet Addresses
									</h4>
									<div className="grid grid-cols-1 gap-4">
										<div>
											<span className="font-medium">Passport Wallet:</span>
											<div className="text-xs bg-gray-100 p-2 mt-1 rounded font-mono break-all">
												{user.passportWalletAddress || "N/A"}
											</div>
										</div>
										<div>
											<span className="font-medium">Perks Wallet:</span>
											<div className="text-xs bg-gray-100 p-2 mt-1 rounded font-mono break-all">
												{user.perksWalletAddress || "N/A"}
											</div>
										</div>
									</div>
								</div>

								{/* Digital Passport Info */}
								{user.userInfo && (
									<div className="bg-white p-4 rounded-lg border">
										<h4 className="font-semibold text-charcoal mb-3">
											Digital Passport
										</h4>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div>
												<span className="font-medium">NFT Address:</span>
												<div className="text-xs bg-gray-100 p-2 mt-1 rounded font-mono break-all">
													{user.userInfo.digitalPassportAddress || "N/A"}
												</div>
											</div>
											<div>
												<span className="font-medium">Log NFT Address:</span>
												<div className="text-xs bg-gray-100 p-2 mt-1 rounded font-mono break-all">
													{user.userInfo.logNftAddress || "N/A"}
												</div>
											</div>
											<div>
												<span className="font-medium">Passport Type:</span>
												<div className="mt-1">
													<span
														className={`px-2 py-1 text-xs rounded-full ${
															user.isPremium
																? "bg-mustard text-charcoal"
																: "bg-blue-100 text-blue-800"
														}`}
													>
														{user.userInfo.userDigitalPassportType || "BONJIN"}
													</span>
												</div>
											</div>
											<div>
												<span className="font-medium">Level:</span>
												<div className="mt-1">
													<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
														{user.userInfo.level || "BONJIN"}
													</span>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Game Items */}
								{user.userInfo && (
									<div className="bg-white p-4 rounded-lg border">
										<h4 className="font-semibold text-charcoal mb-3">
											Game Items & Points
										</h4>
										<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
											<div className="text-center">
												<div className="text-2xl font-bold text-mustard">
													{user.userInfo.magatamaPoints}
												</div>
												<div className="text-xs text-warmGrey3">
													Magatama Points
												</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-blue-600">
													{user.userInfo.magatamaBags || 0}
												</div>
												<div className="text-xs text-warmGrey3">
													Magatama Bags
												</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-purple-600">
													{user.userInfo.prayerBead || 0}
												</div>
												<div className="text-xs text-warmGrey3">
													Prayer Beads
												</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-orange-600">
													{user.userInfo.sword || 0}
												</div>
												<div className="text-xs text-warmGrey3">Swords</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-red-600">
													{user.userInfo.orgeMask || 0}
												</div>
												<div className="text-xs text-warmGrey3">Orge Masks</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-green-600">
													{(user.userInfo.discountRate || 0) * 100}%
												</div>
												<div className="text-xs text-warmGrey3">
													Discount Rate
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Raw JSON Data */}
					{activeTab === "raw" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								🔍 Raw JSON Data
							</h3>
							<pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-96 border">
								{JSON.stringify(user, null, 2)}
							</pre>
						</div>
					)}

					{/* Achievements Tab */}
					{activeTab === "achievements" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								🏆 User Achievements ({user.userAchievements?.length || 0})
							</h3>
							{user.userAchievements && user.userAchievements.length > 0 ? (
								<div className="space-y-4">
									{user.userAchievements.map((achievement) => (
										<div
											key={achievement.userAchievementId}
											className="bg-white p-4 rounded-lg border"
										>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														{achievement.iconUrl && (
															<img
																src={achievement.iconUrl}
																alt=""
																className="w-6 h-6"
															/>
														)}
														<h4 className="font-semibold text-charcoal">
															{achievement.achievementName}
														</h4>
														<span
															className={`px-2 py-1 text-xs rounded-full ${
																achievement.achievementType === "STORY"
																	? "bg-blue-100 text-blue-800"
																	: achievement.achievementType === "TRAVEL"
																		? "bg-green-100 text-green-800"
																		: achievement.achievementType === "EXPLORE"
																			? "bg-purple-100 text-purple-800"
																			: achievement.achievementType ===
																					"COMMUNITY"
																				? "bg-pink-100 text-pink-800"
																				: achievement.achievementType ===
																						"MILESTONE"
																					? "bg-orange-100 text-orange-800"
																					: "bg-gray-100 text-gray-800"
															}`}
														>
															{achievement.achievementType}
														</span>
													</div>
													{achievement.achievementDesc && (
														<p className="text-sm text-warmGrey3 mb-2">
															{achievement.achievementDesc}
														</p>
													)}
													<div className="text-sm text-warmGrey3">
														Earned: {_formatDate(achievement.insDateTime)} •
														Points: {achievement.magatamaPointAwarded}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-warmGrey3">No achievements earned yet.</p>
							)}
						</div>
					)}

					{/* Onchain Items Tab */}
					{activeTab === "items" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								🪙 Onchain Items ({user.userOnchainItems?.length || 0})
							</h3>
							{user.userOnchainItems && user.userOnchainItems.length > 0 ? (
								<div className="space-y-4">
									{user.userOnchainItems.map((item) => (
										<div
											key={item.userOnchainItemId}
											className="bg-white p-4 rounded-lg border"
										>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<span
															className={`px-2 py-1 text-xs rounded-full ${
																item.itemType === "LOG_NFT"
																	? "bg-blue-100 text-blue-800"
																	: item.itemType === "DIGITAL_PASSPORT"
																		? "bg-green-100 text-green-800"
																		: item.itemType === "PERK"
																			? "bg-purple-100 text-purple-800"
																			: "bg-gray-100 text-gray-800"
															}`}
														>
															{item.itemType.replace("_", " ")}
														</span>
														<span
															className={`px-2 py-1 text-xs rounded-full ${
																item.status === "ACTIVE"
																	? "bg-green-100 text-green-800"
																	: item.status === "USED"
																		? "bg-gray-100 text-gray-800"
																		: item.status === "EXPIRED"
																			? "bg-red-100 text-red-800"
																			: "bg-yellow-100 text-yellow-800"
															}`}
														>
															{item.status}
														</span>
														<span
															className={`px-2 py-1 text-xs rounded-full ${
																item.blockchainType === "VARA"
																	? "bg-indigo-100 text-indigo-800"
																	: item.blockchainType === "CAMINO"
																		? "bg-teal-100 text-teal-800"
																		: "bg-gray-100 text-gray-800"
															}`}
														>
															{item.blockchainType}
														</span>
													</div>
													<div className="text-sm space-y-1">
														<div>
															<span className="font-medium">Transaction:</span>
															<span className="font-mono text-xs bg-gray-100 px-1 rounded ml-1">
																{item.itemTxnHash}
															</span>
														</div>
														{item.onchainItemId && (
															<div>
																<span className="font-medium">Onchain ID:</span>{" "}
																{item.onchainItemId}
															</div>
														)}
														<div>
															<span className="font-medium">Minted:</span>{" "}
															{_formatDate(item.mintedAt)}
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-warmGrey3">No onchain items found.</p>
							)}
						</div>
					)}

					{/* Activity Logs Tab */}
					{activeTab === "activity" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								📋 Activity Logs
							</h3>
							<div className="space-y-6">
								{/* Task Logs Table */}
								{user.userTaskLogs && user.userTaskLogs.length > 0 && (
									<div>
										<h4 className="font-semibold text-charcoal mb-3">
											📋 Task Activity ({user.userTaskLogs.length})
										</h4>
										<div className="overflow-hidden rounded-lg bg-white shadow">
											<div className="overflow-x-auto max-h-96">
												<table className="w-full text-sm">
													<thead className="bg-charcoal text-white">
														<tr>
															<th className="px-4 py-3 text-left font-semibold">
																Quest
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Task
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Action
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Status
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Points
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Completed
															</th>
														</tr>
													</thead>
													<tbody className="divide-y divide-warmGrey2">
														{user.userTaskLogs
															.slice(0, 20)
															.map((log, index) => (
																<tr
																	key={log.userTaskLogId}
																	className={
																		index % 2 === 0 ? "bg-white" : "bg-warmGrey"
																	}
																>
																	<td className="px-4 py-3">
																		<ResolvedNameDisplay
																			id={log.questId}
																			type="quest"
																		/>
																	</td>
																	<td className="px-4 py-3">
																		<ResolvedNameDisplay
																			id={log.taskId}
																			type="task"
																			action={log.action}
																		/>
																	</td>
																	<td className="px-4 py-3">
																		<span className="font-medium">
																			{log.action.replace(/_/g, " ")}
																		</span>
																	</td>
																	<td className="px-4 py-3">
																		<span
																			className={`px-2 py-1 text-xs rounded-full ${
																				log.status === "COMPLETED"
																					? "bg-green-100 text-green-800"
																					: log.status === "ONGOING"
																						? "bg-blue-100 text-blue-800"
																						: log.status === "FAILED"
																							? "bg-red-100 text-red-800"
																							: "bg-gray-100 text-gray-800"
																			}`}
																		>
																			{log.status}
																		</span>
																	</td>
																	<td className="px-4 py-3 font-semibold text-mustard">
																		{log.totalMagatamaPointAwarded}
																	</td>
																	<td className="px-4 py-3 text-warmGrey3">
																		{log.completedAt
																			? _formatDate(log.completedAt)
																			: "N/A"}
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)}

								{/* Travel Logs Table */}
								{user.userTravelLogs && user.userTravelLogs.length > 0 && (
									<div>
										<h4 className="font-semibold text-charcoal mb-3">
											🗺️ Travel Activity ({user.userTravelLogs.length})
										</h4>
										<div className="overflow-hidden rounded-lg bg-white shadow">
											<div className="overflow-x-auto max-h-96">
												<table className="w-full text-sm">
													<thead className="bg-charcoal text-white">
														<tr>
															<th className="px-4 py-3 text-left font-semibold">
																Tourist Spot
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Check-in Method
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Distance
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Location
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Fraud
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Date
															</th>
														</tr>
													</thead>
													<tbody className="divide-y divide-warmGrey2">
														{user.userTravelLogs
															.slice(0, 20)
															.map((log, index) => (
																<tr
																	key={log.userTravelLogId}
																	className={
																		index % 2 === 0 ? "bg-white" : "bg-warmGrey"
																	}
																>
																	<td className="px-4 py-3">
																		<ResolvedNameDisplay
																			id={log.touristSpotId}
																			type="tourist-spot"
																		/>
																	</td>
																	<td className="px-4 py-3">
																		<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
																			{log.checkInMethod || "GPS"}
																		</span>
																	</td>
																	<td className="px-4 py-3 font-semibold">
																		{log.travelDistance.toFixed(2)} km
																	</td>
																	<td className="px-4 py-3 text-xs font-mono">
																		({log.userLatitude.toFixed(4)},{" "}
																		{log.userLongitude.toFixed(4)})
																	</td>
																	<td className="px-4 py-3">
																		{log.detectedFraud ? (
																			<span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
																				⚠️ Detected
																			</span>
																		) : (
																			<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
																				✅ Clean
																			</span>
																		)}
																	</td>
																	<td className="px-4 py-3 text-warmGrey3">
																		{_formatDate(log.insDateTime)}
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)}

								{/* Story Logs Table */}
								{user.userStoryLogs && user.userStoryLogs.length > 0 && (
									<div>
										<h4 className="font-semibold text-charcoal mb-3">
											📚 Story Activity ({user.userStoryLogs.length})
										</h4>
										<div className="overflow-hidden rounded-lg bg-white shadow">
											<div className="overflow-x-auto max-h-96">
												<table className="w-full text-sm">
													<thead className="bg-charcoal text-white">
														<tr>
															<th className="px-4 py-3 text-left font-semibold">
																Story Chapter
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Status
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Unlocked
															</th>
															<th className="px-4 py-3 text-left font-semibold">
																Finished
															</th>
														</tr>
													</thead>
													<tbody className="divide-y divide-warmGrey2">
														{user.userStoryLogs
															.slice(0, 20)
															.map((log, index) => (
																<tr
																	key={log.userStoryLogId}
																	className={
																		index % 2 === 0 ? "bg-white" : "bg-warmGrey"
																	}
																>
																	<td className="px-4 py-3">
																		<ResolvedNameDisplay
																			id={log.storyChapterId}
																			type="story-chapter"
																		/>
																	</td>
																	<td className="px-4 py-3">
																		<span
																			className={`px-2 py-1 text-xs rounded-full ${
																				log.status === "COMPLETED"
																					? "bg-green-100 text-green-800"
																					: log.status === "IN_PROGRESS"
																						? "bg-blue-100 text-blue-800"
																						: "bg-gray-100 text-gray-800"
																			}`}
																		>
																			{log.status.replace("_", " ")}
																		</span>
																	</td>
																	<td className="px-4 py-3 text-warmGrey3">
																		{log.unlockedAt
																			? _formatDate(log.unlockedAt)
																			: "N/A"}
																	</td>
																	<td className="px-4 py-3 text-warmGrey3">
																		{log.finishedAt
																			? _formatDate(log.finishedAt)
																			: "N/A"}
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)}

								{/* Item Claim Logs Table */}
								{user.userItemClaimLogs &&
									user.userItemClaimLogs.length > 0 && (
										<div>
											<h4 className="font-semibold text-charcoal mb-3">
												🎁 Item Claims ({user.userItemClaimLogs.length})
											</h4>
											<div className="overflow-hidden rounded-lg bg-white shadow">
												<div className="overflow-x-auto max-h-96">
													<table className="w-full text-sm">
														<thead className="bg-charcoal text-white">
															<tr>
																<th className="px-4 py-3 text-left font-semibold">
																	Item
																</th>
																<th className="px-4 py-3 text-left font-semibold">
																	Type
																</th>
																<th className="px-4 py-3 text-left font-semibold">
																	Amount
																</th>
																<th className="px-4 py-3 text-left font-semibold">
																	Status
																</th>
																<th className="px-4 py-3 text-left font-semibold">
																	Claimed
																</th>
															</tr>
														</thead>
														<tbody className="divide-y divide-warmGrey2">
															{user.userItemClaimLogs
																.slice(0, 20)
																.map((log, index) => (
																	<tr
																		key={log.userItemClaimLogId}
																		className={
																			index % 2 === 0
																				? "bg-white"
																				: "bg-warmGrey"
																		}
																	>
																		<td className="px-4 py-3">
																			<span className="font-medium">
																				{log.offchainItemName ||
																					log.onchainItemId ||
																					"Unknown Item"}
																			</span>
																		</td>
																		<td className="px-4 py-3">
																			<span
																				className={`px-2 py-1 text-xs rounded-full ${
																					log.type === "ONCHAIN"
																						? "bg-purple-100 text-purple-800"
																						: "bg-orange-100 text-orange-800"
																				}`}
																			>
																				{log.type}
																			</span>
																		</td>
																		<td className="px-4 py-3 font-semibold">
																			{log.itemAmount}
																		</td>
																		<td className="px-4 py-3">
																			<span
																				className={`px-2 py-1 text-xs rounded-full ${
																					log.status === "SUCCESS"
																						? "bg-green-100 text-green-800"
																						: "bg-red-100 text-red-800"
																				}`}
																			>
																				{log.status}
																			</span>
																		</td>
																		<td className="px-4 py-3 text-warmGrey3">
																			{log.claimedAt
																				? _formatDate(log.claimedAt)
																				: "N/A"}
																		</td>
																	</tr>
																))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									)}
							</div>
						</div>
					)}

					{/* Discord Tab */}
					{activeTab === "discord" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								💬 Discord Activity
							</h3>
							<div className="space-y-6">
								{/* Discord Info */}
								<div className="bg-white p-4 rounded-lg border">
									<h4 className="font-semibold text-charcoal mb-3">
										Discord Profile
									</h4>
									<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
										<div>
											<span className="font-medium">Discord ID:</span>{" "}
											{user.discordId || "N/A"}
										</div>
										<div>
											<span className="font-medium">Username:</span>{" "}
											{user.discordUsername || "N/A"}
										</div>
										<div>
											<span className="font-medium">Joined:</span>{" "}
											{_formatDate(user.discordJoinedAt)}
										</div>
									</div>
								</div>

								{/* Discord Activity Logs */}
								{user.discordActivityLogs &&
									user.discordActivityLogs.length > 0 && (
										<div>
											<h4 className="font-semibold text-charcoal mb-3">
												Activity Logs ({user.discordActivityLogs.length})
											</h4>
											<div className="space-y-3 max-h-60 overflow-y-auto">
												{user.discordActivityLogs.slice(0, 10).map((log) => (
													<div
														key={log.discordActivityLogId}
														className="bg-white p-3 rounded border"
													>
														<div className="flex items-center gap-2 mb-1">
															<span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
																{log.activityType}
															</span>
															<span className="text-xs text-warmGrey3">
																Points: {log.magatamaPointAwarded}
															</span>
														</div>
														{log.activityDetails && (
															<div className="text-sm text-warmGrey3">
																{log.activityDetails}
															</div>
														)}
														<div className="text-xs text-warmGrey3">
															{_formatDate(log.insDateTime)}
														</div>
													</div>
												))}
											</div>
										</div>
									)}

								{/* Discord Roles */}
								{user.discordUserRoles && user.discordUserRoles.length > 0 && (
									<div>
										<h4 className="font-semibold text-charcoal mb-3">
											Discord Roles ({user.discordUserRoles.length})
										</h4>
										<div className="flex flex-wrap gap-2">
											{user.discordUserRoles.map((role) => (
												<span
													key={role.discordUserRolesId}
													className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
												>
													Role ID: {role.roleId}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Invites Tab */}
					{activeTab === "invites" && (
						<div className="rounded-lg bg-gray-50 p-4">
							<h3 className="text-lg font-semibold text-charcoal mb-4">
								🎫 Invite Logs ({user.userInviteLogs?.length || 0})
							</h3>
							{user.userInviteLogs && user.userInviteLogs.length > 0 ? (
								<div className="space-y-4">
									{user.userInviteLogs.map((invite) => (
										<div
											key={invite.inviteLogId}
											className="bg-white p-4 rounded-lg border"
										>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<span className="text-sm font-medium">
															Invited:
														</span>
														{invite.inviteeUserId && (
															<span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
																User: {invite.inviteeUserId}
															</span>
														)}
														{invite.inviteeDiscordId && (
															<span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
																Discord: {invite.inviteeDiscordId}
															</span>
														)}
													</div>
													<div className="text-sm text-warmGrey3">
														Points Earned: {invite.magatamaPointAwarded} •{" "}
														{_formatDate(invite.insDateTime)}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-warmGrey3">No invites sent yet.</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
