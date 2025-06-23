import { BarChart3, Crown, Ban, Shield, Trophy } from "lucide-react";

interface UserStatsGridProps {
	totalUsers: number;
	premiumCount: number;
	bannedCount: number;
	moderatorCount: number;
	adminCount: number;
	totalQuests: number;
}

export default function UserStatsGrid({
	totalUsers,
	premiumCount,
	bannedCount,
	moderatorCount,
	adminCount,
	totalQuests,
}: UserStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Users
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{totalUsers}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Crown size={16} className="text-yellow-600" />
					<span className="text-sm font-medium text-warmGrey3">Premium</span>
				</div>
				<div className="text-2xl font-bold text-yellow-600">{premiumCount}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Ban size={16} className="text-red-600" />
					<span className="text-sm font-medium text-warmGrey3">Banned</span>
				</div>
				<div className="text-2xl font-bold text-red-600">{bannedCount}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Shield size={16} className="text-orange-600" />
					<span className="text-sm font-medium text-warmGrey3">Moderators</span>
				</div>
				<div className="text-2xl font-bold text-orange-600">
					{moderatorCount}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Shield size={16} className="text-red-600" />
					<span className="text-sm font-medium text-warmGrey3">Admins</span>
				</div>
				<div className="text-2xl font-bold text-red-600">{adminCount}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Trophy size={16} className="text-green-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Quests
					</span>
				</div>
				<div className="text-2xl font-bold text-green-600">{totalQuests}</div>
			</div>
		</div>
	);
}
