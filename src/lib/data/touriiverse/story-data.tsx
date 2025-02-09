import type { Story, StorySelection } from "@/types/story-type";
import { prologueChapterData } from "./chapter-data";
import createIdGenerator from "@/utils/id-utils";

const defaultBackgroundImage = "/image/touriiverse/story-page.png";

const storyIdGenerator = new createIdGenerator(0, 0, 0, 0, 0, 0, 0);

export const storyData: Story[] = [
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Prologue",
		backgroundImage: defaultBackgroundImage,
		chapter: prologueChapterData,
		url: "prologue",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Bungo\nOno",
		backgroundImage: "/video/bungo-ono.mp4",
		description:
			"In the Touriiverse, Bungo Ono, steeped in Kojiki lore, whispers ancient tales. Here, amidst bamboo groves and Harajiri Falls, myth and nature intertwine, inviting explorers to a realm where legends thrive.",
		image: "/image/touriiverse/oita.svg",
		url: "bungo-ono",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Coming Soon",
		backgroundImage: "/image/touriiverse/yokai.png",
	},
	// {
	//   storyId: storyIdGenerator.generateStoryId(),
	//   title: "Coming Soon",
	//   backgroundImage: "/image/touriiverse/coming-soon.png",
	// },
];

export const storySelectionData: StorySelection[] = [
	{
		title: "Prologue",
		selectedStoryId: storyData[0]?.storyId,
		isSelected: false,
		isPrologue: true,
	},
	{
		title: "Bungo Ono",
		selectedStoryId: storyData[1]?.storyId,
		chapterNumber: 35,
		isSelected: false,
		isPrologue: false,
	},
	{
		title: "Coming Soon",
		selectedStoryId: storyData[2]?.storyId,
		isSelected: false,
		isPrologue: false,
	},
	// {
	//   title: "Coming Soon",
	//   selecedStoryId: storyData[3]?.storyId,
	//   isSelected: false,
	//   isPrologue: false,
	// },
];
