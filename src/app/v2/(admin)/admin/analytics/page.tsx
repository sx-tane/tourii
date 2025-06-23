"use client";
import {
	AnalyticsOverview,
	ContentHealthSection,
	DistributionSection,
	ExpandableSection,
	QualityMetricsSection,
	RecommendedActions,
} from "@/components/admin";
import {
	useAdminSubmissions,
	useAdminUsers,
	useModelRoutes,
	useQuests,
	useSagas,
} from "@/hooks";
import { AlertTriangle, BarChart3, Eye, Star } from "lucide-react";
import { useMemo, useState } from "react";

export default function AnalyticsDashboard() {
	const { data: sagas, isLoading: isLoadingSagas } = useSagas();
	const { data: quests, isLoading: isLoadingQuests } = useQuests(
		"/api/quests?page=1&limit=100",
	);
	const { data: modelRoutes, isLoading: isLoadingModelRoutes } =
		useModelRoutes();
	const { data: users, isLoading: isLoadingUsers } = useAdminUsers({
		page: 1,
		limit: 100,
	});
	const { data: submissions, isLoading: isLoadingSubmissions } =
		useAdminSubmissions({ page: 1, limit: 100 });

	const [expandedSections, setExpandedSections] = useState<string[]>([
		"overview",
		"user-analytics",
		"content-health",
		"distribution",
		"quality",
	]);

	const toggleSection = (section: string) => {
		setExpandedSections((prev) =>
			prev.includes(section)
				? prev.filter((s) => s !== section)
				: [...prev, section],
		);
	};

	// Analytics calculations
	const analytics = useMemo(() => {
		if (
			isLoadingSagas ||
			isLoadingQuests ||
			isLoadingModelRoutes ||
			isLoadingUsers ||
			isLoadingSubmissions
		) {
			return null;
		}

		const sagaList = sagas || [];
		const questList = quests?.quests || [];
		const routeList = modelRoutes || [];

		// Extract users from AdminUserListResponseDto
		const userList = users?.users || [];

		// Extract submissions from the response
		const submissionList =
			submissions?.submissions || submissions?.pendingSubmissions || [];
		// Content Overview
		const totalTouristSpots = routeList.reduce(
			(sum, route) => sum + (route.touristSpotList?.length || 0),
			0,
		);
		const totalTasks = questList.reduce(
			(sum, quest) => sum + (quest.tasks?.length || 0),
			0,
		);

		// User Analytics
		const activeUsers = userList.filter((u) => !u.isBanned).length;
		const premiumUsers = userList.filter((u) => u.isPremium).length;
		const bannedUsers = userList.filter((u) => u.isBanned).length;
		const totalQuestsCompleted = userList.reduce(
			(sum, u) => sum + u.totalQuestCompleted,
			0,
		);
		const totalTravelDistance = userList.reduce(
			(sum, u) => sum + u.totalTravelDistance,
			0,
		);
		const avgQuestsPerUser =
			activeUsers > 0 ? totalQuestsCompleted / activeUsers : 0;
		const avgTravelPerUser =
			activeUsers > 0 ? totalTravelDistance / activeUsers : 0;

		// New users registration analysis
		const today = new Date();
		const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

		const newUsersToday = userList.filter((u) => {
			const registeredDate = new Date(u.registeredAt);
			return registeredDate.toDateString() === today.toDateString();
		}).length;

		const newUsersThisWeek = userList.filter((u) => {
			const registeredDate = new Date(u.registeredAt);
			return registeredDate >= lastWeek;
		}).length;

		const newUsersThisMonth = userList.filter((u) => {
			const registeredDate = new Date(u.registeredAt);
			return registeredDate >= lastMonth;
		}).length;

		// Submission analytics
		const pendingSubmissions = submissionList.length;
		const photoSubmissions = submissionList.filter(
			(s) => s.taskType === "PHOTO_UPLOAD",
		).length;
		const socialSubmissions = submissionList.filter(
			(s) => s.taskType === "SHARE_SOCIAL",
		).length;
		const textSubmissions = submissionList.filter(
			(s) => s.taskType === "ANSWER_TEXT",
		).length;

		// Content Health Metrics
		const questsWithoutImage = questList.filter((q) => !q.questImage).length;
		const questsWithoutTouristSpot = questList.filter(
			(q) => !q.touristSpot,
		).length;

		// Engagement Metrics
		const unlockedQuests = questList.filter((q) => q.isUnlocked).length;
		const premiumQuests = questList.filter((q) => q.isPremium).length;
		const totalMagatamaPoints = questList.reduce(
			(sum, q) => sum + (q.totalMagatamaPointAwarded || 0),
			0,
		);

		// Geographic Distribution
		const regionCounts = routeList.reduce(
			(acc, route) => {
				const region = route.region || "Unknown";
				acc[region] = (acc[region] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		// Content Type Distribution
		const questTypeDistribution = questList.reduce(
			(acc, quest) => {
				const type = quest.questType || "UNKNOWN";
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		// Tourist Spot Analysis
		const spotsWithHashtags = routeList.reduce((sum, route) => {
			return (
				sum +
				(route.touristSpotList?.filter(
					(spot) =>
						spot.touristSpotHashtag && spot.touristSpotHashtag.length > 0,
				).length || 0)
			);
		}, 0);

		return {
			overview: {
				totalSagas: sagaList.length,
				totalQuests: questList.length,
				totalTasks,
				totalRoutes: routeList.length,
				totalTouristSpots,
				totalUsers: userList.length,
				activeUsers,
			},
			userAnalytics: {
				totalUsers: userList.length,
				activeUsers,
				premiumUsers,
				bannedUsers,
				totalQuestsCompleted,
				totalTravelDistance,
				avgQuestsPerUser,
				avgTravelPerUser,
				newUsersToday,
				newUsersThisWeek,
				newUsersThisMonth,
				premiumAdoption:
					userList.length > 0 ? (premiumUsers / userList.length) * 100 : 0,
			},
			submissionAnalytics: {
				pendingSubmissions,
				photoSubmissions,
				socialSubmissions,
				textSubmissions,
			},
			contentHealth: {
				questsWithoutImage,
				questsWithoutTouristSpot,
				healthScore:
					questList.length > 0
						? ((questList.length - questsWithoutImage) * 100) / questList.length
						: 100,
			},
			engagement: {
				unlockedQuests,
				premiumQuests,
				totalMagatamaPoints,
				spotsWithHashtags,
			},
			distribution: {
				regions: regionCounts,
				questTypes: questTypeDistribution,
			},
			quality: {
				averageTasksPerQuest:
					questList.length > 0 ? totalTasks / questList.length : 0,
				averageSpotsPerRoute:
					routeList.length > 0 ? totalTouristSpots / routeList.length : 0,
			},
		};
	}, [
		sagas,
		quests,
		modelRoutes,
		users,
		submissions,
		isLoadingSagas,
		isLoadingQuests,
		isLoadingModelRoutes,
		isLoadingUsers,
		isLoadingSubmissions,
	]);

	if (
		isLoadingSagas ||
		isLoadingQuests ||
		isLoadingModelRoutes ||
		isLoadingUsers ||
		isLoadingSubmissions
	) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Loading analytics dashboard...
					</div>
				</div>
			</div>
		);
	}

	if (!analytics) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Unable to load analytics data.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-charcoal mb-2">
						📊 Analytics Dashboard
					</h1>
					<p className="text-warmGrey3">
						Comprehensive insights into your tourism content platform
					</p>
				</div>

				<ExpandableSection
					title="Content Overview"
					icon={BarChart3}
					isExpanded={expandedSections.includes("overview")}
					onToggle={() => toggleSection("overview")}
				>
					<AnalyticsOverview
						overview={analytics.overview}
						engagement={analytics.engagement}
					/>
				</ExpandableSection>

				<ExpandableSection
					title="Content Health Analysis"
					icon={AlertTriangle}
					isExpanded={expandedSections.includes("content-health")}
					onToggle={() => toggleSection("content-health")}
				>
					<ContentHealthSection
						contentHealth={analytics.contentHealth}
						totalQuests={analytics.overview.totalQuests}
					/>
				</ExpandableSection>

				<ExpandableSection
					title="Content Distribution"
					icon={Eye}
					isExpanded={expandedSections.includes("distribution")}
					onToggle={() => toggleSection("distribution")}
				>
					<DistributionSection
						distribution={analytics.distribution}
						totalRoutes={analytics.overview.totalRoutes}
						totalQuests={analytics.overview.totalQuests}
					/>
				</ExpandableSection>

				<ExpandableSection
					title="Quality & Performance Metrics"
					icon={Star}
					isExpanded={expandedSections.includes("quality")}
					onToggle={() => toggleSection("quality")}
				>
					<QualityMetricsSection
						quality={analytics.quality}
						engagement={analytics.engagement}
						totalQuests={analytics.overview.totalQuests}
					/>
				</ExpandableSection>

				<RecommendedActions
					contentHealth={analytics.contentHealth}
					quality={analytics.quality}
					engagement={analytics.engagement}
				/>
			</div>
		</div>
	);
}
