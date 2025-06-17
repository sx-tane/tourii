"use client";
import { useState, useMemo } from "react";
import { useQuests, useModelRoutes } from "@/hooks";
import { useSagas } from "@/hooks";
import {
	BarChart3,
	TrendingUp,
	MapPin,
	Trophy,
	Users,
	ChevronDown,
	ChevronUp,
	Eye,
	Star,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Activity,
} from "lucide-react";

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

	if (isLoadingSagas || isLoadingQuests || isLoadingModelRoutes) {
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

				{/* Overview Section */}
				<div className="mb-8">
					<button
						type="button"
						onClick={() => toggleSection("overview")}
						className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
					>
						<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
							<BarChart3 size={20} />
							Content Overview
						</h2>
						{expandedSections.includes("overview") ? (
							<ChevronUp size={20} />
						) : (
							<ChevronDown size={20} />
						)}
					</button>
					{expandedSections.includes("overview") && (
						<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
							<div className="rounded-lg bg-white p-4 shadow">
								<div className="flex items-center gap-2">
									<Activity size={16} className="text-blue-600" />
									<span className="text-sm font-medium text-warmGrey3">
										Sagas
									</span>
								</div>
								<div className="text-2xl font-bold text-charcoal">
									{analytics.overview.totalSagas}
								</div>
								<div className="text-xs text-blue-600">story collections</div>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<div className="flex items-center gap-2">
									<Trophy size={16} className="text-yellow-600" />
									<span className="text-sm font-medium text-warmGrey3">
										Quests
									</span>
								</div>
								<div className="text-2xl font-bold text-charcoal">
									{analytics.overview.totalQuests}
								</div>
								<div className="text-xs text-yellow-600">
									{analytics.overview.totalTasks} tasks total
								</div>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<div className="flex items-center gap-2">
									<MapPin size={16} className="text-green-600" />
									<span className="text-sm font-medium text-warmGrey3">
										Routes
									</span>
								</div>
								<div className="text-2xl font-bold text-charcoal">
									{analytics.overview.totalRoutes}
								</div>
								<div className="text-xs text-green-600">
									{analytics.overview.totalTouristSpots} tourist spots
								</div>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<div className="flex items-center gap-2">
									<Star size={16} className="text-purple-600" />
									<span className="text-sm font-medium text-warmGrey3">
										Total Points
									</span>
								</div>
								<div className="text-2xl font-bold text-charcoal">
									{analytics.engagement.totalMagatamaPoints.toLocaleString()}
								</div>
								<div className="text-xs text-purple-600">Magatama points</div>
							</div>
							<div className="rounded-lg bg-white p-4 shadow">
								<div className="flex items-center gap-2">
									<Users size={16} className="text-orange-600" />
									<span className="text-sm font-medium text-warmGrey3">
										Unlocked
									</span>
								</div>
								<div className="text-2xl font-bold text-charcoal">
									{analytics.engagement.unlockedQuests}
								</div>
								<div className="text-xs text-orange-600">
									of {analytics.overview.totalQuests} quests
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Content Health Section */}
				<div className="mb-8">
					<button
						type="button"
						onClick={() => toggleSection("content-health")}
						className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
					>
						<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
							<AlertTriangle size={20} />
							Content Health Analysis
						</h2>
						{expandedSections.includes("content-health") ? (
							<ChevronUp size={20} />
						) : (
							<ChevronDown size={20} />
						)}
					</button>
					{expandedSections.includes("content-health") && (
						<div className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div className="rounded-lg bg-white p-4 shadow">
									<div className="flex items-center gap-2 mb-2">
										<Trophy size={16} className="text-yellow-600" />
										<span className="text-sm font-medium text-warmGrey3">
											Quest Issues
										</span>
									</div>
									<div
										className={`text-2xl font-bold ${getStatusColor(
											analytics.contentHealth.questsWithoutImage,
											analytics.overview.totalQuests,
											true,
										)}`}
									>
										{analytics.contentHealth.questsWithoutImage}
									</div>
									<div className="text-xs text-warmGrey3">
										quests without image
									</div>
								</div>
								<div className="rounded-lg bg-white p-4 shadow">
									<div className="flex items-center gap-2 mb-2">
										<XCircle size={16} className="text-red-600" />
										<span className="text-sm font-medium text-warmGrey3">
											Unlinked Quests
										</span>
									</div>
									<div
										className={`text-2xl font-bold ${getStatusColor(
											analytics.contentHealth.questsWithoutTouristSpot,
											analytics.overview.totalQuests,
											true,
										)}`}
									>
										{analytics.contentHealth.questsWithoutTouristSpot}
									</div>
									<div className="text-xs text-warmGrey3">
										quests without tourist spot
									</div>
								</div>
								<div className="rounded-lg bg-white p-4 shadow">
									<div className="flex items-center gap-2 mb-2">
										<TrendingUp size={16} className="text-green-600" />
										<span className="text-sm font-medium text-warmGrey3">
											Health Score
										</span>
									</div>
									<div
										className={`text-2xl font-bold ${getStatusColor(
											analytics.contentHealth.healthScore,
											100,
										)}`}
									>
										{Math.round(analytics.contentHealth.healthScore)}%
									</div>
									<div className="text-xs text-warmGrey3">overall health</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Distribution Analysis */}
				<div className="mb-8">
					<button
						type="button"
						onClick={() => toggleSection("distribution")}
						className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
					>
						<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
							<Eye size={20} />
							Content Distribution
						</h2>
						{expandedSections.includes("distribution") ? (
							<ChevronUp size={20} />
						) : (
							<ChevronDown size={20} />
						)}
					</button>
					{expandedSections.includes("distribution") && (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Regional Distribution */}
							<div className="rounded-lg bg-white p-6 shadow">
								<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
									<MapPin size={18} />
									Geographic Distribution
								</h3>
								<div className="space-y-3">
									{Object.entries(analytics.distribution.regions).map(
										([region, count]) => (
											<div
												key={region}
												className="flex items-center justify-between"
											>
												<span className="text-sm font-medium text-charcoal">
													{region}
												</span>
												<div className="flex items-center gap-2">
													<div
														className="h-2 bg-blue-500 rounded"
														style={{
															width: `${Math.max(
																(count / analytics.overview.totalRoutes) * 100,
																20,
															)}px`,
														}}
													/>
													<span className="text-sm text-warmGrey3 w-8 text-right">
														{count}
													</span>
												</div>
											</div>
										),
									)}
								</div>
							</div>

							{/* Quest Type Distribution */}
							<div className="rounded-lg bg-white p-6 shadow">
								<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
									<Trophy size={18} />
									Quest Type Distribution
								</h3>
								<div className="space-y-3">
									{Object.keys(analytics.distribution.questTypes).length ===
									0 ? (
										<div className="text-center text-gray-500 py-4">
											No quest data available. Add some quests to see
											distribution.
										</div>
									) : (
										Object.entries(analytics.distribution.questTypes).map(
											([type, count]) => (
												<div
													key={type}
													className="flex items-center justify-between"
												>
													<span className="text-sm font-medium text-charcoal">
														{type.replace(/_/g, " ")}
													</span>
													<div className="flex items-center gap-2">
														<div
															className="h-2 bg-yellow-500 rounded"
															style={{
																width: `${Math.max(
																	analytics.overview.totalQuests > 0
																		? (count / analytics.overview.totalQuests) *
																				100
																		: 20,
																	20,
																)}px`,
															}}
														/>
														<span className="text-sm text-warmGrey3 w-8 text-right">
															{count}
														</span>
													</div>
												</div>
											),
										)
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Quality Metrics */}
				<div className="mb-8">
					<button
						type="button"
						onClick={() => toggleSection("quality")}
						className="mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow hover:bg-warmGrey transition-all"
					>
						<h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
							<Star size={20} />
							Quality & Performance Metrics
						</h2>
						{expandedSections.includes("quality") ? (
							<ChevronUp size={20} />
						) : (
							<ChevronDown size={20} />
						)}
					</button>
					{expandedSections.includes("quality") && (
						<div className="space-y-6">
							{/* Average Metrics */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="rounded-lg bg-white p-4 shadow">
									<div className="flex items-center gap-2 mb-2">
										<Trophy size={16} className="text-yellow-600" />
										<span className="text-sm font-medium text-warmGrey3">
											Avg Tasks/Quest
										</span>
									</div>
									<div className="text-2xl font-bold text-charcoal">
										{analytics.quality.averageTasksPerQuest.toFixed(1)}
									</div>
								</div>
								<div className="rounded-lg bg-white p-4 shadow">
									<div className="flex items-center gap-2 mb-2">
										<MapPin size={16} className="text-green-600" />
										<span className="text-sm font-medium text-warmGrey3">
											Avg Spots/Route
										</span>
									</div>
									<div className="text-2xl font-bold text-charcoal">
										{analytics.quality.averageSpotsPerRoute.toFixed(1)}
									</div>
								</div>
							</div>

							{/* Engagement Insights */}
							<div className="rounded-lg bg-white p-6 shadow">
								<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
									<CheckCircle size={18} />
									Engagement Insights
								</h3>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<div className="text-center p-4 rounded-lg bg-green-50">
										<div className="text-2xl font-bold text-green-600">
											{analytics.engagement.premiumQuests}
										</div>
										<div className="text-sm text-green-800 mt-2">
											Premium Quests Available
										</div>
									</div>
									<div className="text-center p-4 rounded-lg bg-blue-50">
										<div className="text-2xl font-bold text-blue-600">
											{analytics.engagement.spotsWithHashtags}
										</div>
										<div className="text-sm text-blue-800 mt-2">
											Tourist Spots with Hashtags
										</div>
									</div>
									<div className="text-center p-4 rounded-lg bg-purple-50">
										<div className="text-2xl font-bold text-purple-600">
											{Math.round(
												(analytics.engagement.unlockedQuests /
													analytics.overview.totalQuests) *
													100,
											) || 0}
											%
										</div>
										<div className="text-sm text-purple-800 mt-2">
											Quest Unlock Rate
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Action Items */}
				<div className="rounded-lg bg-red-50 border border-red-200 p-6">
					<h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
						<AlertTriangle size={18} />
						Recommended Actions
					</h2>
					<div className="space-y-2 text-sm">
						{analytics.contentHealth.questsWithoutImage > 0 && (
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-red-500 rounded-full" />
								<span className="text-red-700">
									Add images to {analytics.contentHealth.questsWithoutImage}{" "}
									quests
								</span>
							</div>
						)}
						{analytics.contentHealth.questsWithoutTouristSpot > 0 && (
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-yellow-500 rounded-full" />
								<span className="text-yellow-700">
									Link {analytics.contentHealth.questsWithoutTouristSpot} quests
									to tourist spots
								</span>
							</div>
						)}
						{analytics.quality.averageTasksPerQuest < 3 && (
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-blue-500 rounded-full" />
								<span className="text-blue-700">
									Consider adding more tasks to quests (current avg:{" "}
									{analytics.quality.averageTasksPerQuest.toFixed(1)})
								</span>
							</div>
						)}
						{analytics.engagement.premiumQuests === 0 && (
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-purple-500 rounded-full" />
								<span className="text-purple-700">
									Consider creating premium quest content for monetization
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
