import type { Chapter, ChapterSelection } from "@/types/story-type";
import createIdGenerator from "@/utils/id-utils";

const bungoOnoChapterGenerator = new createIdGenerator(
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	"bungoOno",
);

export const prologueChapterData: Chapter = {
	chapterId: bungoOnoChapterGenerator.generatePrologueChapterId(),
	part: 0,
	area: "Touriiverse",
	chapterNumber: "prologue",
	title: "The Arrival of the Heavenly Gods, Amatsukami",
	image: "/image/touriiverse/story-page.png",
	realImage: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
	content:
		"A long time ago, the world was born from chaos. The gods created three realms: ***Takamagahara***, the bright heavens where the gods live; ***Ashihara no Nakatsukuni***, the lively world of humans; and ***Yomi***, the dark and silent land of the dead. For many years, the realms were in balance, but now, trouble is beginning to grow.\r\rIn the shining heavens of ***Takamagahara***, the Sun Goddess ***Amaterasu*** gives her grandson, ***Ninigi***, an important mission. She tells him to go to the human world to bring back peace and balance. With special treasures to guide him, Ninigi steps onto the ***Ame-no-ukihashi***, a bridge that connects the heavens to the earth.\r\rSuddenly, a storm begins. Thunder roars, lightning flashes, and the bridge shakes. The storm becomes so strong that the bridge collapses, and Ninigi falls into a swirling cloud of chaos.\r\rWhen he wakes up, he is lying beside a beautiful waterfall surrounded by mist. In the distance, he sees a shadowy figure watching him. Ninigi knows that his journey is just beginning.",
};

const bungoOnoArea = "Bungo Ono";

export const bungoOnoChapterData: Chapter[] = [
	{
		chapterId: bungoOnoChapterGenerator.generateBungoOnoChapterId(),
		part: 1,
		area: bungoOnoArea,
		placeName: "Bungo Ono",
		chapterNumber: "Introduction",
		image: "/video/bungo-ono.mp4",
		realImage: "",
		title: "A Place Where Myth and Reality Merge",
		content:
			"Bungo Ono—where ancient legends and modern life unite. Amid tranquil bamboo groves and Harajiri Falls, whispers of celestial beings and yokai echo through every corner. Rooted in Kojiki lore, this city seamlessly blends time-honored customs with contemporary life. Landmark sites like Manano Chojya, the Inazumi Underwater Limestone Cave, and the Hakusan River pulse with mythic tales. Here, the past is vividly alive, beckoning travelers to journey into a realm where legend and reality entwine.",
		storyUnlocked: true,
	},
	{
		chapterId: bungoOnoChapterGenerator.generateBungoOnoChapterId(),
		part: 1,
		area: bungoOnoArea,
		placeName: "Harajiri Fall",
		chapterNumber: "Chapter 1",
		image: "/image/touriiverse/bungo-ono/chapter1.png",
		realImage: "/image/touriiverse/bungo-ono-real/chapter1.jpeg",
		title: "The Lantern Festival",
		content:
			"The sound of rushing water filled the misty air. Golden lanterns floated above the river, their soft light reflecting on the rippling surface. Ninigi stirred, disoriented, the roar of a waterfall echoing nearby. He sat up slowly, his eyes scanning the glowing wooden bridge stretching across the misty river.",
		videoLink:
			"https://www.youtube.com/embed/DFJaxrpGIXg?si=KsehiocjEMr32QLH&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/vBwge4ohk_g?si=VL05AD4g9wlIXms3&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: bungoOnoChapterGenerator.generateBungoOnoChapterId(),
		part: 1,
		area: bungoOnoArea,
		placeName: "Ninomiya Hachiman Shrine",
		chapterNumber: "Chapter 2",
		image: "/image/touriiverse/bungo-ono/chapter2.png",
		realImage: "/image/touriiverse/bungo-ono-real/chapter2.jpg",
		title: "Ninomiya Hachiman Shrine",
		content:
			'Sarutahiko led them through the quiet forest, his voice steady but urgent. "We need to move quickly. Your divine energy will attract trouble—corrupted Kunitsukami and Yokai - spirits that once walked as protectors but had since fallen into hunger and violence, feeding on the remnants of forgotten',
		videoLink: "https://tanejp.com/ninomiya-hachiman-shrine/",
		videoMobileLink: "https://tanejp.com/ninomiya-hachiman-shrine/",
		storyUnlocked: false,
	},
	{
		chapterId: bungoOnoChapterGenerator.generateBungoOnoChapterId(),
		placeName: "Miyazako Stone Carved Buddha Cliff",
		part: 1,
		area: bungoOnoArea,
		chapterNumber: "Chapter 3",
		image: "/image/touriiverse/bungo-ono/chapter3.png",
		realImage: "/image/touriiverse/bungo-ono-real/chapter3.jpg",
		title: "Buddhas of Past, Present, and Future",
		content:
			"Ninigi and his companions stood at the ast cliff, where two powerful guardians of Daichi Nyorai awaited them. Their presence was strong, their eyes gleaming with an ageless wisdom. A moment of tense silence passed before Ninigi stepped forward.",
		videoLink: "https://tanejp.com/miyazako-stone-carved-buddha-cliff/",
		videoMobileLink: "https://tanejp.com/miyazako-stone-carved-buddha-cliff/",
		storyUnlocked: false,
	},
	{
		chapterId: bungoOnoChapterGenerator.generateBungoOnoChapterId(),
		placeName: "Ozaki Stone Bath Cave",
		part: 1,
		area: bungoOnoArea,
		chapterNumber: "Chapter 4",
		image: "/image/touriiverse/bungo-ono/chapter4.png",
		realImage: "/image/touriiverse/bungo-ono-real/chapter4.jpeg",
		title: "The Healing Ritual",
		content:
			"The scent of damp earth and ancient stone lingered as Ninigi knelt beside Sarutahiko, his wounds deep, his breath shallow. The path ahead could wait—he had made his choice. Healing came first.",
		videoLink: "",
		storyUnlocked: false,
	},
];

