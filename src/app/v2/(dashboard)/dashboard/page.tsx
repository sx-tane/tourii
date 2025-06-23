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
						userId={"TSU202506-ae8a85-222006-4bdd44-BAAA"}
						onNavigateToStory={(storyId) =>
							router.push(`/v2/touriiverse/${storyId}`)
						}
						onNavigateToQuest={(questId) =>
							router.push(`/v2/quests/${questId}`)
						}
					/>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-white shadow-sm rounded-lg p-6">
				<h2 className="text-lg font-medium text-gray-900 mb-4">
					Recent Activity
				</h2>
				<div className="space-y-4">
					{mockDashboardData.user.recentActivity.map((activity) => (
						<div
							key={`${activity.type}-${activity.text}`}
							className="flex items-center"
						>
							<div className={`w-2 h-2 ${activity.color} rounded-full`} />
							<p className="ml-3 text-sm text-gray-500">{activity.text}</p>
							<span className="ml-auto text-xs text-gray-400">
								{activity.time}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Latest Moments */}
			<MomentsSection />

			{/* Recommended Next Steps */}
			<div className="bg-white shadow-sm rounded-lg p-6">
				<h2 className="text-lg font-medium text-gray-900 mb-4">
					Recommended Next Steps
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<button
						type="button"
						className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
					>
						<div>
							<h3 className="font-medium text-gray-900">Continue Story</h3>
							<p className="text-sm text-gray-500">
								Resume "The Fox's Wedding" chapter
							</p>
						</div>
						<span className="text-indigo-600">→</span>
					</button>
					<button
						type="button"
						className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
					>
						<div>
							<h3 className="font-medium text-gray-900">
								Complete Daily Quest
							</h3>
							<p className="text-sm text-gray-500">Visit Kiyomizu Temple</p>
						</div>
						<span className="text-indigo-600">→</span>
					</button>
				</div>
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation />
		</div>
	);
};

export default DashboardPage;
