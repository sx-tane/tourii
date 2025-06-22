import type { Meta, StoryObj } from "@storybook/react";
import CheckinMapCard from "./checkin-map-card";
import type { CheckinResponseDto } from "@/hooks/api/useCheckins";

const mockCheckins: CheckinResponseDto[] = [
	{
		id: "1",
		latitude: 35.0116,
		longitude: 135.7681,
		touristSpot: {
			id: "fushimi-inari",
			name: "Fushimi Inari Shrine",
			description: "Famous shrine with thousands of torii gates",
			latitude: 35.0116,
			longitude: 135.7681,
		},
		quest: {
			id: "shrine-quest-1",
			name: "Sacred Torii Trail",
			description: "Climb the mountain following the torii gates",
		},
		story: {
			id: "inari-story",
			name: "The Fox Guardian",
			description: "Learn about Inari, the rice deity",
		},
		timestamp: "2024-06-15T14:30:00Z",
		rewards: [
			{
				id: "reward-1",
				name: "Inari Shrine Stamp",
				type: "goshuin",
				imageUrl: "/image/profile/goshuin/Goshuin1.svg",
			},
		],
		type: "story",
	},
	{
		id: "2",
		latitude: 35.6762,
		longitude: 139.6503,
		touristSpot: {
			id: "tokyo-tower",
			name: "Tokyo Tower",
			description: "Iconic red and white tower in Tokyo",
			latitude: 35.6762,
			longitude: 139.6503,
		},
		quest: {
			id: "tokyo-quest-1",
			name: "City Heights Challenge",
			description: "Reach the observation deck",
		},
		timestamp: "2024-06-14T10:15:00Z",
		rewards: [
			{
				id: "reward-2",
				name: "Tokyo Tower Badge",
				type: "badge",
			},
		],
		type: "quest",
	},
	{
		id: "3",
		latitude: 34.9949,
		longitude: 135.7851,
		touristSpot: {
			id: "kiyomizu-temple",
			name: "Kiyomizu-dera Temple",
			description: "Historic temple with wooden stage",
			latitude: 34.9949,
			longitude: 135.7851,
		},
		timestamp: "2024-06-13T16:45:00Z",
		rewards: [
			{
				id: "reward-3",
				name: "Temple Visit Stamp",
				type: "goshuin",
			},
		],
		type: "route",
	},
];

const meta = {
	title: "Dashboard/CheckinMapCard",
	component: CheckinMapCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		userId: { control: "text" },
		className: { control: "text" },
		onNavigateToStory: { action: "onNavigateToStory" },
		onNavigateToQuest: { action: "onNavigateToQuest" },
	},
	decorators: [
		(Story) => (
			<div className="w-80 p-4">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof CheckinMapCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithMockData: Story = {
	args: {
		checkins: mockCheckins,
	},
};

export const EmptyState: Story = {
	args: {
		checkins: [],
	},
};

export const WithUserId: Story = {
	args: {
		userId: "user123",
	},
};

export const CustomClass: Story = {
	args: {
		className: "border-l-4 border-l-indigo-500",
		checkins: mockCheckins,
	},
};

export const InDashboardGrid: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
			<div className="bg-white shadow-sm rounded-lg p-6">
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					Current Chapter
				</h3>
				<p className="text-3xl font-bold text-indigo-600">Kyoto Tales</p>
				<p className="text-sm text-gray-500">Chapter 2 of 5</p>
			</div>

			<CheckinMapCard
				userId="demo-user"
				onNavigateToStory={() => {}}
				onNavigateToQuest={() => {}}
			/>

			<div className="bg-white shadow-sm rounded-lg p-6">
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					Tourii Points
				</h3>
				<p className="text-3xl font-bold text-indigo-600">750</p>
				<p className="text-sm text-gray-500">Level 3 Explorer</p>
			</div>
		</div>
	),
	decorators: [
		(Story) => (
			<div className="w-full max-w-6xl">
				<Story />
			</div>
		),
	],
};

export const LoadingState: Story = {
	render: () => (
		<div className="w-80">
			<div className="bg-white shadow-sm rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-indigo-50 rounded-lg">
							<div className="w-5 h-5 bg-indigo-600 rounded" />
						</div>
						<h3 className="font-semibold text-gray-900">Check-In Map</h3>
					</div>
				</div>
				<div className="space-y-3">
					<div className="h-8 bg-gray-200 rounded animate-pulse" />
					<div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
				</div>
			</div>
		</div>
	),
};
