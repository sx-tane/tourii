import type { Meta, StoryObj } from "@storybook/react";
import Description, {
	DescriptionWithImages,
	DescriptionWithImage,
	DescriptionStory,
	DescriptionCharacter,
} from "./description";

const meta = {
	title: "About/Description",
	component: Description,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof Description>;

// Basic Description
export const Basic: Story = {
	args: {
		smallTitle: "Welcome to",
		title: "Tourii",
		content:
			"A journey through Japanese mythology and folklore, where ancient tales come to life in a modern setting.",
	},
};

// Description with Multiple Images
export const WithImages: Story = {
	render: (args) => <DescriptionWithImages {...args} />,
	args: {
		smallTitle: "Meet Our",
		title: "Team",
		content:
			"The creative minds behind Tourii, bringing Japanese mythology to life.",
		images: [
			"/image/about/crew/fc.jpg",
			"/image/about/crew/sx.jpg",
			"/image/about/crew/yolk.jpg",
		],
	},
};

// Description with Single Image
export const WithSingleImage: Story = {
	render: (args) => <DescriptionWithImage {...args} />,
	args: {
		smallTitle: "Discover",
		title: "Our World",
		content:
			"Immerse yourself in a beautifully crafted world where tradition meets innovation.",
		images: ["/image/world/earth.png", "/image/world/heaven.png"],
	},
};

// Story Description
export const Story: Story = {
	render: (args) => <DescriptionStory {...args} />,
	args: {
		smallTitle: "Chapter 1",
		title: "The Beginning",
		content: "In the age of gods, when heaven and earth were still young...",
	},
};

// Character Description
export const Character: Story = {
	render: (args) => <DescriptionCharacter {...args} />,
	args: {
		title: "Amaterasu",
		smallTitle: "The Sun Goddess",
		content:
			"Ruler of the heavenly plains, bringer of light and life to the world.",
	},
};

// Mobile Variants
export const MobileBasic: Story = {
	...Basic,
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const MobileWithImages: Story = {
	...WithImages,
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
