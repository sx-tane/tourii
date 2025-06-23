"use client";
import type { AdminUserListResponseDto } from "@/api/generated";
import { useAdminUsers } from "@/hooks";
import {
	UserStatsGrid,
	UserFilters,
	UserTable,
	UserDetailsModal,
	BulkActionsBar,
} from "@/components/admin/users";
import { useMemo, useState } from "react";

type ChosenUser = AdminUserListResponseDto["users"][0];

export default function AdminUsers() {
	// State for filters and pagination
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState<
		"" | "USER" | "MODERATOR" | "ADMIN"
	>("");
	const [isPremiumFilter, setIsPremiumFilter] = useState<"" | "true" | "false">(
		"",
	);
	const [isBannedFilter, setIsBannedFilter] = useState<"" | "true" | "false">(
		"",
	);
	const [sortBy, setSortBy] = useState<
		| "username"
		| "registered_at"
		| "total_quest_completed"
		| "total_travel_distance"
	>("registered_at");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [showUserModal, setShowUserModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState<ChosenUser | null>(null);

	// Build parameters object
	const params = useMemo(
		() => ({
			page,
			limit,
			sortBy,
			sortOrder,
			...(searchTerm && { searchTerm }),
			...(roleFilter && { role: roleFilter }),
			...(isPremiumFilter && { isPremium: isPremiumFilter }),
			...(isBannedFilter && { isBanned: isBannedFilter }),
		}),
		[
			page,
			limit,
			sortBy,
			sortOrder,
			searchTerm,
			roleFilter,
			isPremiumFilter,
			isBannedFilter,
		],
	);

	const { data: users, isLoading: isLoadingUsers } = useAdminUsers(params);

	// Summary statistics
	const stats = useMemo(() => {
		const userList = users?.users || [];

		if (userList.length === 0) {
			return {
				total: users?.pagination?.totalCount || 0,
				premium: 0,
				banned: 0,
				moderators: 0,
				admins: 0,
				totalQuests: 0,
			};
		}

		return {
			total: users?.pagination?.totalCount || userList.length,
			premium: userList.filter((u) => u.isPremium).length,
			banned: userList.filter((u) => u.isBanned).length,
			moderators: userList.filter((u) => u.role === "MODERATOR").length,
			admins: userList.filter((u) => u.role === "ADMIN").length,
			totalQuests: userList.reduce((sum, u) => sum + u.totalQuestCompleted, 0),
		};
	}, [users]);

	// Helper function to get user list consistently
	const getUserList = () => {
		return users?.users || [];
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setRoleFilter("");
		setIsPremiumFilter("");
		setIsBannedFilter("");
		setPage(1);
	};

	const toggleUserSelection = (userId: string) => {
		setSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId],
		);
	};

	const toggleSelectAll = () => {
		const userList = getUserList();
		if (selectedUsers.length === userList.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(userList.map((u) => u.userId) || []);
		}
	};

	const handleViewUser = (user: ChosenUser) => {
		setSelectedUser(user);
		setShowUserModal(true);
	};

	if (isLoadingUsers) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading users...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-charcoal">User Management</h1>
					<div className="text-sm text-warmGrey3">
						{users?.pagination
							? `Page ${users.pagination.page} of ${users.pagination.totalPages} • ${users.pagination.totalCount} total users`
							: ""}
					</div>
				</div>

				{/* Summary Statistics Cards */}
				<UserStatsGrid
					totalUsers={stats.total}
					premiumCount={stats.premium}
					bannedCount={stats.banned}
					moderatorCount={stats.moderators}
					adminCount={stats.admins}
					totalQuests={stats.totalQuests}
				/>

				{/* Filters */}
				<UserFilters
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					roleFilter={roleFilter}
					onRoleFilterChange={setRoleFilter}
					isPremiumFilter={isPremiumFilter}
					onPremiumFilterChange={setIsPremiumFilter}
					isBannedFilter={isBannedFilter}
					onBannedFilterChange={setIsBannedFilter}
					sortBy={sortBy}
					onSortByChange={setSortBy}
					sortOrder={sortOrder}
					onSortOrderChange={setSortOrder}
					limit={limit}
					onLimitChange={setLimit}
					onClearFilters={clearAllFilters}
				/>

				{/* Bulk Actions Bar */}
				<BulkActionsBar
					selectedCount={selectedUsers.length}
					onCancel={() => setSelectedUsers([])}
				/>

				{/* Users Table */}
				<UserTable
					users={getUserList()}
					selectedUsers={selectedUsers}
					onToggleUserSelection={toggleUserSelection}
					onToggleSelectAll={toggleSelectAll}
					onViewUser={handleViewUser}
				/>

				{/* Pagination */}
				{users?.pagination && users.pagination.totalPages > 1 && (
					<div className="mt-6 flex items-center justify-between">
						<div className="text-sm text-warmGrey3">
							Showing{" "}
							{(users.pagination.page - 1) * users.pagination.limit + 1} to{" "}
							{Math.min(
								users.pagination.page * users.pagination.limit,
								users.pagination.totalCount,
							)}{" "}
							of {users.pagination.totalCount} users
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setPage(page - 1)}
								disabled={page <= 1}
								className="px-3 py-2 text-sm rounded-lg bg-white border border-warmGrey2 text-charcoal hover:bg-warmGrey disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<span className="px-3 py-2 text-sm text-charcoal">
								Page {page} of {users.pagination.totalPages}
							</span>
							<button
								type="button"
								onClick={() => setPage(page + 1)}
								disabled={page >= users.pagination.totalPages}
								className="px-3 py-2 text-sm rounded-lg bg-white border border-warmGrey2 text-charcoal hover:bg-warmGrey disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				)}

				{/* User Details Modal */}
				<UserDetailsModal
					isOpen={showUserModal}
					onClose={() => setShowUserModal(false)}
					user={selectedUser}
				/>
			</div>
		</div>
	);
}