import type { AdminUserListResponseDto } from "@/api/generated";
import { Ban, Crown, Edit, Mail, MapPin, Trophy, User } from "lucide-react";

type UserData = AdminUserListResponseDto["users"][0];

interface UserTableProps {
	users: UserData[];
	selectedUsers: string[];
	onToggleUserSelection: (userId: string) => void;
	onToggleSelectAll: () => void;
	onViewUser: (user: UserData) => void;
}

export default function UserTable({
	users,
	selectedUsers,
	onToggleUserSelection,
	onToggleSelectAll,
	onViewUser,
}: UserTableProps) {
	const getRoleColor = (role: string) => {
		switch (role) {
			case "ADMIN":
				return "bg-red-100 text-red-800";
			case "MODERATOR":
				return "bg-orange-100 text-orange-800";
			case "USER":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const formatDate = (dateStr: unknown) => {
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

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={
										selectedUsers.length === users.length && users.length > 0
									}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							<th className="px-6 py-4 text-left font-semibold">User</th>
							<th className="px-6 py-4 text-left font-semibold">Contact</th>
							<th className="px-6 py-4 text-left font-semibold">
								Role & Status
							</th>
							<th className="px-6 py-4 text-left font-semibold">Stats</th>
							<th className="px-6 py-4 text-left font-semibold">Registered</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{users.map((user, index: number) => (
							<tr
								key={user.userId}
								className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
									selectedUsers.includes(user.userId)
										? "ring-2 ring-blue-200"
										: ""
								}`}
							>
								<td className="px-4 py-4">
									<input
										type="checkbox"
										checked={selectedUsers.includes(user.userId)}
										onChange={() => onToggleUserSelection(user.userId)}
										className="rounded border-warmGrey2 text-red focus:ring-red"
									/>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
											<User size={20} className="text-blue-600" />
										</div>
										<div>
											<div className="font-semibold text-charcoal">
												{user.username}
											</div>
											<div className="text-sm text-warmGrey3">
												ID: {user.userId}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm space-y-1">
										{user.email && (
											<div className="flex items-center gap-1">
												<Mail size={14} />
												<span className="truncate max-w-32">{user.email}</span>
											</div>
										)}
										{user.discordUsername && (
											<div className="text-purple-600">
												Discord: {user.discordUsername}
											</div>
										)}
										{user.twitterUsername && (
											<div className="text-blue-600">
												Twitter: {user.twitterUsername}
											</div>
										)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="space-y-2">
										<span
											className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleColor(user.role)}`}
										>
											{user.role}
										</span>
										<div className="flex items-center gap-2">
											{user.isPremium && (
												<span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
													<Crown size={10} />
													Premium
												</span>
											)}
											{user.isBanned && (
												<span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
													<Ban size={10} />
													Banned
												</span>
											)}
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm space-y-1">
										<div className="flex items-center gap-1">
											<Trophy size={14} className="text-green-600" />
											<span>{user.totalQuestCompleted} quests</span>
										</div>
										<div className="flex items-center gap-1">
											<MapPin size={14} className="text-blue-600" />
											<span>{user.totalTravelDistance.toFixed(1)} km</span>
										</div>
										{user.userInfo && (
											<div className="text-purple-600">
												{user.userInfo.magatamaPoints} points
											</div>
										)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-charcoal">
										{formatDate(user.registeredAt)}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => onViewUser(user)}
											className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all"
											title="View User Details"
										>
											<Edit size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
					{users.length === 0 && (
						<tbody>
							<tr>
								<td colSpan={7} className="px-6 py-8 text-center text-charcoal">
									No users found matching your filters.
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}
