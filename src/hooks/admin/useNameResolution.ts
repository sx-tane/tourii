import { useProxySWR } from "@/lib/swr/useProxySWR";
import {
	batchResolveQuestNames,
	batchResolveStoryChapterNames,
	batchResolveTouristSpotNames,
} from "@/utils/name-resolution";
import { useEffect, useState, useMemo } from "react";

interface NameResolutionHookResult {
	questNames: Map<string, string>;
	touristSpotNames: Map<string, string>;
	storyChapterNames: Map<string, string>;
	isLoading: boolean;
	error: string | null;
}

/**
 * Hook to resolve IDs to names for display in admin interfaces
 */
export function useNameResolution(
	questIds: string[] = [],
	touristSpotIds: string[] = [],
	storyChapterIds: string[] = [],
): NameResolutionHookResult {
	const [questNames, setQuestNames] = useState<Map<string, string>>(new Map());
	const [touristSpotNames, setTouristSpotNames] = useState<Map<string, string>>(
		new Map(),
	);
	const [storyChapterNames, setStoryChapterNames] = useState<
		Map<string, string>
	>(new Map());
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const resolveNames = async () => {
			if (
				questIds.length === 0 &&
				touristSpotIds.length === 0 &&
				storyChapterIds.length === 0
			) {
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const [resolvedQuests, resolvedSpots, resolvedChapters] =
					await Promise.allSettled([
						questIds.length > 0
							? batchResolveQuestNames(questIds)
							: Promise.resolve(new Map()),
						touristSpotIds.length > 0
							? batchResolveTouristSpotNames(touristSpotIds)
							: Promise.resolve(new Map()),
						storyChapterIds.length > 0
							? batchResolveStoryChapterNames(storyChapterIds)
							: Promise.resolve(new Map()),
					]);

				if (resolvedQuests.status === "fulfilled") {
					setQuestNames(resolvedQuests.value);
				}
				if (resolvedSpots.status === "fulfilled") {
					setTouristSpotNames(resolvedSpots.value);
				}
				if (resolvedChapters.status === "fulfilled") {
					setStoryChapterNames(resolvedChapters.value);
				}

				// Check if any promises were rejected
				const rejectedPromises = [
					resolvedQuests,
					resolvedSpots,
					resolvedChapters,
				].filter((result) => result.status === "rejected");

				if (rejectedPromises.length > 0) {
					console.warn("Some name resolutions failed:", rejectedPromises);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to resolve names",
				);
				console.error("Error resolving names:", err);
			} finally {
				setIsLoading(false);
			}
		};

		resolveNames();
	}, [questIds, touristSpotIds, storyChapterIds]);

	return {
		questNames,
		touristSpotNames,
		storyChapterNames,
		isLoading,
		error,
	};
}

/**
 * Hook to resolve a single quest name using the quest list API
 */
export function useQuestName(questId: string | null): {
	name: string;
	isLoading: boolean;
} {
	const { data: questData, isLoading } = useProxySWR<{
		quests: Array<{
			questId: string;
			questName: string;
		}>;
	}>(`/api/quests`);

	const questName = useMemo(() => {
		if (!questId || !questData?.quests) {
			return `Quest #${questId?.slice(-6) ?? ""}`;
		}

		const quest = questData.quests.find((q) => q.questId === questId);
		return quest?.questName || `Quest #${questId.slice(-6)}`;
	}, [questId, questData]);

	return {
		name: questName,
		isLoading,
	};
}

/**
 * Hook to resolve a single tourist spot name using the routes API
 */
export function useTouristSpotName(spotId: string | null): {
	name: string;
	isLoading: boolean;
} {
	const { data: routesData, isLoading } = useProxySWR<
		Array<{
			modelRouteId: string;
			touristSpotList: Array<{
				touristSpotId: string;
				touristSpotName: string;
			}>;
		}>
	>(`/api/routes`);

	const spotName = useMemo(() => {
		if (!spotId || !routesData) {
			return `Tourist Spot #${spotId?.slice(-6) ?? ""}`;
		}

		// Search through all routes for the tourist spot
		for (const route of routesData) {
			const spot = route.touristSpotList?.find(
				(s) => s.touristSpotId === spotId,
			);
			if (spot) {
				return spot.touristSpotName;
			}
		}

		return `Tourist Spot #${spotId.slice(-6)}`;
	}, [spotId, routesData]);

	return {
		name: spotName,
		isLoading,
	};
}

/**
 * Hook to resolve a single story chapter name using the sagas API
 */
export function useStoryChapterName(chapterId: string | null): {
	name: string;
	isLoading: boolean;
} {
	const { data: storiesData, isLoading } =
		useProxySWR<
			Array<{
				storyId: string;
				sagaName: string;
				chapterList?: Array<{
					storyChapterId: string;
					chapterTitle: string;
				}>;
			}>
		>(`/api/stories/sagas`);

	const chapterName = useMemo(() => {
		if (!chapterId || !storiesData) {
			return `Chapter #${chapterId?.slice(-6) ?? ""}`;
		}

		// Search through all stories for the chapter
		for (const story of storiesData) {
			if (story.chapterList) {
				const chapter = story.chapterList.find(
					(c) => c.storyChapterId === chapterId,
				);
				if (chapter) {
					return chapter.chapterTitle;
				}
			}
		}

		return `Chapter #${chapterId.slice(-6)}`;
	}, [chapterId, storiesData]);

	return {
		name: chapterName,
		isLoading,
	};
}

/**
 * Hook to resolve a single task name
 */
export function useTaskName(
	taskId: string | null,
	action?: string,
): { name: string; isLoading: boolean } {
	// Since there's no direct task API endpoint, format the name locally
	const name = useMemo(() => {
		if (!taskId) return "";

		if (action) {
			const formattedAction = action
				.replace(/_/g, " ")
				.split(" ")
				.map(
					(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
				)
				.join(" ");
			return `${formattedAction} Task #${taskId.slice(-4)}`;
		}
		return `Task #${taskId.slice(-6)}`;
	}, [taskId, action]);

	return { name, isLoading: false };
}
