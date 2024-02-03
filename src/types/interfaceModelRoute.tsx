export interface ModelRouteSelection {
  areaId: string;
  areaName: string;
  image: string;
  isOpen: boolean;
  modelRoute: ModelRoute[] | undefined;
}

export interface ModelRoute {
  modelRouteId: string;
  placeName: string;
  modelRouteName: string;
  recommendation: string[];
  routeDestinations: RouteDestinations[] | undefined;
  routeDetails: RouteDetails[] | undefined;
}

export interface RouteDestinations {
  destinationId: string; //stop 1
  destinationName: string; // Harajiri Falls
  destinationImage: string;
  visualNovelLink: string;
}

export interface RouteDetails {
  routeDetailId: string; // stop 1
  routeDetailTime: string; // 9am
  routeDetailName: string; // Harajiri Falls
  routeDetailStoryTitle: string; // Harajiri Falls
  visualNovelLink: string; // Revisit the story
  routeDetailBigImage: string; // image
  routeDetailSmallImage: {
    image1: string;
    image2: string;
    image3?: string;
  }; // image
  routeDetailDescription: string; // description
  routeDetailLocation: string; // location
  routeDetailAddress: string; // address
  routeHashtag: string[]; // hashtag
}

//   // ModelRoutePage
//   1. ModelRouteIntro.tsx
//       - IntroUpperSection.tsx
//       - Recommendation.tsx
//   2. RouteDestination.tsx
//   3. ModelRouteCard.tsx
//       - IntroUpperSection.tsx
//   　- ModelRouteDescription.tsx
//       - ModelRouteCardImage.tsx
//     - ModelRouteLocation.tsx
