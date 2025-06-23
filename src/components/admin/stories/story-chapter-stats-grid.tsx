import { BarChart3 } from "lucide-react";

interface StoryChapterStatsGridProps {
	stats: {
		total: number;
		unlocked: number;
		withCharacters: number;
		withVideos: number;
		withPDFs: number;
		missingImages: number;
	};
}

export default function StoryChapterStatsGrid({
	stats,
}: StoryChapterStatsGridProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<BarChart3 size={16} className="text-blue-600" />
					<span className="text-sm font-medium text-warmGrey3">
						Total Chapters
					</span>
				</div>
				<div className="text-2xl font-bold text-charcoal">{stats.total}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🔓</span>
					<span className="text-sm font-medium text-warmGrey3">Unlocked</span>
				</div>
				<div className="text-2xl font-bold text-green-600">{stats.unlocked}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">👥</span>
					<span className="text-sm font-medium text-warmGrey3">w/ Characters</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{stats.withCharacters}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">🎥</span>
					<span className="text-sm font-medium text-warmGrey3">w/ Videos</span>
				</div>
				<div className="text-2xl font-bold text-blue-600">{stats.withVideos}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📄</span>
					<span className="text-sm font-medium text-warmGrey3">w/ PDFs</span>
				</div>
				<div className="text-2xl font-bold text-mustard">{stats.withPDFs}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⚠️</span>
					<span className="text-sm font-medium text-warmGrey3">
						Missing Images
					</span>
				</div>
				<div className="text-2xl font-bold text-red-600">{stats.missingImages}</div>
			</div>
		</div>
	);
}
