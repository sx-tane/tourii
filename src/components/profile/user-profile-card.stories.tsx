import type { UserProfile } from "@/types/profile-type";
import type { Meta, StoryObj } from "@storybook/react";
import UserProfileCard from "./user-profile-card";

const meta = {
	title: "Profile/UserProfileCard",
	component: UserProfileCard,
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
} satisfies Meta<typeof UserProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUserProfile: UserProfile = {
	userId: "user1",
	userName: "John Doe",
	name: "John Smith",
	residingCity: "Tokyo, Japan",
	dateOfBirth: "1990-01-01",
	email: "john.doe@example.com",
	profileImage: "/image/profile/nft/100.png",
	travelGoshuin: [],
	nft: [],
};

export const Default: Story = {
	args: {
		userProfile: mockUserProfile,
	},
};

export const WithLongUserName: Story = {
	args: {
		userProfile: {
			...mockUserProfile,
			userName: "Dr. Jonathan Smith-Williams III",
			name: "Jonathan Alexander Smith-Williams",
		},
	},
};

export const WithLongLocation: Story = {
	args: {
		userProfile: {
			...mockUserProfile,
			residingCity: "Shibuya District, Tokyo Metropolitan Area, Japan",
		},
	},
};
