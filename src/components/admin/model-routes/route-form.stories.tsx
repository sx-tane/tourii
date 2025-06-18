import type { Meta, StoryObj } from "@storybook/react";
import { RouteForm } from "./route-form";
import type { ModelRouteCreateRequestDto } from "@/api/generated";

const meta: Meta<typeof RouteForm> = {
	title: "Admin/Model Routes/RouteForm",
	component: RouteForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const emptyForm: ModelRouteCreateRequestDto = {
	storyId: "",
	routeName: "",
	region: "",
	regionDesc: "",
	regionBackgroundMedia: "",
	recommendation: [],
	touristSpotList: [],
};

const filledForm: ModelRouteCreateRequestDto = {
	storyId: "story-kyoto-tales",
	routeName: "Historic Kyoto Trail",
	region: "Kyoto",
	regionDesc: "Explore the ancient temples and traditional districts of historic Kyoto",
	regionBackgroundMedia: "https://example.com/kyoto-background.jpg",
	recommendation: [
		"Visit during cherry blossom season",
		"Try traditional kaiseki cuisine",
		"Wear comfortable walking shoes",
	],
	touristSpotList: [],
};

export const EmptyForm: Story = {
	args: {
		form: emptyForm,
		onChange: (form) => console.log("Form changed:", form),
		recommendationText: "",
		onRecommendationChange: (text) => console.log("Recommendations:", text),
		isSubmitting: false,
	},
};

export const FilledForm: Story = {
	args: {
		form: filledForm,
		onChange: (form) => console.log("Form changed:", form),
		recommendationText: "Visit during cherry blossom season, Try traditional kaiseki cuisine, Wear comfortable walking shoes",
		onRecommendationChange: (text) => console.log("Recommendations:", text),
		isSubmitting: false,
	},
};

export const SubmittingState: Story = {
	args: {
		form: filledForm,
		onChange: (form) => console.log("Form changed:", form),
		recommendationText: "Visit during cherry blossom season, Try traditional kaiseki cuisine",
		onRecommendationChange: (text) => console.log("Recommendations:", text),
		isSubmitting: true,
	},
};