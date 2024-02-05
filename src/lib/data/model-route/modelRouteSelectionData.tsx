import {
  type ModelRoute,
  type ModelRouteSelection,
} from "@/types/interfaceModelRoute";
import { routeDestinations1, routeDetails1 } from "./modelRouteData1";
import { routeDestinations2, routeDetails2 } from "./modelRouteData2";
import { routeDestinations3, routeDetails3 } from "./modelRouteData3";
import { routeDestinations4, routeDetails4 } from "./modelRouteData4";

//4 Model Route
export const modelRouteData: ModelRoute[] = [
  {
    modelRouteId: "1",
    placeName: "BUNGO ONO",
    modelRouteName: "The Awakening Route",
    recommendation: [
      "Ideal for First Time Visitors",
      "A good mix of nature and culture",
      "Local Food",
    ],
    routeDestinations: routeDestinations1,
    routeDetails: routeDetails1,
  },
  {
    modelRouteId: "2",
    placeName: "BUNGO ONO",
    modelRouteName: "The Discovery Route",
    recommendation: ["Local Food", "Local Hidden Legends", "Nature"],
    routeDestinations: routeDestinations2,
    routeDetails: routeDetails2,
  },
  {
    modelRouteId: "3",
    placeName: "BUNGO ONO",
    modelRouteName: "The Esoteric Side of Bungo Ono Route",
    recommendation: [
      "Unique Festivals",
      "interested in Esoteric Aspects",
      "Local Food",
    ],
    routeDestinations: routeDestinations3,
    routeDetails: routeDetails3,
  },
  {
    modelRouteId: "4",
    placeName: "BUNGO ONO",
    modelRouteName: "The Linking Route",
    recommendation: [
      "Travelers Heading Southwards",
      "Local Food",
      "Local Hidden Legends",
    ],
    routeDestinations: routeDestinations4,
    routeDetails: routeDetails4,
  },
];

//1 Model Route Selection
export const modelRouteSelectionData: ModelRouteSelection[] = [
  {
    areaId: "areaId0",
    areaName: "BUNGO ONO",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    isOpen: true,
    modelRoute: modelRouteData,
  },
  {
    areaId: "areaId1",
    areaName: "Coming soon",
    image: "/image/touriiverse/bungo-ono/harajiri-fall.jpeg",
    isOpen: false,
    modelRoute: undefined,
  },
];
