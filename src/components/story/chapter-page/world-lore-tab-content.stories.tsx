import type { Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";
import { WorldLoreTabContent } from "./world-lore-tab-content";

const meta = {
	title: "Components/Story/ChapterPage/WorldLoreTabContent",
	component: WorldLoreTabContent,
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<SWRConfig value={{ dedupingInterval: 0 }}>
				<Story />
			</SWRConfig>
		),
	],
} satisfies Meta<typeof WorldLoreTabContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		storyChapterId: "test-chapter-id",
	},
};

export const Loading: Story = {
	args: {
		storyChapterId: undefined,
	},
};

export const WithMockData: Story = {
	args: {
		storyChapterId: "chapter-with-spots",
	},
	parameters: {
		msw: {
			handlers: [
				{
					method: "GET",
					path: "/api/tourist-spots/by-chapter/:storyChapterId",
					resolver: () => {
						return new Response(
							JSON.stringify([
								{
									touristSpotId: "spot-1",
									storyChapterId: "chapter-with-spots",
									touristSpotName: "Harajiri Falls",
									touristSpotDesc:
										"Known as the 'Niagara of the East', Harajiri Falls is a magnificent 20-meter high, 120-meter wide waterfall located in Bungo-ono City, Oita Prefecture.",
									bestVisitTime: "Spring and Autumn",
									address:
										"Harajirinotaki, Ogata, Bungo-ono, Oita 879-6631, Japan",
									touristSpotLatitude: 32.9833,
									touristSpotLongitude: 131.4167,
									touristSpotHashtag: ["waterfall", "nature", "oita", "scenic"],
									imageSet: {
										main: "/api/placeholder/800/400",
										small: [
											"/api/placeholder/400/300",
											"/api/placeholder/400/300",
										],
									},
									weatherInfo: {
										temperatureCelsius: 22,
										weatherName: "Partly Cloudy",
										weatherDesc: "Pleasant weather with occasional clouds",
									},
								},
								{
									touristSpotId: "spot-2",
									storyChapterId: "chapter-with-spots",
									touristSpotName: "Mount Aso",
									touristSpotDesc:
										"One of the world's largest active volcanoes with a spectacular caldera spanning 25km north to south.",
									bestVisitTime: "May to October",
									address: "Aso, Kumamoto Prefecture, Japan",
									touristSpotLatitude: 32.8847,
									touristSpotLongitude: 131.1041,
									touristSpotHashtag: [
										"volcano",
										"nature",
										"kumamoto",
										"hiking",
									],
									storyChapterLink: "https://example.com/mount-aso-story",
								},
							]),
							{
								status: 200,
								headers: {
									"Content-Type": "application/json",
								},
							},
						);
					},
				},
			],
		},
	},
};

export const Empty: Story = {
	args: {
		storyChapterId: "chapter-no-spots",
	},
	parameters: {
		msw: {
			handlers: [
				{
					method: "GET",
					path: "/api/tourist-spots/by-chapter/:storyChapterId",
					resolver: () => {
						return new Response(JSON.stringify([]), {
							status: 200,
							headers: {
								"Content-Type": "application/json",
							},
						});
					},
				},
			],
		},
	},
};

export const ChapterError: Story = {
	args: {
		storyChapterId: "chapter-error",
	},
	parameters: {
		msw: {
			handlers: [
				{
					method: "GET",
					path: "/api/tourist-spots/by-chapter/:storyChapterId",
					resolver: () => {
						return new Response(
							JSON.stringify({ error: "Failed to load tourist spots" }),
							{
								status: 500,
								headers: {
									"Content-Type": "application/json",
								},
							},
						);
					},
				},
			],
		},
	},
};
