import type { NFT } from "@/types/profile-type";
import type { Meta, StoryObj } from "@storybook/react";
import NFTInfo from "./nft-info";

const meta = {
	title: "Profile/NFT/NFTInfo",
	component: NFTInfo,
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
} satisfies Meta<typeof NFTInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNFT: NFT = {
	nftId: "NFT001",
	nftRarity: "Rare",
	nftImage: "/image/profile/nft/19.png",
	nftHeldDate: "2023-01-01",
	walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
	nftDescription: {
		race: "Human",
		hairColor: "Brown",
		eyes: "Blue",
		mouth: "Smile",
		accessory: "Crown",
		clothing: "Armor",
		weapon: "Sword",
		background: "Castle",
	},
};

export const Default: Story = {
	args: {
		selectedNFT: mockNFT,
	},
};

export const NoNFTSelected: Story = {
	args: {
		selectedNFT: undefined,
	},
};

export const WithLongAddress: Story = {
	args: {
		selectedNFT: {
			...mockNFT,
			walletAddress:
				"0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
		},
	},
};

export const WithLongDescriptions: Story = {
	args: {
		selectedNFT: {
			...mockNFT,
			nftDescription: {
				race: "Ancient Celestial Being",
				hairColor: "Shimmering Gold",
				eyes: "Cosmic Blue",
				mouth: "Serene Smile",
				accessory: "Legendary Crown of the Thousand Suns",
				clothing: "Mythical Armor of the Eternal Warrior",
				weapon: "The Blade of Infinite Light",
				background: "Crystal Palace of the Immortal Kings",
			},
		},
	},
};
