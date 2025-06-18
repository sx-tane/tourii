import React from "react";
import { Activity, Trophy, MapPin, Star, Users } from "lucide-react";

interface ContentOverviewProps {
	overview: {
		totalSagas: number;
		totalQuests: number;
		totalTasks: number;
		totalRoutes: number;
		totalTouristSpots: number;
	};
	engagement: {
		unlockedQuests: number;
		totalMagatamaPoints: number;
	};
}

export function ContentOverview({ overview, engagement }: ContentOverviewProps) {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Activity size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">Sagas</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{overview.totalSagas}
				</div>
				<div className="text-xs text-blue-600">story collections</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Trophy size={16} className="text-yellow-600" />
					<span className="text-sm font-medium text-warmGrey3">Quests</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{overview.totalQuests}
				</div>
				<div className="text-xs text-yellow-600">
					{overview.totalTasks} tasks total
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<MapPin size={16} className="text-green-600" />
					<span className="text-sm font-medium text-warmGrey3">Routes</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{overview.totalRoutes}
				</div>
				<div className="text-xs text-green-600">
					{overview.totalTouristSpots} tourist spots
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Star size={16} className="text-purple-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Points
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{engagement.totalMagatamaPoints.toLocaleString()}
				</div>
				<div className="text-xs text-purple-600">Magatama points</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<Users size={16} className="text-orange-600" />
					<span className="text-sm font-medium text-warmGrey3">Unlocked</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">
					{engagement.unlockedQuests}
				</div>
				<div className="text-xs text-orange-600">
					of {overview.totalQuests} quests
				</div>
			</div>
		</div>
	);
}