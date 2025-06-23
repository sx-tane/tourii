import type {
	QuestCreateRequestDto,
	QuestResponseDto,
	QuestUpdateRequestDto,
} from "@/api/generated";
import useSWRMutation from "swr/mutation";

// Generic mutation function
async function mutateQuest<T>(
	url: string,
	{ arg }: { arg: T },
): Promise<QuestResponseDto | { success: boolean }> {
	const method = url.includes("delete") ? "DELETE" : "POST";
	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: method !== "DELETE" ? JSON.stringify(arg) : undefined,
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(errorData || `HTTP ${response.status}`);
	}

	// For DELETE operations, return success indicator
	if (method === "DELETE") {
		return { success: true };
	}

	return response.json();
}

/**
 * Hook for creating a new quest
 */
export function useCreateQuest(onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		"/api/quests/create-quest",
		mutateQuest<QuestCreateRequestDto>,
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}

/**
 * Hook for updating an existing quest
 */
export function useUpdateQuest(onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		"/api/quests/update-quest",
		mutateQuest<QuestUpdateRequestDto & { questId: string }>,
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}

/**
 * Hook for deleting a quest
 */
export function useDeleteQuest(onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		"delete-quest",
		async (_key: string, { arg }: { arg: { questId: string } }) => {
			return mutateQuest(`/api/quests/${arg.questId}`, { arg: {} });
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}

// Task Management Types
type TaskCreateRequestDto = {
	questId: string;
	taskTheme: string;
	taskType: string;
	taskName: string;
	taskDesc: string;
	isUnlocked: boolean;
	requiredAction: string;
	groupActivityMembers?: unknown[];
	selectOptions?: unknown[];
	antiCheatRules: Record<string, unknown>;
	magatamaPointAwarded: number;
	delFlag: boolean;
};

type TaskUpdateRequestDto = TaskCreateRequestDto & {
	taskId: string;
	updUserId: string;
};

/**
 * Hook for creating a quest task
 */
export function useCreateQuestTask(questId: string, onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		`/api/quests/create-task/${questId}`,
		mutateQuest<Omit<TaskCreateRequestDto, "questId">>,
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}

/**
 * Hook for updating a quest task
 */
export function useUpdateQuestTask(onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		"/api/quests/update-task",
		mutateQuest<TaskUpdateRequestDto>,
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}

/**
 * Hook for deleting a quest task
 */
export function useDeleteQuestTask(onSuccess?: () => void) {
	const { trigger, isMutating, error } = useSWRMutation(
		"delete-quest-task",
		async (_key: string, { arg }: { arg: { taskId: string } }) => {
			return mutateQuest(`/api/quests/delete-task/${arg.taskId}`, { arg: {} });
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
		},
	);

	return {
		trigger,
		isMutating,
		error,
	};
}
