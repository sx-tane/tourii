"use client";

import { useHomepageHighlights } from "@/hooks/api/useHomepageHighlights";
import LatestStoryChapter from "./latest-story-chapter";
import PopularQuestList from "./popular-quest-list";

export default function HighlightsSection() {
	const { data: highlights, isLoading, isError } = useHomepageHighlights();

	if (isLoading) {
		return <HighlightsSkeleton />;
	}

	if (isError || !highlights) {
		return <HighlightsError />;
	}

	return (
		<section className="min-h-screen bg-charcoal py-16 px-6">
			<div className="max-w-7xl mx-auto space-y-20">
				{/* Latest Story Chapter */}
				<LatestStoryChapter chapter={highlights.latestChapter} />

				{/* Popular Quests */}
				<PopularQuestList quests={highlights.popularQuests} />
			</div>
		</section>
	);
}

function HighlightsSkeleton() {
	return (
		<section className="min-h-screen bg-charcoal py-16 px-6">
			<div className="max-w-7xl mx-auto space-y-20">
				{/* Chapter Skeleton */}
				<div className="space-y-6">
					<div className="text-center">
						<div className="inline-block space-y-2">
							<div className="h-4 w-24 bg-warmGrey5 rounded animate-pulse mx-auto" />
							<div className="h-10 w-64 bg-warmGrey5 rounded animate-pulse mx-auto" />
						</div>
					</div>
					<div className="max-w-2xl mx-auto">
						<div className="aspect-[16/10] bg-warmGrey5 rounded-3xl animate-pulse" />
						<div className="p-6 space-y-2">
							<div className="h-6 w-3/4 bg-warmGrey5 rounded animate-pulse" />
							<div className="h-4 w-1/2 bg-warmGrey5 rounded animate-pulse" />
						</div>
					</div>
				</div>

				{/* Quests Skeleton */}
				<div className="space-y-6">
					<div className="text-center">
						<div className="inline-block space-y-2">
							<div className="h-4 w-20 bg-warmGrey5 rounded animate-pulse mx-auto" />
							<div className="h-10 w-48 bg-warmGrey5 rounded animate-pulse mx-auto" />
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="space-y-4">
								<div className="aspect-[4/3] bg-warmGrey5 rounded-2xl animate-pulse" />
								<div className="space-y-2">
									<div className="h-5 w-3/4 bg-warmGrey5 rounded animate-pulse" />
									<div className="h-4 w-1/2 bg-warmGrey5 rounded animate-pulse" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function HighlightsError() {
	return (
		<section className="min-h-screen bg-charcoal py-16 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="text-center py-20">
					<h2 className="text-white text-2xl font-bold mb-4">
						Unable to load highlights
					</h2>
					<p className="text-warmGrey3 text-lg">
						Please check your connection and try again.
					</p>
				</div>
			</div>
		</section>
	);
}