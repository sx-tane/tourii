import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import type React from "react";
import { useState } from "react";

export interface TaskCheckInProps {
	task: TaskResponseDto;
	quest: QuestResponseDto;
	isSubmitting: boolean;
	error: string | null;
	onSubmit: (coords: { lat: number; lng: number }) => void;
	onComplete: () => void;
}

const TaskCheckIn: React.FC<TaskCheckInProps> = ({
	task,
	quest,
	isSubmitting,
	error,
	onSubmit,
	onComplete,
}) => {
	const [locationError, setLocationError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleCheckIn = () => {
		setLocationError(null);
		if (!navigator.geolocation) {
			setLocationError("Geolocation is not supported by your browser");
			return;
		}

		// For demo purposes, let's assume success and call onComplete after a delay
		// In a real app, this would be handled by the parent component's state
		if (isSubmitting) return;

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lng } = position.coords;
				onSubmit({ lat, lng });
				// We'll rely on parent component to tell us about success
			},
			() => {
				setLocationError(
					"Unable to retrieve your location. Please enable location services.",
				);
			},
		);
	};

	const questName = quest.questName;
	const location = quest.touristSpot?.touristSpotName ?? "";

	return (
		<div className="bg-[#f7f4ee] rounded-xl p-6 max-w-md mx-auto shadow-md flex flex-col gap-4 items-center">
			<div className="flex justify-between items-center w-full mb-2">
				<h2 className="text-2xl font-medium text-[#1a140a]">{questName}</h2>
			</div>
			<div className="flex justify-between items-center w-full mb-2">
				<h2 className="text-2xl font-bold text-[#1a140a]">{task.taskName}</h2>
				<span className="bg-[#e0d7c6] text-[#5c4a1c] px-3 py-1 rounded-lg text-sm font-medium">
					{location}
				</span>
			</div>

			<p className="text-[#3d2c13] mb-2 text-center text-base">
				{task.taskDesc}
			</p>
			<div className="w-full flex flex-col items-center">
				<div className="w-full h-40 bg-[#ece5d6] rounded-xl flex items-center justify-center mb-2">
					<svg width="48" height="48" fill="none" viewBox="0 0 24 24">
						<title>Map pin</title>
						<path
							d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
							fill="#1a140a"
						/>
					</svg>
				</div>
			</div>
			{(error || locationError) && (
				<div className="text-red-600 text-sm mt-2 text-center">
					{error || locationError}
				</div>
			)}
			<button
				type="button"
				className="bg-[#2d2d29] text-white rounded-xl px-8 py-4 font-semibold text-xl mt-2 w-full hover:bg-[#1a1a18] transition-colors disabled:opacity-60"
				onClick={handleCheckIn}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Checking In..." : "Check In"}
			</button>
		</div>
	);
};

export default TaskCheckIn;
