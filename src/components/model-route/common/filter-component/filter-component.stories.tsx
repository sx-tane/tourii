import type { Meta, StoryObj } from "@storybook/react";
import FilterComponent from "./filter-component";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type React from "react";
import { useState } from "react";

// Mock data for the story
const mockModelRoutes: ModelRouteResponseDto[] = [
	{
		modelRouteId: "route-1",
		storyId: "story-a",
		routeName: "Route Alpha",
		region: "North America",
		recommendation: ["Hiking", "Nature"],
		regionLatitude: 40.0,
		regionLongitude: -100.0,
		regionBackgroundMedia: "https://via.placeholder.com/150",
		touristSpotList: [],
		regionWeatherInfo: {
			temperatureCelsius: 20,
			weatherName: "Cloudy",
			weatherDesc: "Partly cloudy",
		},
	},
	{
		modelRouteId: "route-2",
		storyId: "story-b",
		routeName: "Route Beta",
		region: "Europe",
		recommendation: ["Culture", "History"],
		regionLatitude: 50.0,
		regionLongitude: 10.0,
		regionBackgroundMedia: "https://via.placeholder.com/150",
		touristSpotList: [],
		regionWeatherInfo: {
			temperatureCelsius: 18,
			weatherName: "Rainy",
			weatherDesc: "Light rain",
		},
	},
	{
		modelRouteId: "route-3",
		storyId: "story-c",
		routeName: "Route Gamma",
		region: "North America",
		recommendation: ["Adventure", "Mountains"],
		regionLatitude: 45.0,
		regionLongitude: -110.0,
		regionBackgroundMedia: "https://via.placeholder.com/150",
		touristSpotList: [],
		regionWeatherInfo: {
			temperatureCelsius: 15,
			weatherName: "Sunny",
			weatherDesc: "Clear skies",
		},
	},
];

const availableRegions = Array.from(
	new Set(mockModelRoutes.map((r) => r.region)),
);
const availableRecommendations = Array.from(
	new Set(mockModelRoutes.flatMap((r) => r.recommendation)),
);

const meta = {
	title: "Components/FilterComponent",
	component: FilterComponent,
	parameters: {
		layout: "padded", // Use padded to give some space for the filter UI
	},
	tags: ["autodocs"],
	argTypes: {
		// modelRoutes and onFilterChange will be handled by the Story
	},
} satisfies Meta<typeof FilterComponent>;

export default meta;

const FilterableListContainer: React.FC = () => {
	const [filteredRoutes, setFilteredRoutes] =
		useState<ModelRouteResponseDto[]>(mockModelRoutes);

	return (
		<div>
			<FilterComponent
				modelRoutes={mockModelRoutes}
				onFilterChange={setFilteredRoutes}
				availableRegions={availableRegions}
				availableRecommendations={availableRecommendations}
			/>
			<h4>Filtered Results:</h4>
			{filteredRoutes.length > 0 ? (
				<ul>
					{filteredRoutes.map((route) => (
						<li key={route.modelRouteId}>
							{route.routeName} ({route.region} -{" "}
							{route.recommendation.join(", ")})
						</li>
					))}
				</ul>
			) : (
				<p>No routes match your criteria.</p>
			)}
		</div>
	);
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		modelRoutes: mockModelRoutes,
		onFilterChange: () => {
			console.log("Filter changed");
		},
		availableRegions: availableRegions,
		availableRecommendations: availableRecommendations,
	},
	render: () => <FilterableListContainer />,
};
