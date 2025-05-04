import type { Story } from "@/app/v2/(stories)/types";
import createIdGenerator from "@/utils/id-utils";

const storyIdGenerator = new createIdGenerator(0, 0, 0, 0, 0, 0, 0);

export const storyData: Story[] = [
	{
		storyId: storyIdGenerator.generateStoryId(),
		sagaName: "Prologue",
		sagaDesc: "Prologue",
		backgroundMedia: "/image/touriiverse/story-page.png",
		mapImage: "/image/touriiverse/oita.png",
		isPrologue: true,
		isSelected: false,
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		sagaName: "Bungo\nOno",
		sagaDesc:
			"In the Touriiverse, Bungo Ono, steeped in Kojiki lore, whispers ancient tales. Here, amidst bamboo groves and Harajiri Falls, myth and nature intertwine, inviting explorers to a realm where legends thrive.",
		backgroundMedia: "/video/bungo-ono.mp4",
		mapImage: "/image/touriiverse/oita.png",
		isPrologue: false,
		isSelected: true, // Default selected story
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		sagaName: "Aomori",
		sagaDesc: "In the Touriiverse, Aomori, wrapped in mist and myth, whispers ancient tales. Here, among the orchards of Hirosaki Apple Park and the rising mists of Hakkōda Ropeway Sanroku, nature and legend entwine. Atop Mt. Hakkoda, spirits roam the winds, inviting explorers to a realm where folklore breathes.",
		mapImage: "/image/touriiverse/aomori.png",
		isPrologue: false,
		isSelected: false,
		backgroundMedia: "/image/world/Aomori.png",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		sagaName: "Tochigi",
		sagaDesc: "In the Touriiverse, Tochigi, steeped in sacred lore, whispers ancient tales. Here, beneath the golden eaves of Nikkō Tōshōgū and the crimson arch of Shinkyo Bridge, myth and nature intertwine. From the misty heights of Kegon Falls, spirits drift with the waters, inviting explorers to a realm where legends endure.",
		mapImage: "/image/touriiverse/tochigi.png",
		isPrologue: false,
		isSelected: false,
		backgroundMedia: "/image/world/Tochigi.png",
	},
	{
		storyId: storyIdGenerator.generateStoryId(),
		sagaName: "Coming Soon",
		sagaDesc: "More stories to be unveiled",
		backgroundMedia: "/image/touriiverse/yokai.png",
		mapImage: undefined,
		isPrologue: false,
		isSelected: false,
	},
];
