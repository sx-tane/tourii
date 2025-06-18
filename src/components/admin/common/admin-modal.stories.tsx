import type { Meta, StoryObj } from "@storybook/react";
import { AdminModal } from "./admin-modal";

const meta: Meta<typeof AdminModal> = {
	title: "Admin/Common/AdminModal",
	component: AdminModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		title: "Create New Item",
		isSubmitting: false,
		onSubmit: () => console.log("Submit"),
		submitLabel: "Create",
		isEdit: false,
		children: (
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-charcoal mb-2">
						Name
					</label>
					<input
						type="text"
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter name"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-charcoal mb-2">
						Description
					</label>
					<textarea
						rows={3}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter description"
					/>
				</div>
			</div>
		),
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		title: "Edit Item",
		isSubmitting: false,
		onSubmit: () => console.log("Submit"),
		submitLabel: "Update",
		isEdit: true,
		children: (
			<div className="space-y-4">
				<div className="rounded-lg bg-gray-50 p-4">
					<h3 className="text-lg font-semibold text-charcoal mb-2">
						Current Data
					</h3>
					<p className="text-sm text-charcoal">
						Existing item data would be displayed here...
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-charcoal mb-2">
						Name
					</label>
					<input
						type="text"
						defaultValue="Existing Item Name"
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
					/>
				</div>
			</div>
		),
	},
};

export const SubmittingState: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		title: "Create New Item",
		isSubmitting: true,
		onSubmit: () => console.log("Submit"),
		submitLabel: "Creating...",
		isEdit: false,
		children: <div>Form content here...</div>,
	},
};