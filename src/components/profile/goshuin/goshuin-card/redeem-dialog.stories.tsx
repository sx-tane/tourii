import type { Meta, StoryObj } from "@storybook/react";
import RedeemDialog from "./redeem-dialog";

const meta = {
    title: "Profile/Goshuin/RedeemDialog",
    component: RedeemDialog,
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
} satisfies Meta<typeof RedeemDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        goshuinId: "GOSHUIN001",
        goshuinName: "Senso-ji Temple",
        goshuinRedeemDate: undefined,
        onRedeemSuccess: () => {
            console.log("Goshuin redeemed successfully");
        },
    },
};

export const AlreadyRedeemed: Story = {
    args: {
        goshuinId: "GOSHUIN001",
        goshuinName: "Senso-ji Temple",
        goshuinRedeemDate: "2024-03-20",
        onRedeemSuccess: () => {
            console.log("Goshuin redeemed successfully");
        },
    },
}; 