import type { RouteDestinations, RouteDetails } from "@/types/model-route-type";

let stopNumber = 0;

function generateStopId() {
	stopNumber = stopNumber + 1;
	return `stop ${stopNumber}`;
}

let number = 21;

function generateRouteDetailId() {
	number = number + 1;
	return `RouteDetail ${number}`;
}

let destinationNumber = 21;

function generateDestinationId() {
	destinationNumber = destinationNumber + 1;
	return `destination${destinationNumber}`; //reach 21
}

let chapterNumber = 32;

function generateChapterId() {
	chapterNumber = chapterNumber + 1;
	return `bungoOnoChapterId${chapterNumber}`;
}

let chapterImageNumber = 31;

function generateChapterImageId() {
	chapterImageNumber = chapterImageNumber + 1;
	return `chapter${chapterImageNumber}.png`; //reach chapter 31
}

export const routeDetails4: RouteDetails[] = [
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Uchida Shrine",
		routeDetailStoryTitle: "Guidance at Uchida Shrine",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/4/uchida-shrine/1.jpg",
			image2: "/image/model-route/4/uchida-shrine/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Long ago, during the Genpei War, nine women from the defeated Heike clan sought refuge on their way to Hyuga (present-day Miyazaki Prefecture) and stayed with the Yubu family in the village of Uchida. Upon realizing the remaining journey was perilous and that Genji clan troops were in pursuit, the women, in despair, drowned themselves in a nearby spring the next morning. Shocked by what happened, the Yubu couple was overcome with grief and also threw themselves into the spring. Though the spring is now largely obscured by fields, the shrine (called "Yoshii Daimyojin”) remains a revered part of the Uchida district, preserving this legend.`,
		routeDetailLocation: "Uchida Shrine",
		routeDetailAddress: "Miemachi Uchida, Bungoono, Oita 879-7125, Japan",
		routeHashtag: ["#HistoricShrines", " #LegendarySites"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Mount Atago",
		routeDetailStoryTitle: "Mount Atago's Enigmatic Encounter",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/4/mount-atago/1.jpg",
			image2: "/image/model-route/4/mount-atago/2.jpg",
			image3: "image3",
		},
		routeDetailDescription: `Mount Atago, located in the central part of Nobeoka City, 251 meters above sea level, offers a breathtaking observatory with views of the city, Hyuga-nada Sea, and Shikoku Island on clear days. Its night view is recognized as one of Japan's "Night View Heritage Sites," a unique accolade in Miyazaki Prefecture. It was also known as Cape Kasasa in ancient times as the legendary meeting place of deities Ninigi and Konohananosakuya-hime.`,
		routeDetailLocation: "Mount Atago",
		routeDetailAddress: "Atagoyama, Nobeoka, Miyazaki 882-0871, Japan",
		routeHashtag: ["#ScenicViews", " #NatureEscapes"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Hyuga",
		routeDetailStoryTitle: "Hyuga and the Heike Clan Spirits",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/4/hyuga/1.jpg",
			image2: "/image/model-route/4/hyuga/2.jpg",
			image3: undefined,
		},
		routeDetailDescription: `Hyuga City, situated in Miyazaki Prefecture just south of Nobeoka, is a small port city nestled between the Kyushu Mountains and the Hyuga Sea. The area along the Cape of Hyuga features unique hexagonal pillar rocks and a distinctive ria coastline, designated as part of the Nippo-Kaigan Quasi-National Park. South of this region are renowned surfing beaches like Ise-ga-hama, Okura-ga-hama, and Kane-ga-hama.\r\rAccording to legend, Hyuga is significant in Japanese history as the residence of Ninigi, the grandson of the Sun goddess, and the starting point for his grandson Jimmu's conquest, who became the first Emperor of Japan.`,
		routeDetailLocation: "Hyuga",
		routeDetailAddress: "Hyuga, Miyazaki 883-0000, Japan ",
		routeHashtag: ["#CoastalBeauty", " #CulturalHeritage"],
	},
	{
		routeDetailId: generateRouteDetailId(),
		stop: generateStopId(),
		routeDetailTime: "9:00\nam",
		routeDetailName: "Omi Shrine",
		routeDetailStoryTitle: "A Beacon of Hope",
		visualNovelLink: `/touriiverse/bungo-ono/${generateChapterId()}`,
		modelRouteLink: "",
		routeDetailBigImage: `/image/touriiverse/bungo-ono/${generateChapterImageId()}`,
		routeDetailSmallImage: {
			image1: "/image/model-route/4/omi-shrine/1.jpeg",
			image2: "/image/model-route/4/omi-shrine/2.jpg",
			image3: "/image/model-route/4/omi-shrine/3.jpeg",
		},
		routeDetailDescription: `Ōmi Shrine is affectionately known as 'Hyūga's Ise-sama'.\r\rBuilt atop a columnar rock offering a breathtaking view of the great ocean, Ōmi Shrine was formerly called Amaterasu Kōtai Jingū. It is said that the heavenly grandchild, Ninigi-no-Mikoto, enshrined the ancestral deity Amaterasu Ōmikami here, praying for peace. Additionally, it is reported that Emperor Jimmu, during his eastern expedition, visited this shrine to pray for lasting military fortune and safe voyages.`,
		routeDetailLocation: "Omi Shrine",
		routeDetailAddress: "1 Hichiya, Hyuga, Miyazaki 883-0062, Japan",
		routeHashtag: ["#SpiritualSites", " #OceanViews"],
	},
];

export const routeDestinations4: RouteDestinations[] = [];

for (let i = 0; i < 4; i++) {
	routeDestinations4.push({
		destinationId: generateDestinationId(),
		stopId: routeDetails4[i]?.stop,
		routeDetailId: routeDetails4[i]?.routeDetailId,
		destinationName: routeDetails4[i]?.routeDetailName,
		destinationImage: routeDetails4[i]?.routeDetailSmallImage.image1,
		modelRouteLink: routeDetails4[i]?.modelRouteLink,
		destinationDescription: routeDetails4[i]?.routeDetailDescription,
	});
}
