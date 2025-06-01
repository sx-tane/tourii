"use client";

import QuestFilterBar from "./quest-filter-bar";
import QuestPagination from "./quest-pagination";
import { QuestListResponseDto } from "@/api/generated/models/QuestListResponseDto";

interface QuestListProps {
	quests: QuestListResponseDto;
	filters: {
		questType: string;
		unlockStatus: string;
		premiumStatus: string;
	};
	onFilterChange: (filters: {
		questType: string;
		unlockStatus: string;
		premiumStatus: string;
	}) => void;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
	error?: any;
	onQuestClick?: (questId: string) => void;
}

const QuestList = ({
	quests,
	filters,
	onFilterChange,
	onPageChange,
	isLoading,
	error,
	onQuestClick,
}: QuestListProps) => {
	const currentPage = quests?.pagination?.currentPage || 1;
	const totalPages = quests?.pagination?.totalPages || 1;
	const questList = quests?.quests || [];

	return (
		<div className="bg-[#f7f4ee] min-h-screen py-10 px-4">
			<QuestFilterBar filters={filters} onFilterChange={onFilterChange} />
			{isLoading && (
				<div className="flex justify-center items-center py-20 text-[#5c4a1c] text-lg font-medium">
					Loading quests...
				</div>
			)}
			{error && (
				<div className="flex justify-center items-center py-20 text-red-600 text-lg font-medium">
					Failed to load quests.
				</div>
			)}
			{!isLoading && !error && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-7">
						{questList.map((quest: any) => {
							const isLocked = !quest.isUnlocked;
							return (
								<div
									key={quest.questId}
									className={`bg-[#fdfaf6] border border-[#e0d7c6] rounded-xl shadow-md p-4 flex flex-col items-stretch min-h-[370px] relative ${isLocked ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
									onClick={() => !isLocked && onQuestClick?.(quest.questId)}
								>
									<div className="relative">
										<img
											src={quest.questImage}
											alt={quest.questName}
											className="rounded-lg h-40 w-full object-cover mb-4"
										/>
										{quest.isPremium && (
											<span
												className="absolute top-2 right-2 text-yellow-500 text-xl"
												title="Premium"
											>
												★
											</span>
										)}
										{isLocked && (
											<span
												className="absolute top-2 left-2 text-gray-500 text-xl"
												title="Locked"
											>
												🔒
											</span>
										)}
									</div>
									<div className="font-semibold text-lg mb-1 text-[#3d2c13]">
										{quest.questName}
									</div>
									<div className="flex items-center text-[#7c6f57] text-sm mb-4 gap-3">
										<span>★ {quest.totalMagatamaPointAwarded} PTS</span>
										<span className="ml-2">{quest.questType}</span>
									</div>
									<button
										className="mt-auto bg-[#a89c87] text-white rounded-md py-2 font-semibold text-base hover:bg-[#8c7c65] transition-colors duration-150"
										disabled={isLocked}
									>
										{isLocked ? "Locked" : "Start Quest"}
									</button>
								</div>
							);
						})}
					</div>
					<QuestPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</>
			)}
		</div>
	);
};

export default QuestList;
