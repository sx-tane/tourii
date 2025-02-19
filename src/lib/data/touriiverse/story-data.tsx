import type { Story, StorySelection } from "@/types/story-type";
import createIdGenerator from "@/utils/id-utils";
import { prologueChapterData } from "./chapter-data";

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
		image: "/image/touriiverse/oita.png",
		url: "bungo-ono",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Aomori",
		backgroundImage: "/image/world/Aomori.png",
		description:
			"In the Touriiverse, Aomori, wrapped in mist and myth, whispers ancient tales. Here, among the orchards of Hirosaki Apple Park and the rising mists of Hakkōda Ropeway Sanroku, nature and legend entwine. Atop Mt. Hakkoda, spirits roam the winds, inviting explorers to a realm where folklore breathes.",
		image: "/image/touriiverse/aomori.png",
		url: "aomori",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Tochigi",
		backgroundImage: "/image/world/Tochigi.png",
		description:
			"In the Touriiverse, Tochigi, steeped in sacred lore, whispers ancient tales. Here, beneath the golden eaves of Nikkō Tōshōgū and the crimson arch of Shinkyo Bridge, myth and nature intertwine. From the misty heights of Kegon Falls, spirits drift with the waters, inviting explorers to a realm where legends endure.",
		image: "/image/touriiverse/tochigi.png",
		url: "tochigi",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Coming Soon",
		backgroundImage: "/image/touriiverse/yokai.png",
	},
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
		chapterNumber: 3,
		isSelected: false,
		isPrologue: false,
	},
	{
		title: "Aomori",
		selectedStoryId: storyData[2]?.storyId,
		chapterNumber: 8,
		isSelected: false,
		isPrologue: false,
	},
	{
		title: "Tochigi",
		selectedStoryId: storyData[3]?.storyId,
		chapterNumber: 8,
		isSelected: false,
		isPrologue: false,
	},
	{
		title: "Coming Soon",
		selectedStoryId: storyData[4]?.storyId,
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
