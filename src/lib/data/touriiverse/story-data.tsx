import type { Story } from "@/app/v2/(stories)/types";
import createIdGenerator from "@/utils/id-utils";


const storyIdGenerator = new createIdGenerator(0, 0, 0, 0, 0, 0, 0);

export const storyData: Story[] = [
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Prologue",
		backgroundImage: "/image/touriiverse/story-page.png",
		url: "prologue",
		isPrologue: true,
		isSelected: false,
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Bungo\nOno",
		backgroundImage: "/video/bungo-ono.mp4",
		description:
			"In the Touriiverse, Bungo Ono, steeped in Kojiki lore, whispers ancient tales. Here, amidst bamboo groves and Harajiri Falls, myth and nature intertwine, inviting explorers to a realm where legends thrive.",
		image: "/image/touriiverse/oita.png",
		url: "bungo-ono",
		chapterNumber: 4,
		isPrologue: false,
		isSelected: true, // Default selected story
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Aomori",
		backgroundImage: "/image/world/Aomori.png",
		description:
			"In the Touriiverse, Aomori, wrapped in mist and myth, whispers ancient tales. Here, among the orchards of Hirosaki Apple Park and the rising mists of Hakkōda Ropeway Sanroku, nature and legend entwine. Atop Mt. Hakkoda, spirits roam the winds, inviting explorers to a realm where folklore breathes.",
		image: "/image/touriiverse/aomori.png",
		url: "aomori",
		chapterNumber: 8,
		isPrologue: false,
		isSelected: false,
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Tochigi",
		backgroundImage: "/image/world/Tochigi.png",
		description:
			"In the Touriiverse, Tochigi, steeped in sacred lore, whispers ancient tales. Here, beneath the golden eaves of Nikkō Tōshōgū and the crimson arch of Shinkyo Bridge, myth and nature intertwine. From the misty heights of Kegon Falls, spirits drift with the waters, inviting explorers to a realm where legends endure.",
		image: "/image/touriiverse/tochigi.png",
		url: "tochigi",
		chapterNumber: 8,
		isPrologue: false,
		isSelected: false,
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		title: "Coming Soon",
		backgroundImage: "/image/touriiverse/yokai.png",
		isPrologue: false,
		isSelected: false,
	},
];
