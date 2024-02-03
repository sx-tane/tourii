import {
  type RouteDetails,
  type RouteDestinations,
} from "@/types/interfaceModelRoute";

let number = 0;

function generateStoryId() {
  number = number + 1;
  return `stop ${number}`;
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
  return `chapterId${chapterNumber}`;
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
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Harajiri Falls",
    routeDetailStoryTitle: "The Ancient Fire Rising from the Timeless Waters",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "https://www.tanejp.com/route/harajiri-route",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Harajiri Falls is known as the "Niagara of the East", is a 120m wide and 20m high waterfall that forms a stunning arc over the Ogata River in a peaceful agricultural area. It has played a significant role in the region's history, culture, and industry, with its influence evident in local structures like shrines, waterways, and stone bridges. During spring, the surroundings are adorned with blooming tulip.\r\r The Komatsu Fire Festival (小松明火祭り) is an annual event on August 14th, commemorating a 300-year-old peasant uprising in Ogata Township due to harsh tax collections despite crop failures. These torches, approximately 1.5 meters long, are attached to bamboo sticks or oil-filled cans with wicks as a tribute to the historical event and to pray for a good harvest and protection against pests. It is said to have started in 1759.`,
    routeDetailLocation: "Harajiri Falls",
    routeDetailAddress: "410 Ogatamachi Harajiri, Bungoono, Oita",
    routeHashtag: ["#waterfall", "#rafting"],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Ninomiya Hachiman Shrine",
    routeDetailStoryTitle: "The Abode of the Mighty Bonjin warrior",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Ninomiya Hachiman Shrine, situated 300 meters up a hillside and surrounded by forest, dates back over 800 years to the late Heian Period. It was founded by Ogata No Saburo Koreyoshi, a noble warrior from around 1100 to 1200 AD, who played a key role in establishing the Kamakura shogunate and commanded the largest military forces in Kyūshū according to The Tale of the Heike.\r\rSaburo is said to be a descendant of the serpent deity Oodamaki, worshipped at the Anamori Shrine. According to legend, Saburo shot three arrows into the sky, and where they landed, shrines were built, including Ninomiya Hachiman dedicated to him, and two others, Ichinomiya Hachiman and Sannomiya Hachiman.\r\rThis entire area is blessed with water and is a rich rice-producing region. There is a festival called the 緒方三社川越しまつり・Ogata Sansha Kawagoe-shi Matsuri and is now held in gratitude for water and for a bountiful harvest.\r\rThe Kawagoe Festival, a key component of the Ogata Sansha Festival, celebrates three shrines established by the local warlord Ogata Saburo Koreyoshi: Ichinomiya, Ninomiya, and Sannomiya Shrines, representing the divine family of Emperor Nakatsu (father), Emperor Ojin (child), and Empress Jingu (mother), respectively. The festival's highlight is the ceremonial gathering of portable shrines from Ichinomiya and Sannomiya at Ninomiya Shrine, symbolizing a familial reunion. A notable ritual involves young men braving the cold to carry the portable shrine across the Ogata River to Ninomiya Shrine, marking a vibrant tradition celebrated annually around the lunar mid-October.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Miyazaki East and West Stone Carved Buddha Cliff",
    routeDetailStoryTitle: "Buddhas of Past, Present, and Future",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `In Ogata Town, Bungo Oono City, Oita Prefecture, there is a nationally designated historic site known as the "Miyasako Higashi (East) and Nishi (West) Stone Buddhas." These ancient stone-carved Buddhist images, called "magaibutsu," are believed to have been created between the late Heian and early Kamakura periods. They are associated with Ogata Koreyoshi, a medieval ruler of the Ogata Shou region.\r\rThe "Miyasako Higashi (East) Stone Buddha" is located 150 meters uphill to the right from the parking area. It features a depiction of Dainichi Nyorai (Mahavairocana) at the center, with Fudo Myo-o to the right, and Bishamonten on the left. Additionally, Kongorikishi (Guardians of Buddhism) statues are present, and two magaibutsu pagodas are on the left side.\r\rThe "Miyasako Nishi (West) Stone Buddha" is situated approximately 200 meters uphill to the left from the parking area. It dates back to the end of the Heian period and features three Nyorai images: Yakushi Nyorai, Shaka Nyorai, and Amida Nyorai, each associated with various blessings and merits.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Ozaki Stone Bath Cave",
    routeDetailStoryTitle: "The Forgotten Healing Magic",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "https://www.tanejp.com/route/ogata-route",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `The "Enseki" in Ogata is a two-tiered stone bath carved into volcanic tuff rock in the early 17th century. It features a 2-meter-high, 80-centimeter-wide horizontal hole, with the upper tier being a 4-square-meter bathing area with a 1.5-meter ceiling. The lower-level fire chamber burns firewood, and the hot stone floor is covered with a medicinal herb called "Ishiko" before water is poured on to create steam. A "Mushiro" curtain is hung at the entrance for bathers to enter.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Lodge Kiyokawa",
    routeDetailStoryTitle: "A Mystical Sanctuary, Cradled by Forests and River",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "https://www.tanejp.com/route/lodge-kiyokawa-route",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Located in the more remote part of Oita prefecture, Bungo Ono, the surrounding beauty of nature will take your breath away. With rivers, waterfalls, mountains, and vast forests, the possibilities to explore are endless and will be sure to make your trip something you will never forget.\r\rLodge Kiyokawa located right beside an emerald green river, taking in all of this ample nature is pure and simple. Just walk outside of your rooms and there you are, in the middle of it all.`,
    routeDetailLocation: "Lodge Kiyokawa",
    routeDetailAddress: "158 Kiyokawamachi Utaeda, Bungoono, Oita",
    routeHashtag: ["#sauna", "#tent"],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Udahime Shrine",
    routeDetailStoryTitle: "A Princess's Distress",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Located approximately 1 kilometer from the "Michi-no-Eki" (Roadside Station) on the way to Mount Ontake, "Uda-hime Shrine" can be found along the road.\r\rAn explanatory board on the right side of the stone steps leading to the shrine provides an overview. The shrine is dedicated to the deity Hana-no-Moto, but the springwater within the shrine is considered the true deity and is linked to the goddess. Legend has it that this sacred spring flows through a cave to the Ubagamine Grotto at the base of Mount Sobo. The shrine has a rich history and is associated with the birth of the military commander Oomi Yorimitsu.\r\rThe romantic and mystical legend of Princess Hana-no-Moto, which appears in the historical chronicle "Genpei Seisuiki" (The Rise and Fall of the Minamoto and Taira Clans), has been passed down through generations.\r\rAdditionally, this site is renowned for being one of Japan's "100 Best Waters," with water emerging from the mountains.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Kashima Shrine",
    routeDetailStoryTitle: "Awakening The Sumo Kami",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Autumn Festival (秋祭り): Celebrated annually on October 10th at the 鹿島宮 Kashima Shrine in Usuo, this festival involves dedicating Kagura (a traditional Shinto theatrical dance) performances to the deities, offering a cultural experience for locals and visitors, with a focus on worshiping 建御雷之男神 Takemikazuchi.\r\rKagura Hall Regular Performances (神楽会館定期公演): The Kagura Hall in Kiyokawa hosts regular Kagura performances, occurring approximately once a month. These performances provide an opportunity for the audience to witness the art of Kagura up close, allowing them to experience the mystical world of ancient gods and spirits.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
  {
    routeDetailId: generateStoryId(),
    routeDetailTime: "9.00\nam",
    routeDetailName: "Anamori Shrine",
    routeDetailStoryTitle: "The Rouge Serpent God",
    visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
    modelRouteLink: "",
    routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
    routeDetailSmallImage: {
      image1: "/image/homepage/tourii_main.png",
      image2: "/image/homepage/tourii_main.png",
      image3: "/image/homepage/tourii_main.png",
    }, // image
    routeDetailDescription: `Anamori Shrine, located in a cave, is famous as the birthplace of the Odamaki legend from "Heike Monogatari" (The Tale of the Heike). It's associated with a serpent deity and linked to the birthplace of Ogata Saburo Yoshie, who built Okajo Castle in Taketa.\r\rThe legend includes Ogata Saburo's (Odamaki's) exploits during the Genpei War and a divine marriage between Ubatake Daimyojin and Hana no Omoto Hime, the "Utahime." The cave at Anamori Shrine is thought to be connected to another cave at the Uda Hime Shrine.\r\rAnamori Shrine is now a popular site for those seeking love and blessings, with a tradition of taking and returning stones from the cave for fertility and prosperity.`,
    routeDetailLocation: "",
    routeDetailAddress: "",
    routeHashtag: ["", ""],
  },
];

export const routeDestinations1: RouteDestinations[] = [];

for (let i = 0; i < 8; i++) {
  routeDestinations1.push({
    destinationId: generateDestinationId(),
    stopId: routeDetails1[i]?.routeDetailId,
    destinationName: routeDetails1[i]?.routeDetailName,
    destinationImage: routeDetails1[i]?.routeDetailSmallImage.image1,
    modelRouteLink: routeDetails1[i]?.modelRouteLink,
  });
}
