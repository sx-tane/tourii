import { BarChart3 } from "lucide-react";

interface QuestTaskStatsGridProps {
	stats: {
		total: number;
		completed: number;
		incomplete: number;
		withContent: number;
		noDescription: number;
		noContent: number;
	};
}

export default function QuestTaskStatsGrid({ stats }: QuestTaskStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Tasks
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{stats.total}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">✅</span>
					<span className="text-sm font-medium text-warmGrey3">
						Completed
					</span>
				</div>
				<div className="text-2xl font-bold text-green-600">
					{stats.completed}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⏳</span>
					<span className="text-sm font-medium text-warmGrey3">
						Incomplete
					</span>
				</div>
				<div className="text-2xl font-bold text-red-600">
					{stats.incomplete}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📝</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Content
					</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{stats.withContent}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">❓</span>
					<span className="text-sm font-medium text-warmGrey3">No Desc</span>
				</div>
				<div className="text-2xl font-bold text-orange-600">
					{stats.noDescription}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⚠️</span>
					<span className="text-sm font-medium text-warmGrey3">
						No Content
					</span>
				</div>
				<div className="text-2xl font-bold text-red-600">{stats.noContent}</div>
			</div>
		</div>
	);
}