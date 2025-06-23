import { useCallback, memo } from "react";

interface QuestFiltersProps {
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
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
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

const QuestFilters: React.FC<QuestFiltersProps> = memo(
	({ filters, onFilterChange, currentPage, totalPages, onPageChange }) => {
		const handleQuestTypeChange = useCallback(
			(e: React.ChangeEvent<HTMLSelectElement>) => {
				onFilterChange({ ...filters, questType: e.target.value });
			},
			[filters, onFilterChange],
		);

		const handleUnlockStatusChange = useCallback(
			(e: React.ChangeEvent<HTMLSelectElement>) => {
				onFilterChange({ ...filters, unlockStatus: e.target.value });
			},
			[filters, onFilterChange],
		);

		const handlePremiumStatusChange = useCallback(
			(e: React.ChangeEvent<HTMLSelectElement>) => {
				onFilterChange({ ...filters, premiumStatus: e.target.value });
			},
			[filters, onFilterChange],
		);

		const handlePreviousPage = useCallback(() => {
			onPageChange(currentPage - 1);
		}, [currentPage, onPageChange]);

		const handleNextPage = useCallback(() => {
			onPageChange(currentPage + 1);
		}, [currentPage, onPageChange]);

		return (
			<>
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
								onChange={handleQuestTypeChange}
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
								onChange={handleUnlockStatusChange}
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
								onChange={handlePremiumStatusChange}
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
				<div className="flex justify-center items-center gap-4 mt-8">
					<button
						type="button"
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
					>
						Previous
					</button>
					<span className="text-[#5c4a1c] font-medium">
						Page {currentPage} of {totalPages}
					</span>
					<button
						type="button"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</>
		);
	},
);

QuestFilters.displayName = "QuestFilters";

export default QuestFilters;
