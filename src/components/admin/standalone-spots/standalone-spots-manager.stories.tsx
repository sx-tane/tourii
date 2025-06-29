import type { Meta, StoryObj } from "@storybook/react";
import StandaloneSpotsManager from "./standalone-spots-manager";

const meta: Meta<typeof StandaloneSpotsManager> = {
	title: "Admin/Standalone Spots/Manager",
	component: StandaloneSpotsManager,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Comprehensive management interface for standalone tourist spots that can exist independently and be added to multiple routes.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "Default view of the standalone spots manager with sample data.",
			},
		},
	},
};

export const EmptyState: Story = {
	parameters: {
		docs: {
			description: {
				story: "Empty state when no standalone spots have been created yet.",
			},
		},
		mockData: {
			spots: [],
			routes: [],
		},
	},
};

export const WithManySpots: Story = {
	parameters: {
		docs: {
			description: {
				story: "Manager showing multiple standalone spots with different statuses - some assigned to routes, some unassigned.",
			},
		},
		mockData: {
			spots: [
				{
					touristSpotId: "spot-1",
					touristSpotName: "Tokyo Skytree",
					touristSpotDesc: "Iconic broadcasting tower and observation deck",
					address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
					touristSpotHashtag: ["#tower", "#cityview", "#modern"],
				},
				{
					touristSpotId: "spot-2", 
					touristSpotName: "Senso-ji Temple",
					touristSpotDesc: "Ancient Buddhist temple in Asakusa",
					address: "2 Chome-3-1 Asakusa, Taito City, Tokyo",
					touristSpotHashtag: ["#temple", "#historical", "#spiritual"],
					storyChapterId: "chapter-1",
				},
			],
		},
	},
};