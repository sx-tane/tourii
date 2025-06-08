import type { Meta, StoryObj } from "@storybook/react";
import RouteDestination from "./route-destination";
import type { TouristSpotResponseDto } from "@/api/generated";

const meta = {
	title: "Model Route/RouteDetailPage/RouteDestination",
	component: RouteDestination,
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
} satisfies Meta<typeof RouteDestination>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDestinations: TouristSpotResponseDto[] = [
	{
		touristSpotId: "dest1",
		touristSpotName: "Harajiri Falls",
		imageSet: {
			main: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop",
			small: [
				"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "A stunning waterfall in Bungo Ono City",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
	{
		touristSpotId: "dest2",
		touristSpotName: "Ninomiya Shrine",
		imageSet: {
			main: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
			small: [
				"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "Historic shrine with beautiful architecture",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
	{
		touristSpotId: "dest3",
		touristSpotName: "Miyazako Stone Buddha",
		imageSet: {
			main: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1920&h=1080&fit=crop",
			small: [
				"https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "Ancient stone carvings in the cliff face",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
	{
		touristSpotId: "dest4",
		touristSpotName: "Miyazako Stone Buddha",
		imageSet: {
			main: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1920&h=1080&fit=crop",
			small: [
				"https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "Ancient stone carvings in the cliff face",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
	{
		touristSpotId: "dest5",
		touristSpotName: "Miyazako Stone Buddha",
		imageSet: {
			main: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&h=1080&fit=crop%3D",
			small: [
				"https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "Ancient stone carvings in the cliff face",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
	{
		touristSpotId: "dest6",
		touristSpotName: "Miyazako Stone Buddha",
		imageSet: {
			main: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080&fit=crop",
			small: [
				"https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080&fit=crop",
				"https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080&fit=crop",
			],
		},
		touristSpotDesc: "Ancient stone carvings in the cliff face",
		bestVisitTime: "All year round",
		address: "Bungo Ono City, Kumamoto Prefecture, Japan",
		touristSpotLatitude: 32.9783415,
		touristSpotLongitude: 131.5843317,
		touristSpotHashtag: ["#harajiri", "#waterfall", "#nature"],
		storyChapterId: "story1",
		storyChapterLink: "/story/harajiri-falls",
	},
];

export const SixDestinations: Story = {
	args: {
		touristSpotList: mockDestinations,
	},
};

export const ThreeDestinations: Story = {
	args: {
		touristSpotList: mockDestinations.slice(0, 3),
	},
};

export const TwoDestinations: Story = {
	args: {
		touristSpotList: mockDestinations.slice(0, 2),
	},
};

export const SingleDestination: Story = {
	args: {
		touristSpotList: mockDestinations.slice(0, 1),
	},
};

export const WithLongNames: Story = {
	args: {
		touristSpotList: mockDestinations.map((dest) => ({
			...dest,
			touristSpotName: `Historic ${dest.touristSpotName} Cultural Heritage Site`,
		})),
	},
};
