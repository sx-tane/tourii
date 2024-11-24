import type {
	RouteDestinations,
	RouteDetails,
} from "@/types/interfaceModelRoute";

let stopNumber = 0;

function generateStopId() {
	stopNumber = stopNumber + 1;
	return `stop ${stopNumber}`;
}

let number = 8;

function generateRouteDetailId() {
	number = number + 1;
	return `RouteDetail ${number}`;
}

let destinationNumber = 8;

function generateDestinationId() {
	destinationNumber = destinationNumber + 1;
	return `destination${destinationNumber}`; //reach 14
}

let chapterNumber = 12;

function generateChapterId() {
	chapterNumber = chapterNumber + 1;
	return `bungoOnoChapterId${chapterNumber}`; //reach chapterid 18
}

let chapterImageNumber = 11;

function generateChapterImageId() {
	chapterImageNumber = chapterImageNumber + 1;
	return `chapter${chapterImageNumber}.png`; //reach chapter 17
}

export const routeDetails2: RouteDetails[] = [
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Restaurant Fukujusō",
		routeDetailStoryTitle: "The Sealed Kappa's Legend",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/fukujuso/1.jpg",
			image2: "/image/model-route/2/fukujuso/2.jpg",
			image3: undefined,
		},
		routeDetailDescription: `Tucked away at Michi-no-Eki Asaji in Bungo-ono City, Oita Prefecture, Restaurant Fukujusō offers a tranquil dining experience. Known for its local specialties, the restaurant serves dishes like the \"Asajin Donburi,\" featuring sumptuous Asaji beef, and the \"Asaji Gyu Yakiniku Gozen,\" a sought-after set meal with grilled Asaji beef. Open from 11:00 AM to 5:00 PM, the restaurant's inviting ambiance and delectable cuisine make it a must-visit spot. Find it at 1018-1 Itai-sako, Asaji, or call 0974-72-0066 for inquiries.\r\rNestled in the serene surroundings of Hirai's Tsuru lies the enigmatic Sennen Fuchi, a deep pool bound to the legend of an evil kappa. Local lore tells of a time when the mischievous kappa wreaked havoc, luring unsuspecting individuals into the depths. The pool's infamous past was put to rest by a monk's intervention, who sealed the creature away with sutras and an inscription promising peace for a thousand years. Visitors to the area can still find the ancient inscriptions and alleged kappa footprints on a stone by the pool, adding a layer of mystique to the tranquil spot.`,
		routeDetailLocation: "Restaurant Fukujusō",
		routeDetailAddress:
			"1018-1 Asajimachi Itaizako, Bungoono, Oita 879-6223, Japan",
		routeHashtag: ["#LocalCuisine", " #SereneDining"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Fukoji Temple",
		routeDetailStoryTitle: "Turmoil at Fukoji Temple",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "https://www.tanejp.com/route/fukoji-route/",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/fukoji-temple/1.jpg",
			image2: "/image/model-route/2/fukoji-temple/2.jpg",
			image3: "/image/model-route/2/fukoji-temple/3.jpg",
		},
		routeDetailDescription: `Fukō-ji, also known as the "Hydrangea Temple," is famous for its beautiful hydrangeas and houses some of Japan's largest rock-carved Buddhist statues, called "magaibutsu".\r\rThe statues include Fudo Myoo in the center is an impressive 11.4 meters tall, flanked by Kongara-doji and Seitaka-doji, with Tamon-ten and Benzai-ten on the right. These magaibutsu are unique because they were carved around 120,000 years ago by the third pyroclastic flow from Mount Aso, older than many others in the region.\r\rVisitors can access a cave behind the Fudo Myoo statue via a stage, offering a panoramic view of the temple's extensive 70,000-square-meter grounds at the same level as the statues.`,
		routeDetailLocation: "Fukoji Temple",
		routeDetailAddress:
			"1225 Asajimachi Kamiotsuka, Bungoono, Oita 879-6213, Japan",
		routeHashtag: ["#HistoricTemple", " #SpiritualJourney"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Jinkaku-ji",
		routeDetailStoryTitle: "Secrets of Jinkaku-ji",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/jinkaku-ji/2.jpg",
			image2: "/image/model-route/2/jinkaku-ji/1.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Shingon Buddhist mountain temple, also known as "Shakunage-dera", has been founded in around 571 AD during Emperor Kinmei's reign, making it one of the earliest Buddhist temples in Japan. It was later converted into a Shingon temple by Shōbō during the reign of Emperor Daigo.\r\rAlthough it suffered decay due to wars, the temple was restored in 1369 under the Oo'no clan's rule, including the main hall (formerly Higashibou) and six sub-temples.\r\rKnown for its roughly 500 azalea bushes, some over a century old, "Shakunage-dera" is a popular destination, especially in spring (mid to late April), when visitors flock to see the azaleas bloom.`,
		routeDetailLocation: "Jinkaku-ji",
		routeDetailAddress:
			"1354 Asajimachi Torita, Bungoono, Oita 879-6331, Japan",
		routeHashtag: ["#AncientTemple", " #SpringBlossoms"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Eboshi Park",
		routeDetailStoryTitle: "Guidance from the Kannon",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/eboshi-park/1.jpg",
			image2: "/image/model-route/2/eboshi-park/2.jpg",
			image3: undefined,
		},
		routeDetailDescription:
			"Eboshi-dake Jōsui-ji is a temple located on the eastern slopes of Mt. Eboshi, traditionally founded by Ōtomo Yoriyasu, the third leader of the Ōtomo clan. It was originally dedicated to the protection of horses and cattle and features a horse-headed Kannon (Goddess of Mercy). Although the main hall was destroyed by fire in 1977, the main deity, the horse-headed Kannon, survived and is now housed in the rebuilt hall.\r\rEboshi Park, located on the eastern side of Mt. Eboshi, is situated within the grounds of Jousui Temple, believed to have been established by Oita Yoruyasu. The park is renowned for its cherry blossoms and is a prominent cherry blossom viewing spot in the prefecture.\r\rDuring the blooming season, the park showcases the elegant beauty of peony cherry blossoms (botanzakura), known for their deep pink flowers that form in dense clusters. These blossoms are distinctive for their long blooming period, typically occurring from mid-April to early May.",
		routeDetailLocation: "Eboshi Park",
		routeDetailAddress: "Onomachi Fujikita, Bungoono, Oita 879-6442, Japan",
		routeHashtag: ["#NatureEscape", " #CherryBlossoms"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Muretsuru Sake Brewery",
		routeDetailStoryTitle: "An Unexpected Meal",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/muretsuru/1.png",
			image2: "/image/model-route/2/muretsuru/2.jpg",
			image3: "/image/model-route/2/muretsuru/3.jpg",
		},
		routeDetailDescription: `Established in 1904, this sake brewery offers a unique experience. You can participate in a rice cooking experience using their traditional kamado (stove). Learn how to start a fire, the tips for cooking rice, and how to adjust the flames. After about 20 minutes, the rice will be ready to enjoy. You can savor this rice in the brewery's tatami room alongside local delicacies. Reservations are required.`,
		routeDetailLocation: "Muretsuru Sake Brewery",
		routeDetailAddress:
			"570 Asajimachi Ichimanda, Bungoono, Oita 879-6201, Japan",
		routeHashtag: ["#SakeExperience", " #CulinaryAdventure"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Chinda Waterfall",
		routeDetailStoryTitle: "The Legend of Chinda Falls",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/2/chinda-fall/1.jpg",
			image2: "/image/model-route/2/chinda-fall/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Chinda Waterfall, within Ōita Bungo-Ōno Geopark, is famed for inspiring Sesshū Tōyō's \"Shintsudanotaki Waterfall\" ink wash painting and is a National Registered Monument. The waterfall features two main cascades: the \"Ōtaki\" on the Ōno River, known for its layered structure and impressive size (100 meters wide and 20 meters high), and the \"Mesaki\" on the Hirai River, offering captivating views cherished by visitors and photographers alike.\r\rAdjacent to the waterfall is the Shintsudanotaki Hydroelectric Plant, a Meiji-period stone structure now recognized as a Modern Cultural Heritage site, adding historical significance to the area. The waterfall's basin, historically noted in \"Bungo Kokushi\" as perilously deep, was once used by the Ōka Domain for the \"Chinda Otoshi\" trial to judge innocence based on survival, a testament to the site's dramatic and storied past.`,
		routeDetailLocation: "Chinda Falls",
		routeDetailAddress: "2404 Onomachi Yada, Bungoono, Oita 879-6423, Japan",
		routeHashtag: ["#NaturalWonder", " #HistoricalSite"],
	},
];

export const routeDestinations2: RouteDestinations[] = [];

for (let i = 0; i < 6; i++) {
	routeDestinations2.push({
		destinationId: generateDestinationId(),
		stopId: routeDetails2[i]?.stop,
		routeDetailId: routeDetails2[i]?.routeDetailId,
		destinationName: routeDetails2[i]?.routeDetailName,
		destinationImage: routeDetails2[i]?.routeDetailSmallImage.image1,
		modelRouteLink: routeDetails2[i]?.modelRouteLink,
		destinationDescription: routeDetails2[i]?.routeDetailDescription,
	});
}
