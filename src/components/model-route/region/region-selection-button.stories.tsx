import type { Meta, StoryObj } from "@storybook/react";
import type { RegionSelection } from "@/app/v2/(routes)/types";
import RegionSelectionButton from "./region-selection-button";

// Mock region selection data
const mockSelections: RegionSelection[] = [
	{
		region: "Osaka",
		temperatureCelsius: 25,
		weatherName: "Clear",
		isSelected: false,
	},
	{
		region: "Kyoto",
		temperatureCelsius: 22,
		weatherName: "Clouds",
		isSelected: true,
	},
	{
		region: "Tokyo",
		temperatureCelsius: 18,
		weatherName: "Rain",
		isSelected: false,
	},
];

const meta: Meta<typeof RegionSelectionButton> = {
	title: "Model Route/Region/RegionSelectionButton",
	component: RegionSelectionButton,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
		docs: {
			description: {
				component:
					"Region selection button component for choosing between different regions. Shows selection state with color changes and displays route count.",
			},
		},
	},
	argTypes: {
		selection: {
			control: "object",
			description:
				"Region selection object containing region name and selection state",
		},
		modelRouteCount: {
			control: "number",
			description: "Number of routes available in this region",
		},
		onSelect: {
			action: "selected",
			description: "Callback function called when region is selected",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "20px", width: "400px" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegionSelectionButton>;

export const Default: Story = {
	args: {
		selection: mockSelections[0],
		modelRouteCount: 5,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const Selected: Story = {
	args: {
		selection: mockSelections[1],
		modelRouteCount: 8,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const SingleRoute: Story = {
	args: {
		selection: mockSelections[0],
		modelRouteCount: 1,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const ManyRoutes: Story = {
	args: {
		selection: mockSelections[0],
		modelRouteCount: 15,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const LongRegionName: Story = {
	args: {
		selection: {
			region: "Kanagawa Prefecture",
			temperatureCelsius: 23,
			weatherName: "Clear",
			isSelected: false,
		},
		modelRouteCount: 7,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const SelectedLongName: Story = {
	args: {
		selection: {
			region: "Kanagawa Prefecture",
			temperatureCelsius: 23,
			weatherName: "Clear",
			isSelected: true,
		},
		modelRouteCount: 7,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const SpecialCharacters: Story = {
	args: {
		selection: {
			region: "Tōkyō-to",
			temperatureCelsius: 21,
			weatherName: "Clouds",
			isSelected: false,
		},
		modelRouteCount: 12,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const NoRoutes: Story = {
	args: {
		selection: mockSelections[0],
		modelRouteCount: 0,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};
