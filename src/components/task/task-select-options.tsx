import type React from "react";
import { useState } from "react";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import { answerTaskSelectOption } from "@/app/api/tasks/selectOption";

interface SelectOption {
	optionId: number;
	optionText: string;
}

export interface TaskSelectOptionsProps {
	task: TaskResponseDto & { selectOptions: SelectOption[] };
}

const TaskSelectOptions: React.FC<TaskSelectOptionsProps> = ({ task }) => {
	const [selected, setSelected] = useState<number[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleOptionClick = (optionId: number) => {
		setSelected((prev) =>
			prev.includes(optionId)
				? prev.filter((id) => id !== optionId)
				: [...prev, optionId],
		);
		setSubmitted(false);
		setIsCorrect(null);
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (selected.length === 0) return;
		setLoading(true);
		setError(null);
		try {
			const result = await answerTaskSelectOption(task.taskId, selected);
			setIsCorrect(result);
			setSubmitted(true);
			if (!result) setError("Incorrect answer");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#f7f4ee] rounded-xl p-6 max-w-md mx-auto shadow-md flex flex-col gap-4"
		>
			<h2 className="text-3xl font-bold text-[#1a140a] mb-2">
				{task.taskName}
			</h2>
			<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-base font-medium w-fit mb-2">
				Select Option
			</span>
			<p className="text-[#3d2c13] mb-2 text-base">{task.taskDesc}</p>
			<div className="flex flex-col gap-3 mb-2">
				{task.selectOptions?.map((option) => (
					<button
						key={option.optionId}
						type="button"
						className={`text-left border rounded-xl px-5 py-4 text-lg font-medium transition-colors
							${selected.includes(option.optionId) ? "bg-[#ede3cf] border-[#a89c87]" : "bg-white border-[#e0d7c6]"}
							${submitted && isCorrect && selected.includes(option.optionId) ? "bg-green-100 border-green-200" : ""}
							${submitted && isCorrect && selected.includes(option.optionId) ? "text-[#1a140a]" : "text-[#1a140a]"}
						`}
						onClick={() => handleOptionClick(option.optionId)}
						disabled={submitted && isCorrect === true}
					>
						<div className="flex flex-col">
							<span>{option.optionText}</span>
							{submitted && isCorrect && selected.includes(option.optionId) && (
								<span className="text-green-700 font-semibold mt-1">
									Correct!
								</span>
							)}
						</div>
					</button>
				))}
			</div>
			{error && <div className="text-red-600 text-sm mt-2">{error}</div>}
			<button
				type="submit"
				className="bg-[#ede3cf] text-[#1a140a] rounded-xl px-8 py-4 font-semibold text-xl mt-2 hover:bg-[#e0d7c6] transition-colors disabled:opacity-60"
				disabled={
					loading || selected.length === 0 || (submitted && isCorrect === true)
				}
			>
				{isCorrect
					? "Continue to Next Step"
					: loading
						? "Submitting..."
						: "Submit"}
			</button>
		</form>
	);
};

export default TaskSelectOptions;
