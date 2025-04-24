import type { Meta, StoryObj } from "@storybook/react";
import HeaderList from "./header-list";

const meta = {
	title: "Header/HeaderList",
	component: HeaderList,
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
	argTypes: {
		theme: {
			control: "radio",
			options: ["black", "white"],
			description: "Theme of the header list",
		},
		textColor: {
			control: "text",
			description: "Color of the text",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-4xl mx-auto p-8">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof HeaderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
	args: {
		theme: "white",
		textColor: "charcoal",
	},
	parameters: {
		backgrounds: { default: "light" },
	},
};

export const DarkTheme: Story = {
	args: {
		theme: "black",
		textColor: "warmGrey3",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const ActiveState: Story = {
	args: {
		theme: "white",
		textColor: "charcoal",
	},
	parameters: {
		nextjs: {
			navigation: {
				pathname: "/about",
			},
		},
	},
};
