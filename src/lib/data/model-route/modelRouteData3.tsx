import {
  type RouteDetails,
  type RouteDestinations,
} from "@/types/interfaceModelRoute";

let stopNumber = 0;

function generateStopId() {
  stopNumber = stopNumber + 1;
  return `stop ${stopNumber}`;
}

let number = 14;

function generateRouteDetailId() {
  number = number + 1;
  return `RouteDetail ${number}`;
}

let destinationNumber = 14;

function generateDestinationId() {
  destinationNumber = destinationNumber + 1;
  return `destination${destinationNumber}`; //reach 21
}

let chapterNumber = 19;

function generateChapterId() {
  chapterNumber = chapterNumber + 1;
  return `chapterId${chapterNumber}`; //reach chapterid 32
}

let chapterImageNumber = 18;

function generateChapterImageId() {
  chapterImageNumber = chapterImageNumber + 1;
  return `chapter${chapterImageNumber}.png`; //reach chapter 31
}

export const routeDetails3: RouteDetails[] = [
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Mitarai Shrine",
    routeDetailStoryTitle: "The Boiling Water Kagura",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `The "Yutate Kagura" is a vibrant festival held every three years near December 20th at Mitarai Shrine in Uedahara, Mie-machi, Bungo Ono City, Oita Prefecture\r\rOriginating from the practices of mountain ascetics and shrine priests, the festival's central ritual, "Yutate," involves participants standing in steam from boiling water in the cold air while wild divine spirits("荒神"-"aragami") perform a lively dance. The event is characterized by the scattering of coal and hot water, creating an intense and mystical atmosphere\r\rA highlight of the Yutate Kagura  (湯かぶり) is the "Yukaburi" ritual, which takes place at twilight around 5 PM. During this ceremony, 12 bundles of firewood are lit in two kettles, bringing the water to a boil, marking the climax of the Kagura performance. Performers energetically kick the firewood and bathe in the hot water, with the final act being their entry into the kettle for prayer and chanting. This powerful ceremony marks the grand finale of the Kagura performance, drawing spectators to experience its bold and spiritual display`,
    routeDetailLocation: "Mitarai Shrine",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Sugao Magaibutsu",
    routeDetailStoryTitle: "The Oni That Fled from the Roaster",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `The Sugao Stone Buddhas, or Sugao Magaibutsu, are a group of five ancient Buddha figures carved into a cliffside on a hill overlooking the Ono River's eastern bank in Bungo-Ōno City, Oita Prefecture, Japan. Recognized as both a national historic site and important cultural properties, these carvings are a significant cultural and historical treasure\r\rVisitors to the Sugao Stone Buddhas must climb about 100 stone steps, passing a slope and a torii gate, which takes roughly 10 minutes from the parking area. At the summit, the central statue of Amida Nyorai (Amitabha Buddha) is accompanied by four other Buddha figures\r\rThe site is celebrated for its remarkable artistry and its tranquil and spiritual atmosphere, enhanced by the surrounding natural beauty, making the Sugao Stone Buddhas a cherished and respected destination\r\rSugao Stone Buddhas Fire Festival (菅尾石仏火祭り) \r\rThe festival at Sugao celebrates a local legend involving the Sugao Stone Buddhas with Obon traditions. It includes unique events like the "Rooster Imitation Contest," where participants mimic a rooster's crow, and the "Torch Throwing" ceremony, symbolizing the banishment of a demon\r\rThe festival's origin is tied to a local legend involving a troublesome demon in the Sugao region. Villagers challenged the demon to carve five Buddhas on a cliff overnight. As the demon nearly completed the task, a rooster imitation master's crowing tricked the demon into fleeing, ensuring its departure\r\rTo commemorate this event and prevent the demon's return, a Buddhist monk inscribed "Namu Amida Butsu" (a six-character mantra) on the opposite cliff side from the Sugao Stone Buddhas. This symbolized a wish for the area's safety and well-being. According to the legend, the fifth statue of the Stone Buddhas remains unfinished, signifying the demon's hasty departure`,
    routeDetailLocation: "Sugao Magaibutsu",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Shibayama Hachiman Shrine",
    routeDetailStoryTitle: "The Sake Gourd Blessing",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Shibayama Hachimangu Shrine in Chitose-cho, Bungo Ono City venerates several deities, including Emperor Nakatsuhiko, Emperor Ojin, Empress Jingū, and Himejinokami, with its exact founding date remaining a mystery\r\rThe shrine is famous for its "Hyotan Festival," a tradition over 800 years old, held on the first Sunday of December. In this distinctive festival, participants wear large gourds on their heads and huge straw sandals, which make walking without assistance challenging. Each participant is supported by attendants on both sides, and the procession is deliberate. The procession moves slowly, it may take up to two hours to complete for one kilometer\r\rThe shrine is situated in a scenic area by the Ono River's terraces. The layered flatlands along the river, as seen from National Route 326 across the bank, present a magnificent landscape`,
    routeDetailLocation: "Shibayama Hachiman Shrine",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Osako Cliff Buddha",
    routeDetailStoryTitle: "The Clay Masked Buddha",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `The Osako Cliff Buddha stands out among the numerous cliff-carved Buddhas in Bungo Ono City due to its unique, mask-like facial features. Created by applying a mixture of clay and fibrous materials such as hemp to the surface of an ancient rock formed from volcanic pyroclastic flows around 600,000 years ago, the statue's construction technique was likely chosen to compensate for the rock's fragility\r\rThis 3.2-meter-tall statue, believed to be from the late Kamakura or Muromachi period, represents Dainichi Nyorai (Mahavairocana Buddha) and is locally known as the "Bull Deity," associated with protecting bulls from disease. Housed in a hipped-roofed structure, the Osako Cliff Buddha is a tangible cultural property of Oita Prefecture. Its creation involved a stone-core sculpting method with clay and plaster for refinement, and it underwent restoration in the Edo period. The statue is an important historical and religious landmark in the area`,
    routeDetailLocation: "Osako Cliff Buddha",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Tedorigando",
    routeDetailStoryTitle: "The Elusive Crabs",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Visit the "Tedorigando" located along the banks of the Ono River, about 1 km from Shibayama Hachimangu Shrine, in the Chitose farming village park. These unique rock formations were created when intense forces lifted layers of hard sandstone and mudstone that date back approximately 100 million years\r\rThe name "Tetorigando" means "a place like a door panel where crabs could be easily picked up by hand," as it was where river crabs would cross to avoid the fierce river currents when migrating upstream. This geological marvel offers an intriguing experience for visitors`,
    routeDetailLocation: "Tedorigando",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Inukai Port",
    routeDetailStoryTitle: "Fishing for the Mirror Shard",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `On Children's Day, May 5th, a unique celebration takes place with around 200 "Donko" carps flying in the sky, offering a twist on the traditional Koinobori. The "Donko Fishing Tournament," a 70-year tradition since 1929, invites participants to catch a special type of goby known as "Donko" from the Ōno River. The event provides fishing equipment for sale and features activities like a treasure hunt, a Donko prize drawing, a weight inspection for the biggest catches with special prizes, and food stalls for visitors to enjoy`,
    routeDetailLocation: "Inukai Port",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Inazumi Cave",
    routeDetailStoryTitle: "The cave that is older than the kami",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "https://www.tanejp.com/route/inazumi-route/",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `The Inazumi Underwater Cave is a globally rare underwater cave with stunning formations such as stalactites, coral stones, bell holes, and helictites. Visitors can explore its depths, which reach over 40 meters, and enjoy the clear waters and otherworldly scenery\r\rThe cave maintains a constant temperature of 16°C, offering a comfortable and refreshing space with negative ions, suitable for relaxation and rejuvenation any time of the year\r\rA diving survey in February 2014 revealed that the cave extended for about 1 kilometer, making it the longest underwater cave in Japan at that time\r\rIn the summer (late May to mid-June), the Hayama River, a tributary of the Ono River in Mie-cho, Bungo-Ono City, becomes a popular spot for viewing fireflies, drawing many visitors. The annual "Hayama River Firefly Festival" celebrates this natural spectacle with traditional local performances, including Kagura and fan dances. The festival also offers fresh vegetables for sale, along with local delicacies like sake manju (sake-flavored buns) and black sugar manju`,
    routeDetailLocation: "Inazumi Cave",
    routeDetailAddress:
      "300 Nakatsuru, Mie-cho, Bungo-Ono City, Oita Prefecture",
    routeHashtag: ["", ""],
  },
];

export const routeDestinations3: RouteDestinations[] = [];

for (let i = 0; i < 7; i++) {
  routeDestinations3.push({
    destinationId: generateDestinationId(),
    stopId: routeDetails3[i]?.stop,
    routeDetailId: routeDetails3[i]?.routeDetailId,
    destinationName: routeDetails3[i]?.routeDetailName,
    destinationImage: routeDetails3[i]?.routeDetailBigImage,
    modelRouteLink: routeDetails3[i]?.modelRouteLink,
  });
}
