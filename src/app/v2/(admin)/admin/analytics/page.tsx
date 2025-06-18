"use client";
import { useState, useMemo } from "react";
import { useQuests, useModelRoutes, useSagas } from "@/hooks";
import {
	BarChart3,
	AlertTriangle,
	Eye,
	Star,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/common";
import {
	AnalyticsSection,
	ContentOverview,
	ContentHealth,
	DistributionCharts,
	QualityMetrics,
	ActionItems,
} from "@/components/admin/analytics";

export default function AnalyticsDashboard() {
	const { data: sagas, isLoading: isLoadingSagas } = useSagas();
	const { data: quests, isLoading: isLoadingQuests } = useQuests(
		"/api/quests?page=1&limit=100",
	);
	const { data: modelRoutes, isLoading: isLoadingModelRoutes } =
		useModelRoutes();

	const [expandedSections, setExpandedSections] = useState<string[]>([
		"overview",
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

	// Helper function to get status color
	const getStatusColor = (value: number, total: number, isInverse = false) => {
		if (total === 0) return "text-gray-600";
		const percentage = (value / total) * 100;
		if (isInverse) {
			if (percentage > 80) return "text-red-600";
			if (percentage > 50) return "text-yellow-600";
			return "text-green-600";
		}
		if (percentage > 80) return "text-green-600";
		if (percentage > 50) return "text-yellow-600";
		return "text-red-600";
	};

	// Analytics calculations
	const analytics = useMemo(() => {
		if (isLoadingSagas || isLoadingQuests || isLoadingModelRoutes) {
			return null;
		}

		const sagaList = sagas || [];
		const questList = quests?.quests || [];
		const routeList = modelRoutes || [];

		// Content Overview
		const totalTouristSpots = routeList.reduce(
			(sum, route) => sum + (route.touristSpotList?.length || 0),
			0,
		);
		const totalTasks = questList.reduce(
			(sum, quest) => sum + (quest.tasks?.length || 0),
			0,
		);

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
		isLoadingSagas,
		isLoadingQuests,
		isLoadingModelRoutes,
	]);

	if (isLoadingSagas || isLoadingQuests || isLoadingModelRoutes) {
		return (
			<AdminLayout title="📊 Analytics Dashboard">
				<div className="text-center text-charcoal">
					Loading analytics dashboard...
				</div>
			</AdminLayout>
		);
	}

	if (!analytics) {
		return (
			<AdminLayout title="📊 Analytics Dashboard">
				<div className="text-center text-charcoal">
					Unable to load analytics data.
				</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout
			title="📊 Analytics Dashboard"
			description="Comprehensive insights into your tourism content platform"
		>
			{/* Overview Section */}
			<AnalyticsSection
				title="Content Overview"
				icon={<BarChart3 size={20} />}
				isExpanded={expandedSections.includes("overview")}
				onToggle={() => toggleSection("overview")}
			>
				<ContentOverview
					overview={analytics.overview}
					engagement={analytics.engagement}
				/>
			</AnalyticsSection>

			{/* Content Health Section */}
			<AnalyticsSection
				title="Content Health Analysis"
				icon={<AlertTriangle size={20} />}
				isExpanded={expandedSections.includes("content-health")}
				onToggle={() => toggleSection("content-health")}
			>
				<ContentHealth
					contentHealth={analytics.contentHealth}
					totalQuests={analytics.overview.totalQuests}
					getStatusColor={getStatusColor}
				/>
			</AnalyticsSection>

			{/* Distribution Analysis */}
			<AnalyticsSection
				title="Content Distribution"
				icon={<Eye size={20} />}
				isExpanded={expandedSections.includes("distribution")}
				onToggle={() => toggleSection("distribution")}
			>
				<DistributionCharts
					distribution={analytics.distribution}
					totalRoutes={analytics.overview.totalRoutes}
					totalQuests={analytics.overview.totalQuests}
				/>
			</AnalyticsSection>

			{/* Quality Metrics */}
			<AnalyticsSection
				title="Quality & Performance Metrics"
				icon={<Star size={20} />}
				isExpanded={expandedSections.includes("quality")}
				onToggle={() => toggleSection("quality")}
			>
				<QualityMetrics
					quality={analytics.quality}
					engagement={analytics.engagement}
					totalQuests={analytics.overview.totalQuests}
				/>
			</AnalyticsSection>

			{/* Action Items */}
			<ActionItems
				contentHealth={analytics.contentHealth}
				quality={analytics.quality}
				engagement={analytics.engagement}
			/>
		</AdminLayout>
	);
}