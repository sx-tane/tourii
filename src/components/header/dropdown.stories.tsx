import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./dropdown";

const meta = {
	title: "Header/Dropdown",
	component: Dropdown,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		isOpen: {
			control: "boolean",
			description: "Controls the visibility of the dropdown",
		},
		backgroundColor: {
			control: "text",
			description: "Background color class from Tailwind",
		},
		textColor: {
			control: "text",
			description: "Text color class from Tailwind",
		},
	},
	decorators: [
		(Story) => (
			<div className="relative w-64">
				<div className="mb-2 p-2 bg-gray-200 rounded">
					Trigger Button (For Context)
				</div>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		backgroundColor: "white",
		textColor: "gray-800",
		items: [
			{ href: "/about", label: "About Us" },
			{ href: "/contact", label: "Contact" },
			{ href: "/faq", label: "FAQ" },
		],
	},
};

export const DarkTheme: Story = {
	args: {
		isOpen: true,
		backgroundColor: "gray-800",
		textColor: "white",
		items: [
			{ href: "/profile", label: "My Profile" },
			{ href: "/settings", label: "Settings" },
			{ href: "/logout", label: "Sign Out" },
		],
	},
};

export const SingleItem: Story = {
	args: {
		isOpen: true,
		backgroundColor: "white",
		textColor: "gray-800",
		items: [{ href: "/notifications", label: "View All Notifications" }],
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		backgroundColor: "white",
		textColor: "gray-800",
		items: [
			{ href: "/about", label: "About Us" },
			{ href: "/contact", label: "Contact" },
		],
	},
};
