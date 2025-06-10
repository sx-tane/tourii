import type { Meta, StoryObj } from "@storybook/react";
import MapModal from "./map-modal";
import { useState } from "react";
import type { ModelRouteResponseDto } from "@/api/generated";

// Wrapper component for Storybook to demonstrate modal
const MapModalDemo = () => {
	const [isOpen, setIsOpen] = useState(false);

	const mockModelRoute: ModelRouteResponseDto = {
		modelRouteId: "route-1",
		storyId: "story-1",
		routeName: "Tokyo Heritage Trail",
		region: "Tokyo",
		regionDesc:
			"Explore the ancient temples and traditional neighborhoods of Tokyo",
		recommendation: [
			"Visit early morning",
			"Bring comfortable shoes",
			"Try local food",
		],
		regionLatitude: 35.6762,
		regionLongitude: 139.6503,
		regionBackgroundMedia:
			"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
		regionWeatherInfo: {
			temperatureCelsius: 22,
			weatherName: "Sunny",
			weatherDesc: "Clear sky with light breeze",
			regionName: "Tokyo",
		},
		touristSpotList: [
			{
				touristSpotId: "spot-1",
				storyChapterId: "chapter-1",
				touristSpotName: "Senso-ji Temple",
				touristSpotDesc: "Ancient Buddhist temple in Asakusa",
				bestVisitTime: "Early morning",
				address: "2-3-1 Asakusa, Taito City, Tokyo",
				touristSpotLatitude: 35.7148,
				touristSpotLongitude: 139.7967,
				touristSpotHashtag: ["temple", "historic", "cultural"],
				imageSet: {
					main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
					small: [
						"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
					],
				},
				weatherInfo: {
					temperatureCelsius: 22,
					weatherName: "Sunny",
					weatherDesc: "Clear sky",
				},
			},
			{
				touristSpotId: "spot-2",
				storyChapterId: "chapter-1",
				touristSpotName: "Meiji Shrine",
				touristSpotDesc: "Shinto shrine dedicated to Emperor Meiji",
				bestVisitTime: "Morning",
				address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
				touristSpotLatitude: 35.6764,
				touristSpotLongitude: 139.6993,
				touristSpotHashtag: ["shrine", "peaceful", "nature"],
				imageSet: {
					main: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
					small: [
						"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
					],
				},
				weatherInfo: {
					temperatureCelsius: 22,
					weatherName: "Sunny",
					weatherDesc: "Clear sky",
				},
			},
		],
		delFlag: false,
		insUserId: "admin",
		insDateTime: "2024-01-01T00:00:00Z",
		updUserId: "admin",
		updDateTime: "2024-01-01T00:00:00Z",
	};

	return (
		<div className="p-6">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-red text-white px-6 py-3 rounded-lg font-medium hover:bg-red/90 transition-colors"
			>
				Open Map Modal
			</button>

			<div className="mt-4 p-4 bg-gray-100 rounded">
				<h3 className="font-medium mb-2">Modal Features:</h3>
				<ul className="text-sm text-gray-600 space-y-1">
					<li>• Full-screen modal overlay</li>
					<li>• Interactive map with markers</li>
					<li>• Click markers to view details</li>
					<li>• Location info panel</li>
					<li>• Close with X button or click outside</li>
				</ul>
			</div>

			<MapModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				modelRoute={mockModelRoute}
			/>
		</div>
	);
};

const meta: Meta<typeof MapModalDemo> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/MapModal",
	component: MapModalDemo,
	parameters: {
		layout: "fullscreen",
		docs: {
			story: {
				inline: false,
				iframeHeight: 600,
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh", width: "100%" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MapModalDemo>;

export const Default: Story = {
	render: () => <MapModalDemo />,
};

export const InteractiveDemo: Story = {
	render: () => <MapModalDemo />,
};
