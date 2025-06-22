import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import type React from "react";
import { useState } from "react";

interface SelectOption {
	optionId: number;
	optionText: string;
}

export interface TaskSelectOptionsProps {
	task: TaskResponseDto;
	quest: QuestResponseDto;
	isSubmitting: boolean;
	error: string | null;
	onSubmit: (selectedOptionIds: number[]) => void;
	onComplete: () => void;
}

const TaskSelectOptions: React.FC<TaskSelectOptionsProps> = ({
	task,
	quest,
	isSubmitting,
	error,
	onSubmit,
	onComplete,
}) => {
	const [selected, setSelected] = useState<number[]>([]);

	const handleOptionClick = (optionId: number) => {
		setSelected((prev) =>
			prev.includes(optionId)
				? prev.filter((id) => id !== optionId)
				: [...prev, optionId],
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (selected.length === 0) return;
		onSubmit(selected);
	};

	const questName = quest.questName;
	const location = quest.touristSpot?.touristSpotName ?? "";
	const selectOptions = (task.selectOptions as SelectOption[]) || [];

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#f7f4ee] rounded-xl p-6 max-w-md mx-auto shadow-md flex flex-col gap-4"
		>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl font-medium text-[#1a140a]">{questName}</h2>
			</div>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl font-bold text-[#1a140a]">{task.taskName}</h2>
				<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-sm font-medium">
					{location}
				</span>
			</div>
			<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-base font-medium w-fit mb-2">
				{"Select Option"}
			</span>
			<p className="text-[#3d2c13] mb-2 text-base">{task.taskDesc}</p>
			<div className="flex flex-col gap-3 mb-2">
				{selectOptions.map((option) => (
					<button
						key={option.optionId}
						type="button"
						className={`text-left border rounded-xl px-5 py-4 text-lg font-medium transition-colors ${
							selected.includes(option.optionId)
								? "bg-[#ede3cf] border-[#a89c87]"
								: "bg-white border-[#e0d7c6]"
						}`}
						onClick={() => handleOptionClick(option.optionId)}
						disabled={isSubmitting}
					>
						{option.optionText}
					</button>
				))}
			</div>
			{error && <div className="text-red-600 text-sm mt-2">{error}</div>}
			<button
				type="submit"
				className="bg-[#2d432c] text-white rounded-lg px-6 py-3 font-semibold text-lg hover:bg-[#1a2d1a] transition-colors disabled:opacity-60"
				disabled={isSubmitting || selected.length === 0}
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default TaskSelectOptions;
