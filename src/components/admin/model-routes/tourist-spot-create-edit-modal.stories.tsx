import type { Meta, StoryObj } from "@storybook/react";
import type { TouristSpotCreateRequestDto } from "@/api/generated";
import TouristSpotCreateEditModal from "./tourist-spot-create-edit-modal";

const meta: Meta<typeof TouristSpotCreateEditModal> = {
	title: "Admin/ModelRoutes/TouristSpotCreateEditModal",
	component: TouristSpotCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm = {
	storyChapterId: "CHAPTER-001",
	touristSpotName: "Kiyomizu Temple",
	touristSpotDesc: "A famous Buddhist temple with stunning views of Kyoto city and beautiful cherry blossoms in spring.",
	bestVisitTime: "2-3 hours",
	touristSpotHashtag: ["#temple", "#heritage", "#views"],
	imageSet: {
		main: "https://example.com/kiyomizu-main.jpg",
		small: ["https://example.com/kiyomizu1.jpg", "https://example.com/kiyomizu2.jpg"],
	},
	address: "1-294 Kiyomizu, Higashiyama Ward, Kyoto, Japan",
};

const mockEditingSpot = {
	touristSpotId: "SPOT-KIYOMIZU",
	...mockForm,
	insDateTime: "2025-06-20T10:30:00Z",
	updDateTime: "2025-06-21T14:45:00Z",
	insUserId: "ADMIN-001",
	updUserId: "ADMIN-002",
};

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingSpot: null,
		form: {
			storyChapterId: "",
			touristSpotName: "",
			touristSpotDesc: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
			imageSet: {
				main: "",
				small: [],
			},
			address: "",
		},
		onFormChange: (updates: Partial<TouristSpotCreateRequestDto>) => console.log("Form change:", updates),
		hashtagText: "",
		onHashtagTextChange: (text: string) => console.log("Hashtag text change:", text),
		smallImagesText: "",
		onSmallImagesTextChange: (text: string) => console.log("Small images text change:", text),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingSpot: mockEditingSpot,
		form: mockForm,
		onFormChange: (updates: Partial<TouristSpotCreateRequestDto>) => console.log("Form change:", updates),
		hashtagText: "#temple, #heritage, #views",
		onHashtagTextChange: (text: string) => console.log("Hashtag text change:", text),
		smallImagesText: "https://example.com/img1.jpg, https://example.com/img2.jpg",
		onSmallImagesTextChange: (text: string) => console.log("Small images text change:", text),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingSpot: null,
		form: mockForm,
		onFormChange: (updates: Partial<TouristSpotCreateRequestDto>) => console.log("Form change:", updates),
		hashtagText: "#temple, #heritage, #views",
		onHashtagTextChange: (text: string) => console.log("Hashtag text change:", text),
		smallImagesText: "https://example.com/img1.jpg, https://example.com/img2.jpg",
		onSmallImagesTextChange: (text: string) => console.log("Small images text change:", text),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
	},
};

export const MinimalSpot: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingSpot: {
			...mockEditingSpot,
			touristSpotDesc: "",
			touristSpotHashtag: [],
			imageSet: {
				main: "",
				small: [],
			},
			bestVisitTime: "",
		},
		form: {
			...mockForm,
			touristSpotDesc: "",
			touristSpotHashtag: [],
			imageSet: {
				main: "",
				small: [],
			},
			bestVisitTime: "",
		},
		onFormChange: (updates: Partial<TouristSpotCreateRequestDto>) => console.log("Form change:", updates),
		hashtagText: "",
		onHashtagTextChange: (text: string) => console.log("Hashtag text change:", text),
		smallImagesText: "",
		onSmallImagesTextChange: (text: string) => console.log("Small images text change:", text),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};