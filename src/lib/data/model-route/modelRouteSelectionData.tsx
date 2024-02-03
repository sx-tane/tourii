import {
  type ModelRoute,
  type ModelRouteSelection,
} from "@/types/interfaceModelRoute";
import { routeDestinations1, routeDetails1 } from "./modelRouteData1";

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
    routeDestinations: undefined,
    routeDetails: undefined,
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
    routeDestinations: undefined,
    routeDetails: undefined,
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
    routeDestinations: undefined,
    routeDetails: undefined,
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
