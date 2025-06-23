import type { Meta, StoryObj } from "@storybook/react";
import TouristSpotDataDisplay from "./tourist-spot-data-display";

const meta: Meta<typeof TouristSpotDataDisplay> = {
	title: "Admin/ModelRoutes/TouristSpotDataDisplay",
	component: TouristSpotDataDisplay,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTouristSpot = {
	touristSpotId: "SPOT-KIYOMIZU",
	touristSpotName: "Kiyomizu Temple",
	touristSpotDesc: "A famous Buddhist temple in eastern Kyoto, known for its wooden stage that juts out from its main hall, 13 meters above the hillside below. The temple is famous for its spectacular views of Kyoto city and for the beautiful cherry blossoms in spring.",
	region: "Kyoto",
	lat: 34.9949,
	lng: 135.7851,
	hashtags: ["#temple", "#heritage", "#views", "#cherry-blossoms", "#buddhist"],
	mainImage: "https://example.com/kiyomizu-main.jpg",
	smallImages: [
		"https://example.com/kiyomizu1.jpg",
		"https://example.com/kiyomizu2.jpg",
		"https://example.com/kiyomizu3.jpg",
		"https://example.com/kiyomizu4.jpg",
	],
	visitTime: "2-3 hours",
	insDateTime: "2025-06-20T10:30:00Z",
	updDateTime: "2025-06-21T14:45:00Z",
	insUserId: "ADMIN-001",
	updUserId: "ADMIN-002",
};

export const Default: Story = {
	args: {
		touristSpot: mockTouristSpot,
		isOpen: true,
		onClose: () => console.log("Close data display"),
	},
};

export const MinimalData: Story = {
	args: {
		touristSpot: {
			touristSpotId: "SPOT-MINIMAL",
			touristSpotName: "Minimal Spot",
			touristSpotDesc: "",
			region: "Unknown",
			lat: 0,
			lng: 0,
			hashtags: [],
			mainImage: "",
			smallImages: [],
			visitTime: "",
			insDateTime: "2025-06-20T12:00:00Z",
			updDateTime: "2025-06-21T16:15:00Z",
			insUserId: "ADMIN-003",
			updUserId: "ADMIN-003",
		},
		isOpen: true,
		onClose: () => console.log("Close data display"),
	},
};

export const NoImages: Story = {
	args: {
		touristSpot: {
			...mockTouristSpot,
			mainImage: "",
			smallImages: [],
		},
		isOpen: true,
		onClose: () => console.log("Close data display"),
	},
};

export const ManyImages: Story = {
	args: {
		touristSpot: {
			...mockTouristSpot,
			smallImages: [
				"https://example.com/img1.jpg",
				"https://example.com/img2.jpg",
				"https://example.com/img3.jpg",
				"https://example.com/img4.jpg",
				"https://example.com/img5.jpg",
				"https://example.com/img6.jpg",
				"https://example.com/img7.jpg",
				"https://example.com/img8.jpg",
			],
		},
		isOpen: true,
		onClose: () => console.log("Close data display"),
	},
};

export const Closed: Story = {
	args: {
		touristSpot: mockTouristSpot,
		isOpen: false,
		onClose: () => console.log("Close data display"),
	},
};