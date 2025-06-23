"use client";
import { QuestResponseDto } from "@/api/generated";
import { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import TaskAnswerText from "@/components/task/task-answer-text";
import TaskCheckIn from "@/components/task/task-check-in";
import TaskSelectOptions from "@/components/task/task-select-options";
import { useTaskSubmissions } from "@/hooks/api";
import { questStorage } from "@/utils/quest-storage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TaskPage({
	params,
}: {
	params: Promise<{ taskId: string }>;
}) {
	const [task, setTask] = useState<TaskResponseDto | null>(null);
	const [quest, setQuest] = useState<QuestResponseDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const { data: session, status } = useSession();
	const { submitTask } = useTaskSubmissions();

	useEffect(() => {
		const initializeTask = async () => {
			const { taskId } = await params;
			const { quest: questData, task: taskData } =
				questStorage.getQuestAndTaskData();

			if (questData && taskData) {
				// Verify that the taskId matches
				if (taskData.taskId === taskId) {
					setQuest(questData);
					setTask(taskData);
				} else {
					setError("Task ID mismatch");
				}
			} else {
				// Fallback: try to fetch from API if no data in session storage
				// This would be your actual API call in a real app
				setError(
					"Quest and task data not found. Please return to the quest overview.",
				);
			}

			setIsLoading(false);
		};

		initializeTask();
	}, [params]);

	const handleSubmit = async (data: any) => {
		if (!task) return;

		setIsSubmitting(true);
		setError(null);
		setSuccess(false);

		try {
			// Get user ID from session
			const userId = session?.user?.id;
			if (!userId) {
				throw new Error("User not authenticated");
			}

			const result = await submitTask(task, data, userId);

			if (result.success) {
				setSuccess(true);
			} else {
				setError(result.message || "Incorrect answer, please try again.");
			}
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleComplete = () => {
		// Handle navigation to the next step or quest overview
		alert("Task Completed! Navigating to the next step...");
	};

	if (isLoading) return <div className="p-8 text-center">Loading task...</div>;
	if (!task || !quest)
		return <div className="p-8 text-center">Task not found.</div>;

	const renderTaskComponent = () => {
		switch (task.taskType) {
			case TaskResponseDto.taskType.ANSWER_TEXT:
				return (
					<TaskAnswerText
						task={task}
						quest={quest}
						isSubmitting={isSubmitting}
						error={error}
						onSubmit={handleSubmit}
						onComplete={handleComplete}
					/>
				);
			case TaskResponseDto.taskType.SELECT_OPTION:
				return (
					<TaskSelectOptions
						task={task}
						quest={quest}
						isSubmitting={isSubmitting}
						error={error}
						onSubmit={handleSubmit}
						onComplete={handleComplete}
					/>
				);
			case TaskResponseDto.taskType.CHECK_IN:
				return (
					<TaskCheckIn
						task={task}
						quest={quest}
						isSubmitting={isSubmitting}
						error={error}
						onSubmit={handleSubmit}
						onComplete={handleComplete}
					/>
				);
			default:
				return <div>Unsupported task type: {task.taskType}</div>;
		}
	};

	return <div className="p-4">{renderTaskComponent()}</div>;
}
