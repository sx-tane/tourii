import type { Meta, StoryObj } from "@storybook/react";
import { StoryForm } from "./story-form";
import type { StoryCreateRequestDto } from "@/api/generated";

const meta: Meta<typeof StoryForm> = {
	title: "Admin/Stories/StoryForm",
	component: StoryForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const emptyForm: StoryCreateRequestDto = {
	storyName: "",
	storyDesc: "",
	storyBackgroundMedia: "",
	storyCategory: "",
	storyIntroVideoUrl: "",
	storyBackgroundMusic: "",
};

const filledForm: StoryCreateRequestDto = {
	storyName: "Legends of Ancient Kyoto",
	storyDesc: "Journey through the mystical tales and legends that shaped the cultural heritage of Kyoto",
	storyBackgroundMedia: "https://example.com/kyoto-legends-bg.jpg",
	storyCategory: "Historical Fiction",
	storyIntroVideoUrl: "https://example.com/kyoto-intro.mp4",
	storyBackgroundMusic: "https://example.com/traditional-music.mp3",
};

export const EmptyForm: Story = {
	args: {
		form: emptyForm,
		onChange: (form) => console.log("Form changed:", form),
		isSubmitting: false,
	},
};

export const FilledForm: Story = {
	args: {
		form: filledForm,
		onChange: (form) => console.log("Form changed:", form),
		isSubmitting: false,
	},
};

export const SubmittingState: Story = {
	args: {
		form: filledForm,
		onChange: (form) => console.log("Form changed:", form),
		isSubmitting: true,
	},
};