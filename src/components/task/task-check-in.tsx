import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import type React from "react";
import { useState } from "react";

export interface TaskCheckInProps {
	task: TaskResponseDto;
}

const TaskCheckIn: React.FC<TaskCheckInProps> = ({ task }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleCheckIn = async () => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
			setLoading(false);
			return;
		}
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				try {
					const result = await checkInTask(task.taskId, lat, lng, userId);
					if (result) {
						setSuccess(true);
					} else {
						setError("Check-in failed. Please try again.");
					}
				} catch (err: unknown) {
					setError(err instanceof Error ? err.message : "Unknown error");
				} finally {
					setLoading(false);
				}
			},
			(geoError) => {
				setError("Unable to retrieve your location");
				setLoading(false);
			},
		);
	};

	return (
		<div className="bg-[#f7f4ee] rounded-xl p-6 max-w-md mx-auto shadow-md flex flex-col gap-4 items-center">
			<h2 className="text-3xl font-bold text-[#1a140a] text-center mb-2">
				{task.taskName}
			</h2>
			<div className="flex gap-2 mb-2">
				<span className="bg-[#ede3cf] text-[#1a140a] px-4 py-1 rounded-lg text-base font-semibold tracking-wide">
					CHECK-IN OFFLINE
				</span>
			</div>
			<p className="text-[#3d2c13] mb-2 text-center text-base">
				{task.taskDesc}
			</p>
			<div className="w-full flex flex-col items-center">
				<div className="w-full h-40 bg-[#ece5d6] rounded-xl flex items-center justify-center mb-2">
					{/* Map pin icon */}
					<svg width="48" height="48" fill="none" viewBox="0 0 24 24">
						<title>Map pin</title>
						<path
							d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
							fill="#1a140a"
						/>
					</svg>
				</div>
				<div className="w-full bg-white rounded-b-xl rounded-t-none border-t-0 border border-[#e0d7c6] flex items-center justify-center py-4">
					{success ? (
						<span className="flex items-center gap-2 text-green-700 text-lg font-semibold">
							<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
								<title>Checkmark</title>
								<circle cx="12" cy="12" r="12" fill="#4CAF50" />
								<path
									d="M7 13l3 3 7-7"
									stroke="#fff"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							You're here!
						</span>
					) : (
						<span className="text-[#3d2c13] text-lg font-medium">
							Check in to finish the task
						</span>
					)}
				</div>
			</div>
			{error && (
				<div className="text-red-600 text-sm mt-2 text-center">{error}</div>
			)}
			<button
				type="button"
				className="bg-[#2d2d29] text-white rounded-xl px-8 py-4 font-semibold text-xl mt-2 w-full hover:bg-[#1a1a18] transition-colors disabled:opacity-60"
				onClick={handleCheckIn}
				disabled={loading || success}
			>
				{loading ? "Checking In..." : "Check In"}
			</button>
		</div>
	);
};

export default TaskCheckIn;
