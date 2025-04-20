import type { Meta, StoryObj } from "@storybook/react";
import TravelGoshuinCollection from "./travel-goshuin-collection";
import type { UserProfile } from "@/types/profile-type";

const meta = {
    title: "Profile/Goshuin/TravelGoshuinCollection",
    component: TravelGoshuinCollection,
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
} satisfies Meta<typeof TravelGoshuinCollection>;

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
    travelGoshuin: [
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
            goshuinRedeemDate: ""
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
            goshuinRedeemDate: ""
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
            goshuinRedeemDate: "2024-03-18"
        }
    ],
    nft: []
};

const emptyUserProfile: UserProfile = {
    ...mockUserProfile,
    travelGoshuin: []
};

export const WithGoshuins: Story = {
    args: {
        userProfile: mockUserProfile,
    },
};

export const EmptyCollection: Story = {
    args: {
        userProfile: emptyUserProfile,
    },
}; 