import type { Meta, StoryObj } from "@storybook/react";
import ContentHealthSection from "./content-health-section";

const meta: Meta<typeof ContentHealthSection> = {
	title: "Admin/Analytics/ContentHealthSection",
	component: ContentHealthSection,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 12,
			questsWithoutTouristSpot: 8,
			healthScore: 73.5,
		},
		totalQuests: 145,
	},
};

export const PerfectHealth: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 0,
			healthScore: 100,
		},
		totalQuests: 50,
	},
};

export const PoorHealth: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 45,
			questsWithoutTouristSpot: 32,
			healthScore: 25.8,
		},
		totalQuests: 100,
	},
};

export const NoQuests: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 0,
			healthScore: 0,
		},
		totalQuests: 0,
	},
};