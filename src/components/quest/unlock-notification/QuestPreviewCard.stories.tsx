import type { Meta, StoryObj } from "@storybook/react";
import QuestPreviewCard from "./QuestPreviewCard";
import type { QuestUnlockData } from "@/types/quest-unlock-type";

const meta: Meta<typeof QuestPreviewCard> = {
	title: "Quest/Unlock Notification/QuestPreviewCard",
	component: QuestPreviewCard,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Compact quest preview card showing key information about an unlocked quest including image, title, type, rewards, and premium status. Features a call-to-action button to start the quest.",
			},
		},
	},
	argTypes: {
		quest: {
			description: "Quest data to display in the card",
		},
		onStartQuest: {
			action: "startQuest",
			description: "Callback function when Start Quest button is clicked",
		},
		className: {
			control: "text",
			description: "Additional CSS classes to apply",
		},
	},
};

export default meta;
type Story = StoryObj<typeof QuestPreviewCard>;

// Mock quest data
const mockQuestData: QuestUnlockData = {
	questId: "quest-001",
	questName: "Sacred Mountain Trail",
	questDesc:
		"Explore the ancient pathways leading to the sacred mountain shrine and discover hidden treasures along the way.",
	questImage: "/image/model-route/1/kashima-shrine/1.jpg",
	touristSpotName: "Fushimi Inari Shrine",
	totalMagatamaPointAwarded: 500,
	isPremium: false,
};

const mockPremiumQuestData: QuestUnlockData = {
	questId: "quest-002",
	questName: "Exclusive Shrine Experience",
	questDesc:
		"Gain exclusive access to restricted areas of the shrine and participate in special ceremonies.",
	questImage: "/image/model-route/2/fukoji-temple/1.jpg",
	touristSpotName: "Kyoto Imperial Palace",
	totalMagatamaPointAwarded: 1200,
	isPremium: true,
};

const mockQuestWithoutImage: QuestUnlockData = {
	questId: "quest-003",
	questName: "Temple Bell Challenge",
	questDesc:
		"Ring the ancient temple bell and learn about its historical significance.",
	questImage: null,
	touristSpotName: "Senso-ji Temple",
	totalMagatamaPointAwarded: 300,
	isPremium: false,
};

/**
 * Default quest preview card with standard quest data.
 */
export const Default: Story = {
	args: {
		quest: mockQuestData,
		className: "w-80",
	},
};

/**
 * Premium quest variant with premium badge and higher rewards.
 */
export const PremiumQuest: Story = {
	args: {
		quest: mockPremiumQuestData,
		className: "w-80",
	},
};

/**
 * Quest without image showing fallback icon.
 */
export const WithoutImage: Story = {
	args: {
		quest: mockQuestWithoutImage,
		className: "w-80",
	},
};

/**
 * Compact variant for smaller displays.
 */
export const Compact: Story = {
	args: {
		quest: mockQuestData,
		className: "w-64",
	},
};

/**
 * Quest with very long title and description to test text overflow.
 */
export const LongContent: Story = {
	args: {
		quest: {
			...mockQuestData,
			questName:
				"An Extremely Long Quest Name That Tests Text Wrapping and Truncation",
			questDesc:
				"This is a very long quest description that should demonstrate how the component handles text overflow and ensures proper line clamping. It contains multiple sentences to test the layout behavior with extensive content that might exceed the normal display area.",
		},
		className: "w-80",
	},
};

/**
 * High reward quest showing large point values.
 */
export const HighReward: Story = {
	args: {
		quest: {
			...mockQuestData,
			questName: "Epic Mountain Expedition",
			totalMagatamaPointAwarded: 2500,
		},
		className: "w-80",
	},
};

/**
 * Multiple cards in a grid layout.
 */
export const MultipleCards: Story = {
	args: {
		quest: mockQuestData,
		className: "w-72",
	},
	decorators: [
		(Story) => (
			<div className="grid grid-cols-2 gap-4 p-4">
				<Story />
				<QuestPreviewCard quest={mockPremiumQuestData} className="w-72" />
				<QuestPreviewCard quest={mockQuestWithoutImage} className="w-72" />
				<QuestPreviewCard
					quest={{ ...mockQuestData, questName: "Short Quest" }}
					className="w-72"
				/>
			</div>
		),
	],
};
