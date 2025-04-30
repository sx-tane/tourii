import type {
	StorySelectionButtonProps,
	StorySelectionListProps,
} from "@/app/v2/(stories)/types";
import type { Meta, StoryObj } from "@storybook/react";
import StorySelectionButton from "./story-selection-button";
import StorySelectionList from "./story-selection-list";

const mockSelections = [
	{
		selectedStoryId: "1",
		title: "Tales of Yomi",
		chapterNumber: 3,
		isSelected: true,
		isPrologue: false,
	},
	{
		selectedStoryId: "2",
		title: "Tales of Kappa",
		chapterNumber: 4,
		isSelected: false,
		isPrologue: false,
	},
	{
		selectedStoryId: "3",
		title: "Coming Soon",
		isSelected: false,
		isPrologue: false,
	},
];

const meta = {
	title: "Story/StorySelection",
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
} satisfies Meta;

export default meta;

// StorySelectionButton Stories
type ButtonStory = StoryObj<typeof StorySelectionButton>;

export const SingleButton: ButtonStory = {
	render: () => (
		<StorySelectionButton
			selection={mockSelections[0] as StorySelectionButtonProps["selection"]}
			onSelect={(id) => console.log("Selected:", id)}
		/>
	),
};

export const ComingSoonButton: ButtonStory = {
	render: () => (
		<StorySelectionButton
			selection={mockSelections[2] as StorySelectionButtonProps["selection"]}
			onSelect={(id) => console.log("Selected:", id)}
		/>
	),
};

// StorySelectionList Stories
type ListStory = StoryObj<typeof StorySelectionList>;

export const FullList: ListStory = {
	render: () => (
		<div className="w-full max-w-4xl">
			<StorySelectionList
				selectionData={mockSelections}
				onSelect={(id) => console.log("Selected:", id)}
			/>
		</div>
	),
};

export const MobileList: ListStory = {
	render: () => (
		<div className="w-full max-w-lg">
			<StorySelectionList
				selectionData={mockSelections}
				onSelect={(id) => console.log("Selected:", id)}
			/>
		</div>
	),
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