// bungoOnoChapterSelectionData

export const bungoOnoChapterSelectionData: ChapterSelection[] = [];

for (let i = 0; i <= 4; i++) {
	bungoOnoChapterSelectionData.push({
		selectedChapterId: bungoOnoChapterData[i]?.chapterId,
		chapter: bungoOnoChapterData[i]?.chapterNumber,
		placeName: bungoOnoChapterData[i]?.placeName,
		isSelected: false,
	});
}

/// Aomori
const aomoriArea = "Aomori";

const aomoriChapterGenerator = new createIdGenerator(
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	"aomori",
);

export const aomoriChapterData: Chapter[] = [
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Aomori",
		chapterNumber: "Introduction",
		image: "/image/world/Aomori.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "Where Spirits Roam and Legends Live",
		content:
			"Aomori—where ancient legends and modern life intertwine. Amid misty mountains and the shores of Mutsu Bay, whispers of spirits and deities linger in the air. Rooted in folklore and the traditions of the Tsugaru region, this land bridges the past and present. From the enigmatic Osorezan, believed to be a gateway to the afterlife, to the vibrant Nebuta Festival that brings legendary warriors to life, every corner pulses with mythic energy. Here, history is not just remembered—it breathes, inviting travelers into a world where legend and reality become one.",
		storyUnlocked: false,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Aomori Furukawa market",
		chapterNumber: "Chapter 1",
		image: "/image/touriiverse/aomori/chapter1.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "A Peculiar Gossip",
		content: `I recalled an adventure I had in Aomori City, situated at the northern tip of central Honshu, just below Hokkaido. I found myself in the midst of the bustling Furukawa Seafood Market.

"Have you heard about the eerie wailings at Osorezan, also known as Fear Mountain? There are rumors of frequent crying heard after sunset around Bodaiji Temple." A villager gossiped to another....`,
		videoLink:
			"https://www.youtube.com/embed/PakWmGx4l8w?si=wpMaNJvFNaY1weU3&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/PakWmGx4l8w?si=wpMaNJvFNaY1weU3&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Osoresan and Bodaiji Temple",
		chapterNumber: "Chapter 2",
		image: "/image/touriiverse/aomori/chapter2.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "Investigating the unknown wailings in the sacred temple",
		content:
			"As the sun set, my investigations at the Bodaiji Temple began. By night, the temple transformed. Bathed in a surreal calm, it felt serene yet eerie, as if spirits wandered its dark corners. This place, after all, is a passage for souls after death. Fūfūfū...",
		videoLink:
			"https://www.youtube.com/embed/wn6xKGFH2t8?si=YqQ0NikgMpJGgp2W&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/wn6xKGFH2t8?si=YqQ0NikgMpJGgp2W&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Hirosaki Apple Park",
		chapterNumber: "Chapter 3",
		image: "/image/touriiverse/aomori/chapter3.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "The Apple Park that has 80 varieties of apples",
		content:
			"the villagers at the apple park likely have some information on the snow monsters in Mt. Hakkoda as well. Join me as I discover what the Apple Park looks like and gather information on the Aomori Miracle Apple",
		videoLink:
			"https://www.youtube.com/embed/-1u5OAuEIoA?si=j9nGcTM4Inyb2q8o&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/-1u5OAuEIoA?si=j9nGcTM4Inyb2q8o&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Hirosaki Apple Park",
		chapterNumber: "Chapter 4",
		image: "/image/touriiverse/aomori/chapter4.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "Unveiling Aomori’s Yuki Onna secrets in the Apple Park",
		content:
			"The Miracle Apple? Yes, we did have some this year, but they were all offered to the Yuki Onna to ensure she doesn’t destroy our apple trees. After receiving her tributes, she moves on to Mt. Hakkoda and preys on unsuspecting humans who wander too deeply into the enchantingly beautiful mountain.",
		videoLink:
			"https://www.youtube.com/embed/SesgkRr0HeQ?si=XbLb4yWN_PDxuS8b&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/SesgkRr0HeQ?si=XbLb4yWN_PDxuS8b&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Mountain Hakkoda",
		chapterNumber: "Chapter 5",
		image: "/image/touriiverse/aomori/chapter5.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "The Mountain Guarded by the Snow Monsters",
		content:
			"The Snow Monsters? hahaha, if you are here for these 'creatures of nature', I would suggest you go up to the peak of Tamoyachi. It offers a panoramic view from its summit and as far as Aomori City when the weather is clear.",
		videoLink:
			"https://www.youtube.com/embed/imeff5cTIaQ?si=qO7B89zTF5JW89A-&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/imeff5cTIaQ?si=qO7B89zTF5JW89A-&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Mountain Hakkoda",
		chapterNumber: "Chapter 6",
		image: "/image/touriiverse/aomori/chapter6.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "Ascending the Hakkoda Mountain Peak By The Ropeway",
		content:
			"This must be the Hakkōda Ropeway Sanroku base station. The carriage that will bring me to the the peak of Tamoyachi. Let’s go in.",
		videoLink:
			"https://www.youtube.com/embed/2hu6wVXp-xU?si=yNcGxjwbQjyyjDkm&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/2hu6wVXp-xU?si=yNcGxjwbQjyyjDkm&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "Mountain Hakkoda",
		chapterNumber: "Chapter 7",
		image: "/image/touriiverse/aomori/chapter7.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "Becoming the Yuki Onna Hunter",
		content:
			"I took out the Tanto sword and bit it in my mouth, angling it at Yukino’s throat…",
		videoLink:
			"https://www.youtube.com/embed/AIAQH5ySwIw?si=YYxp_RjBaM17LG15&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/AIAQH5ySwIw?si=YYxp_RjBaM17LG15&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
	{
		chapterId: aomoriChapterGenerator.generateAomoriChapterId(),
		part: 1,
		area: aomoriArea,
		placeName: "The Sessho-seki",
		chapterNumber: "Chapter 8",
		image: "/image/touriiverse/aomori/chapter8.png",
		realImage: "/image/touriiverse/aomori-real/chapter1.jpg",
		title: "The Yuki Onna Hunter Final Chapter",
		content:
			"It was just the Yuki Onna that had me delayed for a while. Nevertheless, she was no match for me. I had her expelled from Aomori for good. Now i have the Aomori Miracle Apple and the Snow Monster Blood. What should i do next?",
		videoLink:
			"https://www.youtube.com/embed/RbZL81-IUCs?si=XO0PkqLS41Zum99n&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		videoMobileLink:
			"https://www.youtube.com/embed/RbZL81-IUCs?si=XO0PkqLS41Zum99n&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
		storyUnlocked: true,
	},
];

export const aomoriChapterSelectionData: ChapterSelection[] = [];

for (let i = 0; i <= 8; i++) {
	aomoriChapterSelectionData.push({
		selectedChapterId: aomoriChapterData[i]?.chapterId,
		chapter: aomoriChapterData[i]?.chapterNumber,
		placeName: aomoriChapterData[i]?.placeName,
		isSelected: false,
	});
}
