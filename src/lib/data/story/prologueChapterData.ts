import { type Chapter } from "@/types/interfaceStory";

let number = 0;

function generatePrologueChapterId() {
  number = number + 1;
  return `prologueChapterId${number}`;
}

export const prologueChatperData: Chapter[] = [
  {
    chapterId: generatePrologueChapterId(),
    chapter: "chapter0",
    title: "Prologue",
    image: "/image/touriiverse/story-page.png",
    description:
      "The Touriiverse is a place where you can explore the world and learn about the culture and history of Japan. You can also collect stamps and stickers as you explore. Let's go on a journey to the Touriiverse!",
  },
];
