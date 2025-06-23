import type { Meta, StoryObj } from "@storybook/react";
import LeafletMapView from "./leaflet-map-view";
import { useState } from "react";

// Demo component to show map functionality
const LeafletMapDemo = ({
	center,
	zoom,
}: {
	center: [number, number];
	zoom?: number;
}) => {
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const [map, setMap] = useState<any>(null);
	const [mapInfo, setMapInfo] = useState<string>("Map loading...");

	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const handleMapReady = (mapInstance: any) => {
		setMap(mapInstance);
		setMapInfo(
			`Map ready! Center: [${mapInstance.getCenter().lat.toFixed(4)}, ${mapInstance.getCenter().lng.toFixed(4)}]`,
		);
	};

	return (
		<div className="h-96 w-full">
			<LeafletMapView
				center={center}
				zoom={zoom}
				onMapReady={handleMapReady}
				className="h-full w-full"
			/>
			<div className="mt-4 p-4 bg-red rounded">
				<p className="text-sm font-medium">Map Status:</p>
				<p className="text-xs text-gray-600">{mapInfo}</p>
				<div className="mt-2 text-xs text-gray-500">
					<p>
						Center: [{center[0]}, {center[1]}]
					</p>
					<p>Zoom: {zoom || 13}</p>
					<p>Tiles: CartoDB Positron</p>
				</div>
			</div>
		</div>
	);
};

const meta: Meta<typeof LeafletMapDemo> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/LeafletMapView",
	component: LeafletMapDemo,
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
	argTypes: {
		center: {
			description: "Map center coordinates [latitude, longitude]",
			control: "object",
		},
		zoom: {
			description: "Initial zoom level",
			control: { type: "range", min: 1, max: 18, step: 1 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof LeafletMapDemo>;

export const Tokyo: Story = {
	args: {
		center: [35.6762, 139.6503],
		zoom: 13,
	},
};

export const Paris: Story = {
	args: {
		center: [48.8566, 2.3522],
		zoom: 12,
	},
};

export const NewYork: Story = {
	args: {
		center: [40.7128, -74.006],
		zoom: 11,
	},
};

export const ZoomedOut: Story = {
	args: {
		center: [35.6762, 139.6503],
		zoom: 8,
	},
};

export const ZoomedIn: Story = {
	args: {
		center: [35.6762, 139.6503],
		zoom: 16,
	},
};

// Simple standalone map
const SimpleMapDemo = () => (
	<LeafletMapView
		center={[35.6762, 139.6503]}
		zoom={13}
		className="h-64 w-full border rounded-lg"
	/>
);

export const SimpleMap: Story = {
	render: () => (
		<div className="p-4">
			<h3 className="mb-4 font-medium">Simple Map (No Interactions)</h3>
			<SimpleMapDemo />
		</div>
	),
};
