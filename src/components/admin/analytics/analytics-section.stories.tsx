import type { Meta, StoryObj } from "@storybook/react";
import { AnalyticsSection } from "./analytics-section";
import { BarChart3 } from "lucide-react";

const meta: Meta<typeof AnalyticsSection> = {
	title: "Admin/Analytics/AnalyticsSection",
	component: AnalyticsSection,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
	args: {
		title: "Content Overview",
		icon: <BarChart3 size={20} />,
		isExpanded: true,
		onToggle: () => console.log("Toggle section"),
		children: (
			<div className="rounded-lg bg-white p-4 shadow">
				<p>Section content goes here...</p>
			</div>
		),
	},
};

export const Collapsed: Story = {
	args: {
		title: "Content Overview",
		icon: <BarChart3 size={20} />,
		isExpanded: false,
		onToggle: () => console.log("Toggle section"),
		children: (
			<div className="rounded-lg bg-white p-4 shadow">
				<p>Section content goes here...</p>
			</div>
		),
	},
};