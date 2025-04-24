import type { NFT } from "@/types/profile-type";
import type { Meta, StoryObj } from "@storybook/react";
import NFTSelection from "./nft-selector";

const meta = {
	title: "Profile/NFT/NFTSelector",
	component: NFTSelection,
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
} satisfies Meta<typeof NFTSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNFTs: NFT[] = [
	{
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
	},
	{
		nftId: "NFT002",
		nftRarity: "Epic",
		nftImage: "/image/profile/nft/100.png",
		nftHeldDate: "2023-02-01",
		walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
		nftDescription: {
			race: "Elf",
			hairColor: "Silver",
			eyes: "Green",
			mouth: "Smirk",
			accessory: "Earrings",
			clothing: "Robe",
			weapon: "Staff",
			background: "Forest",
		},
	},
	{
		nftId: "NFT003",
		nftRarity: "Legendary",
		nftImage: "/image/profile/nft/171.png",
		nftHeldDate: "2023-03-01",
		walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
		nftDescription: {
			race: "Dragon",
			hairColor: "Gold",
			eyes: "Red",
			mouth: "Fierce",
			accessory: "Horns",
			clothing: "Scales",
			weapon: "Fire Breath",
			background: "Mountain",
		},
	},
];

export const WithMultipleNFTs: Story = {
	args: {
		nftList: mockNFTs,
		selectedNFT: mockNFTs[0],
		handleNFTChange: (nftId: string) => {
			console.log("Selected NFT:", nftId);
		},
	},
};

export const WithSingleNFT: Story = {
	args: {
		nftList: [mockNFTs[0] as NFT],
		selectedNFT: mockNFTs[0],
		handleNFTChange: (nftId: string) => {
			console.log("Selected NFT:", nftId);
		},
	},
};

export const WithEmptySlots: Story = {
	args: {
		nftList: mockNFTs.concat(Array(3).fill(undefined)),
		selectedNFT: mockNFTs[0],
		handleNFTChange: (nftId: string) => {
			console.log("Selected NFT:", nftId);
		},
	},
};

export const NoSelection: Story = {
	args: {
		nftList: mockNFTs,
		selectedNFT: undefined,
		handleNFTChange: (nftId: string) => {
			console.log("Selected NFT:", nftId);
		},
	},
};
