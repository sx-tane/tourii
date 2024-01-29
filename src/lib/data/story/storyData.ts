import { type StorySelection, type Story } from "@/types/interfaceStory";

let number = 0;

function generateStoryId() {
  number = number + 1;
  return `storyId${number}`;
}

export const storyData: Story[] = [
  {
    storyId: generateStoryId(),
    title: "Prologue",
  },
  {
    storyId: generateStoryId(),
    title: "Bungo Ono",
    description:
      "In the realm of the Touriiverse, Bungo Ono emerges as a mystical land, cradled in the heart of Oita Prefecture, where ancient tales and natural splendor intertwine. This enchanting city, steeped in the lore of the Kojiki, whispers stories of legendary beings and ethereal spirits, inviting seekers and dreamers to wander its sacred grounds. Here, amidst the whispering bamboo groves and cascading waterfalls like the majestic Harajiri, the spirits of the past resonate through time. The land is blessed with nature's bounty, offering delicacies like the renowned Bungo beef, the tangy sweetness of Kabosu citrus, and the enchanting Sweet Potato Soft Serve Ice Cream, each a testament to the city's harmonious blend of the earthly and the divine. Bungo Ono, in the heart of the Touriiverse, is a portal to an era where myths come alive, beckoning travelers to delve into a tapestry of stories woven from the threads of ancient Japanese mythos and the unspoiled beauty of nature.",
    image: "/image/touriiverse/oita.svg",
  },
  {
    storyId: generateStoryId(),
    title: "Coming Soon",
  },
  {
    storyId: generateStoryId(),
    title: "Coming Soon",
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
