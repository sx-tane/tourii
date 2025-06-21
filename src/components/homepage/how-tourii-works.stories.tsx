import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { HowTouriiWorksComponent } from "./how-tourii-works";

const meta = {
	title: "Homepage/HowTouriiWorks",
	component: HowTouriiWorksComponent,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof HowTouriiWorksComponent>;

export default meta;
type Story = StoryObj<typeof HowTouriiWorksComponent>;

const sections = [
	{
		title: "STEP 1",
		subtitle: "DISCOVER",
		description: "Find your perfect destination",
		image: "/images/discover.jpg",
	},
	{
		title: "STEP 2",
		subtitle: "PLAN",
		description: "Create your itinerary",
		image: "/images/plan.jpg",
	},
	{
		title: "STEP 3",
		subtitle: "EXPLORE",
		description: "Experience your journey",
		image: "/images/explore.jpg",
	},
];

const HowTouriiWorksWrapper = () => {
	const [currentImage, setCurrentImage] = useState(sections[0]?.image || "");
	const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

	return (
		<HowTouriiWorksComponent
			sections={sections}
			currentImage={currentImage}
			setCurrentImage={setCurrentImage}
			sectionRefs={sectionRefs}
		/>
	);
};

export const Default: Story = {
	render: () => <HowTouriiWorksWrapper />,
	args: {}, // Empty args since we're using render function
};
