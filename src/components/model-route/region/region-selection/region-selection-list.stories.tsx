import type { Meta, StoryObj } from "@storybook/react";
import type { RegionSelection } from "@/app/v2/(routes)/types";
import RegionSelectionList from "./region-selection-list";

// Mock region selection data
const mockSelectionsThree: RegionSelection[] = [
	{
		region: "Osaka",
		temperatureCelsius: 25,
		weatherName: "Clear",
		isSelected: false,
		routeCount: 0,
	},
	{
		region: "Kyoto",
		temperatureCelsius: 22,
		weatherName: "Clouds",
		isSelected: true,
		routeCount: 0,
	},
	{
		region: "Tokyo",
		temperatureCelsius: 18,
		weatherName: "Rain",
		isSelected: false,
		routeCount: 0,
	},
];

const mockSelectionsMany: RegionSelection[] = [
	{
		region: "Osaka",
		temperatureCelsius: 25,
		weatherName: "Clear",
		isSelected: false,
		routeCount: 0,
	},
	{
		region: "Kyoto",
		temperatureCelsius: 22,
		weatherName: "Clouds",
		isSelected: true,
		routeCount: 0,
	},
	{
		region: "Tokyo",
		temperatureCelsius: 18,
		weatherName: "Rain",
		isSelected: false,
		routeCount: 0,
	},
	{
		region: "Kanagawa",
		temperatureCelsius: 23,
		weatherName: "Clear",
		isSelected: false,
		routeCount: 0,
	},
	{
		region: "Hiroshima",
		temperatureCelsius: 26,
		weatherName: "Sunny",
		isSelected: false,
		routeCount: 0,
	},
	{
		region: "Hokkaido",
		temperatureCelsius: 15,
		weatherName: "Snow",
		isSelected: false,
		routeCount: 0,
	},
];

const mockSelectionsOne: RegionSelection[] = [
	{
		region: "Okinawa",
		temperatureCelsius: 28,
		weatherName: "Sunny",
		isSelected: true,
		routeCount: 0,
	},
];

const meta: Meta<typeof RegionSelectionList> = {
	title: "Model Route/Region/RegionSelectionList",
	component: RegionSelectionList,
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
					"Region selection list component displaying multiple region selection buttons in a horizontal scrollable layout with animations.",
			},
		},
	},
	argTypes: {
		selectionData: {
			control: "object",
			description: "Array of region selection objects",
		},
		onSelect: {
			action: "selected",
			description: "Callback function called when a region is selected",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: "800px", padding: "20px" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegionSelectionList>;

export const Default: Story = {
	args: {
		selectionData: mockSelectionsThree,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const ManyRegions: Story = {
	args: {
		selectionData: mockSelectionsMany,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const SingleRegion: Story = {
	args: {
		selectionData: mockSelectionsOne,
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const EmptyList: Story = {
	args: {
		selectionData: [],
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const FirstSelected: Story = {
	args: {
		selectionData: [
			{
				region: "Osaka",
				temperatureCelsius: 25,
				weatherName: "Clear",
				isSelected: true,
				routeCount: 0,
			},
			{
				region: "Kyoto",
				temperatureCelsius: 22,
				weatherName: "Clouds",
				isSelected: false,
				routeCount: 0,
			},
			{
				region: "Tokyo",
				temperatureCelsius: 18,
				weatherName: "Rain",
				isSelected: false,
				routeCount: 0,
			},
		],
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};

export const LastSelected: Story = {
	args: {
		selectionData: [
			{
				region: "Osaka",
				temperatureCelsius: 25,
				weatherName: "Clear",
				isSelected: false,
				routeCount: 0,
			},
			{
				region: "Kyoto",
				temperatureCelsius: 22,
				weatherName: "Clouds",
				isSelected: false,
				routeCount: 0,
			},
			{
				region: "Tokyo",
				temperatureCelsius: 18,
				weatherName: "Rain",
				isSelected: true,
				routeCount: 0,
			},
		],
		onSelect: (region: string) => console.log(`Selected: ${region}`),
	},
};
