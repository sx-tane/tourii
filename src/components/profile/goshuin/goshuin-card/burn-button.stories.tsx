import type { Meta, StoryObj } from "@storybook/react";
import BurnButton from "./burn-button";

const meta = {
    title: "Profile/Goshuin/BurnButton",
    component: BurnButton,
    parameters: {

        backgrounds: {
            default: "warmGrey",
            values: [
                {
                    name: "warmGrey",
                    value: "#F5F5F4",
                },
            ],
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof BurnButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        goshuinId: "GOSHUIN001",
        goshuinName: "Senso-ji Temple",
        goshuinRedeemDate: undefined,
        onRedeemSuccess: () => {
            console.log("Goshuin burned successfully");
        },
    },
};

export const WithRedeemDate: Story = {
    args: {
        goshuinId: "GOSHUIN001",
        goshuinName: "Senso-ji Temple",
        goshuinRedeemDate: "2024-03-20",
        onRedeemSuccess: () => {
            console.log("Goshuin burned successfully");
        },
    },
}; 