import { setChapterDetails } from "@/lib/redux/features/chapter/chapter-slice";
import { store } from "@/lib/redux/store";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { StampedItemSection } from "./stamped-item-section";

// Initialize the store with some data
store.dispatch(
	setChapterDetails({
		chapterNumber: "Chapter Three",
		storyTitle: "The Lantern Festival",
		imageUrl: "/image/touriiverse/bungo-ono/chapter3.png",
	}),
);

const meta = {
	title: "Homepage/StampedItemSection",
	component: StampedItemSection,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "warmGrey",
			values: [{ name: "warmGrey", value: "#f5f5f5" }],
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
} satisfies Meta<typeof StampedItemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
