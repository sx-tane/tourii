import type { Meta, StoryObj } from "@storybook/react";
import { AIRouteDiscovery } from "./ai-route-discovery";

const meta: Meta<typeof AIRouteDiscovery> = {
	title: "Model Route/AI Discovery/AIRouteDiscovery",
	component: AIRouteDiscovery,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Complete AI-powered route discovery interface with search, filters, and results display."
			}
		}
	},
	argTypes: {
		region: {
			description: "Optional region filter for searches",
			control: "text",
		},
		onRoutesGenerated: {
			description: "Callback when routes are generated",
			action: "routes-generated",
		},
		className: {
			description: "Additional CSS classes",
			control: "text",
		},
	},
	decorators: [
		(Story) => (
			<div className="min-h-screen bg-gradient-to-br from-warmGrey-50 to-warmGrey-100 p-4">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof AIRouteDiscovery>;

export const Default: Story = {
	args: {
		region: undefined,
		onRoutesGenerated: (routes) => {
			console.log("Generated routes:", routes);
		},
	},
};

export const WithRegionFilter: Story = {
	args: {
		region: "Kyushu",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes for Kyushu:", routes);
		},
	},
};

export const HokkaidoRegion: Story = {
	args: {
		region: "Hokkaido",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes for Hokkaido:", routes);
		},
	},
};

export const KansaiRegion: Story = {
	args: {
		region: "Kansai",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes for Kansai:", routes);
		},
	},
};

export const MobileView: Story = {
	args: {
		region: "Tokyo",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes:", routes);
		},
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
	decorators: [
		(Story) => (
			<div className="min-h-screen bg-gradient-to-br from-warmGrey-50 to-warmGrey-100 p-2">
				<Story />
			</div>
		),
	],
};

export const TabletView: Story = {
	args: {
		region: "Kyoto",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes:", routes);
		},
	},
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};

export const CustomClassName: Story = {
	args: {
		region: "Osaka",
		className: "custom-discovery-interface",
		onRoutesGenerated: (routes) => {
			console.log("Generated routes with custom styling:", routes);
		},
	},
};