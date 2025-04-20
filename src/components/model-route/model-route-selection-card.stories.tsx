import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteSelectionCard from "./model-route-selection-card";
import type { ModelRoute, ModelRouteSelection } from "@/types/model-route-type";

const meta = {
    title: "ModelRoute/ModelRouteSelectionCard",
    component: ModelRouteSelectionCard,
    parameters: {

        backgrounds: {
            default: "light",
            values: [
                {
                    name: "light",
                    value: "#E3E3DC",
                },
            ],
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ModelRouteSelectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockModelRoutes: ModelRoute[] = [
    {
        modelRouteId: "route1",
        placeName: "Bungo Ono",
        modelRouteName: "Historical Journey",
        recommendation: ["History Lovers", "Nature Enthusiasts"],
        routeDestinations: [],
        routeDetails: [],
    },
    {
        modelRouteId: "route2",
        placeName: "Bungo Ono",
        modelRouteName: "Nature Trail",
        recommendation: ["Outdoor Activities", "Photography"],
        routeDestinations: [],
        routeDetails: [],
    },
];

const mockModelRouteSelection: ModelRouteSelection = {
    areaId: "area1",
    areaName: "Bungo Ono City",
    image: "/image/model-route/bungo-ono.jpg",
    isOpen: true,
    modelRoute: mockModelRoutes,
};

export const OpenWithRoutes: Story = {
    args: {
        modelRouteSelection: mockModelRouteSelection,
    },
};

export const OpenWithSingleRoute: Story = {
    args: {
        modelRouteSelection: {
            ...mockModelRouteSelection,
            modelRoute: mockModelRoutes.slice(0, 1),
        },
    },
};

export const ComingSoon: Story = {
    args: {
        modelRouteSelection: {
            ...mockModelRouteSelection,
            isOpen: false,
            modelRoute: undefined,
        },
    },
};

export const WithLongAreaName: Story = {
    args: {
        modelRouteSelection: {
            ...mockModelRouteSelection,
            areaName: "Bungo Ono Historical District and Cultural Center",
        },
    },
}; 