import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import { useState } from "react";

export interface TaskAnswerTextProps {
	task: TaskResponseDto;
	quest: QuestResponseDto;
	onComplete: () => void;
}

const TaskAnswerText: React.FC<TaskAnswerTextProps> = ({
	task,
	quest,
	onComplete,
}) => {
	const [answer, setAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			// TODO: Replace with actual user ID from session
			const userId = "user-id-placeholder";
			const res = await fetch(`/api/tasks/answer-text`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskId: task.taskId, answer, userId }),
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Failed to submit answer");
			}

			if (data.success === true) {
				setSuccess(true);
				setAnswer("");
				onComplete();
			} else {
				setError(data.message || "Incorrect answer");
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Unknown error");
			}
		} finally {
			setLoading(false);
		}
	};

	const questName = quest.questName;
	const location = quest.touristSpot?.touristSpotName ?? "";

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#f7f4ee] rounded-xl p-6 max-w-md mx-auto shadow-md flex flex-col gap-4"
		>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl font-medium text-[#1a140a]">{questName}</h2>
			</div>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl font-bold text-[#1a140a]">
					Solve the riddle from {task.taskName}
				</h2>
				<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-sm font-medium">
					{location}
				</span>
			</div>
			<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-base font-medium w-fit mb-2">
				{"Story Riddle"}
			</span>
			<p className="text-[#3d2c13] mb-2 text-base">{task.taskDesc}</p>
			<input
				type="text"
				className="border border-[#e0d7c6] rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#a89c87] bg-white"
				placeholder="Answer"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				disabled={loading}
				required
			/>
			<button
				type="submit"
				className="bg-[#2d432c] text-white rounded-lg px-6 py-3 font-semibold text-lg hover:bg-[#1a2d1a] transition-colors disabled:opacity-60"
				disabled={loading || !answer}
			>
				{loading ? "Submitting..." : "Submit"}
			</button>
			{error && <div className="text-red-600 text-sm mt-2">{error}</div>}
			{success && (
				<div className="text-green-700 text-sm mt-2">Answer submitted!</div>
			)}
		</form>
	);
};

export default TaskAnswerText;
