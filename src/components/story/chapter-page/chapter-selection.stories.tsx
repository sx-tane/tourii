import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import ChapterSelectionComponent from "./chapter-selection";
// Remove old type/data imports
// import type { Chapter, ChapterSelection, ChapterSelectionProps } from "@/types/story-type";
// import { bungoOnoChapterData } from "@/lib/data/touriiverse/chapter-data";

// Define the new item type expected by the component
// (Could also import if defined centrally, but defining locally for clarity)
interface ChapterSelectionItem {
	storyChapterId: string;
	isSelected: boolean;
	chapterNumber: string;
	chapterTitle: string;
}

const meta = {
	title: "Story/Chapter/ChapterSelection",
	component: ChapterSelectionComponent,
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#E3E3DC", // warmGrey2 color used in component
				},
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ChapterSelectionComponent>;

// Create mock data using the new ChapterSelectionItem structure
const mockSelectionData: ChapterSelectionItem[] = [
	{
		storyChapterId: "chapter-1",
		isSelected: true,
		chapterNumber: "Chapter 1",
		chapterTitle: "The Whispering Falls",
	},
	{
		storyChapterId: "chapter-2",
		isSelected: false,
		chapterNumber: "Chapter 2",
		chapterTitle: "Shrine of Secrets",
	},
	{
		storyChapterId: "chapter-3",
		isSelected: false,
		chapterNumber: "Chapter 3",
		chapterTitle: "Path of the Stone Buddha",
	},
];

// Create single chapter data safely
const firstChapter = mockSelectionData[0];
const singleChapterData: ChapterSelectionItem[] = firstChapter
	? [firstChapter]
	: [];

type Story = StoryObj<typeof ChapterSelectionComponent>;

export default meta;

// Story component with ref handling (ref is still needed by the component)
const Template: Story["render"] = (args) => {
	const selectedButtonRef = useRef<HTMLDivElement>(null);
	// Ensure args type matches component props if needed, though StoryObj often infers it
	return (
		<ChapterSelectionComponent
			{...args}
			selectedButtonRef={selectedButtonRef}
		/>
	);
};

export const MultipleChapters: Story = {
	render: Template,
	args: {
		placeName: "Bungo Ono",
		// Pass the new mock data structure
		selectionData: mockSelectionData,
		handleSelectChapter: (selectedChapterId: string) => {
			console.log("Selected chapter:", selectedChapterId);
		},
	},
};

export const SingleChapter: Story = {
	render: Template,
	args: {
		placeName: "Harajiri Fall",
		// Pass the new mock data structure
		selectionData: singleChapterData,
		handleSelectChapter: (selectedChapterId: string) => {
			console.log("Selected chapter:", selectedChapterId);
		},
	},
};

export const LongPlaceName: Story = {
	render: Template,
	args: {
		placeName: "Ninomiya Hachiman Shrine Historical Site",
		// Pass the new mock data structure
		selectionData: mockSelectionData,
		handleSelectChapter: (selectedChapterId: string) => {
			console.log("Selected chapter:", selectedChapterId);
		},
	},
};
