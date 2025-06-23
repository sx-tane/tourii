import { useCallback } from "react";
import type { SubmitTaskResponseDto } from "@/api/generated/models/SubmitTaskResponseDto";
import { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";

/**
 * Union type for task submission data based on task type
 */
type TaskSubmissionData =
	| string // ANSWER_TEXT: answer text
	| number[] // SELECT_OPTION: selected option IDs
	| { lat: number; lng: number }; // CHECK_IN: coordinates

/**
 * Hook for submitting various types of tasks.
 *
 * This hook provides functions to submit tasks via the API,
 * following the three-layer pattern: SWR Hook → Next.js API → Generated Client
 */
export function useTaskSubmissions() {
	/**
	 * Submit an answer text task
	 */
	const submitAnswerTextTask = useCallback(
		async (
			taskId: string,
			answer: string,
			userId: string,
		): Promise<SubmitTaskResponseDto> => {
			const response = await fetch("/api/tasks/answer-text", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ taskId, answer, userId }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message ||
						`Failed to submit answer text task: ${response.status}`,
				);
			}

			return response.json();
		},
		[],
	);

	/**
	 * Submit a select options task
	 */
	const submitSelectOptionsTask = useCallback(
		async (
			taskId: string,
			selectedOptionIds: number[],
			userId: string,
		): Promise<SubmitTaskResponseDto> => {
			const response = await fetch("/api/tasks/select-option", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ taskId, selectedOptionIds, userId }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message ||
						`Failed to submit select options task: ${response.status}`,
				);
			}

			return response.json();
		},
		[],
	);

	/**
	 * Submit a check-in task
	 */
	const submitCheckInTask = useCallback(
		async (
			taskId: string,
			latitude: number,
			longitude: number,
			userId: string,
		): Promise<SubmitTaskResponseDto> => {
			const response = await fetch("/api/tasks/check-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ taskId, latitude, longitude, userId }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message ||
						`Failed to submit check-in task: ${response.status}`,
				);
			}

			return response.json();
		},
		[],
	);

	/**
	 * Generic task submission function that routes to the appropriate submission method
	 */
	const submitTask = useCallback(
		async (
			task: TaskResponseDto,
			data: TaskSubmissionData,
			userId: string,
		): Promise<SubmitTaskResponseDto> => {
			switch (task.taskType) {
				case TaskResponseDto.taskType.ANSWER_TEXT:
					return submitAnswerTextTask(task.taskId, data as string, userId);
				case TaskResponseDto.taskType.SELECT_OPTION:
					return submitSelectOptionsTask(task.taskId, data as number[], userId);
				case TaskResponseDto.taskType.CHECK_IN: {
					const coords = data as { lat: number; lng: number };
					return submitCheckInTask(task.taskId, coords.lat, coords.lng, userId);
				}
				default:
					throw new Error(`Unsupported task type: ${task.taskType}`);
			}
		},
		[submitAnswerTextTask, submitSelectOptionsTask, submitCheckInTask],
	);

	return {
		submitAnswerTextTask,
		submitSelectOptionsTask,
		submitCheckInTask,
		submitTask,
	};
}
