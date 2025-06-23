import { Trophy, XCircle, TrendingUp } from "lucide-react";

interface ContentHealthSectionProps {
	contentHealth: {
		questsWithoutImage: number;
		questsWithoutTouristSpot: number;
		healthScore: number;
	};
	totalQuests: number;
}

export default function ContentHealthSection({
	contentHealth,
	totalQuests,
}: ContentHealthSectionProps) {
	const getStatusColor = (value: number, total: number, isInverse = false) => {
		if (total === 0) return "text-gray-600";
		const percentage = (value / total) * 100;
		if (isInverse) {
			if (percentage > 80) return "text-red-600";
			if (percentage > 50) return "text-yellow-600";
			return "text-green-600";
		}
		if (percentage > 80) return "text-green-600";
		if (percentage > 50) return "text-yellow-600";
		return "text-red-600";
	};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2 mb-2">
						<Trophy size={16} className="text-yellow-600" />
						<span className="text-sm font-medium text-warmGrey3">
							Quest Issues
						</span>
					</div>
					<div
						className={`text-2xl font-bold ${getStatusColor(
							contentHealth.questsWithoutImage,
							totalQuests,
							true,
						)}`}
					>
						{contentHealth.questsWithoutImage}
					</div>
					<div className="text-xs text-warmGrey3">quests without image</div>
				</div>
				<div className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2 mb-2">
						<XCircle size={16} className="text-red-600" />
						<span className="text-sm font-medium text-warmGrey3">
							Unlinked Quests
						</span>
					</div>
					<div
						className={`text-2xl font-bold ${getStatusColor(
							contentHealth.questsWithoutTouristSpot,
							totalQuests,
							true,
						)}`}
					>
						{contentHealth.questsWithoutTouristSpot}
					</div>
					<div className="text-xs text-warmGrey3">
						quests without tourist spot
					</div>
				</div>
				<div className="rounded-lg bg-white p-4 shadow">
					<div className="flex items-center gap-2 mb-2">
						<TrendingUp size={16} className="text-green-600" />
						<span className="text-sm font-medium text-warmGrey3">
							Health Score
						</span>
					</div>
					<div
						className={`text-2xl font-bold ${getStatusColor(
							contentHealth.healthScore,
							100,
						)}`}
					>
						{Math.round(contentHealth.healthScore)}%
					</div>
					<div className="text-xs text-warmGrey3">overall health</div>
				</div>
			</div>
		</div>
	);
}
