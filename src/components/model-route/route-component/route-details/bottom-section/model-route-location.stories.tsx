import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteLocation from "./model-route-location";
import type { RouteDetails } from "@/types/model-route-type";

const meta = {
    title: "ModelRoute/RouteDetails/ModelRouteLocation",
    component: ModelRouteLocation,
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
} satisfies Meta<typeof ModelRouteLocation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRouteDetails: RouteDetails = {
    routeDetailId: "route1",
    stop: "STOP 1",
    routeDetailTime: "30 mins",
    routeDetailName: "Harajiri Waterfall",
    routeDetailStoryTitle: "Nature's Power",
    routeDetailBigImage: "/image/model-route/1/harajiri-fall/1.jpg",
    routeDetailDescription: "A stunning waterfall in Bungo Ono City",
    routeDetailLocation: "Bungo Ono City, Oita Prefecture",
    routeDetailAddress: "Harajiri Falls Park, 1648-1 Ogata, Bungo Ono",
    routeHashtag: ["#HarajiriFalls", "#BungoOno", "#JapaneseNiagara"],
    visualNovelLink: "/stories/bungo-ono/chapter1",
    modelRouteLink: "/model-route/harajiri-falls",
    routeDetailSmallImage: {
        image1: "/image/model-route/1/harajiri-fall/1.jpg",
        image2: "/image/model-route/1/harajiri-fall/1.jpg",
        image3: "/image/model-route/1/harajiri-fall/1.jpg",
    },
};

export const Default: Story = {
    args: {
        routeDetails: mockRouteDetails,
    },
};

export const LongLocation: Story = {
    args: {
        routeDetails: {
            ...mockRouteDetails,
            routeDetailLocation: "Bungo Ono City Historical District, Oita Prefecture, Kyushu Region",
            routeDetailAddress: "Harajiri Falls Historical Park, 1648-1 Ogata, Bungo Ono City, Oita Prefecture 879-7111",
        },
    },
};

export const WithMultipleHashtags: Story = {
    args: {
        routeDetails: {
            ...mockRouteDetails,
            routeHashtag: [
                "#HarajiriFalls",
                "#BungoOno",
                "#JapaneseNiagara",
                "#OitaPrefecture",
                "#JapanTravel",
                "#WaterfallLovers",
            ],
        },
    },
}; 