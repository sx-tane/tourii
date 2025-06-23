import type { ModelRouteCreateRequestDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteCreateEditModal from "./model-route-create-edit-modal";

const meta: Meta<typeof ModelRouteCreateEditModal> = {
	title: "Admin/ModelRoutes/ModelRouteCreateEditModal",
	component: ModelRouteCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm = {
	routeName: "Historic Kyoto Temple Tour",
	routeDesc:
		"A scenic journey through Kyoto's most famous temples and shrines, showcasing traditional Japanese architecture and cultural heritage.",
	region: "Kyoto",
	hashtags: ["#temples", "#kyoto", "#heritage"],
	recommendationTagList: ["cultural", "photography", "spiritual"],
	recommendationPersonality: [
		"culture-enthusiast",
		"photographer",
		"history-buff",
	],
	routeMapImage: "https://example.com/kyoto-map.jpg",
};

const mockEditingRoute = {
	modelRouteId: "ROUTE-001",
	...mockForm,
	touristSpots: [
		{ touristSpotId: "SPOT-KIYOMIZU", touristSpotName: "Kiyomizu Temple" },
		{ touristSpotId: "SPOT-GION", touristSpotName: "Gion District" },
	],
	insDateTime: "2025-06-20T10:30:00Z",
	updDateTime: "2025-06-21T14:45:00Z",
	insUserId: "ADMIN-001",
	updUserId: "ADMIN-002",
};

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingRoute: null,
		form: {
			routeName: "",
			routeDesc: "",
			region: "",
			hashtags: [],
			recommendationTagList: [],
			recommendationPersonality: [],
			routeMapImage: "",
		},
		onFormChange: (updates: Partial<ModelRouteCreateRequestDto>) =>
			console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		recommendationText: "",
		onRecommendationTextChange: (text: string) =>
			console.log("Recommendation text change:", text),
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingRoute: mockEditingRoute,
		form: mockForm,
		onFormChange: (updates: Partial<ModelRouteCreateRequestDto>) =>
			console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		recommendationText: "This route is perfect for cultural enthusiasts",
		onRecommendationTextChange: (text: string) =>
			console.log("Recommendation text change:", text),
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingRoute: null,
		form: mockForm,
		onFormChange: (updates: Partial<ModelRouteCreateRequestDto>) =>
			console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
		recommendationText: "",
		onRecommendationTextChange: (text: string) =>
			console.log("Recommendation text change:", text),
	},
};
