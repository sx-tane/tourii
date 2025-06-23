"use client";
import {
	Activity,
	Clock,
	MapPin,
	TrendingUp,
	Trophy,
	Users,
} from "lucide-react";

interface StatsData {
	users: {
		total: number;
		active: number;
		premium: number;
		newToday: number;
	};
	content: {
		total: number;
		quests: number;
		routes: number;
		sagas: number;
		tasks: number;
		unlockedQuests: number;
	};
	submissions: {
		pending: number;
		photo: number;
		social: number;
		text: number;
	};
	engagement: {
		totalQuestsCompleted: number;
		avgQuestsPerUser: number;
	};
}

interface AdminStatsGridProps {
	stats: StatsData;
}

export default function AdminStatsGrid({ stats }: AdminStatsGridProps) {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Users size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Users
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.users.total}
				</div>
				<div className="text-xs text-blue-600">
					{stats.users.newToday} new today
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Activity size={16} className="text-green-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Active Users
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.users.active}
				</div>
				<div className="text-xs text-green-600">
					{stats.users.premium} premium
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Clock size={16} className="text-orange-600" />
					<span className="text-sm font-medium text-warmGrey3">Pending</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.submissions.pending}
				</div>
				<div className="text-xs text-orange-600">submissions</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Trophy size={16} className="text-yellow-600" />
					<span className="text-sm font-medium text-warmGrey3">Quests</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.content.quests}
				</div>
				<div className="text-xs text-yellow-600">
					{stats.content.tasks} tasks
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<MapPin size={16} className="text-purple-600" />
					<span className="text-sm font-medium text-warmGrey3">Routes</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.content.routes}
				</div>
				<div className="text-xs text-purple-600">model routes</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<TrendingUp size={16} className="text-red-600" />
					<span className="text-sm font-medium text-warmGrey3">Completion</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{stats.engagement.avgQuestsPerUser.toFixed(1)}
				</div>
				<div className="text-xs text-red-600">avg per user</div>
			</div>
		</div>
	);
}
