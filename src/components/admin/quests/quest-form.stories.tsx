import type { Meta, StoryObj } from "@storybook/react";
import { QuestForm } from "./quest-form";
import type { QuestCreateRequestDto } from "@/api/generated";

const meta: Meta<typeof QuestForm> = {
	title: "Admin/Quests/QuestForm",
	component: QuestForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const emptyForm: QuestCreateRequestDto = {
	touristSpotId: "",
	questName: "",
	questDesc: "",
	questImage: "",
	questType: "UNKNOWN" as QuestCreateRequestDto.questType,
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 0,
	rewardType: "UNKNOWN" as QuestCreateRequestDto.rewardType,
	delFlag: false,
};

const filledForm: QuestCreateRequestDto = {
	touristSpotId: "spot-123",
	questName: "Discover Ancient Temple",
	questDesc: "Explore the historic temple and learn about its cultural significance",
	questImage: "https://example.com/temple.jpg",
	questType: "TRAVEL_TO_EARN" as QuestCreateRequestDto.questType,
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 150,
	rewardType: "MAGATAMA_POINTS" as QuestCreateRequestDto.rewardType,
	delFlag: false,
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

export const PremiumQuest: Story = {
	args: {
		form: {
			...filledForm,
			isPremium: true,
			totalMagatamaPointAwarded: 300,
		},
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