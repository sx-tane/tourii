import type { Meta, StoryObj } from "@storybook/react";
import ExperienceDetail from "./experience-detail";

const mockExperienceData = [
	{
		number: 1,
		title: "Community Building",
		description:
			"Build and nurture a vibrant community around Tourii, fostering engagement and collaboration among members.",
		image: "/image/about/experience/kojiki-item.png",
	},
	{
		number: 2,
		title: "Governance",
		description:
			"Implement decentralized governance mechanisms that allow community members to participate in decision-making.",
		image: "/image/about/experience/kojiki-item.png",
	},
	{
		number: 3,
		title: "Rewards",
		description:
			"Create an engaging rewards system that incentivizes active participation and contribution to the ecosystem.",
		image: "/image/about/experience/kojiki-item.png",
	},
];

const meta = {
	title: "About/TouriiEcosystem/ExperienceDetail",
	component: ExperienceDetail,
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
} satisfies Meta<typeof ExperienceDetail>;

export default meta;
type Story = StoryObj<typeof ExperienceDetail>;

export const FirstExperience: Story = {
	args: {
		number: 1,
		data: mockExperienceData,
	},
};

export const SecondExperience: Story = {
	args: {
		number: 2,
		data: mockExperienceData,
	},
};

export const Mobile: Story = {
	args: {
		number: 1,
		data: mockExperienceData,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const WithKeyboardNavigation: Story = {
	args: {
		number: 1,
		data: mockExperienceData,
	},
	parameters: {
		docs: {
			description: {
				story: "Use left and right arrow keys to navigate between experiences.",
			},
		},
	},
};
