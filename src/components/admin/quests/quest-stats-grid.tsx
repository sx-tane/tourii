import { BarChart3 } from "lucide-react";

interface QuestStatsGridProps {
	stats: {
		total: number;
		unlocked: number;
		premium: number;
		withTasks: number;
		totalPoints: number;
		noTouristSpot: number;
	};
}

export default function QuestStatsGrid({ stats }: QuestStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Quests
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{stats.total}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🔓</span>
					<span className="text-sm font-medium text-warmGrey3">Unlocked</span>
				</div>
				<div className="text-2xl font-bold text-green-600">
					{stats.unlocked}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⭐</span>
					<span className="text-sm font-medium text-warmGrey3">Premium</span>
				</div>
				<div className="text-2xl font-bold text-mustard">{stats.premium}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📋</span>
					<span className="text-sm font-medium text-warmGrey3">w/ Tasks</span>
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
					<span className="text-sm font-medium text-warmGrey3">No Spot</span>
				</div>
				<div className="text-2xl font-bold text-red-600">
					{stats.noTouristSpot}
				</div>
			</div>
		</div>
	);
}
