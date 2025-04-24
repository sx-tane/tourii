import type { CrewInfoProps } from "@/types/about-type";
import type { Meta, StoryObj } from "@storybook/react";
import CrewGrid from "./crew-grid";
import CrewMemberCard from "./crew-member-card";

// Default crew member for stories
const defaultCrewMember: CrewInfoProps = {
	name: "John Doe",
	title: "Lead Developer",
	description:
		"Experienced developer with a passion for blockchain technology and Japanese culture.",
	profileImage: "/image/about/crew/fc.jpg",
	twitterLink: "https://twitter.com/johndoe",
	twiiterHandle: "@johndoe",
};

// Mock data with proper image paths
const mockCrewMembers: CrewInfoProps[] = [
	defaultCrewMember,
	{
		name: "Jane Smith",
		title: "UX Designer",
		description:
			"Creative designer focused on building intuitive blockchain experiences.",
		profileImage: "/image/about/crew/fc.jpg",
		twitterLink: "https://twitter.com/janesmith",
		twiiterHandle: "@janesmith",
	},
];

// CrewMemberCard Stories
const cardMeta = {
	title: "About/Crew/CrewMemberCard",
	component: CrewMemberCard,
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
} satisfies Meta<typeof CrewMemberCard>;

export default cardMeta;
type CardStory = StoryObj<typeof CrewMemberCard>;

export const SingleCard: CardStory = {
	args: {
		crewMember: defaultCrewMember,
	},
};

export const WithLongDescription: CardStory = {
	args: {
		crewMember: {
			...defaultCrewMember,
			description:
				"Experienced developer with a passion for blockchain technology and Japanese culture. Leading the technical development of Tourii with a focus on creating immersive experiences that blend traditional storytelling with modern technology.",
		},
	},
};

// CrewGrid Stories
const gridMeta = {
	title: "About/Crew/CrewGrid",
	component: CrewGrid,
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
} satisfies Meta<typeof CrewGrid>;

type GridStory = StoryObj<typeof CrewGrid>;

export const Grid: GridStory = {
	args: {
		crewMember: defaultCrewMember,
	},
};

export const MobileGrid: GridStory = {
	args: {
		crewMember: defaultCrewMember,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
