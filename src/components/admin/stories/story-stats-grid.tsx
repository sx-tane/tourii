import { BarChart3 } from "lucide-react";

interface StoryStatsGridProps {
	stats: {
		total: number;
		prologue: number;
		mainStory: number;
		selected: number;
		withChapters: number;
		missingMedia: number;
	};
}

export default function StoryStatsGrid({ stats }: StoryStatsGridProps) {
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
					<span className="text-sm">📖</span>
					<span className="text-sm font-medium text-warmGrey3">Prologue</span>
				</div>
				<div className="text-2xl font-bold text-blue-600">{stats.prologue}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📚</span>
					<span className="text-sm font-medium text-warmGrey3">Main</span>
				</div>
				<div className="text-2xl font-bold text-green-600">
					{stats.mainStory}
				</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">⭐</span>
					<span className="text-sm font-medium text-warmGrey3">Selected</span>
				</div>
				<div className="text-2xl font-bold text-mustard">{stats.selected}</div>
			</div>
			<div className="rounded-lg bg-white p-4 shadow">
				<div className="flex items-center gap-2">
					<span className="text-sm">📄</span>
					<span className="text-sm font-medium text-warmGrey3">
						w/ Chapters
					</span>
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{stats.withChapters}
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
