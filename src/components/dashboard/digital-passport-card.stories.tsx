import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DigitalPassportCard from "./digital-passport-card";
import passportReducer from "@/lib/redux/features/passport/passport-slice";

// Create a mock store for Storybook
const createMockStore = (passportState: any) =>
	configureStore({
		reducer: {
			passport: passportReducer,
		},
		preloadedState: {
			passport: passportState,
		},
	});

const meta: Meta<typeof DigitalPassportCard> = {
	title: "Dashboard/DigitalPassportCard",
	component: DigitalPassportCard,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A clickable card component that displays user's digital passport information including passport type, avatar, points, and travel stats.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes to apply to the card",
		},
		onClick: {
			action: "clicked",
			description: "Callback function when the card is clicked",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Bonjin passport
export const Default: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "BONJIN",
				userAvatar: "/image/profile/nft/19.png",
				chineseCharacters: ["凡", "人"],
				isUnlocked: true,
				level: "C",
				totalPoints: 750,
				unlockedPerks: ["Temple Visit", "Photo Quest"],
				travelHistory: [
					{ location: "Kyoto Temple", date: "2024-01-15", verified: true },
					{ location: "Osaka Castle", date: "2024-01-10", verified: true },
				],
			});

			return (
				<Provider store={mockStore}>
					<div className="w-80">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	args: {
		className: "",
	},
};

// Amatsukami passport (high-level)
export const Amatsukami: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "AMATSUKAMI",
				userAvatar: "/image/profile/nft/100.png",
				chineseCharacters: ["天", "津", "神"],
				isUnlocked: true,
				level: "S",
				totalPoints: 2450,
				unlockedPerks: [
					"VIP Access",
					"Exclusive Stories",
					"Premium Quests",
					"Special Events",
				],
				travelHistory: [
					{ location: "Mount Fuji", date: "2024-01-20", verified: true },
					{ location: "Ise Shrine", date: "2024-01-18", verified: true },
					{ location: "Nikko Toshogu", date: "2024-01-15", verified: true },
					{ location: "Kyoto Temple", date: "2024-01-12", verified: true },
					{ location: "Nara Park", date: "2024-01-10", verified: true },
				],
			});

			return (
				<Provider store={mockStore}>
					<div className="w-80">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	args: {
		className: "",
	},
};

// Yokai passport (mysterious)
export const Yokai: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "YOKAI",
				userAvatar: "/image/profile/nft/171.png",
				chineseCharacters: ["妖", "怪"],
				isUnlocked: true,
				level: "A",
				totalPoints: 1680,
				unlockedPerks: ["Night Quests", "Hidden Stories", "Spirit Encounters"],
				travelHistory: [
					{ location: "Abandoned Shrine", date: "2024-01-19", verified: true },
					{ location: "Bamboo Forest", date: "2024-01-16", verified: true },
					{ location: "Mountain Cave", date: "2024-01-13", verified: true },
				],
			});

			return (
				<Provider store={mockStore}>
					<div className="w-80">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	args: {
		className: "",
	},
};

// Pending/Locked passport
export const Pending: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "BONJIN",
				userAvatar: "/image/profile/nft/19.png",
				chineseCharacters: ["新", "人"],
				isUnlocked: false,
				level: "E",
				totalPoints: 50,
				unlockedPerks: [],
				travelHistory: [],
			});

			return (
				<Provider store={mockStore}>
					<div className="w-80">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	args: {
		className: "",
	},
};

// Custom click handler
export const WithCustomHandler: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "KUNITSUKAMI",
				userAvatar: "/image/profile/nft/100.png",
				chineseCharacters: ["国", "津", "神"],
				isUnlocked: true,
				level: "B",
				totalPoints: 1200,
				unlockedPerks: ["Nature Quests", "Regional Stories"],
				travelHistory: [
					{ location: "Local Shrine", date: "2024-01-17", verified: true },
					{ location: "Mountain Trail", date: "2024-01-14", verified: true },
				],
			});

			return (
				<Provider store={mockStore}>
					<div className="w-80">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	args: {
		className: "",
		onClick: () => alert("Custom passport navigation!"),
	},
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
	decorators: [
		(Story) => {
			const mockStore = createMockStore({
				passportType: "AMATSUKAMI",
				userAvatar: "/image/profile/nft/100.png",
				chineseCharacters: ["天", "津", "神"],
				isUnlocked: true,
				level: "S",
				totalPoints: 2450,
				unlockedPerks: ["VIP Access", "Exclusive Stories"],
				travelHistory: [
					{ location: "Mount Fuji", date: "2024-01-20", verified: true },
					{ location: "Ise Shrine", date: "2024-01-18", verified: true },
				],
			});

			return (
				<Provider store={mockStore}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
						<div className="w-full">
							<Story />
						</div>
						<div className="w-full">
							<Story />
						</div>
						<div className="w-full">
							<Story />
						</div>
					</div>
				</Provider>
			);
		},
	],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				story: "Demonstrates how the card adapts to different container sizes.",
			},
		},
	},
	args: {
		className: "",
	},
};