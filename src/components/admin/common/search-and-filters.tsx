import React from "react";
import { Search, X } from "lucide-react";

export interface QuickFilter {
	id: string;
	label: string;
	icon: string;
}

interface SearchAndFiltersProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	searchPlaceholder?: string;
	quickFilters: QuickFilter[];
	activeFilters: string[];
	onFilterToggle: (filterId: string) => void;
	onClearAll: () => void;
	resultsCount?: number;
	totalCount?: number;
}

export function SearchAndFilters({
	searchQuery,
	onSearchChange,
	searchPlaceholder = "Search...",
	quickFilters,
	activeFilters,
	onFilterToggle,
	onClearAll,
	resultsCount,
	totalCount,
}: SearchAndFiltersProps) {
	const hasActiveFilters = searchQuery || activeFilters.length > 0;

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
						placeholder={searchPlaceholder}
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-warmGrey2 focus:border-red focus:outline-none"
					/>
				</div>
				{hasActiveFilters && (
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
						onClick={() => onFilterToggle(filter.id)}
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
			{hasActiveFilters && resultsCount !== undefined && totalCount !== undefined && (
				<div className="text-sm text-warmGrey3">
					Showing {resultsCount} of {totalCount} items
				</div>
			)}
		</div>
	);
}