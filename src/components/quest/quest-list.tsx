"use client";

interface QuestListProps {
	quests: any;
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
}

const questTypeOptions = [
	{ value: "all", label: "All Types" },
	{ value: "TRAVEL_TO_EARN", label: "Travel to Earn" },
	{ value: "EARN_TO_TRAVEL", label: "Earn to Travel" },
	{ value: "CAMPAIGN", label: "Campaign" },
	{ value: "COMMUNITY_EVENT", label: "Community Event" },
];

const unlockStatusOptions = [
	{ value: "all", label: "All Status" },
	{ value: "true", label: "Unlocked" },
	{ value: "false", label: "Locked" },
];

const premiumStatusOptions = [
	{ value: "all", label: "All Status" },
	{ value: "true", label: "Premium" },
	{ value: "false", label: "Free" },
];

const QuestList = ({
	quests,
	filters,
	onFilterChange,
	onPageChange,
	isLoading,
	error,
}: QuestListProps) => {
	const currentPage = quests?.pagination?.currentPage || 1;
	const totalPages = quests?.pagination?.totalPages || 1;
	const questList = quests?.quests || [];

	return (
		<div className="bg-[#f7f4ee] min-h-screen py-10 px-4">
			{/* Filters */}
			<div className="bg-[#fdfaf6] border border-[#e0d7c6] shadow-sm rounded-lg p-4 mb-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label
							htmlFor="type"
							className="block text-sm font-medium text-[#5c4a1c] mb-1"
						>
							Quest Type
						</label>
						<select
							id="type"
							value={filters.questType}
							onChange={(e) =>
								onFilterChange({ ...filters, questType: e.target.value })
							}
							className="block w-full pl-3 pr-10 py-2 text-base border border-[#e0d7c6] focus:outline-none focus:ring-[#a89c87] focus:border-[#a89c87] rounded-md bg-[#f7f4ee] text-[#5c4a1c]"
						>
							{questTypeOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="unlocked"
							className="block text-sm font-medium text-[#5c4a1c] mb-1"
						>
							Unlock Status
						</label>
						<select
							id="unlocked"
							value={filters.unlockStatus}
							onChange={(e) =>
								onFilterChange({ ...filters, unlockStatus: e.target.value })
							}
							className="block w-full pl-3 pr-10 py-2 text-base border border-[#e0d7c6] focus:outline-none focus:ring-[#a89c87] focus:border-[#a89c87] rounded-md bg-[#f7f4ee] text-[#5c4a1c]"
						>
							{unlockStatusOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="premium"
							className="block text-sm font-medium text-[#5c4a1c] mb-1"
						>
							Premium Status
						</label>
						<select
							id="premium"
							value={filters.premiumStatus}
							onChange={(e) =>
								onFilterChange({ ...filters, premiumStatus: e.target.value })
							}
							className="block w-full pl-3 pr-10 py-2 text-base border border-[#e0d7c6] focus:outline-none focus:ring-[#a89c87] focus:border-[#a89c87] rounded-md bg-[#f7f4ee] text-[#5c4a1c]"
						>
							{premiumStatusOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
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
						{questList.map((quest: any) => (
							<div
								key={quest.questId}
								className="bg-[#fdfaf6] border border-[#e0d7c6] rounded-xl shadow-md p-4 flex flex-col items-stretch min-h-[370px]"
							>
								<div className="relative">
									<img
										src={quest.questImage}
										alt={quest.questName}
										className="rounded-lg h-40 w-full object-cover mb-4"
									/>
								</div>
								<div className="font-semibold text-lg mb-1 text-[#3d2c13]">
									{quest.questName}
								</div>
								<div className="flex items-center text-[#7c6f57] text-sm mb-4 gap-3">
									<span>★ {quest.totalMagatamaPointAwarded} PTS</span>
									<span className="ml-2">{quest.questType}</span>
								</div>
								<button className="mt-auto bg-[#a89c87] text-white rounded-md py-2 font-semibold text-base hover:bg-[#8c7c65] transition-colors duration-150">
									Start Quest
								</button>
							</div>
						))}
					</div>
					<div className="flex justify-center items-center gap-4 mt-8">
						<button
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
						>
							Previous
						</button>
						<span className="text-[#5c4a1c] font-medium">
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default QuestList;
