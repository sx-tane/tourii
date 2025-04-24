import type { Meta, StoryObj } from "@storybook/react";
import ExperienceModal from "./experience-modal";

const meta = {
	title: "About/TouriiEcosystem/ExperienceModal",
	component: ExperienceModal,
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
	argTypes: {
		onClose: { action: "modal closed" },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ExperienceModal>;

export default meta;
type Story = StoryObj<typeof ExperienceModal>;

export const OffchainExperience: Story = {
	args: {
		isOpen: true,
		data: "Offchain Experience",
	},
};

export const OnchainExperience: Story = {
	args: {
		isOpen: true,
		data: "Onchain Experience",
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		data: "Offchain Experience",
	},
};

export const MobileOffchain: Story = {
	args: {
		isOpen: true,
		data: "Offchain Experience",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const MobileOnchain: Story = {
	args: {
		isOpen: true,
		data: "Onchain Experience",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
