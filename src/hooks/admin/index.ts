export {
	useCreateModelRoute,
	useCreateTouristSpot,
	useDeleteModelRoute,
	useDeleteTouristSpot,
	useUpdateModelRoute,
	useUpdateTouristSpot,
} from "./useAdminModelRoutes";
export {
	useCreateQuest,
	useCreateQuestTask,
	useDeleteQuest,
	useDeleteQuestTask,
	useUpdateQuest,
	useUpdateQuestTask,
} from "./useAdminQuests";
export {
	useCreateStory,
	useCreateStoryChapter,
	useDeleteStory,
	useDeleteStoryChapter,
	useUpdateStory,
	useUpdateStoryChapter,
} from "./useAdminStories";
export {
	useNameResolution,
	useQuestName,
	useStoryChapterName,
	useTaskName,
	useTouristSpotName,
} from "./useNameResolution";

// Admin SWR hooks for read operations
export {
	useAdminSubmissions,
	type AdminSubmissionsResponse,
	type SubmissionData,
} from "./useAdminSubmissions";
export { useAdminUsers } from "./useAdminUsers";
