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
  part: 0,
  area: "Touriiverse",
  chapterNumber: "prologue",
  title: "The Arrival of the Heavenly Gods, Amatsukami",
  image: "/image/touriiverse/story-page.png",
  content:
    "In Takamagahara's celestial realm, ***Amaterasu***, the Sun Goddess, entrusts her grandson ***Ninigi*** with a crucial mission: to succeed ***Okuninushi*** as ruler of Ashihara no Nakatsukuni. With divine support and accompanied by the vibrant ***Ame-no-Uzume***, Ninigi embarks on his journey. However, the mystical Ame-no-ukihashi bridge, their chosen path, becomes the stage for a grave betrayal. ***Raijin***, the fierce Thunder Kami, disrupts their passage, sending Ninigi and Uzume tumbling into an unforeseen time and place. \r\rAwakening in ***2024***, they find themselves near a majestic waterfall, beneath a stark white torii gate, facing a mysterious figure with timeless knowledge. Stripped of their familiar companions, Ninigi and Uzume must adapt to a world where ancient traditions clash with modern realities. Confronted with new challenges and the cryptic intent of the mysterious figure, they stand ready to navigate this unknown era, their journey reshaping not just their destiny but the very fabric of ***time and myth***...",
};

const bungoOnoArea = "Bungo Ono";

