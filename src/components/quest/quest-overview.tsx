import type React from "react";
import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";

interface QuestOverviewProps {
	quest: QuestResponseDto;
}

const QuestOverview: React.FC<QuestOverviewProps> = ({ quest }) => {
	return (
		<div className="relative min-h-[400px]">
			{/* Background image */}
			<div className="absolute inset-0 h-[340px] w-full overflow-hidden rounded-b-3xl">
				<img
					src={quest.quest.questImage}
					alt={quest.quest.questName}
					className="w-full h-full object-cover object-center opacity-90"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f7f4ee]" />
			</div>
			{/* Main content */}
			<div className="relative z-10 flex flex-col md:flex-row max-w-6xl mx-auto mt-[220px]">
				{/* Left: Quest Info */}
				<div className="bg-white/90 rounded-2xl shadow-lg p-8 flex-1 min-w-0 mr-0 md:mr-8">
					<div className="flex gap-2 mb-2">
						{quest.quest.isUnlocked && (
							<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
								Available
							</span>
						)}
						{quest.quest.isPremium && (
							<span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
								Premium
							</span>
						)}
					</div>
					<h1 className="text-3xl font-bold text-[#1a140a] mb-2">
						{quest.quest.questName}
					</h1>
					<div className="flex items-center text-[#7c6f57] text-sm mb-4 gap-4">
						<span className="flex items-center gap-1">
                                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                                                <title>Location</title>
                                                                <path
									d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
									fill="#7c6f57"
								/>
							</svg>
							San Francisco, CA
						</span>
						<span className="flex items-center gap-1">
                                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                                                <title>Duration</title>
                                                                <path
									d="M12 8V4m0 0C7.03 4 3 8.03 3 13c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4 0-4.97-4.03-9-9-9z"
									stroke="#7c6f57"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							3-4 hours
						</span>
					</div>
					<p className="text-[#4b3c1a] mb-4 text-base leading-relaxed">
						{quest.quest.questDesc}
					</p>
					<div className="flex flex-wrap gap-2 mt-2">
						{/* Example tags, replace with quest.tags if available */}
						<span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
							Landmarks
						</span>
						<span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
							Photography
						</span>
						<span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
							Urban
						</span>
					</div>
				</div>
				{/* Right: Progress & Rewards */}
				<div className="bg-white/90 rounded-2xl shadow-lg p-8 w-full md:w-[350px] mt-8 md:mt-0 flex flex-col items-stretch">
					<h2 className="text-xl font-semibold mb-2 text-[#1a140a]">
						Quest Progress
					</h2>
					<div className="text-sm text-[#7c6f57] mb-2">
						0 of {quest.quest.tasks?.length || 0} tasks completed
					</div>
					<div className="h-2 w-full bg-[#ece5d6] rounded-full mb-4">
						<div
							className="h-2 bg-[#a89c87] rounded-full"
							style={{ width: "0%" }}
						/>
					</div>
					<div className="bg-[#fdf6ee] rounded-xl p-4 mb-2">
						<div className="font-semibold mb-1 text-[#3d2c13]">Rewards</div>
						<div className="flex flex-col gap-1">
							<span className="flex items-center gap-2 text-[#a88c2c] font-medium">
                                                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <title>Points</title>
                                                                        <path
										d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
										fill="#a88c2c"
									/>
								</svg>
								{quest.quest.totalMagatamaPointAwarded} points
							</span>
							<span className="flex items-center gap-2 text-[#7c6f57] font-medium">
								<span className="text-xs font-bold text-purple-700">NFT</span>{" "}
								Unique NFT reward
							</span>
						</div>
						<span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
							Upon completion
						</span>
					</div>
					<div className="text-xs text-[#7c6f57] mt-2">
						Complete all tasks to earn the rewards.
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestOverview;
