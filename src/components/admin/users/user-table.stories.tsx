import type { Meta, StoryObj } from "@storybook/react";
import type { AdminUserListResponseDto } from "@/api/generated";
import UserTable from "./user-table";

type UserData = AdminUserListResponseDto["users"][0];

const mockUsers = [
	{
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
			digitalPassportAddress: "0x123...",
			logNftAddress: "0x456...",
		},
		passportWalletAddress: "0x789...",
		perksWalletAddress: "0xabc...",
		summaryStats: {
			achievementCount: 12,
			onchainItemCount: 8,
			storyCompletedCount: 5,
			taskCompletedCount: 45,
			totalCheckinsCount: 23,
			discordActivityCount: 78,
			invitesSentCount: 3,
		},
	},
	{
		userId: "TSU202506-abc123-456789-012345-BBBB",
		username: "admin_user",
		email: "admin@tourii.com",
		role: "ADMIN" as const,
		isPremium: false,
		isBanned: false,
		discordUsername: null,
		twitterUsername: null,
		totalQuestCompleted: 0,
		totalTravelDistance: 0,
		registeredAt: "20250620 09:15",
		userInfo: null,
		passportWalletAddress: null,
		perksWalletAddress: null,
		summaryStats: {
			achievementCount: 0,
			onchainItemCount: 0,
			storyCompletedCount: 0,
			taskCompletedCount: 0,
			totalCheckinsCount: 0,
			discordActivityCount: 0,
			invitesSentCount: 0,
		},
	},
];

const meta: Meta<typeof UserTable> = {
	title: "Admin/Users/UserTable",
	component: UserTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		users: mockUsers,
		selectedUsers: [],
		onToggleUserSelection: (userId: string) =>
			console.log("Toggle user:", userId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onViewUser: (user: UserData) => console.log("View user:", user.username),
	},
};

export const WithSelection: Story = {
	args: {
		users: mockUsers,
		selectedUsers: ["TSU202506-614e2f-211442-172685-KAAA"],
		onToggleUserSelection: (userId: string) =>
			console.log("Toggle user:", userId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onViewUser: (user: UserData) => console.log("View user:", user.username),
	},
};

export const EmptyState: Story = {
	args: {
		users: [],
		selectedUsers: [],
		onToggleUserSelection: (userId: string) =>
			console.log("Toggle user:", userId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onViewUser: (user: UserData) => console.log("View user:", user.username),
	},
};
