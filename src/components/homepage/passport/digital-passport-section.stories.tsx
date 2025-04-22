import type { Meta, StoryObj } from "@storybook/react";
import { DigitalPassportSection } from "./digital-passport-section";
import { Provider } from "react-redux";
import {
	setPassportType,
	setUserAvatar,
	setChineseCharacters,
} from "@/lib/redux/features/passport/passport-slice";
import { store } from "@/lib/redux/store";

// Initialize the store with sample passport data
store.dispatch(setPassportType("BONJIN"));
store.dispatch(setUserAvatar("/image/profile/nft/19.png"));
store.dispatch(setChineseCharacters(["天", "津", "神"]));

const meta = {
	title: "Homepage/Passport/DigitalPassportSection",
	component: DigitalPassportSection,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof DigitalPassportSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
