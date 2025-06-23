import type { Meta, StoryObj } from "@storybook/react";
import type { SubmissionData } from "@/hooks";
import SubmissionTable from "./submission-table";

const mockSubmissions = [
	{
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
			image_url: "https://example.com/photo.jpg",
		},
		submittedAt: "2025-06-21T14:30:00Z",
		daysSinceSubmission: 1,
	},
	{
		userTaskLogId: "task-log-002",
		taskType: "SHARE_SOCIAL",
		username: "social_user",
		userId: "TSU202506-abc123-456789-012345-BBBB",
		questName: "Tokyo Tower Discovery",
		taskId: "task-social-001",
		taskDetails: {
			taskName: "Share on social media",
			taskDesc: "Share your Tokyo Tower experience",
			requiredAction: "SHARE_SOCIAL",
			magatamaPointAwarded: 50,
			taskTheme: "SOCIAL",
		},
		submissionData: {
			social_url: "https://twitter.com/user/status/123456789",
		},
		submittedAt: "2025-06-20T16:45:00Z",
		daysSinceSubmission: 2,
	},
];

const meta: Meta<typeof SubmissionTable> = {
	title: "Admin/Submissions/SubmissionTable",
	component: SubmissionTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		submissions: mockSubmissions,
		selectedSubmissions: [],
		isProcessing: null,
		onToggleSubmissionSelection: (id: string) => console.log("Toggle:", id),
		onToggleSelectAll: () => console.log("Toggle all"),
		onViewSubmission: (submission: SubmissionData) =>
			console.log("View:", submission.userTaskLogId),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const WithSelection: Story = {
	args: {
		submissions: mockSubmissions,
		selectedSubmissions: ["task-log-001"],
		isProcessing: null,
		onToggleSubmissionSelection: (id: string) => console.log("Toggle:", id),
		onToggleSelectAll: () => console.log("Toggle all"),
		onViewSubmission: (submission: SubmissionData) =>
			console.log("View:", submission.userTaskLogId),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const Processing: Story = {
	args: {
		submissions: mockSubmissions,
		selectedSubmissions: [],
		isProcessing: "task-log-001",
		onToggleSubmissionSelection: (id: string) => console.log("Toggle:", id),
		onToggleSelectAll: () => console.log("Toggle all"),
		onViewSubmission: (submission: SubmissionData) =>
			console.log("View:", submission.userTaskLogId),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};

export const EmptyState: Story = {
	args: {
		submissions: [],
		selectedSubmissions: [],
		isProcessing: null,
		onToggleSubmissionSelection: (id: string) => console.log("Toggle:", id),
		onToggleSelectAll: () => console.log("Toggle all"),
		onViewSubmission: (submission: SubmissionData) =>
			console.log("View:", submission.userTaskLogId),
		onApprove: (id: string) => console.log("Approve:", id),
		onRejectClick: (id: string) => console.log("Reject:", id),
	},
};
