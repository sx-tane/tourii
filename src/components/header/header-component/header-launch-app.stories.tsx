import type { Meta, StoryObj } from "@storybook/react";
import HeaderApp from "./header-launch-app";

const meta = {
	title: "Header/HeaderApp",
	component: HeaderApp,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#ffffff" },
				{ name: "dark", value: "#1a1a1a" },
			],
		},
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-full max-w-7xl mx-auto">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof HeaderApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
	args: {
		theme: "white",
	},
	parameters: {
		backgrounds: { default: "light" },
	},
};

export const DarkTheme: Story = {
	args: {
		theme: "black",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};
