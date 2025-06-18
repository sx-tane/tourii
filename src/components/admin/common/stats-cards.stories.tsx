import type { Meta, StoryObj } from "@storybook/react";
import { BarChart3, Trophy, MapPin, Star, Users } from "lucide-react";
import { StatsCards } from "./stats-cards";

const meta: Meta<typeof StatsCards> = {
	title: "Admin/Common/StatsCards",
	component: StatsCards,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		stats: [
			{
				label: "Total Stories",
				value: 12,
				icon: BarChart3,
				color: "text-blue-600",
				className: "text-charcoal",
			},
			{
				label: "Prologue",
				value: 3,
				icon: "📖",
				className: "text-blue-600",
			},
			{
				label: "Main Story",
				value: 9,
				icon: "📚",
				className: "text-green-600",
			},
			{
				label: "Selected",
				value: 5,
				icon: "⭐",
				className: "text-mustard",
			},
			{
				label: "w/ Chapters",
				value: 8,
				icon: "📄",
				className: "text-purple-600",
			},
			{
				label: "Missing Media",
				value: 2,
				icon: "⚠️",
				className: "text-red-600",
			},
		],
	},
};

export const QuestStats: Story = {
	args: {
		stats: [
			{
				label: "Total Quests",
				value: 45,
				icon: Trophy,
				color: "text-blue-600",
				className: "text-charcoal",
			},
			{
				label: "Unlocked",
				value: 32,
				icon: "🔓",
				className: "text-green-600",
			},
			{
				label: "Premium",
				value: 8,
				icon: "⭐",
				className: "text-mustard",
			},
			{
				label: "w/ Tasks",
				value: 38,
				icon: "📋",
				className: "text-purple-600",
			},
			{
				label: "Total Points",
				value: "12,500",
				icon: "💰",
				className: "text-blue-600",
			},
			{
				label: "No Spot",
				value: 3,
				icon: "⚠️",
				className: "text-red-600",
			},
		],
	},
};

export const RouteStats: Story = {
	args: {
		stats: [
			{
				label: "Total Routes",
				value: 15,
				icon: BarChart3,
				color: "text-blue-600",
				className: "text-charcoal",
			},
			{
				label: "w/ Spots",
				value: 12,
				icon: "🏖️",
				className: "text-green-600",
			},
			{
				label: "w/ Tips",
				value: 10,
				icon: "💡",
				className: "text-purple-600",
			},
			{
				label: "Regions",
				value: 5,
				icon: "🌍",
				className: "text-mustard",
			},
			{
				label: "Total Spots",
				value: 87,
				icon: "📍",
				className: "text-blue-600",
			},
			{
				label: "Missing Media",
				value: 1,
				icon: "⚠️",
				className: "text-red-600",
			},
		],
	},
};