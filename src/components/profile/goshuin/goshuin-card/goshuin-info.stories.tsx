import type { Meta, StoryObj } from "@storybook/react";
import GoshuinInfo from "./goshuin-info";
import type { TravelGoshuin } from "@/types/profile-type";

const meta = {
    title: "Profile/Goshuin/GoshuinInfo",
    component: GoshuinInfo,
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
} satisfies Meta<typeof GoshuinInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockGoshuin: TravelGoshuin = {
    goshuinId: "GOSHUIN001",
    goshuinName: "Senso-ji Temple",
    goshuinLocation: "Asakusa, Tokyo",
    goshuinDescription: "A historic temple in the heart of Tokyo, Senso-ji is the city's oldest Buddhist temple and one of its most significant. The temple was completed in 645 CE and is dedicated to Kannon, the goddess of mercy.",
    goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
    goshuinDate: "2024-03-15",
    goshuinExpiryDate: "2025-03-15",
    perksImage: "/image/profile/goshuin/perks/perks1.jpg",
    redeemed: false,
    goshuinRedeemDate: ""
};

export const Default: Story = {
    args: {
        goshuin: mockGoshuin,
    },
};

export const Redeemed: Story = {
    args: {
        goshuin: {
            ...mockGoshuin,
            redeemed: true,
            goshuinRedeemDate: "2024-03-20",
        },
    },
};

export const NoGoshuin: Story = {
    args: {
        goshuin: undefined,
    },
}; 