import { Search, X } from "lucide-react";

interface QuickFilter {
	id: string;
	label: string;
	icon: string;
}

interface QuestTaskSearchFiltersProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	activeFilters: string[];
	onToggleFilter: (filterId: string) => void;
	onClearAll: () => void;
	quickFilters: QuickFilter[];
	totalTasks: number;
	filteredCount: number;
}

export default function QuestTaskSearchFilters({
	searchQuery,
	onSearchChange,
	activeFilters,
	onToggleFilter,
	onClearAll,
	quickFilters,
	totalTasks,
	filteredCount,
}: QuestTaskSearchFiltersProps) {
	return (
		<div className="mb-6 space-y-4">
			{/* Search Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search
						size={20}
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmGrey3"
					/>
					<input
						type="text"
						placeholder="Search tasks by name, description, or content..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-warmGrey2 focus:border-red focus:outline-none"
					/>
				</div>
				{(searchQuery || activeFilters.length > 0) && (
					<button
						type="button"
						onClick={onClearAll}
						className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
					>
						<X size={16} />
						Clear All
					</button>
				)}
			</div>

			{/* Quick Filters */}
			<div className="flex flex-wrap gap-2">
				{quickFilters.map((filter) => (
					<button
						type="button"
						key={filter.id}
						onClick={() => onToggleFilter(filter.id)}
						className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
							activeFilters.includes(filter.id)
								? "bg-red text-white"
								: "bg-white text-charcoal hover:bg-warmGrey2"
						}`}
					>
						<span>{filter.icon}</span>
						{filter.label}
					</button>
				))}
			</div>

			{/* Active Filters Display */}
			{activeFilters.length > 0 && (
				<div className="text-sm text-warmGrey3">
					Showing {filteredCount} of {totalTasks} tasks
				</div>
			)}
		</div>
	);
}