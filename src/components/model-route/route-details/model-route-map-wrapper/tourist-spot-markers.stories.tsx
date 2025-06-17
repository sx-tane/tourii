import type { Meta, StoryObj } from "@storybook/react";
import TouristSpotMarkers from "./tourist-spot-markers";
import LeafletMapView from "./leaflet-map-view";
import { useState } from "react";
import type { TouristSpotResponseDto } from "@/api/generated";

// Wrapper component for Storybook to demonstrate markers
const TouristSpotMarkersDemo = () => {
	const [selectedSpotId, setSelectedSpotId] = useState<string | undefined>(
		"spot-1",
	);
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const [map, setMap] = useState<any>(null);

	const mockTouristSpots: TouristSpotResponseDto[] = [
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
			weatherInfo: {
				temperatureCelsius: 22,
				weatherName: "Sunny",
				weatherDesc: "Clear sky",
			},
		},
		{
			touristSpotId: "spot-3",
			storyChapterId: "chapter-1",
			touristSpotName: "Tokyo Skytree",
			touristSpotDesc: "Iconic broadcasting tower",
			bestVisitTime: "Evening",
			address: "1-1-2 Oshiage, Sumida City, Tokyo",
			touristSpotLatitude: 35.7101,
			touristSpotLongitude: 139.8107,
			touristSpotHashtag: ["modern", "view", "landmark"],
			weatherInfo: {
				temperatureCelsius: 22,
				weatherName: "Sunny",
				weatherDesc: "Clear sky",
			},
		},
	];

	return (
		<div className="h-96 w-full">
			<LeafletMapView
				center={[35.6895, 139.6917]}
				zoom={11}
				onMapReady={setMap}
			>
				<TouristSpotMarkers
					touristSpots={mockTouristSpots}
					selectedSpotId={selectedSpotId}
					onSpotSelect={setSelectedSpotId}
					map={map}
				/>
			</LeafletMapView>
			<div className="mt-4 p-4 bg-gray-100 rounded">
				<p className="text-sm mb-2">Selected: {selectedSpotId || "None"}</p>
				<div className="flex gap-2">
					{mockTouristSpots.map((spot) => (
						<button
							type="button"
							key={spot.touristSpotId}
							onClick={() => setSelectedSpotId(spot.touristSpotId)}
							className={`px-3 py-1 text-xs rounded ${
								selectedSpotId === spot.touristSpotId
									? "bg-red text-white"
									: "bg-white text-gray-700"
							}`}
						>
							{spot.touristSpotName}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

const meta: Meta<typeof TouristSpotMarkersDemo> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/TouristSpotMarkers",
	component: TouristSpotMarkersDemo,
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
			<div style={{ height: "600px", width: "100%", padding: "20px" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TouristSpotMarkersDemo>;

export const Default: Story = {};

export const InteractiveDemo: Story = {
	render: () => <TouristSpotMarkersDemo />,
};

// Simple component stories for the actual TouristSpotMarkers component
const SimpleTouristSpotMarkers = TouristSpotMarkers;

const simpleMarkersStories = {
	title: "Model Route/RouteDetailPage/TouristSpotMarkers/Components",
	component: SimpleTouristSpotMarkers,
	parameters: {
		docs: {
			description: {
				component:
					"TouristSpotMarkers component renders markers on a Leaflet map. This component requires a map instance to function properly.",
			},
		},
	},
	argTypes: {
		touristSpots: {
			description: "Array of tourist spots to display as markers",
		},
		selectedSpotId: {
			description: "ID of the currently selected tourist spot",
		},
		onSpotSelect: {
			description: "Callback function when a marker is clicked",
		},
		map: {
			description: "Leaflet map instance",
		},
	},
};

export { simpleMarkersStories as TouristSpotMarkersComponent };
