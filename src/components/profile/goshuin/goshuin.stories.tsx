import type { Meta, StoryObj } from "@storybook/react";
import Goshuin from "./goshuin";
import type { TravelGoshuin } from "@/types/profile-type";

const meta = {
    title: "Profile/Goshuin/Goshuin",
    component: Goshuin,
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
} satisfies Meta<typeof Goshuin>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockGoshuin: TravelGoshuin = {
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
};

export const Default: Story = {
    args: {
        goshuin: mockGoshuin,
    },
};

export const WithHoverCard: Story = {
    args: {
        goshuin: mockGoshuin,
    },
    parameters: {
        docs: {
            description: {
                story: "Shows the Goshuin with hover card interaction. Hover over the Goshuin to see details.",
            },
        },
    },
}; 