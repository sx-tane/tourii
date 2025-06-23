import type { Meta, StoryObj } from "@storybook/react";
import { QuestTaskCreateRequestDto, TaskResponseDto } from "@/api/generated";
import QuestTaskCreateEditModal from "./quest-task-create-edit-modal";

const meta: Meta<typeof QuestTaskCreateEditModal> = {
	title: "Admin/Quests/QuestTaskCreateEditModal",
	component: QuestTaskCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm: QuestTaskCreateRequestDto = {
	taskTheme: QuestTaskCreateRequestDto.taskTheme.LOCAL_CULTURE,
	taskType: QuestTaskCreateRequestDto.taskType.VISIT_LOCATION,
	taskName: "GPS Check-in at Temple",
	taskDesc: "Check in at the main temple entrance using GPS",
	isUnlocked: true,
	requiredAction: "Check in at the temple entrance",
	antiCheatRules: {},
	magatamaPointAwarded: 50,
};

const mockEditingTask: TaskResponseDto = {
	taskId: "TASK-001",
	taskTheme: TaskResponseDto.taskTheme.LOCAL_CULTURE,
	taskType: TaskResponseDto.taskType.VISIT_LOCATION,
	taskName: "GPS Check-in at Temple",
	taskDesc: "Check in at the main temple entrance using GPS",
	isUnlocked: true,
	requiredAction: "Check in at the temple entrance",
	antiCheatRules: {},
	magatamaPointAwarded: 50,
	isCompleted: false,
	updUserId: "ADMIN-002",
};

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingTask: null,
		form: {
			taskName: "",
			taskDesc: "",
			taskType: "VISIT_LOCATION",
			taskOrder: 1,
			magatamaPointAwarded: 0,
			touristSpotId: "",
			requiredAnswer: "",
		},
		onFormChange: (updates: Partial<QuestTaskCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingTask: mockEditingTask,
		form: mockForm,
		onFormChange: (updates: Partial<QuestTaskCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const PhotoUploadTask: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingTask: {
			...mockEditingTask,
			taskType: "PHOTO_UPLOAD",
			taskName: "Photo at Cherry Blossoms",
			taskDesc: "Take a photo with the famous cherry blossom trees",
		},
		form: {
			...mockForm,
			taskType: "PHOTO_UPLOAD",
			taskName: "Photo at Cherry Blossoms",
			taskDesc: "Take a photo with the famous cherry blossom trees",
		},
		onFormChange: (updates: Partial<QuestTaskCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const TextAnswerTask: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingTask: {
			...mockEditingTask,
			taskType: "ANSWER_TEXT",
			taskName: "History Question",
			taskDesc: "Answer a question about the temple's history",
			requiredAnswer: "Emperor Kammu",
		},
		form: {
			...mockForm,
			taskType: "ANSWER_TEXT",
			taskName: "History Question",
			taskDesc: "Answer a question about the temple's history",
			requiredAnswer: "Emperor Kammu",
		},
		onFormChange: (updates: Partial<QuestTaskCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingTask: null,
		form: mockForm,
		onFormChange: (updates: Partial<QuestTaskCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
	},
};