import type { Meta, StoryObj } from "@storybook/react";
import SpotDetailSidebar from "./spot-detail-sidebar";
import type {
	TouristSpotResponseDto,
	LocationInfoResponseDto,
} from "@/api/generated";

// Mock Google Places location info data
const mockGooglePlacesData: LocationInfoResponseDto = {
	name: "Senso-ji Temple",
	formattedAddress: "2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
	phoneNumber: "+81 3-3842-0181",
	website: "https://www.senso-ji.jp/",
	rating: 4.3,
	googleMapsUrl: "https://maps.google.com/?cid=12345",
	openingHours: [
		"Monday: 6:00 AM – 5:00 PM",
		"Tuesday: 6:00 AM – 5:00 PM",
		"Wednesday: 6:00 AM – 5:00 PM",
		"Thursday: 6:00 AM – 5:00 PM",
		"Friday: 6:00 AM – 5:00 PM",
		"Saturday: 6:00 AM – 5:00 PM",
		"Sunday: 6:00 AM – 5:00 PM",
	],
	images: [
		{
			url: "https://lh3.googleusercontent.com/places/photo1",
			width: 400,
			height: 400,
			photoReference: "photo-ref-1",
		},
		{
			url: "https://lh3.googleusercontent.com/places/photo2",
			width: 400,
			height: 400,
			photoReference: "photo-ref-2",
		},
		{
			url: "https://lh3.googleusercontent.com/places/photo3",
			width: 400,
			height: 400,
			photoReference: "photo-ref-3",
		},
	],
};

const meta: Meta<typeof SpotDetailSidebar> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/SpotDetailSidebar",
	component: SpotDetailSidebar,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
SpotDetailSidebar displays detailed information about a selected tourist spot, including:

- **Google Places Integration**: Automatically fetches high-quality images and additional location data from Google Places API
- **Image Fallback System**: Uses Google Places images when available, falls back to local images from the tourist spot data
- **Location Information**: Shows address, best visit time, weather, and other relevant details
- **Interactive Elements**: Links to story chapters and quest buttons
- **Responsive Design**: Optimized for different screen sizes

**Note**: The Google Places API integration is mocked in Storybook. In the actual application, the component uses the \`getLocationInfo\` hook to fetch real data from Google Places API.
				`,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		selectedSpot: {
			description:
				"Tourist spot data to display. When undefined, shows empty state.",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SpotDetailSidebar>;

// Mock tourist spot data
const mockTouristSpot: TouristSpotResponseDto = {
	touristSpotId: "spot-1",
	storyChapterId: "chapter-1",
	touristSpotName: "Senso-ji Temple",
	touristSpotDesc:
		"Tokyo's oldest temple, Senso-ji, is a magnificent Buddhist temple located in Asakusa. Dating back to 628 AD, this ancient temple is dedicated to Kannon, the Buddhist goddess of mercy. The temple complex features beautiful traditional architecture, peaceful gardens, and the famous Thunder Gate entrance.",
	bestVisitTime: "Early morning (6:00-8:00 AM)",
	address: "2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
	touristSpotLatitude: 35.7148,
	touristSpotLongitude: 139.7967,
	touristSpotHashtag: [
		"temple",
		"historic",
		"cultural",
		"traditional",
		"peaceful",
	],
	storyChapterLink: "/v2/stories/tokyo-saga/senso-ji-chapter",
	imageSet: {
		main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
		small: [
			"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=300&fit=crop",
		],
	},
	weatherInfo: {
		temperatureCelsius: 22,
		weatherName: "Sunny",
		weatherDesc: "Clear sky with light breeze",
	},
};

export const Default: Story = {
	args: {
		selectedSpot: mockTouristSpot,
	},
};

export const NoSelection: Story = {
	args: {
		selectedSpot: undefined,
	},
};

export const WithoutImage: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			imageSet: undefined,
		},
	},
};

export const WithoutWeather: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			weatherInfo: undefined,
		},
	},
};

export const WithoutStoryLink: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			storyChapterLink: undefined,
		},
	},
};

export const WithoutBestTime: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			bestVisitTime: "",
		},
	},
};

export const MinimalContent: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotDesc: "A simple temple.",
			touristSpotHashtag: ["temple"],
			imageSet: {
				main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
				small: [],
			},
			weatherInfo: undefined,
			storyChapterLink: undefined,
			bestVisitTime: "",
		},
	},
};

export const LongContent: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotName:
				"Very Long Temple Name That Might Wrap to Multiple Lines",
			touristSpotDesc:
				"This is a very long description that demonstrates how the component handles extensive text content. The temple has a rich history spanning over 1400 years, with countless stories of pilgrims, monks, and visitors who have found peace and enlightenment within its sacred grounds. The architecture represents the finest examples of traditional Japanese Buddhist design, with intricate woodwork, beautiful paintings, and carefully maintained gardens that reflect the changing seasons.",
			address:
				"This is a very long address that might span multiple lines: 2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan, Near the Sumida River",
			touristSpotHashtag: [
				"temple",
				"historic",
				"cultural",
				"traditional",
				"peaceful",
				"spiritual",
				"ancient",
				"architecture",
				"buddhist",
				"heritage",
			],
		},
	},
};

// Stories to test Google Places integration behavior
export const GooglePlacesWithImages: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			// Remove local images to showcase Google Places images
			imageSet: undefined,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates the component when Google Places API provides images and local imageSet is not available.",
			},
		},
	},
};

export const GooglePlacesWithLocalFallback: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			// Keep local images as fallback
			imageSet: {
				main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
				small: [
					"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
					"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
				],
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Shows how the component handles both Google Places images and local fallback images.",
			},
		},
	},
};

export const NoImagesAvailable: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			imageSet: undefined,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Tests the component when neither Google Places images nor local images are available.",
			},
		},
	},
};

export const LoadingLocationInfo: Story = {
	args: {
		selectedSpot: mockTouristSpot,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Simulates the loading state while fetching Google Places information.",
			},
		},
	},
};

export const LocationInfoError: Story = {
	args: {
		selectedSpot: mockTouristSpot,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Tests the component behavior when Google Places API returns an error.",
			},
		},
	},
};

export const EmptyQueryLocationInfo: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotName: "", // Empty name should not trigger Google Places query
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Tests behavior when tourist spot has empty name, preventing Google Places API call.",
			},
		},
	},
};

// Note: To test Google Places integration in development:
// 1. Run the application locally with proper API keys configured
// 2. Navigate to a model route page with real tourist spot data
// 3. The getLocationInfo hook will make actual API calls to Google Places
// 4. Monitor network tab to see the API requests and responses
// 5. Check console for any errors or debugging information
