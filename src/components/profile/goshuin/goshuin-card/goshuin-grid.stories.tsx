import type { TravelGoshuin } from "@/types/profile-type";
import type { Meta, StoryObj } from "@storybook/react";
import GoshuinGrid from "./goshuin-grid";

const meta = {
	title: "Profile/Goshuin/GoshuinGrid",
	component: GoshuinGrid,
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#E3E3DC",
				},
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GoshuinGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockGoshuins: TravelGoshuin[] = [
	{
		goshuinId: "GOSHUIN001",
		goshuinName: "Senso-ji Temple",
		goshuinLocation: "Asakusa, Tokyo",
		goshuinDescription: "A historic temple in Tokyo",
		goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
		goshuinDate: "2024-03-15",
		goshuinExpiryDate: "2025-03-15",
		perksImage: "/image/profile/goshuin/perks/perks1.jpg",
		redeemed: false,
		goshuinRedeemDate: "",
	},
	{
		goshuinId: "GOSHUIN002",
		goshuinName: "Kiyomizu-dera",
		goshuinLocation: "Kyoto",
		goshuinDescription: "A Buddhist temple in eastern Kyoto",
		goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
		goshuinDate: "2024-03-16",
		goshuinExpiryDate: "2025-03-16",
		perksImage: "/image/profile/goshuin/perks/perks1.jpg",
		redeemed: false,
		goshuinRedeemDate: "",
	},
	{
		goshuinId: "GOSHUIN003",
		goshuinName: "Fushimi Inari",
		goshuinLocation: "Kyoto",
		goshuinDescription: "Famous for its thousands of torii gates",
		goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
		goshuinDate: "2024-03-17",
		goshuinExpiryDate: "2025-03-17",
		perksImage: "/image/profile/goshuin/perks/perks1.jpg",
		redeemed: true,
		goshuinRedeemDate: "2024-03-18",
	},
];

export const Default: Story = {
	args: {
		goshuin: mockGoshuins,
		selectedGoshuin: mockGoshuins[0],
		handleGoshuinChange: (goshuinId: string) => {
			console.log("Selected Goshuin:", goshuinId);
		},
	},
};

export const WithSelection: Story = {
	args: {
		goshuin: mockGoshuins,
		selectedGoshuin: mockGoshuins[1],
		handleGoshuinChange: (goshuinId: string) => {
			console.log("Selected Goshuin:", goshuinId);
		},
	},
};

export const EmptyGrid: Story = {
	args: {
		goshuin: [],
		selectedGoshuin: undefined,
		handleGoshuinChange: (goshuinId: string) => {
			console.log("Selected Goshuin:", goshuinId);
		},
	},
};
