"use client";
import {
	AdminStatsGrid,
	AlertsSection,
	QuickActionsGrid,
} from "@/components/admin";
import {
	useAdminSubmissions,
	useAdminUsers,
	useModelRoutes,
	useQuests,
	useSagas,
} from "@/hooks";
import type { AdminUserListResponseDto } from "@/api/generated";
import { ADMIN_CONFIG } from "@/config/admin";
import { BarChart3, FileCheck, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function AdminHome() {
	const [currentTime, setCurrentTime] = useState<string>("");

	// Fetch data for analytics with optimized initial loading using configuration
	const { data: users } = useAdminUsers({
		page: 1,
		limit: ADMIN_CONFIG.DASHBOARD.INITIAL_USER_LIMIT,
	});
	const { data: submissions } = useAdminSubmissions({
		page: 1,
		limit: ADMIN_CONFIG.DASHBOARD.INITIAL_SUBMISSION_LIMIT,
	});
	const { data: quests } = useQuests(`/api/quests?page=1&limit=${ADMIN_CONFIG.DASHBOARD.INITIAL_QUEST_LIMIT}`);
	const { data: modelRoutes } = useModelRoutes();
	const { data: sagas } = useSagas();

	// Calculate real-time statistics with proper typing
	const stats = useMemo(() => {
		// Use generated types for proper type safety
		const adminUsers = users as AdminUserListResponseDto | undefined;
		const userList = adminUsers?.users || [];

		// Handle submissions response structure based on API response format
		let submissionList: Array<{
			taskType?: string;
			status?: string;
			[key: string]: any;
		}> = [];

		if (submissions && typeof submissions === "object") {
			if (
				"submissions" in submissions &&
				Array.isArray(submissions.submissions)
			) {
				submissionList = submissions.submissions;
			} else if (
				"pendingSubmissions" in submissions &&
				Array.isArray(submissions.pendingSubmissions)
			) {
				submissionList = submissions.pendingSubmissions;
			} else if (Array.isArray(submissions)) {
				submissionList = submissions;
			}
		}

		const questList = quests?.quests || [];
		const routeList = modelRoutes || [];
		const sagaList = sagas || [];

		// User statistics with proper typing
		const activeUsers = userList.filter((user) => !user.isBanned).length;
		const premiumUsers = userList.filter((user) => user.isPremium).length;
		const newUsersToday = userList.filter((user) => {
			const registeredDate = new Date(user.registeredAt);
			const today = new Date();
			return registeredDate.toDateString() === today.toDateString();
		}).length;

		// Content statistics
		const totalContent = questList.length + routeList.length + sagaList.length;
		const unlockedQuests = questList.filter((q) => q.isUnlocked).length;
		const totalTasks = questList.reduce(
			(sum, q) => sum + (q.tasks?.length || 0),
			0,
		);

		// Submission statistics with proper typing
		const pendingSubmissions = submissionList.length;
		const photoSubmissions = submissionList.filter(
			(submission) => submission.taskType === "PHOTO_UPLOAD",
		).length;
		const socialSubmissions = submissionList.filter(
			(submission) => submission.taskType === "SHARE_SOCIAL",
		).length;
		const textSubmissions = submissionList.filter(
			(submission) => submission.taskType === "ANSWER_TEXT",
		).length;

		// Engagement metrics with proper typing
		const totalQuestsCompleted = userList.reduce(
			(sum, user) => sum + (user.totalQuestCompleted || 0),
			0,
		);
		const avgQuestsPerUser =
			activeUsers > 0 ? totalQuestsCompleted / activeUsers : 0;

		return {
			users: {
				total: userList.length,
				active: activeUsers,
				premium: premiumUsers,
				newToday: newUsersToday,
			},
			content: {
				total: totalContent,
				quests: questList.length,
				routes: routeList.length,
				sagas: sagaList.length,
				tasks: totalTasks,
				unlockedQuests,
			},
			submissions: {
				pending: pendingSubmissions,
				photo: photoSubmissions,
				social: socialSubmissions,
				text: textSubmissions,
			},
			engagement: {
				totalQuestsCompleted,
				avgQuestsPerUser,
			},
		};
	}, [users, submissions, quests, modelRoutes, sagas]);

	// Set current time only on client to avoid hydration mismatch
	useEffect(() => {
		setCurrentTime(new Date().toLocaleTimeString());
	}, []);

	return (
		<div className="space-y-8 text-charcoal">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-charcoal mb-2">
						Admin Dashboard
					</h1>
					<p className="text-warmGrey3">
						Real-time insights and management for your tourism platform
					</p>
				</div>
				<div className="text-right">
					<div className="text-sm text-warmGrey3">Last updated</div>
					<div className="text-lg font-semibold text-charcoal">
						{currentTime || "--:--:--"}
					</div>
				</div>
			</div>

			{/* Real-time Statistics Overview */}
			<AdminStatsGrid stats={stats} />

			{/* Alerts and Action Items */}
			<AlertsSection
				pendingSubmissions={stats.submissions.pending}
				newUsersToday={stats.users.newToday}
			/>

			{/* Quick Actions Grid */}
			<QuickActionsGrid />

			{/* Detailed Analytics Grid */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* User Analytics */}
				<div className="rounded-lg bg-white p-6 shadow">
					<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
						<Users size={18} />
						User Analytics
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Total Users
							</span>
							<span className="text-lg font-bold text-charcoal">
								{stats.users.total}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Active Users
							</span>
							<span className="text-lg font-bold text-green-600">
								{stats.users.active}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Premium Users
							</span>
							<span className="text-lg font-bold text-yellow-600">
								{stats.users.premium}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Total Quests Completed
							</span>
							<span className="text-lg font-bold text-purple-600">
								{stats.engagement.totalQuestsCompleted}
							</span>
						</div>
					</div>
					<Link
						href="/v2/admin/users"
						className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
					>
						View all users →
					</Link>
				</div>

				{/* Submission Analytics */}
				<div className="rounded-lg bg-white p-6 shadow">
					<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
						<FileCheck size={18} />
						Submission Status
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Total Pending
							</span>
							<span className="text-lg font-bold text-orange-600">
								{stats.submissions.pending}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Photo Uploads
							</span>
							<span className="text-lg font-bold text-green-600">
								{stats.submissions.photo}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Social Shares
							</span>
							<span className="text-lg font-bold text-blue-600">
								{stats.submissions.social}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Text Answers
							</span>
							<span className="text-lg font-bold text-purple-600">
								{stats.submissions.text}
							</span>
						</div>
					</div>
					<Link
						href="/v2/admin/submissions"
						className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
					>
						Review submissions →
					</Link>
				</div>

				{/* Content Analytics */}
				<div className="rounded-lg bg-white p-6 shadow">
					<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
						<BarChart3 size={18} />
						Content Overview
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Total Content
							</span>
							<span className="text-lg font-bold text-charcoal">
								{stats.content.total}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">Quests</span>
							<span className="text-lg font-bold text-yellow-600">
								{stats.content.quests}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">Routes</span>
							<span className="text-lg font-bold text-purple-600">
								{stats.content.routes}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Stories (Sagas)
							</span>
							<span className="text-lg font-bold text-blue-600">
								{stats.content.sagas}
							</span>
						</div>
					</div>
					<Link
						href="/v2/admin/analytics"
						className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
					>
						View detailed analytics →
					</Link>
				</div>

				{/* Performance Metrics */}
				<div className="rounded-lg bg-white p-6 shadow">
					<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
						<TrendingUp size={18} />
						Platform Health
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Unlocked Quests
							</span>
							<div className="text-right">
								<span className="text-lg font-bold text-green-600">
									{stats.content.unlockedQuests}
								</span>
								<div className="text-xs text-warmGrey3">
									{stats.content.quests > 0
										? Math.round(
												(stats.content.unlockedQuests / stats.content.quests) *
													100,
											)
										: 0}
									% of total
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Avg Quests per User
							</span>
							<span className="text-lg font-bold text-blue-600">
								{stats.engagement.avgQuestsPerUser.toFixed(1)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-warmGrey3">
								Premium Adoption
							</span>
							<div className="text-right">
								<span className="text-lg font-bold text-yellow-600">
									{stats.users.premium}
								</span>
								<div className="text-xs text-warmGrey3">
									{stats.users.total > 0
										? Math.round(
												(stats.users.premium / stats.users.total) * 100,
											)
										: 0}
									% of users
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
