import type { Meta, StoryObj } from "@storybook/react";
import RejectReasonModal from "./reject-reason-modal";

const meta: Meta<typeof RejectReasonModal> = {
	title: "Admin/Submissions/RejectReasonModal",
	component: RejectReasonModal,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		isOpen: true,
		rejectReason: "",
		isProcessing: false,
		onRejectReasonChange: (reason: string) =>
			console.log("Reason changed:", reason),
		onConfirm: () => console.log("Confirm rejection"),
		onCancel: () => console.log("Cancel rejection"),
	},
};

export const WithReason: Story = {
	args: {
		isOpen: true,
		rejectReason:
			"The image is blurry and does not clearly show the required location.",
		isProcessing: false,
		onRejectReasonChange: (reason: string) =>
			console.log("Reason changed:", reason),
		onConfirm: () => console.log("Confirm rejection"),
		onCancel: () => console.log("Cancel rejection"),
	},
};

export const Processing: Story = {
	args: {
		isOpen: true,
		rejectReason: "Inappropriate content detected.",
		isProcessing: true,
		onRejectReasonChange: (reason: string) =>
			console.log("Reason changed:", reason),
		onConfirm: () => console.log("Confirm rejection"),
		onCancel: () => console.log("Cancel rejection"),
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		rejectReason: "",
		isProcessing: false,
		onRejectReasonChange: (reason: string) =>
			console.log("Reason changed:", reason),
		onConfirm: () => console.log("Confirm rejection"),
		onCancel: () => console.log("Cancel rejection"),
	},
};
