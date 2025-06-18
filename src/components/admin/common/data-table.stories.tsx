import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type TableColumn } from "./data-table";
import { Edit, Trash2 } from "lucide-react";

const meta: Meta<typeof DataTable> = {
	title: "Admin/Common/DataTable",
	component: DataTable,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface MockUser {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "active" | "inactive";
}

const mockData: MockUser[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "active",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Editor",
		status: "active",
	},
	{
		id: "3",
		name: "Bob Wilson",
		email: "bob@example.com",
		role: "Viewer",
		status: "inactive",
	},
];

const columns: TableColumn<MockUser>[] = [
	{
		key: "name",
		header: "Name",
		render: (user) => (
			<div className="font-semibold text-charcoal">{user.name}</div>
		),
	},
	{
		key: "email",
		header: "Email",
		render: (user) => (
			<div className="text-sm text-charcoal">{user.email}</div>
		),
	},
	{
		key: "role",
		header: "Role",
		render: (user) => (
			<span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
				{user.role}
			</span>
		),
	},
	{
		key: "status",
		header: "Status",
		render: (user) => (
			<span
				className={`rounded-full px-2 py-1 text-xs ${
					user.status === "active"
						? "bg-green-100 text-green-800"
						: "bg-red-100 text-red-800"
				}`}
			>
				{user.status}
			</span>
		),
	},
	{
		key: "actions",
		header: "Actions",
		render: (user) => (
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => console.log("Edit", user.id)}
					className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
				>
					<Edit size={16} />
				</button>
				<button
					type="button"
					onClick={() => console.log("Delete", user.id)}
					className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
				>
					<Trash2 size={16} />
				</button>
			</div>
		),
	},
];

export const Default: Story = {
	args: {
		columns,
		data: mockData,
		selectedIds: [],
		onToggleSelect: (id) => console.log("Toggle select", id),
		onToggleSelectAll: () => console.log("Toggle select all"),
		getItemId: (user) => user.id,
		emptyMessage: "No users found",
	},
};

export const WithSelection: Story = {
	args: {
		columns,
		data: mockData,
		selectedIds: ["1", "3"],
		onToggleSelect: (id) => console.log("Toggle select", id),
		onToggleSelectAll: () => console.log("Toggle select all"),
		getItemId: (user) => user.id,
		emptyMessage: "No users found",
	},
};

export const EmptyState: Story = {
	args: {
		columns,
		data: [],
		selectedIds: [],
		onToggleSelect: (id) => console.log("Toggle select", id),
		onToggleSelectAll: () => console.log("Toggle select all"),
		getItemId: (user) => user.id,
		emptyMessage: "No users found. Create your first user to get started.",
	},
};