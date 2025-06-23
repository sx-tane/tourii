import type { Meta, StoryObj } from "@storybook/react";
import DistributionSection from "./distribution-section";

const meta: Meta<typeof DistributionSection> = {
	title: "Admin/Analytics/DistributionSection",
	component: DistributionSection,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		distribution: {
			regions: {
				Tokyo: 25,
				Kyoto: 18,
				Osaka: 12,
				Hiroshima: 8,
				Nagoya: 6,
			},
			questTypes: {
				PHOTO_UPLOAD: 45,
				QR_SCAN: 32,
				GPS_CHECKIN: 28,
				ANSWER_TEXT: 15,
				GROUP_QUEST: 8,
			},
		},
		totalRoutes: 69,
		totalQuests: 128,
	},
};

export const UnbalancedDistribution: Story = {
	args: {
		distribution: {
			regions: {
				Tokyo: 50,
				Kyoto: 3,
				Osaka: 2,
				Others: 1,
			},
			questTypes: {
				PHOTO_UPLOAD: 80,
				QR_SCAN: 5,
				GPS_CHECKIN: 3,
				ANSWER_TEXT: 2,
			},
		},
		totalRoutes: 56,
		totalQuests: 90,
	},
};

export const EmptyData: Story = {
	args: {
		distribution: {
			regions: {},
			questTypes: {},
		},
		totalRoutes: 0,
		totalQuests: 0,
	},
};

export const SingleRegion: Story = {
	args: {
		distribution: {
			regions: {
				Tokyo: 100,
			},
			questTypes: {
				PHOTO_UPLOAD: 60,
				QR_SCAN: 40,
			},
		},
		totalRoutes: 100,
		totalQuests: 100,
	},
};