export const bungoOnoChapterData: Chapter[] = [
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    chapterNumber: "Intro",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Bungo Ono, A Place Where Myth and Reality Merge",
    content:
      "In the mystical Touriiverse, Bungo Ono emerges as a land where ancient Japanese legends and ethereal beauty coalesce. Here, amidst the tranquil bamboo groves and the Harajiri Falls' majestic cascade, the city whispers tales of celestial beings and earthly spirits. This enchanting region, steeped in the ancient Kojiki's lore, invites seekers and dreamers to explore its hallowed grounds. In 2024, Bungo Ono stands as a testament to the harmonious blend of tradition and modernity, where time-honored customs and contemporary life intertwine seamlessly. Visitors are captivated by the city's cultural depth, from its legendary Manano Chojya to the mystical yokai that roam its landscapes. Every corner of Bungo Ono, from the Inazumi Underwater Limestone Cave to the vibrant Hakusan River, tells a story of time's passage and the enduring legacy of myth. Here, the past is not just remembered but vividly alive, inviting travelers to embark on a journey through a realm where myths are woven into the fabric of everyday life, reshaping our understanding of time and legend.",
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Harajiri Falls",
    chapterNumber: "Chapter 1",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Harajiri Falls & Komatsu Fire Festival",
    content:
      "In 2024, Ninigi and his party awaken at Harajiri Falls, meeting Sarutahiko who has awaited them for over a thousand years. They find themselves amidst the Komatsu Fire Festival, a local ritual for good harvests and protection against evil spirits, now overshadowed by a severe drought destroying half of Ogata's rice crops. The reason for this calamity is unknown, but the people's strong will has created a divine aura at the falls, drawing Sarutahiko from hiding. He reveals his mission to assist Ninigi in claiming rulership of Ashihara no Nakatsukuni, as instructed by Amaterasu. However, the fading human belief in kami has led to the disappearance of Okuninushi and Kunitsukami and weakened Sarutahiko, who has expended his remaining power for this crucial encounter with Ninigi.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: true,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Ichinomiya Hachiman Shrine",
    chapterNumber: "Chapter 2",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Ichinomiya Hachiman Shrine",
    content:
      "Sarutahiko, concerned about their safety, leads the group to the Ichinomiya Hachiman Shrine. He warns that their divine aura might attract malevolent corrupted Kunitsukami or Yokai, who might regain power from his presence. The shrine, dedicated to the great Hachiman, a kunitsukami protector of farmers, fishermen, and warriors, represents the syncretism of Shinto and Buddhism.\r\rSarutahiko reveals that many Kunitsukami have become corrupt, resorting to violence for survival, with only a few still revered and maintaining peace. Bungo Ono, where they've descended, is unique for its harmonious blend of Shintoism and Buddhism, and located away from the main stream cities, is often overlooked by powerful beings.\r\rSuddenly, Sarutahiko collapses, weakened. Ninigi inquires how to restore his strength. Sarutahiko suggests seeking the great Dainichi Nyorai at the Miyazaki East and West Stone Carved Buddha Cliff. Dainichi Nyorai, the chief deity in Shingon Buddhism, symbolizes a life force akin to the sun, similar to Amaterasu. His audience might reveal why Ninigi was sent to 2024 and how he could return, while potentially healing Sarutahiko.\r\rHow do we get there Ninigi would ask. Take my CAR Sarutahiko said. CAR? Ninigi inquire. Ninigi will learn about the various transportation the modern Bonjin uses.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    placeName: "Miyazaki East and West Stone Carved Buddha Cliff",
    part: 1,
    area: bungoOnoArea,
    chapterNumber: "Chapter 3",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Miyazaki East and West Stone Carved Buddha",
    content:
      "At the East Cliff, Ninigi's group met with Daichi Nyorai's protectors, who revealed the existence of three temporal buddhas. The present buddha, healer Yakushi Nyorai, was away, while Shaka Nyorai, of the past, explained that Ninigi's unintended travel to 2024 saved him from certain death in Izumo. The future's Amida Nyorai foresaw Ninigi's return, but only after earning the trust of the deities in this timeline, which would alter his original era's fate.\r\rNinigi discovered his sacred mirror, Yagata no Kagami, shattered, with only one piece remaining. Shaka Nyorai assured that his other regalia could help locate and restore the mirror's fragments. To understand more and possibly repair the mirror, Ninigi was advised to seek Inari Okami, a venerated kami residing in the Ogata rice plains, who could provide essential guidance on his journey through modern Japan.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    placeName: "Ozaki Stone Bath Cave",
    part: 1,
    area: bungoOnoArea,
    chapterNumber: "Chapter 4",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Ozaki Stone Bath Cave",
    content:
      "Prioritizing Sarutahiko's well-being, Ninigi leads the group to seek Yakushi Nyorai within the Ozaki Stone Bath Cave. There, they are introduced to archaic healing rituals involving stone and steam, akin to modern tent saunas, complete with a list of necessary herbs. This ancient knowledge proves vital as Sarutahiko, healed by the process, gratefully acknowledges Ninigi's leadership.\r\rGuided by Yakushi Nyorai, Ninigi's next quest is to locate Inari Okami, known to be near the Ogata canal road. With a message from Yakushi Nyorai to herald their journey, they plan to meet this revered kami. As evening approaches, they are directed to seek refuge at Kiyokawa Lodge, accessible by car, ensuring they have a base for their ongoing odyssey.\r\rBefore parting, Yakushi Nyorai bestows upon Ninigi a sacred healing mantra, a beacon of solace for the trials ahead, promising relief not just from corporeal wounds but also soothing the psyche and spirit, an invaluable asset for Ninigi's mission to bridge the celestial and the earthly.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Lodge Kiyokawa 1",
    chapterNumber: "Chapter 5",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Lodge Kiyokawa, Night at Lodge Kiyokawa",
    content:
      "In the heart of Bungo Ono, surrounded by the whispering trees and the gentle flow of the Ondake River, Lodge Kiyokawa stands as a sanctuary of peace. As Ninigi and his party arrive, the lodge's unique charm is immediately apparent—the architecture is in harmony with nature, promising a stay that's as restorative as the healing rituals they seek. The night's stay at Lodge Kiyokawa allows them to reflect on their journey thus far and prepare for the challenges ahead. The lodge, offering diverse room types from traditional tatami to modern western styles, caters to their varied needs, ensuring each member finds comfort and solace under its welcoming roof.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: true,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Lodge Kiyokawa 2",
    chapterNumber: "Chapter 6",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Lodge Kiyokawa, Shiitake Hunting",
    content:
      "The following morning, Ninigi's group engages with the local traditions and embarks on a shiitake mushroom hunting excursion in the misty forests surrounding Lodge Kiyokawa. The experience brings them closer to the land's spirit, teaching them the ancient ways of foraging and deepening their connection with the natural world of Bungo Ono. The shiitake, revered for both its culinary and medicinal properties, becomes a symbol of the earth's generosity, providing sustenance and health. This chapter is a celebration of the harmonious balance between human and nature, a key element in their quest for understanding and unity.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: true,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Lodge Kiyokawa 3",
    chapterNumber: "Chapter 7",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Lodge Kiyokawa, Tent Sauna Experience",
    content:
      "In the cool evening, as twilight paints the sky with shades of dusky lavender, Ninigi's party experiences the rejuvenating tradition of a tent sauna, set by the river's edge. This practice, mirroring the ancient healing methods taught by Yakushi Nyorai, offers not just physical cleansing but also mental clarity. The sauna's steam, infused with local herbs, envelops them in a warm embrace, symbolizing the purification of their intentions and the strengthening of their resolve. The tent sauna becomes a ritual of bonding for the group, fortifying their spirits for the imminent meeting with Inari Okami and the journey that lies beyond.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: true,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Udahime Shrine",
    chapterNumber: "Chapter 8",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "The Serpent's Sorrow and the Sake Solution",
    content:
      "In the tranquil embrace of Bungo Ono, Ninigi's group is visited by Hana no Moto, who bears news of Oodamaki, a once-peaceful serpent now displaying disturbing behavior. The cause, a cursed needle embedded in his collar, compels Oodamaki to seek relief in the Kanbara River's currents, inadvertently threatening the local ecosystem. Hana no Moto, known for her insight into the ways of spirits, implores Ninigi to choose a path of compassion, suggesting that an offering of sake might soothe the serpent's woes. She points them towards Inari Okami, a deity with a connection to the Takakiya Sake Brewery, to procure this pacifying elixir.\r\rWith a solution in hand and the harmony of the land at stake, Ninigi's party must also consider the healing and relocation of the great serpent. The mantra given by Yakushi Nyorai could hold the key to easing Oodamaki's suffering, while the strength required to move him could only come from a powerful kami like Takemikazuchi no Kami. Hana no Moto advises learning the sacred Kagura dance to summon this deity, guiding them to the Kagura Hall and subsequently to the Kashimagu Shrine, setting the stage for a dance that would intertwine their fates with the divine and the serpentine.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Kashima Shrine",
    chapterNumber: "Chapter 9",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "The Dance of Summoning at Kashima Shrine",
    content:
      "Immersed in the rich traditions of the Kagura Hall, Ninigi's group masters the ancient Kagura dance, a ritualistic performance destined to awaken the mighty Takemikazuchi no Kami. With each step and beat, they embody the stories of old, preparing their spirits for the pivotal moment of summoning. Their path leads them through the serene landscapes of Iwato, where the natural beauty of merging rivers sets a tranquil stage for the task at hand. Arriving at Kashima Shrine, they step into a realm where history whispers through the towering gates and sacred structures, a fitting arena for their heartfelt plea to the heavens.\r\rAs Ninigi and his companions commence the sacred dance within the hallowed grounds of Kashima Shrine, the air thrums with the power of their intention. The precise movements, coupled with the rhythm of their unified spirit, stir the ancient kami from his slumber. Takemikazuchi no Kami, moved by their dedication and the urgency of their quest, emerges, his aura a testament to his formidable essence as the progenitor of sumo. Acknowledging the sincerity and valor of Ninigi's party, he vows to lend his strength to their noble cause, offering his guidance in the delicate task of healing and relocating the great serpent, Oodamaki. This newfound alliance with Takemikazuchi no Kami forges a beacon of hope, illuminating their journey with the promise of divine support.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 1,
    area: bungoOnoArea,
    placeName: "Anamori Shrine",
    chapterNumber: "Chapter 10",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Serpent's Harmony and Kami's Alliance at Anamori Shrine",
    content:
      "In the mystical aura of Anamori Shrine, Ninigi's group, enriched by the profound Kagura dances of Kagura Village and the stunning vistas of Mount Ontake, confronts Oodamaki in his serpent form. With strategic use of sake and the healing mantra from Yakushi Nyorai, they pacify the great serpent. Takemikazuchi no Kami's formidable strength then safely escorts Oodamaki back to his cave, restoring him to human form and rejuvenating the once-blocked waterways. This act unveils hints of a deeper enigma as Oodamaki mentions a mysterious, regal blue kami.\r\rThe shrine becomes a nexus of powerful alliances, as both Takemikazuchi and Inari Okami imbue Ninigi's Kusanagi sword with their energies, signifying their pledged support. This convergence of divine force not only strengthens Ninigi's resolve but also illuminates the path to recovering the scattered mirror shards, guided by the magatama's latent power. As the journey unfolds, Ninigi is set to traverse the land, awakening dormant kami, and forging an unbreakable chain of alliances, all while piecing together the fragments of a larger cosmic puzzle that transcends time itself.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 2,
    area: bungoOnoArea,
    placeName: "Bungo Ono",
    chapterNumber: "Chapter 11",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Whispers of the Past: The Kojiki Revelation",
    content:
      "In the shadowed stillness of an ancient library, amidst scrolls whispering secrets of ages past, Ninigi's fingers brush against the Kojiki records—a tome steeped in the ancestral lore of gods and heroes. As he unfurls the parchment, the air thickens with the weight of untold stories, the inked characters dancing a cryptic ballet of history and prophecy. The Kojiki, a chronicle of divine lineage and earthly sagas, offers Ninigi not just knowledge of his forebears but also a mirror reflecting his own destiny and that of his descendants.\r\rCompelled by the revelations within the timeworn pages, Ninigi resolves to trace the celestial footsteps chronicled in the Kojiki. Each location, a mosaic of myth and truth, promises to unveil fragments of the untold, guiding him deeper into the labyrinth of his lineage. Understanding these esoteric narratives is more than a quest for truth; it's a key to mastering the temporal tides he navigates. As he steps out, the library's ancient walls resonate with a silent promise: the paths tread by his ancestors, now shadowed by time's veil, will illuminate the road to his purpose, shaping the legacy that will echo through the ages.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 2,
    area: bungoOnoArea,
    placeName: "Restaurant Fukujuso",
    chapterNumber: "Chapter 12",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "The Sealed Kappa's Legend",
    content:
      "The aroma of grilled beef and the hum of convivial chatter envelop Ninigi's group as they find respite in the bustling ambiance of Restaurant Fukujuso. Amidst the feast and fellowship, an ancient tale emerges, whispered by locals with a reverence reserved for legends. It speaks of a Kappa, a creature of water and whim, sealed within a stone for a thousand years. The tale, as old as the hills that cradle the town, hints at a sealed mischief and a hidden wisdom waiting to be unearthed.\r\rCompelled by the story, Ninigi's party is drawn to the challenge of unveiling this mystery. The sealed Kappa, an echo of a forgotten past, beckons them, but the seal holds a corruption that threatens to seep through the cracks of time. Their path converges with the legend of Fudo Myoo, the deity wielding the soul-purification sword, a beacon of hope in their quest to cleanse the ancient seal. With determination in their hearts, Ninigi and his companions set their course for Fukoji Temple, where they seek the divine intervention of Fudo Myoo, hoping to unlock the secrets of the Kappa and safeguard the balance between the mystical and the mortal realms.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: false,
  },
  {
    chapterId: generateChapterId(),
    part: 2,
    area: bungoOnoArea,
    placeName: "Fukoji Temple",
    chapterNumber: "Chapter 13",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    title: "Turmoil at Fukoji Temple",
    content:
      "Arriving at Fukoji Temple, Ninigi's group steps into a scene far removed from the sanctuary they anticipated. The temple grounds, usually a bastion of serenity, are ensnared in turmoil. Amidst this chaos stands Fudo Myoo, the temple's guardian deity, his formidable presence overshadowed by the discord that permeates his domain.\r\rDriven by a profound respect for the sacred and a steadfast resolve, Ninigi and his allies delve into the heart of the disturbance. Their journey leads them to a concealed garden where hydrangeas bloom in riotous colors, their vibrant petals stark against the temple's unrest. As if by ancient magic, the flowers' tranquil beauty begins to weave a tapestry of calm, gradually stilling the tumultuous energy that had seized the temple.\r\rIn the newly restored peace, Fudo Myoo acknowledges the bravery and sincerity of Ninigi's group with a deep sense of gratitude. He bestows upon Ninigi his sacred sword, a revered blade with the power to quell the lingering malevolence of the Kappa. As the temple basks in its reclaimed tranquility, the Kappa, liberated from its age-old confinement, imparts a cryptic message to Ninigi—a clue pointing towards the hidden depths of Jinkaku Temple, where the secrets of the Kojiki records lie in wait, ready to unveil the next chapter in their celestial journey.",
    vnLink: "https://www.youtube.com/watch?v=Z3Z4YX6XH3M",
    vnUnlocked: true,
  },
];

export const chapterSelectionData: ChapterSelection[] = [];
