import { Search, X } from "lucide-react";
import { useId } from "react";

interface UserFiltersProps {
	searchTerm: string;
	roleFilter: "" | "USER" | "MODERATOR" | "ADMIN";
	isPremiumFilter: "" | "true" | "false";
	isBannedFilter: "" | "true" | "false";
	sortBy:
		| "username"
		| "registered_at"
		| "total_quest_completed"
		| "total_travel_distance";
	sortOrder: "asc" | "desc";
	limit: number;
	onSearchChange: (value: string) => void;
	onRoleFilterChange: (value: "" | "USER" | "MODERATOR" | "ADMIN") => void;
	onPremiumFilterChange: (value: "" | "true" | "false") => void;
	onBannedFilterChange: (value: "" | "true" | "false") => void;
	onSortByChange: (
		value:
			| "username"
			| "registered_at"
			| "total_quest_completed"
			| "total_travel_distance",
	) => void;
	onSortOrderChange: (value: "asc" | "desc") => void;
	onLimitChange: (value: number) => void;
	onClearFilters: () => void;
}

export default function UserFilters({
	searchTerm,
	roleFilter,
	isPremiumFilter,
	isBannedFilter,
	sortBy,
	sortOrder,
	limit,
	onSearchChange,
	onRoleFilterChange,
	onPremiumFilterChange,
	onBannedFilterChange,
	onSortByChange,
	onSortOrderChange,
	onLimitChange,
	onClearFilters,
}: UserFiltersProps) {
	const searchTermId = useId();
	const roleFilterId = useId();
	const premiumFilterId = useId();
	const bannedFilterId = useId();
	const limitFilterId = useId();
	const sortById = useId();
	const sortOrderId = useId();

	const hasActiveFilters =
		searchTerm || roleFilter || isPremiumFilter || isBannedFilter;

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
						id={searchTermId}
						type="text"
						placeholder="Search by username, email, Discord/Twitter usernames..."
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-warmGrey2 focus:border-red focus:outline-none"
					/>
				</div>
				{hasActiveFilters && (
					<button
						type="button"
						onClick={onClearFilters}
						className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
					>
						<X size={16} />
						Clear All
					</button>
				)}
			</div>

			{/* Filter Controls */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-6">
				<div>
					<label
						htmlFor={roleFilterId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Role
					</label>
					<select
						id={roleFilterId}
						value={roleFilter}
						onChange={(e) =>
							onRoleFilterChange(
								e.target.value as "" | "USER" | "MODERATOR" | "ADMIN",
							)
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="">All Roles</option>
						<option value="USER">User</option>
						<option value="MODERATOR">Moderator</option>
						<option value="ADMIN">Admin</option>
					</select>
				</div>
				<div>
					<label
						htmlFor={premiumFilterId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Premium Status
					</label>
					<select
						id={premiumFilterId}
						value={isPremiumFilter}
						onChange={(e) =>
							onPremiumFilterChange(e.target.value as "" | "true" | "false")
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="">All Users</option>
						<option value="true">Premium</option>
						<option value="false">Regular</option>
					</select>
				</div>
				<div>
					<label
						htmlFor={bannedFilterId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Ban Status
					</label>
					<select
						id={bannedFilterId}
						value={isBannedFilter}
						onChange={(e) =>
							onBannedFilterChange(e.target.value as "" | "true" | "false")
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="">All Users</option>
						<option value="true">Banned</option>
						<option value="false">Active</option>
					</select>
				</div>
				<div>
					<label
						htmlFor={sortById}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Sort By
					</label>
					<select
						id={sortById}
						value={sortBy}
						onChange={(e) =>
							onSortByChange(
								e.target.value as
									| "username"
									| "registered_at"
									| "total_quest_completed"
									| "total_travel_distance",
							)
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="registered_at">Registration Date</option>
						<option value="username">Username</option>
						<option value="total_quest_completed">Quests Completed</option>
						<option value="total_travel_distance">Travel Distance</option>
					</select>
				</div>
				<div>
					<label
						htmlFor={sortOrderId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Sort Order
					</label>
					<select
						id={sortOrderId}
						value={sortOrder}
						onChange={(e) =>
							onSortOrderChange(e.target.value as "asc" | "desc")
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="desc">Newest First</option>
						<option value="asc">Oldest First</option>
					</select>
				</div>
				<div>
					<label
						htmlFor={limitFilterId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Per Page
					</label>
					<select
						id={limitFilterId}
						value={limit}
						onChange={(e) => onLimitChange(Number(e.target.value))}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="10">10 users</option>
						<option value="20">20 users</option>
						<option value="50">50 users</option>
						<option value="100">100 users</option>
					</select>
				</div>
			</div>
		</div>
	);
}
