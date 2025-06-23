import type { Meta, StoryObj } from "@storybook/react";
import UserDetailsModal from "./user-details-modal";

const mockUser = {
	userId: "TSU202506-614e2f-211442-172685-KAAA",
	username: "john_traveler",
	email: "john@example.com",
	role: "USER" as const,
	isPremium: true,
	isBanned: false,
	discordUsername: "johntraveler#1234",
	twitterUsername: "johntraveler",
	totalQuestCompleted: 15,
	totalTravelDistance: 127.5,
	registeredAt: "20250621 14:36",
	userInfo: {
		magatamaPoints: 1250,
		level: 8,
		userDigitalPassportType: "PREMIUM",
		prayerBead: 3,
		sword: 1,
		orgeMask: 0,
		discountRate: 0.1,
		magatamaBags: 2,
		digitalPassportAddress: "0x123456789abcdef...",
		logNftAddress: "0x456789abcdef123...",
	},
	passportWalletAddress: "0x789abcdef123456...",
	perksWalletAddress: "0xabcdef123456789...",
	summaryStats: {
		achievementCount: 12,
		onchainItemCount: 8,
		storyCompletedCount: 5,
		taskCompletedCount: 45,
		totalCheckinsCount: 23,
		discordActivityCount: 78,
		invitesSentCount: 3,
	},
};

const meta: Meta<typeof UserDetailsModal> = {
	title: "Admin/Users/UserDetailsModal",
	component: UserDetailsModal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		user: mockUser,
		isOpen: true,
		onClose: () => console.log("Modal closed"),
	},
};

export const Closed: Story = {
	args: {
		user: mockUser,
		isOpen: false,
		onClose: () => console.log("Modal closed"),
	},
};

export const NoUser: Story = {
	args: {
		user: null,
		isOpen: true,
		onClose: () => console.log("Modal closed"),
	},
};
