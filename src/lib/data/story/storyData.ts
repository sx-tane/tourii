import { type StorySelection, type Story } from "@/types/interfaceStory";
import { prologueChatperData } from "./prologueChapterData";

let number = 0;

const defaultBackgroundImage = "/image/touriiverse/story-page.png";

function generateStoryId() {
  number = number + 1;
  return `storyId${number}`;
}

export const storyData: Story[] = [
  {
    storyId: generateStoryId(),
    title: "Prologue",
    backgroundImage: defaultBackgroundImage,
    chapter: prologueChatperData,
  },
  {
    storyId: generateStoryId(),
    title: "Bungo\nOno",
    backgroundImage: "/video/bungo-ono.mp4",
    description:
      "In the Touriiverse, Bungo Ono, steeped in Kojiki lore, whispers ancient tales. Here, amidst bamboo groves and Harajiri Falls, myth and nature intertwine, inviting explorers to a realm where legends thrive.",
    image: "/image/touriiverse/oita.svg",
  },
  {
    storyId: generateStoryId(),
    title: "Coming Soon",
    backgroundImage: "/image/touriiverse/yokai.png",
  },
  {
    storyId: generateStoryId(),
    title: "Coming Soon",
    backgroundImage: "/image/touriiverse/coming-soon.png",
  },
];

export const storySelectionData: StorySelection[] = [
  {
    title: "Prologue",
    selecedStoryId: storyData[0]?.storyId,
    isSelected: false,
    isPrologue: true,
  },
  {
    title: "Bungo Ono",
    selecedStoryId: storyData[1]?.storyId,
    chapterNumber: 10,
    isSelected: false,
    isPrologue: false,
  },
  {
    title: "Coming Soon",
    selecedStoryId: storyData[2]?.storyId,
    isSelected: false,
    isPrologue: false,
  },
  {
    title: "Coming Soon",
    selecedStoryId: storyData[3]?.storyId,
    isSelected: false,
    isPrologue: false,
  },
];
