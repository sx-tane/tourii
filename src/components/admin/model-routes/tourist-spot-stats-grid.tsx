import { BarChart3 } from "lucide-react";

interface TouristSpotStatsGridProps {
	stats: {
		total: number;
		withHashtags: number;
		withMainImage: number;
		withSmallImages: number;
		withVisitTime: number;
		noDescription: number;
	};
}

export default function TouristSpotStatsGrid({
	stats,
}: TouristSpotStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Spots
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{stats.total}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🏷️</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Hashtags
					</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{stats.withHashtags}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🖼️</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Main Image
					</span>
				</div>
				<div className="text-2xl font-bold text-green-600">
					{stats.withMainImage}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📷</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Gallery
					</span>
				</div>
				<div className="text-2xl font-bold text-blue-600">
					{stats.withSmallImages}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⏰</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Visit Time
					</span>
				</div>
				<div className="text-2xl font-bold text-mustard">
					{stats.withVisitTime}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⚠️</span>
					<span className="text-sm font-medium text-warmGrey3">
						No Description
					</span>
				</div>
				<div className="text-2xl font-bold text-red-600">
					{stats.noDescription}
				</div>
			</div>
		</div>
	);
}