import type { RouteDestinations, RouteDetails } from "@/types/model-route-type";
import createIdGenerator from "@/utils/id-utils";

const route3Generator = new createIdGenerator(
	14,
	0,
	14,
	19,
	18,
	0,
	0,
	"bungoOno",
);

export const routeDetails3: RouteDetails[] = [
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Mitarai Shrine",
		routeDetailStoryTitle: "The Boiling Water Kagura",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/mitarai-shrine/1.jpg",
			image2: "/image/model-route/3/mitarai-shrine/2.jpg",
			image3: undefined,
		},
		routeDetailDescription: `The "Yutate Kagura" is a vibrant festival held every three years near December 20th at Mitarai Shrine in Uedahara, Mie-machi, Bungo Ono City, Oita Prefecture.\r\rOriginating from the practices of mountain ascetics and shrine priests, the festival's central ritual, "Yutate" involves participants standing in steam from boiling water in the cold air while wild divine spirits("荒神"-"aragami") perform a lively dance. The event is characterized by the scattering of coal and hot water, creating an intense and mystical atmosphere.\r\rA highlight of the Yutate Kagura  (湯かぶり) is the "Yukaburi" ritual, which takes place at twilight around 5 PM. During this ceremony, 12 bundles of firewood are lit in two kettles, bringing the water to a boil, marking the climax of the Kagura performance. Performers energetically kick the firewood and bathe in the hot water, with the final act being their entry into the kettle for prayer and chanting. This powerful ceremony marks the grand finale of the Kagura performance, drawing spectators to experience its bold and spiritual display.`,
		routeDetailLocation: "Mitarai Shrine",
		routeDetailAddress:
			"648 Miemachi Kamitahara, Bungoono, Oita 879-7107, Japan",
		routeHashtag: ["#ShrineVisit", " #CulturalSpot"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Sugao Magaibutsu",
		routeDetailStoryTitle: "The Oni That Fled from the Roaster",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/sugao-magaibutsu/1.jpg",
			image2: "/image/model-route/3/sugao-magaibutsu/2.jpg",
			image3: "/image/model-route/3/sugao-magaibutsu/3.jpg",
		},
		routeDetailDescription: `The Sugao Stone Buddhas are five ancient Buddha carvings on a cliffside in Bungo-Ōno City, Oita Prefecture, Japan. As national historic and cultural treasures, they're accessed by a 10-minute climb from the parking area, up 100 stone steps and past a torii gate. The site, dominated by the central figure of Amida Nyorai, is known for its tranquility and natural beauty.\r\rThe Sugao Stone Buddhas Fire Festival combines Obon traditions with local lore, featuring events like a \"Rooster Imitation Contest\" and \"Torch Throwing\" to symbolize the banishment of a demon. The legend speaks of villagers challenging a demon to carve the Buddhas overnight; deceived by a false rooster crow, the demon fled before finishing the fifth Buddha. A monk later inscribed a mantra on the opposite cliff for protection, leaving one statue forever incomplete.`,
		routeDetailLocation: "Sugao Magaibutsu",
		routeDetailAddress: "401 Miemachi Asase, Bungoono, Oita 879-7108, Japan",
		routeHashtag: ["#BuddhaArt", " #HeritageSite"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Shibayama Hachiman Shrine",
		routeDetailStoryTitle: "The Sake Gourd Blessing",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/shibayama-hachiman-shrine/2.jpg",
			image2: "/image/model-route/3/shibayama-hachiman-shrine/1.jpg",
			image3: "/image/model-route/3/shibayama-hachiman-shrine/3.jpg",
		},
		routeDetailDescription: `Shibayama Hachiman Shrine in Chitose-cho, Bungo Ono City venerates several deities, including Emperor Nakatsuhiko, Emperor Ojin, Empress Jingū, and Himejinokami, with its exact founding date remaining a mystery.\r\rThe shrine is famous for its "Hyotan Festival," a tradition over 800 years old, held on the first Sunday of December. In this distinctive festival, participants wear large gourds on their heads and huge straw sandals, which make walking without assistance challenging. Each participant is supported by attendants on both sides, and the procession is deliberate. The procession moves slowly, it may take up to two hours to complete for one kilometer.\r\rThe shrine is situated in a scenic area by the Ono River's terraces. The layered flatlands along the river, as seen from National Route 326 across the bank, present a magnificent landscape.`,
		routeDetailLocation: "Shibayama Hachiman Shrine",
		routeDetailAddress:
			"Chitosemachi Shibayama, Bungoono, Oita 879-7411, Japan",
		routeHashtag: ["#ShrineFest", " #SpiritualPlace"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Osako Magaibutsu",
		routeDetailStoryTitle: "The Clay Masked Buddha",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/osako-magaibutsu/1.jpg",
			image2: "/image/model-route/3/osako-magaibutsu/2.jpg",
			image3: undefined,
		},
		routeDetailDescription: `The Osako Magaibutsu stands out among the numerous cliff-carved Buddhas in Bungo Ono City due to its unique, mask-like facial features. Created by applying a mixture of clay and fibrous materials such as hemp to the surface of an ancient rock formed from volcanic pyroclastic flows around 600,000 years ago, the statue's construction technique was likely chosen to compensate for the rock's fragility.\r\rThis 3.2-meter-tall statue, believed to be from the late Kamakura or Muromachi period, represents Dainichi Nyorai (Mahavairocana Buddha) and is locally known as the "Bull Deity," associated with protecting bulls from disease. Housed in a hipped-roofed structure, the Osako Magaibutsu is a tangible cultural property of Oita Prefecture. Its creation involved a stone-core sculpting method with clay and plaster for refinement, and it underwent restoration in the Edo period. The statue is an important historical and religious landmark in the area.`,
		routeDetailLocation: "Osako Magaibutsu",
		routeDetailAddress:
			"1526 Chitosemachi Nagamine, Bungoono, Oita 879-7404, Japan",
		routeHashtag: ["#SacredSite", " #HistoricBuddha"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Tedorigando",
		routeDetailStoryTitle: "The Elusive Crabs",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/tedorigando/1.jpg",
			image2: "/image/model-route/3/tedorigando/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Visit the "Tedorigando" located along the banks of the Ono River, about 1 km from Shibayama Hachimangu Shrine, in the Chitose farming village park. These unique rock formations were created when intense forces lifted layers of hard sandstone and mudstone that date back approximately 100 million years.\r\rThe name "Tedorigando" means "a place like a door panel where crabs could be easily picked up by hand," as it was where river crabs would cross to avoid the fierce river currents when migrating upstream. This geological marvel offers an intriguing experience for visitors.`,
		routeDetailLocation: "Tedorigando",
		routeDetailAddress:
			"Chitosemachi Shibayama, Bungoono, Oita 879-7411, Japan",
		routeHashtag: ["#NaturalSpot", " #GeoWonder"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Inukai",
		routeDetailStoryTitle: "Fishing for the Mirror Shard",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/inukai/2.jpg",
			image2: "/image/model-route/3/inukai/1.jpg",
			image3: "image3",
		},
		routeDetailDescription: `On Children's Day, May 5th, a unique celebration takes place with around 200 "Donko" carps flying in the sky, offering a twist on the traditional Koinobori. The "Donko Fishing Tournament," a 70-year tradition since 1929, invites participants to catch a special type of goby known as "Donko" from the Ōno River. The event provides fishing equipment for sale and features activities like a treasure hunt, a Donko prize drawing, a weight inspection for the biggest catches with special prizes, and food stalls for visitors to enjoy.`,
		routeDetailLocation: "Inukai",
		routeDetailAddress: "Kubaru, Inukaimachi, Bungoono, Oita 879-7302, Japan",
		routeHashtag: ["#LocalFest", " #CommunityEvent"],
	},
	{
		routeDetailId: route3Generator.generateRouteDetailId(),
		stop: route3Generator.generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Inazumi Cave",
		routeDetailStoryTitle: "The Cave That Is Older Than The Kami",
		visualNovelLink: `/touriiverse/bungo-ono/${route3Generator.generateBungoOnoChapterId()}`,
		modelRouteLink: "https://www.tanejp.com/route/inazumi-route/",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${route3Generator.generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/3/inazumi-cave/1.jpg",
			image2: "/image/model-route/3/inazumi-cave/2.jpg",
			image3: "/image/model-route/3/inazumi-cave/3.jpg",
		},
		routeDetailDescription: `The Inazumi Underwater Cave, notable for its rare geological formations like stalactites and helictites, is a diving haven with clear waters and otherworldly scenery. With a steady 16°C temperature, it offers a year-round retreat full of negative ions for relaxation. As of a 2014 diving survey, it is Japan's longest underwater cave at approximately 1 kilometer.\r\rNearby, the Hayama River in Mie-cho, Bungo-Ono City, is famed for its firefly displays from late May to mid-June. The \"Hayama River Firefly Festival\" complements this natural event with traditional Kagura and fan dances, local produce, and treats like sake manju, enhancing the area's cultural richness.`,
		routeDetailLocation: "Inazumi Cave",
		routeDetailAddress: "300 Miemachi Nakazuru, Bungoono, Oita 879-7263, Japan",
		routeHashtag: ["#CaveExplore", " #NatureBeauty"],
	},
];

export const routeDestinations3: RouteDestinations[] = [];

for (let i = 0; i < 7; i++) {
	routeDestinations3.push({
		destinationId: route3Generator.generateDestinationId(),
		stopId: routeDetails3[i]?.stop,
		routeDetailId: routeDetails3[i]?.routeDetailId,
		destinationName: routeDetails3[i]?.routeDetailName,
		destinationImage: routeDetails3[i]?.routeDetailSmallImage.image1,
		modelRouteLink: routeDetails3[i]?.modelRouteLink,
		destinationDescription: routeDetails3[i]?.routeDetailDescription,
	});
}
