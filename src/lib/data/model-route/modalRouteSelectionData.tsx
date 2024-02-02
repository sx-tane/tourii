import {
  type ModelRoute,
  type ModelRouteSelection,
} from "@/types/interfaceModelRoute";
import { routeDestinations1, routeDetails1 } from "./modelRouteData";

//4 Model Route
export const modelRouteData: ModelRoute[] = [
  {
    modelRouteId: "1",
    modelRouteName: "",
    recommendation: [""],
    routeDestinations: routeDestinations1,
    routeDetails: routeDetails1,
  },
  {
    modelRouteId: "2",
    modelRouteName: "",
    recommendation: [""],
    routeDestinations: undefined,
    routeDetails: undefined,
  },
  {
    modelRouteId: "3",
    modelRouteName: "",
    recommendation: [""],
    routeDestinations: undefined,
    routeDetails: undefined,
  },
  {
    modelRouteId: "4",
    modelRouteName: "",
    recommendation: [""],
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
