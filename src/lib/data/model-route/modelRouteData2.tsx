import {
  type RouteDestinations,
  type RouteDetails,
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
  return `chapterId${chapterNumber}`; //reach chapterid 18
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
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: undefined,
    }, // image
    routeDetailDescription: `Restaurant Fukujusō (レストラン福寿草) \r\rLegend of the The Kappa of Sennenbuchi 千年淵の河童\r\rOnce upon a time, in the middle of Hirai's Tsuru, there was a deep pool known as Sennen Fuchi with a bridge and a path leading to rapids where sazae shellfish were found. An evil kappa resided in the pool would drag people underwater, causing much distress. A monk was summoned to deal with the kappa and recited sutras to seal it away. He inscribed "From now on for a thousand years" on a riverbed stone to ensure the kappa remained sealed. Since then, the kappa has not reappeared. The inscription and supposed kappa footprints can still be found on the stone, though the story is met with skepticism.`,
    routeDetailLocation: "Restaurant Fukujusō",
    routeDetailAddress:
      "1018-1 Itai-sako, Asaji, Bungo-ono City, Oita Prefecture",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Fukoji Temple",
    routeDetailStoryTitle: "Turmoil at Fukoji Temple",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "https://www.tanejp.com/route/fukoji-route",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Fukō-ji, also known as the "Hydrangea Temple," is famous for its beautiful hydrangeas and houses some of Japan's largest rock-carved Buddhist statues, called "magaibutsu".\r\rThe statues include Fudo Myoo in the center is an impressive 11.4 meters tall, flanked by Kongara-doji and Seitaka-doji, with Tamon-ten and Benzai-ten on the right. These magaibutsu are unique because they were carved around 120,000 years ago by the third pyroclastic flow from Mount Aso, older than many others in the region.\r\rVisitors can access a cave behind the Fudo Myoo statue via a stage, offering a panoramic view of the temple's extensive 70,000-square-meter grounds at the same level as the statues.`,
    routeDetailLocation: "Fukoji Temple",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Jinkaku Temple",
    routeDetailStoryTitle: "Secrets of Jinkaku Temple",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "image3",
    }, // image
    routeDetailDescription: `Shingon Buddhist mountain temple, also known as "Shakunage-dera", has been founded in around 571 AD during Emperor Kinmei's reign, making it one of the earliest Buddhist temples in Japan. It was later converted into a Shingon temple by Shōbō during the reign of Emperor Daigo.\r\rAlthough it suffered decay due to wars, the temple was restored in 1369 under the Oo'no clan's rule, including the main hall (formerly Higashibou) and six sub-temples.\r\rKnown for its roughly 500 azalea bushes, some over a century old, "Shakunage-dera" is a popular destination, especially in spring (mid to late April), when visitors flock to see the azaleas bloom.`,
    routeDetailLocation: "Jinkaku Temple",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
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
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: undefined,
    }, // image
    routeDetailDescription: `Eboshi-dake Jōsui-ji is a temple located on the eastern slopes of Mt. Eboshi, traditionally founded by Ōtomo Yoriyasu, the third leader of the Ōtomo clan. It was originally dedicated to the protection of horses and cattle and features a horse-headed Kannon (Goddess of Mercy). Although the main hall was destroyed by fire in 1977, the main deity, the horse-headed Kannon, survived and is now housed in the rebuilt hall.\r\rEboshi Park, located on the eastern side of Mt. Eboshi, is situated within the grounds of Jousui Temple, believed to have been established by Oita Yoruyasu. The park is renowned for its cherry blossoms and is a prominent cherry blossom viewing spot in the prefecture.\r\rDuring the blooming season, the park showcases the elegant beauty of peony cherry blossoms (botanzakura), known for their deep pink flowers that form in dense clusters. These blossoms are distinctive for their long blooming period, typically occurring from mid-April to early May.`,
    routeDetailLocation: "Eboshi Park",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
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
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "image3",
    }, // image
    routeDetailDescription: `Established in 1904, this sake brewery offers a unique experience. You can participate in a rice cooking experience using their traditional kamado (stove). Learn how to start a fire, the tips for cooking rice, and how to adjust the flames. After about 20 minutes, the rice will be ready to enjoy. You can savor this rice in the brewery's tatami room alongside local delicacies. Reservations are required.`,
    routeDetailLocation: "Muretsuru Sake Brewery",
    routeDetailAddress: "570 Ichimanda, Asaji, Bungo-ono City, Oita Prefecture",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateRouteDetailId(),
    stop: generateStopId(),
    routeDetailTime: "9:00\nam",
    routeDetailName: "Chinda Falls",
    routeDetailStoryTitle: "The Legend of Chinda Falls",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Chinda Waterfall, located within the Ōita Bungo-Ōno Geopark, is renowned as the inspiration for the "Shintsudanotaki Waterfall" ink wash painting by the Muromachi period master Sesshū Tōyō. It is also recognized as a National Registered Monument.\r\rThe waterfall consists of two main cascades: the "Ōtaki" (male waterfall) on the main stream of the Ōno River and the "Mesaki" (female waterfall) on the Hirai River, a tributary. The Ōtaki is notable for its layered appearance, with a width of 100 meters and a height of 20 meters, offering a striking visual display. The site is a favorite for visitors and photographers for its captivating views.\r\rNearby stands the Shintsudanotaki Hydroelectric Plant, a stone-built structure from the Meiji period, which is now a Modern Cultural Heritage site, contributing to the area's historical importance.\r\rHistorical records in "Bungo Kokushi" (豊後国志) note the waterfall basin as a dangerous place, with a saying that it was immeasurably deep. The Ōka Domain used a trial called "Chinda Otoshi" (沈堕落とし) to determine guilt or innocence by throwing defendants into the waterfall basin. If they managed to swim out safely, they were considered innocent. Remarkably, only one person is known to have survived this trial.`,
    routeDetailLocation: "Chinda Falls",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
];

export const routeDestinations2: RouteDestinations[] = [];

for (let i = 0; i < 6; i++) {
  routeDestinations2.push({
    destinationId: generateDestinationId(),
    stopId: routeDetails2[i]?.stop,
    routeDetailId: routeDetails2[i]?.routeDetailId,
    destinationName: routeDetails2[i]?.routeDetailName,
    destinationImage: routeDetails2[i]?.routeDetailBigImage,
    modelRouteLink: routeDetails2[i]?.modelRouteLink,
  });
}
