import type { Meta, StoryObj } from "@storybook/react";
import SubmissionDetailsModal from "./submission-details-modal";

const mockSubmission = {
	userTaskLogId: "task-log-001",
	taskType: "PHOTO_UPLOAD",
	username: "john_traveler",
	userId: "TSU202506-614e2f-211442-172685-KAAA",
	questName: "Shibuya Crossing Adventure",
	taskId: "task-photo-001",
	taskDetails: {
		taskName: "Take a photo at Shibuya Crossing",
		taskDesc: "Capture the iconic Shibuya Crossing during rush hour",
		requiredAction: "PHOTO_UPLOAD",
		magatamaPointAwarded: 100,
		taskTheme: "PHOTOGRAPHY",
	},
	submissionData: {
		image_url: "https://picsum.photos/400/300?random=1",
	},
	submittedAt: "2025-06-21T14:30:00Z",
	daysSinceSubmission: 1,
};

const meta: Meta<typeof SubmissionDetailsModal> = {
	title: "Admin/Submissions/SubmissionDetailsModal",
	component: SubmissionDetailsModal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PhotoUpload: Story = {
	args: {
		submission: mockSubmission,
		isOpen: true,
		isProcessing: null,
		onClose: () => console.log("Close modal"),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const SocialShare: Story = {
	args: {
		submission: {
			...mockSubmission,
			taskType: "SHARE_SOCIAL",
			submissionData: {
				social_url: "https://twitter.com/user/status/123456789",
			},
		},
		isOpen: true,
		isProcessing: null,
		onClose: () => console.log("Close modal"),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const TextAnswer: Story = {
	args: {
		submission: {
			...mockSubmission,
			taskType: "ANSWER_TEXT",
			submissionData: {
				answer:
					"This is a detailed text answer about the Tokyo Tower experience. It includes personal insights and observations about the iconic landmark.",
			},
		},
		isOpen: true,
		isProcessing: null,
		onClose: () => console.log("Close modal"),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const Processing: Story = {
	args: {
		submission: mockSubmission,
		isOpen: true,
		isProcessing: "task-log-001",
		onClose: () => console.log("Close modal"),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const Closed: Story = {
	args: {
		submission: mockSubmission,
		isOpen: false,
		isProcessing: null,
		onClose: () => console.log("Close modal"),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};
