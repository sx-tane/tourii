// Cache for resolved names to avoid repeated API calls
const nameCache = new Map<string, string>();

// Admin fallback cache for invalid IDs
const errorCache = new Set<string>();

async function fetchResolvedName(
	type: "quest" | "tourist-spot" | "story-chapter" | "task",
	id: string,
	action?: string,
): Promise<string | null> {
	const cacheKey = action ? `${type}-${id}-${action}` : `${type}-${id}`;
	if (nameCache.has(cacheKey)) {
		return nameCache.get(cacheKey)!;
	}

	if (errorCache.has(cacheKey)) {
		return null;
	}

	try {
		let url = `/api/admin/resolve?type=${type}&id=${id}`;
		if (action) {
			url += `&action=${encodeURIComponent(action)}`;
		}
		const response = await fetch(url);
		if (!response.ok) {
			return null;
		}
		const data = await response.json();
		if (data.name) {
			nameCache.set(cacheKey, data.name);
			return data.name;
		}
		return null;
	} catch (error) {
		console.error(`Failed to fetch resolved name for ${type}:${id}${action ? ` (action: ${action})` : ''}`, error);
		errorCache.add(cacheKey);
		return null;
	}
}

/**
 * Resolve quest ID to quest name
 */
export async function resolveQuestName(questId: string): Promise<string> {
	const name = await fetchResolvedName("quest", questId);
	return name || `Quest #${questId.slice(-6)}`;
}

/**
 * Resolve tourist spot ID to tourist spot name
 */
export async function resolveTouristSpotName(
	touristSpotId: string,
): Promise<string> {
	const name = await fetchResolvedName("tourist-spot", touristSpotId);
	return name || `Tourist Spot #${touristSpotId.slice(-6)}`;
}

/**
 * Resolve story chapter ID to story chapter name
 */
export async function resolveStoryChapterName(
	storyChapterId: string,
): Promise<string> {
	const name = await fetchResolvedName("story-chapter", storyChapterId);
	return name || `Story Chapter #${storyChapterId.slice(-6)}`;
}

/**
 * Resolve task ID to task name/description
 */
export async function resolveTaskName(
	taskId: string,
	action?: string,
): Promise<string> {
	const name = await fetchResolvedName("task", taskId, action);
	if (name) return name;
	
	// Fallback to formatted ID if API call fails
	if (action) {
		const formattedAction = action
			.replace(/_/g, " ")
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");
		return `${formattedAction} Task #${taskId.slice(-4)}`;
	}
	return `Task #${taskId.slice(-6)}`;
}

/**
 * Clear the name resolution cache
 */
export function clearNameCache(): void {
	nameCache.clear();
	errorCache.clear();
}

/**
 * Batch resolve multiple quest names
 */
export async function batchResolveQuestNames(
	questIds: string[],
): Promise<Map<string, string>> {
	const resolvedNames = new Map<string, string>();

	await Promise.allSettled(
		questIds.map(async (questId) => {
			resolvedNames.set(questId, await resolveQuestName(questId));
		}),
	);

	return resolvedNames;
}

/**
 * Batch resolve multiple tourist spot names
 */
export async function batchResolveTouristSpotNames(
	spotIds: string[],
): Promise<Map<string, string>> {
	const resolvedNames = new Map<string, string>();

	await Promise.allSettled(
		spotIds.map(async (spotId) => {
			resolvedNames.set(spotId, await resolveTouristSpotName(spotId));
		}),
	);

	return resolvedNames;
}

/**
 * Batch resolve multiple story chapter names
 */
export async function batchResolveStoryChapterNames(
	chapterIds: string[],
): Promise<Map<string, string>> {
	const resolvedNames = new Map<string, string>();

	await Promise.allSettled(
		chapterIds.map(async (chapterId) => {
			resolvedNames.set(chapterId, await resolveStoryChapterName(chapterId));
		}),
	);

	return resolvedNames;
}
