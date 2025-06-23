import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";

const STORAGE_KEYS = {
	QUEST: 'currentQuest',
	TASK: 'currentTask',
} as const;

export const questStorage = {
	/**
	 * Store quest and task data in session storage
	 */
	setQuestData: (quest: QuestResponseDto, task: TaskResponseDto) => {
		try {
			sessionStorage.setItem(STORAGE_KEYS.QUEST, JSON.stringify(quest));
			sessionStorage.setItem(STORAGE_KEYS.TASK, JSON.stringify(task));
			return true;
		} catch (error) {
			console.error('Error storing quest data:', error);
			return false;
		}
	},

	/**
	 * Get quest data from session storage
	 */
	getQuestData: (): QuestResponseDto | null => {
		try {
			const data = sessionStorage.getItem(STORAGE_KEYS.QUEST);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Error retrieving quest data:', error);
			return null;
		}
	},

	/**
	 * Get task data from session storage
	 */
	getTaskData: (): TaskResponseDto | null => {
		try {
			const data = sessionStorage.getItem(STORAGE_KEYS.TASK);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Error retrieving task data:', error);
			return null;
		}
	},

	/**
	 * Get both quest and task data from session storage
	 */
	getQuestAndTaskData: (): { quest: QuestResponseDto | null; task: TaskResponseDto | null } => {
		return {
			quest: questStorage.getQuestData(),
			task: questStorage.getTaskData(),
		};
	},

	/**
	 * Clear quest and task data from session storage
	 */
	clearQuestData: () => {
		try {
			sessionStorage.removeItem(STORAGE_KEYS.QUEST);
			sessionStorage.removeItem(STORAGE_KEYS.TASK);
			return true;
		} catch (error) {
			console.error('Error clearing quest data:', error);
			return false;
		}
	},

	/**
	 * Check if quest data exists in session storage
	 */
	hasQuestData: (): boolean => {
		return !!(sessionStorage.getItem(STORAGE_KEYS.QUEST) && sessionStorage.getItem(STORAGE_KEYS.TASK));
	},
}; 