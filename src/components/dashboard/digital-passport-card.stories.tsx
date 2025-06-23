import type { Meta, StoryObj } from "@storybook/react";
import DigitalPassportCard from "./digital-passport-card";
import type { PassportData } from "@/hooks/api/usePassport";
import { UserResponseDto } from "@/api/generated";

// Mock passport data
const mockPassportData: PassportData = {
	passportType: UserResponseDto.userDigitalPassportType.BONJIN,
	digitalPassportAddress: null,
	level: UserResponseDto.level.E_CLASS_AMATSUKAMI,
	magatamaPoints: 150,
	totalQuestCompleted: 3,
	totalTravelDistance: 25.5,
	isPremium: false,
	username: "TouriiExplorer",
	userId: "user-123",
	achievements: [
		{
			achievementName: "First Steps",
			achievementDesc: "Complete your first quest",
			iconUrl: undefined,
			achievementType: "MILESTONE",
			magatamaPointAwarded: 50,
		},
		{
			achievementName: "Explorer",
			achievementDesc: "Visit 5 different locations",
			iconUrl: undefined,
			achievementType: "TRAVEL",
			magatamaPointAwarded: 100,
		},
	],
	travelHistory: [
		{
			location: "Shibuya Crossing",
			date: "2024-01-15T10:30:00Z",
			verified: true,
			travelDistance: 12.3,
			checkInMethod: "GPS",
		},
		{
			location: "Tokyo Tower",
			date: "2024-01-10T14:20:00Z",
			verified: true,
			travelDistance: 8.7,
			checkInMethod: "QR_CODE",
		},
		{
			location: "Meiji Shrine",
			date: "2024-01-05T09:15:00Z",
			verified: false,
			travelDistance: 4.5,
			checkInMethod: "GPS",
		},
	],
	onchainItems: [],
};

const amatsukamiPassportData: PassportData = {
	...mockPassportData,
	passportType: UserResponseDto.userDigitalPassportType.AMATSUKAMI,
	digitalPassportAddress: "0x1234567890abcdef1234567890abcdef12345678",
	level: UserResponseDto.level.A_CLASS_AMATSUKAMI,
	magatamaPoints: 2500,
	totalQuestCompleted: 25,
	totalTravelDistance: 150.7,
	isPremium: true,
	username: "HeavenlyExplorer",
	achievements: [
		...mockPassportData.achievements,
		{
			achievementName: "Heavenly Ascension",
			achievementDesc: "Achieve Amatsukami status",
			iconUrl: undefined,
			achievementType: "MILESTONE",
			magatamaPointAwarded: 500,
		},
	],
	onchainItems: [
		{
			itemType: "DIGITAL_PASSPORT",
			status: "ACTIVE",
			mintedAt: "2024-01-01T00:00:00Z",
			blockchainType: "VARA",
		},
	],
};

const yokaiPassportData: PassportData = {
	...mockPassportData,
	passportType: UserResponseDto.userDigitalPassportType.YOKAI,
	digitalPassportAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
	level: UserResponseDto.level.S_CLASS_YOKAI,
	magatamaPoints: 5000,
	totalQuestCompleted: 50,
	totalTravelDistance: 300.2,
	isPremium: true,
	username: "MysticalWanderer",
	achievements: [
		...mockPassportData.achievements,
		{
			achievementName: "Spirit Guardian",
			achievementDesc: "Master of mystical arts",
			iconUrl: undefined,
			achievementType: "COMMUNITY",
			magatamaPointAwarded: 1000,
		},
	],
};

// Mock data configurations for different stories

const meta: Meta<typeof DigitalPassportCard> = {
	title: "Dashboard/DigitalPassportCard",
	component: DigitalPassportCard,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A clickable card component that displays user's digital passport information including passport type, avatar, points, and travel stats. Now integrated with backend API via SWR.",
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
	args: {
		className: "w-80",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: mockPassportData,
			},
		],
	},
};

// Amatsukami passport with premium features
export const Amatsukami: Story = {
	args: {
		className: "w-80",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: amatsukamiPassportData,
			},
		],
		docs: {
			description: {
				story:
					"Premium Amatsukami passport with active digital passport address and enhanced features.",
			},
		},
	},
};

// Yokai passport with mystical theme
export const Yokai: Story = {
	args: {
		className: "w-80",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: yokaiPassportData,
			},
		],
		docs: {
			description: {
				story:
					"High-level Yokai passport showcasing mystical traveler status with maximum achievements.",
			},
		},
	},
};

// Loading state
export const Loading: Story = {
	args: {
		className: "w-80",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: mockPassportData,
				delay: "infinite", // Simulate loading state
			},
		],
		docs: {
			description: {
				story: "Loading state while fetching passport data from the API.",
			},
		},
	},
};

// Error state
export const Error: Story = {
	args: {
		className: "w-80",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 500,
				response: { error: "Failed to load passport" },
			},
		],
		docs: {
			description: {
				story: "Error state when passport data fails to load from the API.",
			},
		},
	},
};

// Custom click handler
export const CustomHandler: Story = {
	args: {
		className: "w-80",
		onClick: () => alert("Custom passport handler triggered!"),
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: mockPassportData,
			},
		],
		docs: {
			description: {
				story:
					"Digital passport card with custom click handler instead of default navigation.",
			},
		},
	},
};

// Responsive demonstration
export const Responsive: Story = {
	args: {
		className: "w-full max-w-sm mx-auto",
	},
	parameters: {
		mockData: [
			{
				url: "/api/passport",
				method: "GET",
				status: 200,
				response: amatsukamiPassportData,
			},
		],
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story: "Responsive behavior of the passport card on mobile devices.",
			},
		},
	},
};
