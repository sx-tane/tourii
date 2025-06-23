import type { Meta, StoryObj } from "@storybook/react";
import { BarChart3, Users, Trophy } from "lucide-react";
import ExpandableSection from "./expandable-section";

const meta: Meta<typeof ExpandableSection> = {
	title: "Admin/Analytics/ExpandableSection",
	component: ExpandableSection,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
	<div className="rounded-lg bg-white p-6 shadow">
		<p className="text-charcoal">
			This is sample content inside the expandable section. It can contain any
			React components like charts, tables, or other data visualizations.
		</p>
		<div className="mt-4 grid grid-cols-3 gap-4">
			<div className="bg-blue-50 p-3 rounded">
				<div className="text-2xl font-bold text-blue-600">123</div>
				<div className="text-sm text-blue-700">Sample Metric</div>
			</div>
			<div className="bg-green-50 p-3 rounded">
				<div className="text-2xl font-bold text-green-600">456</div>
				<div className="text-sm text-green-700">Another Metric</div>
			</div>
			<div className="bg-purple-50 p-3 rounded">
				<div className="text-2xl font-bold text-purple-600">789</div>
				<div className="text-sm text-purple-700">Third Metric</div>
			</div>
		</div>
	</div>
);

export const Expanded: Story = {
	args: {
		title: "Analytics Overview",
		icon: BarChart3,
		isExpanded: true,
		onToggle: () => console.log("Toggle section"),
		children: <SampleContent />,
	},
};

export const Collapsed: Story = {
	args: {
		title: "User Statistics",
		icon: Users,
		isExpanded: false,
		onToggle: () => console.log("Toggle section"),
		children: <SampleContent />,
	},
};

export const WithDifferentIcon: Story = {
	args: {
		title: "Quest Performance",
		icon: Trophy,
		isExpanded: true,
		onToggle: () => console.log("Toggle section"),
		children: (
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="text-lg font-semibold mb-4">Quest Completion Rates</h3>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span>Photo Upload Quests</span>
						<span className="font-semibold text-green-600">87%</span>
					</div>
					<div className="flex justify-between">
						<span>QR Scan Quests</span>
						<span className="font-semibold text-blue-600">92%</span>
					</div>
					<div className="flex justify-between">
						<span>Text Answer Quests</span>
						<span className="font-semibold text-purple-600">76%</span>
					</div>
				</div>
			</div>
		),
	},
};