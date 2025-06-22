import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CheckinMapModal from "./checkin-map-modal";
import { Button } from "@/components/ui/button";
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

const ModalWrapper = ({
	userId,
	onNavigateToStory,
	onNavigateToQuest,
	checkins,
}: {
	userId?: string;
	onNavigateToStory?: (storyId: string) => void;
	onNavigateToQuest?: (questId: string) => void;
	checkins?: CheckinResponseDto[];
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} className="mb-4">
				Open Check-In Map
			</Button>
			<CheckinMapModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				userId={userId}
				onNavigateToStory={onNavigateToStory}
				onNavigateToQuest={onNavigateToQuest}
				checkins={checkins}
			/>
		</>
	);
};

const meta = {
	title: "Checkin/CheckinMapModal",
	component: CheckinMapModal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		isOpen: { control: "boolean" },
		userId: { control: "text" },
		onClose: { action: "onClose" },
		onNavigateToStory: { action: "onNavigateToStory" },
		onNavigateToQuest: { action: "onNavigateToQuest" },
	},
} satisfies Meta<typeof CheckinMapModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
	},
	render: () => <ModalWrapper />,
};

export const WithMockData: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
		checkins: mockCheckins,
	},
	render: () => <ModalWrapper checkins={mockCheckins} />,
};

export const EmptyState: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
		checkins: [],
	},
	render: () => <ModalWrapper checkins={[]} />,
};

export const WithUserId: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
		userId: "user123",
		checkins: mockCheckins,
	},
	render: () => <ModalWrapper userId="user123" checkins={mockCheckins} />,
};

export const DirectlyOpen: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		checkins: mockCheckins,
	},
	decorators: [
		(Story) => (
			<div className="h-screen">
				<Story />
			</div>
		),
	],
};

export const WithUsageExample: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
		userId: "demo-user",
	},
	render: () => (
		<div className="p-8 space-y-4">
			<h2 className="text-2xl font-bold">Check-In Map Modal Example</h2>
			<p className="text-gray-600">
				This modal shows all user check-ins on an interactive map with filtering
				options.
			</p>
			<ModalWrapper userId="demo-user" />
			<div className="mt-8 p-4 bg-gray-50 rounded-lg">
				<h3 className="font-semibold mb-2">Features:</h3>
				<ul className="text-sm text-gray-600 space-y-1">
					<li>• Interactive map with zoom controls</li>
					<li>• Filter by All, Story, or Quest check-ins</li>
					<li>• Click markers to view location details</li>
					<li>• Navigate to related stories or quests</li>
					<li>• Add locations to memory wall</li>
				</ul>
			</div>
		</div>
	),
};
