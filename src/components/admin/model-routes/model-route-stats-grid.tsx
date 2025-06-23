import { BarChart3 } from "lucide-react";

interface ModelRouteStatsGridProps {
	stats: {
		total: number;
		withSpots: number;
		withRecommendations: number;
		missingMedia: number;
		regions: number;
		totalSpots: number;
	};
}

export default function ModelRouteStatsGrid({
	stats,
}: ModelRouteStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">Total</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{stats.total}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🏖️</span>
					<span className="text-sm font-medium text-warmGrey3">With Spots</span>
				</div>
				<div className="text-2xl font-bold text-green-600">
					{stats.withSpots}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">💡</span>
					<span className="text-sm font-medium text-warmGrey3">With Tips</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{stats.withRecommendations}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🗺️</span>
					<span className="text-sm font-medium text-warmGrey3">Regions</span>
				</div>
				<div className="text-2xl font-bold text-mustard">{stats.regions}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📍</span>
					<span className="text-sm font-medium text-warmGrey3">
						Total Spots
					</span>
				</div>
				<div className="text-2xl font-bold text-orange-600">
					{stats.totalSpots}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⚠️</span>
					<span className="text-sm font-medium text-warmGrey3">
						Missing Media
					</span>
				</div>
				<div className="text-2xl font-bold text-red-600">
					{stats.missingMedia}
				</div>
			</div>
		</div>
	);
}
