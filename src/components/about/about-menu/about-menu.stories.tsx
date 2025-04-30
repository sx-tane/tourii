import type { Meta, StoryObj } from "@storybook/react";
import AboutCoin from "./about-coin";
import AboutMenu from "./about-menu";

// AboutMenu Stories
const menuMeta = {
	title: "About/Menu/AboutMenu",
	component: AboutMenu,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AboutMenu>;

export default menuMeta;
type MenuStory = StoryObj<typeof AboutMenu>;

export const Default: MenuStory = {
	args: {
		onClose: () => console.log("Menu closed"),
	},
};

// AboutCoin Stories
const coinMeta = {
	title: "About/Menu/AboutCoin",
	component: AboutCoin,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AboutCoin>;

export const Coin: MenuStory = {
	parameters: {
		docs: {
			description: {
				story:
					"Hover over the coin to see the menu. The coin will flip to reveal the menu.",
			},
		},
	},
};

export const Mobile: MenuStory = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
		docs: {
			description: {
				story: "Mobile view of the about coin and menu.",
			},
		},
	},
};
