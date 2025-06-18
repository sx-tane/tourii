import React from "react";
import { Trophy, MapPin, CheckCircle } from "lucide-react";

interface QualityMetricsProps {
	quality: {
		averageTasksPerQuest: number;
		averageSpotsPerRoute: number;
	};
	engagement: {
		premiumQuests: number;
		spotsWithHashtags: number;
		unlockedQuests: number;
	};
	totalQuests: number;
}

export function QualityMetrics({
	quality,
	engagement,
	totalQuests,
}: QualityMetricsProps) {
	return (
		<div className="space-y-6">
			{/* Average Metrics */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2 mb-2">
						<Trophy size={16} className="text-yellow-600" />
						<span className="text-sm font-medium text-warmGrey3">
							Avg Tasks/Quest
						</span>
					</div>
					<div className="text-2xl font-bold text-charcoal">
						{quality.averageTasksPerQuest.toFixed(1)}
					</div>
				</div>
				<div className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2 mb-2">
						<MapPin size={16} className="text-green-600" />
						<span className="text-sm font-medium text-warmGrey3">
							Avg Spots/Route
						</span>
					</div>
					<div className="text-2xl font-bold text-charcoal">
						{quality.averageSpotsPerRoute.toFixed(1)}
					</div>
				</div>
			</div>

			{/* Engagement Insights */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
					<CheckCircle size={18} />
					Engagement Insights
				</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="text-center p-4 rounded-lg bg-green-50">
						<div className="text-2xl font-bold text-green-600">
							{engagement.premiumQuests}
						</div>
						<div className="text-sm text-green-800 mt-2">
							Premium Quests Available
						</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-blue-50">
						<div className="text-2xl font-bold text-blue-600">
							{engagement.spotsWithHashtags}
						</div>
						<div className="text-sm text-blue-800 mt-2">
							Tourist Spots with Hashtags
						</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-purple-50">
						<div className="text-2xl font-bold text-purple-600">
							{Math.round(
								(engagement.unlockedQuests / totalQuests) * 100,
							) || 0}
							%
						</div>
						<div className="text-sm text-purple-800 mt-2">
							Quest Unlock Rate
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}