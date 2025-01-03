import type { RouteDestinations, RouteDetails } from "@/types/model-route-type";

let number = 0;

function generateRouteDetailId() {
	number = number + 1;
	return `RouteDetail ${number}`;
}

let stopNumber = 0;

function generateStopId() {
	stopNumber = stopNumber + 1;
	return `stop ${stopNumber}`;
}

let destinationNumber = 0;

function generateDestinationId() {
	destinationNumber = destinationNumber + 1;
	return `destination${destinationNumber}`;
}

let chapterNumber = 1;

function generateChapterId() {
	chapterNumber = chapterNumber + 1;
	if (chapterNumber === 8) {
		chapterNumber = chapterNumber + 2;
	}
	return `bungoOnoChapterId${chapterNumber}`;
}

let chapterImageNumber = 0;

function generateChapterImageId() {
	chapterImageNumber = chapterImageNumber + 1;
	if (chapterImageNumber === 6) {
		chapterImageNumber = chapterImageNumber + 2;
	}
	return `chapter${chapterImageNumber}.png`; //start from 0 until 7 (skipping 5, 6)
}

export const routeDetails1: RouteDetails[] = [
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Harajiri Falls",
		routeDetailStoryTitle: "The Ancient Fire Rising from the Timeless Waters",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "https://www.tanejp.com/route/harajiri-route/",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/harajiri-fall/1.jpg",
			image2: "/image/model-route/1/harajiri-fall/2.jpg",
			image3: "/image/model-route/1/harajiri-fall/3.jpg",
		},
		routeDetailDescription: `Harajiri Falls is known as the "Niagara of the East", is a 120m wide and 20m high waterfall that forms a stunning arc over the Ogata River in a peaceful agricultural area. It has played a significant role in the region's history, culture, and industry, with its influence evident in local structures like shrines, waterways, and stone bridges. During spring, the surroundings are adorned with blooming tulip.\r\r The Komatsu Fire Festival (小松明火祭り) is an annual event on August 14th, commemorating a 300-year-old peasant uprising in Ogata Township due to harsh tax collections despite crop failures. These torches, approximately 1.5 meters long, are attached to bamboo sticks or oil-filled cans with wicks as a tribute to the historical event and to pray for a good harvest and protection against pests. It is said to have started in 1759.`,
		routeDetailLocation: "Harajiri Falls",
		routeDetailAddress:
			"410 Ogatamachi Harajiri, Bungoono, Oita 879-6631, Japan",
		routeHashtag: ["#Waterfall", " #Rafting"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Ninomiya Hachiman Shrine",
		routeDetailStoryTitle: "The Abode of the Mighty Bonjin warrior",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/ninomiya/1.jpg",
			image2: "/image/model-route/1/ninomiya/2.jpg",
			image3: "/image/model-route/1/ninomiya/3.jpg",
		},
		routeDetailDescription: `Ninomiya Hachiman Shrine, over 800 years old and nestled on a forested hillside, was established by the noble warrior Ogata No Saburo Koreyoshi during the late Heian Period. Koreyoshi, a key figure in the Kamakura shogunate's establishment and linked to the serpent deity Oodamaki of Anamori Shrine, is celebrated for founding three shrines where his arrows landed, including Ninomiya Hachiman.\r\rThe region, known for its water abundance and rice cultivation, celebrates the Ogata Sansha Kawagoe-shi Matsuri in honor of water and harvest. The festival's centerpiece is the Kawagoe Festival, involving three shrines—Ichinomiya, Ninomiya, and Sannomiya—dedicated to divine figures from Japanese imperial history. It's famous for the ceremonial parade of portable shrines, especially the daring river crossing to Ninomiya Shrine, embodying a storied tradition observed around lunar mid-October.`,
		routeDetailLocation: "Ninomiya Hachiman Shrine",
		routeDetailAddress: "Ogatamachi Harajiri, Bungoono, Oita 879-6631, Japan",
		routeHashtag: ["#Shrine", " #SpiritualSite"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Miyazaki West Stone Carved Buddha Cliff",
		routeDetailStoryTitle: "Buddhas of Past, Present, and Future",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/miyazaki/1.jpg",
			image2: "/image/model-route/1/miyazaki/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `In Bungo Ono City, Oita Prefecture, the nationally recognized \"Miyasako Higashi and Nishi Stone Buddhas\" stand as a testament to Japan's rich cultural history. Dating from the late Heian to early Kamakura periods, these stone-carved Buddhist figures, or \"magaibutsu,\" are linked to the medieval ruler Ogata Koreyoshi.\r\rThe Higashi (East) Stone Buddha, a short climb uphill from the parking area, showcases a central Dainichi Nyorai (Mahavairocana) flanked by Fudo Myo-o and Bishamonten. Also, Kongorikishi statues and two magaibutsu pagodas adorn the site.\r\rMeanwhile, the Nishi (West) Stone Buddha, situated further uphill, presents three Nyorai figures: Yakushi Nyorai, Shaka Nyorai, and Amida Nyorai, each symbolizing different virtues and blessings, echoing the spiritual depth of the Heian period.`,
		routeDetailLocation: "Miyazaki West Stone Carved Buddha Cliff",
		routeDetailAddress: "38 Ogatamachi Kudochi, Bungoono, Oita 879-6616, Japan",
		routeHashtag: ["#HistoricArt", " #HiddenGems"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Ozaki Stone Bath Cave",
		routeDetailStoryTitle: "The Forgotten Healing Magic",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "https://www.tanejp.com/route/ogata-route/",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/ozaki/1.jpg",
			image2: "/image/model-route/1/ozaki/2.jpg",
			image3: undefined,
		},
		routeDetailDescription: `The "Enseki" in Ogata is a two-tiered stone bath carved into volcanic tuff rock in the early 17th century. It features a 2-meter-high, 80-centimeter-wide horizontal hole, with the upper tier being a 4-square-meter bathing area with a 1.5-meter ceiling. The lower-level fire chamber burns firewood, and the hot stone floor is covered with a medicinal herb called "Ishiko" before water is poured on to create steam. A "Mushiro" curtain is hung at the entrance for bathers to enter.`,
		routeDetailLocation: "Ozaki Stone Bath Cave",
		routeDetailAddress: "Ogatamachi Oate, Bungoono, Oita 879-6633, Japan",
		routeHashtag: ["#HealingSpots", " #HiddenGems"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Lodge Kiyokawa",
		routeDetailStoryTitle: "A Mystical Sanctuary, Cradled by Forests and River",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "https://www.tanejp.com/route/lodge-kiyokawa-route/",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/lodge-kiyokawa/1.jpg",
			image2: "/image/model-route/1/lodge-kiyokawa/2.jpg",
			image3: "/image/model-route/1/lodge-kiyokawa/3.jpg",
		},
		routeDetailDescription:
			"Located in the more remote part of Oita prefecture, Bungo Ono, the surrounding beauty of nature will take your breath away. With rivers, waterfalls, mountains, and vast forests, the possibilities to explore are endless and will be sure to make your trip something you will never forget.\r\rLodge Kiyokawa located right beside an emerald green river, taking in all of this ample nature is pure and simple. Just walk outside of your rooms and there you are, in the middle of it all.",
		routeDetailLocation: "Lodge Kiyokawa",
		routeDetailAddress:
			"158 Kiyokawamachi Utaeda, Bungoono, Oita 879-6911, Japan",
		routeHashtag: ["#Sauna", " #ScenicViews"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Udahime Shrine",
		routeDetailStoryTitle: "A Princess's Distress",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/udahime-shrine/1.jpg",
			image2: "/image/model-route/1/udahime-shrine/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Near the \"Michi-no-Eki\" on the route to Mount Ontake, the Uda-hime Shrine is nestled along the road, approximately 1 kilometer away. A board near the stone steps details its devotion to Hana-no-Moto deity, yet the shrine's essence lies in its sacred spring, revered as the real deity. This spring, entwined with the goddess's lore, purportedly traverses a cave to Ubagamine Grotto at Mount Sobo's base, enriching the shrine's historical tapestry linked to military leader Oomi Yorimitsu.\r\rEnshrined in the chronicles of \"Genpei Seisuiki,\" the enchanting tale of Princess Hana-no-Moto has been cherished over time. The shrine's spring, counted among Japan's \"100 Best Waters,\" symbolizes purity as it flows directly from the mountain, further accentuating the site's spiritual ambiance.`,
		routeDetailLocation: "Udahime Shrine",
		routeDetailAddress:
			"1493 Kiyokawamachi Mitama, Bungoono, Oita 879-6905, Japan",
		routeHashtag: ["#Shrine", " #SacredSprings"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Kashima Shrine",
		routeDetailStoryTitle: "Awakening The Sumo Kami",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/kashima-shrine/1.jpg",
			image2: "/image/model-route/1/kashima-shrine/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `The Autumn Festival at Kashima Shrine in Usuo is a cultural spectacle held every October 10th. It features Kagura performances dedicated to the deities, particularly Takemikazuchi, drawing locals and tourists alike into a world of traditional Shinto dance and spiritual reverence.\r\rMeanwhile, Kiyokawa's Kagura Hall offers regular Kagura performances about once a month. These sessions offer an intimate glimpse into the mystical art of Kagura, inviting audiences to immerse themselves in the ancient narratives of gods and spirits, and to preserve this captivating aspect of cultural heritage.`,
		routeDetailLocation: "Kashima Shrine",
		routeDetailAddress: "Miemachi Matsuo, Bungoono, Oita 879-7123, Japan",
		routeHashtag: ["#Shrine", " #Festivals"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Anamori Shrine",
		routeDetailStoryTitle: "The Rouge Serpent God",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/1/anamori-shrine/1.jpg",
			image2: "/image/model-route/1/anamori-shrine/2.jpg",
			image3: "/image/model-route/1/anamori-shrine/3.jpg",
		},
		routeDetailDescription: `Anamori Shrine, located in a cave, is famous as the birthplace of the Odamaki legend from "Heike Monogatari" (The Tale of the Heike). It's associated with a serpent deity and linked to the birthplace of Ogata Saburo Yoshie, who built Okajo Castle in Taketa.\r\rThe legend includes Ogata Saburo's (Odamaki's) exploits during the Genpei War and a divine marriage between Ubatake Daimyojin and Hana no Omoto Hime, the "Utahime." The cave at Anamori Shrine is thought to be connected to another cave at the Uda Hime Shrine.\r\rAnamori Shrine is now a popular site for those seeking love and blessings, with a tradition of taking and returning stones from the cave for fertility and prosperity.`,
		routeDetailLocation: "Anamori Shrine",
		routeDetailAddress: "1432 Kobaru, Taketa, Oita 878-0574, Japan",
		routeHashtag: ["#Shrine", " #LoveBlessings"],
	},
];

export const routeDestinations1: RouteDestinations[] = [];

for (let i = 0; i < 8; i++) {
	routeDestinations1.push({
		destinationId: generateDestinationId(),
		stopId: routeDetails1[i]?.stop,
		routeDetailId: routeDetails1[i]?.routeDetailId,
		destinationName: routeDetails1[i]?.routeDetailName,
		destinationImage: routeDetails1[i]?.routeDetailSmallImage.image1,
		modelRouteLink: routeDetails1[i]?.modelRouteLink,
		destinationDescription: routeDetails1[i]?.routeDetailDescription,
	});
}
