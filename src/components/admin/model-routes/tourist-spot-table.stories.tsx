import type { Meta, StoryObj } from "@storybook/react";
import type { TouristSpotResponseDto } from "@/api/generated";
import TouristSpotTable from "./tourist-spot-table";

const meta: Meta<typeof TouristSpotTable> = {
	title: "Admin/ModelRoutes/TouristSpotTable",
	component: TouristSpotTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTouristSpots = [
	{
		touristSpotId: "SPOT-KIYOMIZU",
		touristSpotName: "Kiyomizu Temple",
		touristSpotDesc: "A famous Buddhist temple with stunning views of Kyoto city.",
		region: "Kyoto",
		lat: 34.9949,
		lng: 135.7851,
		hashtags: ["#temple", "#heritage", "#views"],
		mainImage: "https://example.com/kiyomizu-main.jpg",
		smallImages: ["https://example.com/kiyomizu1.jpg", "https://example.com/kiyomizu2.jpg"],
		visitTime: "2-3 hours",
		insDateTime: "2025-06-20T10:30:00Z",
		updDateTime: "2025-06-21T14:45:00Z",
	},
	{
		touristSpotId: "SPOT-GION",
		touristSpotName: "Gion District",
		touristSpotDesc: "Historic entertainment district famous for geishas.",
		region: "Kyoto",
		lat: 35.0033,
		lng: 135.7756,
		hashtags: ["#geisha", "#historic", "#culture"],
		mainImage: "https://example.com/gion-main.jpg",
		smallImages: [],
		visitTime: null,
		insDateTime: "2025-06-20T11:15:00Z",
		updDateTime: "2025-06-21T15:30:00Z",
	},
	{
		touristSpotId: "SPOT-INCOMPLETE",
		touristSpotName: "Incomplete Spot",
		touristSpotDesc: null,
		region: "Unknown",
		lat: 0,
		lng: 0,
		hashtags: [],
		mainImage: null,
		smallImages: [],
		visitTime: null,
		insDateTime: "2025-06-20T12:00:00Z",
		updDateTime: "2025-06-21T16:15:00Z",
	},
];

export const Default: Story = {
	args: {
		touristSpots: mockTouristSpots,
		selectedSpots: [],
		onToggleSelection: (spotId: string) => console.log("Toggle selection:", spotId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (spot: TouristSpotResponseDto) => console.log("Edit spot:", spot.touristSpotName),
		onDelete: (spotId: string, spotName: string) => console.log("Delete spot:", spotId, spotName),
	},
};

export const WithSelection: Story = {
	args: {
		touristSpots: mockTouristSpots,
		selectedSpots: ["SPOT-KIYOMIZU", "SPOT-GION"],
		onToggleSelection: (spotId: string) => console.log("Toggle selection:", spotId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (spot: TouristSpotResponseDto) => console.log("Edit spot:", spot.touristSpotName),
		onDelete: (spotId: string, spotName: string) => console.log("Delete spot:", spotId, spotName),
	},
};

export const EmptyState: Story = {
	args: {
		touristSpots: [],
		selectedSpots: [],
		onToggleSelection: (spotId: string) => console.log("Toggle selection:", spotId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (spot: TouristSpotResponseDto) => console.log("Edit spot:", spot.touristSpotName),
		onDelete: (spotId: string, spotName: string) => console.log("Delete spot:", spotId, spotName),
	},
};