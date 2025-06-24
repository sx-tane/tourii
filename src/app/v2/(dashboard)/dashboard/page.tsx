"use client";

import { UserResponseDto } from "@/api/generated";
import BottomNavigation from "@/components/dashboard/bottom-navigation";
import CheckinMapCard from "@/components/dashboard/checkin-map-card";
import DigitalPassportCard from "@/components/dashboard/digital-passport-card";
import { MomentsSection } from "@/components/dashboard/moments-section";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock data for development
const mockDashboardData = {
	user: {
		name: "Hiroshi",
		level: 3,
		points: 750,
		userLevel: UserResponseDto.level.E_CLASS_AMATSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.AMATSUKAMI,
		chapter: {
			title: "Kyoto Tales",
			current: 2,
			total: 5,
		},
		quests: {
			active: 3,
			online: 2,
			offline: 1,
		},
		recentActivity: [
			{
				type: "quest",
				color: "bg-green-400",
				text: 'Completed "Temple Visit" quest in Kyoto',
				time: "2h ago",
			},
			{
				type: "story",
				color: "bg-blue-400",
				text: 'Unlocked new story chapter: "The Fox\'s Wedding"',
				time: "1d ago",
			},
			{
				type: "achievement",
				color: "bg-purple-400",
				text: 'Earned "Early Bird" badge',
				time: "2d ago",
			},
		],
	},
};

const DashboardPage = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const isDevelopment = process.env.NODE_ENV === "development";

	// In production, redirect to login if not authenticated
	useEffect(() => {
		if (!isDevelopment && status === "unauthenticated") {
			router.push("/v2/auth/launch-app?callbackUrl=/v2/dashboard");
		}
	}, [isDevelopment, status, router]);

	// Use mock data in development, otherwise use session data
	const userData = isDevelopment ? mockDashboardData.user : session?.user;

	if (!isDevelopment && status === "loading") {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Welcome Banner */}
			<WelcomeBanner
				username={userData?.name || undefined}
				userLevel={isDevelopment ? mockDashboardData.user.userLevel : undefined}
				userStatus={
					isDevelopment ? mockDashboardData.user.userStatus : undefined
				}
			/>

			{/* Main Dashboard Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column */}
				<div className="lg:col-span-1 space-y-6">
					{/* Digital Passport Card */}
					<DigitalPassportCard />

					{/* Current Chapter Card */}
					<div className="bg-white shadow-sm rounded-lg p-6">
						<h3 className="text-lg font-medium text-gray-900">
							Current Chapter
						</h3>
						<div className="mt-2">
							<p className="text-3xl font-bold text-indigo-600">
								{mockDashboardData.user.chapter.title}
							</p>
							<p className="text-sm text-gray-500">
								Chapter {mockDashboardData.user.chapter.current} of{" "}
								{mockDashboardData.user.chapter.total}
							</p>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="lg:col-span-2 space-y-6">
					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white shadow-sm rounded-lg p-6">
							<h3 className="text-lg font-medium text-gray-900">
								Tourii Points
							</h3>
							<div className="mt-2">
								<p className="text-3xl font-bold text-indigo-600">
									{mockDashboardData.user.points}
								</p>
								<p className="text-sm text-gray-500">
									Level {mockDashboardData.user.level} Explorer
								</p>
							</div>
						</div>

						<div className="bg-white shadow-sm rounded-lg p-6">
							<h3 className="text-lg font-medium text-gray-900">
								Active Quests
							</h3>
							<div className="mt-2">
								<p className="text-3xl font-bold text-indigo-600">
									{mockDashboardData.user.quests.active}
								</p>
								<p className="text-sm text-gray-500">
									{mockDashboardData.user.quests.online} Online,{" "}
									{mockDashboardData.user.quests.offline} Offline
								</p>
							</div>
						</div>
					</div>

					{/* Check-In Map Card */}
					<CheckinMapCard
						userId={session?.user?.id || undefined}
						onNavigateToStory={(storyId) =>
							router.push(`/v2/touriiverse/${storyId}`)
						}
						onNavigateToQuest={(questId) =>
							router.push(`/v2/quests/${questId}`)
						}
					/>
				</div>

				{/* Main Dashboard Layout - Two Column */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					{/* Left Column */}
					<div className="xl:col-span-1 space-y-6">
						{/* Digital Passport Card */}
						<DigitalPassportCard />

						{/* Check-In Map Card */}
						<CheckinMapCard
							userId={session?.user?.id || undefined}
							onNavigateToStory={(storyId) =>
								router.push(`/v2/touriiverse/${storyId}`)
							}
							onNavigateToQuest={(questId) =>
								router.push(`/v2/quests/${questId}`)
							}
						/>
					</div>

					{/* Right Column */}
					<div className="xl:col-span-2 space-y-6">
						{/* Latest Moments Section */}
						<MomentsSection />

						{/* Bottom Navigation */}
						<BottomNavigation />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
