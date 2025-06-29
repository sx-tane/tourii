import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InterestSelector from "./interest-selector";

const meta: Meta<typeof InterestSelector> = {
	title: "AI Route Discovery/InterestSelector",
	component: InterestSelector,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
The InterestSelector component allows users to select interests/hashtags for AI-powered route discovery.

**Features:**
- Categorized hashtag display (Culture, Food, Nature, etc.)
- Interactive selection with visual feedback
- Selection limit enforcement
- Progress tracking
- Responsive design
- Count display for each hashtag
- Loading and empty states
				`,
			},
		},
	},
	argTypes: {
		onInterestsChange: { action: "interests changed" },
		maxSelections: { control: { type: "number", min: 1, max: 20 } },
		isLoading: { control: "boolean" },
		region: { control: "text" },
	},
};

export default meta;
type Story = StoryObj<typeof InterestSelector>;

// Mock hashtag data
const mockHashtags = [
	{ hashtag: "culture", count: 25 },
	{ hashtag: "food", count: 32 },
	{ hashtag: "nature", count: 18 },
	{ hashtag: "temple", count: 15 },
	{ hashtag: "anime", count: 12 },
	{ hashtag: "shopping", count: 28 },
	{ hashtag: "traditional", count: 22 },
	{ hashtag: "hotspring", count: 14 },
	{ hashtag: "mountain", count: 19 },
	{ hashtag: "festival", count: 16 },
	{ hashtag: "art", count: 13 },
	{ hashtag: "history", count: 21 },
	{ hashtag: "outdoor", count: 17 },
	{ hashtag: "shrine", count: 24 },
	{ hashtag: "cuisine", count: 29 },
	{ hashtag: "scenic", count: 20 },
	{ hashtag: "urban", count: 11 },
	{ hashtag: "spiritual", count: 9 },
	{ hashtag: "modern", count: 8 },
	{ hashtag: "peaceful", count: 7 },
];

// Interactive wrapper for stories
const InteractiveWrapper = ({ initialSelectedInterests = [], ...props }: any) => {
	const [selectedInterests, setSelectedInterests] = useState<string[]>(initialSelectedInterests);

	return (
		<InterestSelector
			{...props}
			selectedInterests={selectedInterests}
			onInterestsChange={setSelectedInterests}
		/>
	);
};

export const Default: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: mockHashtags,
		maxSelections: 10,
		region: "Tokyo",
	},
};

export const WithPreselectedInterests: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: mockHashtags,
		maxSelections: 10,
		region: "Kyoto",
		// Using regular selectedInterests prop instead of initialSelectedInterests
	},
};

export const LimitedSelections: Story = {
	render: (args) => <InteractiveWrapper initialSelectedInterests={["food", "culture"]} {...args} />,
	args: {
		hashtags: mockHashtags,
		maxSelections: 5,
		region: "Osaka",
	},
};

export const Loading: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: [],
		isLoading: true,
		region: "Tokyo",
	},
};

export const EmptyState: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: [],
		isLoading: false,
		region: "Remote Area",
	},
};

export const FewHashtags: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: mockHashtags.slice(0, 6),
		maxSelections: 10,
		region: "Rural Prefecture",
	},
};

export const ManyHashtags: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		hashtags: [
			...mockHashtags,
			{ hashtag: "technology", count: 15 },
			{ hashtag: "nightlife", count: 12 },
			{ hashtag: "museum", count: 18 },
			{ hashtag: "park", count: 22 },
			{ hashtag: "beach", count: 8 },
			{ hashtag: "lake", count: 6 },
			{ hashtag: "forest", count: 14 },
			{ hashtag: "meditation", count: 5 },
			{ hashtag: "wellness", count: 7 },
			{ hashtag: "architecture", count: 13 },
		],
		maxSelections: 15,
		region: "Metropolitan Area",
	},
};