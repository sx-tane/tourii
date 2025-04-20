import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteIntro from "./model-route-intro";
import type { ModelRoute } from "@/types/model-route-type";

const meta = {
    title: "ModelRoute/RouteComponent/ModelRouteIntro",
    component: ModelRouteIntro,
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
} satisfies Meta<typeof ModelRouteIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockModelRoute: ModelRoute = {
    modelRouteId: "route1",
    placeName: "Bungo Ono",
    modelRouteName: "Historical Journey Through Time",
    recommendation: ["History Lovers", "Nature Enthusiasts"],
    routeDestinations: [],
    routeDetails: [],
};

export const Default: Story = {
    args: {
        modelRoute: mockModelRoute,
    },
};

export const WithLongName: Story = {
    args: {
        modelRoute: {
            ...mockModelRoute,
            modelRouteName: "A Historical Journey Through Time and Culture in Bungo Ono",
        },
    },
};

export const WithMultipleRecommendations: Story = {
    args: {
        modelRoute: {
            ...mockModelRoute,
            recommendation: [
                "History Lovers",
                "Nature Enthusiasts",
                "Photography",
                "Cultural Experience",
                "Adventure Seekers",
            ],
        },
    },
};

export const WithShortName: Story = {
    args: {
        modelRoute: {
            ...mockModelRoute,
            modelRouteName: "Quick Tour",
            recommendation: ["Beginners", "Families"],
        },
    },
}; 