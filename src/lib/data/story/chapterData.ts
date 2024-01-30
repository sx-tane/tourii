import { type ChapterSelection, type Chapter } from "@/types/interfaceStory";

let numberPrologue = 0;
let numberChapter = 0;

function generatePrologueChapterId() {
  numberPrologue = numberPrologue + 1;
  return `prologueChapterId${numberPrologue}`;
}

function generateChapterId() {
  numberChapter = numberChapter + 1;
  return `chapterId${numberChapter}`;
}

export const prologueChapterData: Chapter = {
  chapterId: generatePrologueChapterId(),
  area: "Touriiverse",
  chapterNumber: "prologue",
  title: "The Arrival of the Heavenly Gods, Amatsukami",
  image: "/image/touriiverse/story-page.png",
  content:
    "In Takamagahara's celestial realm, ***Amaterasu***, the Sun Goddess, entrusts her grandson ***Ninigi*** with a crucial mission: to succeed ***Okuninushi*** as ruler of Ashihara no Nakatsukuni. With divine support and accompanied by the vibrant ***Ame-no-Uzume***, Ninigi embarks on his journey. However, the mystical Ame-no-ukihashi bridge, their chosen path, becomes the stage for a grave betrayal. ***Raijin***, the fierce Thunder Kami, disrupts their passage, sending Ninigi and Uzume tumbling into an unforeseen time and place. \r\rAwakening in ***2024***, they find themselves near a majestic waterfall, beneath a stark white torii gate, facing a mysterious figure with timeless knowledge. Stripped of their familiar companions, Ninigi and Uzume must adapt to a world where ancient traditions clash with modern realities. Confronted with new challenges and the cryptic intent of the mysterious figure, they stand ready to navigate this unknown era, their journey reshaping not just their destiny but the very fabric of ***time and myth***...",
};

export const bungoOnoChapterData: Chapter[] = [
  {
    chapterId: generateChapterId(),
    area: "Bungo Ono",
    chapterNumber: "Intro",
    title: "Bungo Ono, A Place Where Myth and Reality Merge",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    content:
      "In the mystical Touriiverse, Bungo Ono emerges as a land where ancient Japanese legends and ethereal beauty coalesce. Here, amidst the tranquil bamboo groves and the Harajiri Falls' majestic cascade, the city whispers tales of celestial beings and earthly spirits. This enchanting region, steeped in the ancient Kojiki's lore, invites seekers and dreamers to explore its hallowed grounds. In 2024, Bungo Ono stands as a testament to the harmonious blend of tradition and modernity, where time-honored customs and contemporary life intertwine seamlessly. Visitors are captivated by the city's cultural depth, from its legendary Manano Chojya to the mystical yokai that roam its landscapes. Every corner of Bungo Ono, from the Inazumi Underwater Limestone Cave to the vibrant Hakusan River, tells a story of time's passage and the enduring legacy of myth. Here, the past is not just remembered but vividly alive, inviting travelers to embark on a journey through a realm where myths are woven into the fabric of everyday life, reshaping our understanding of time and legend.",
  },
];

export const chapterSelectionData: ChapterSelection[] = [];
