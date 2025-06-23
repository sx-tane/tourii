"use client";
import Link from "next/link";
import {
	BarChart3,
	BookOpen,
	FileCheck,
	MapPin,
	Trophy,
	Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuickAction {
	title: string;
	description: string;
	icon: LucideIcon;
	href: string;
	color: string;
}

interface QuickActionsGridProps {
	actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
	{
		title: "Analytics Dashboard",
		description: "View comprehensive insights and metrics",
		icon: BarChart3,
		href: "/v2/admin/analytics",
		color: "bg-blue-100 text-blue-800",
	},
	{
		title: "User Management",
		description: "View and manage user accounts",
		icon: Users,
		href: "/v2/admin/users",
		color: "bg-green-100 text-green-800",
	},
	{
		title: "Submission Review",
		description: "Review and approve pending submissions",
		icon: FileCheck,
		href: "/v2/admin/submissions",
		color: "bg-orange-100 text-orange-800",
	},
	{
		title: "Manage Stories",
		description: "Create and edit story content",
		icon: BookOpen,
		href: "/v2/admin/stories",
		color: "bg-purple-100 text-purple-800",
	},
	{
		title: "Model Routes",
		description: "Manage tourist routes and spots",
		icon: MapPin,
		href: "/v2/admin/model-routes",
		color: "bg-indigo-100 text-indigo-800",
	},
	{
		title: "Quest Management",
		description: "Create and manage user quests",
		icon: Trophy,
		href: "/v2/admin/quests",
		color: "bg-yellow-100 text-yellow-800",
	},
];

export default function QuickActionsGrid({
	actions = defaultActions,
}: QuickActionsGridProps) {
	return (
		<div>
			<h2 className="text-xl font-semibold text-charcoal mb-4">
				Quick Actions
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{actions.map((action) => (
					<Link
						key={action.title}
						href={action.href}
						className="group rounded-lg bg-white p-6 shadow hover:shadow-lg transition-all duration-200 hover:scale-105"
					>
						<div className="flex items-center space-x-3">
							<div className={`rounded-lg p-3 ${action.color}`}>
								<action.icon size={24} />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold text-charcoal group-hover:text-red transition-colors">
									{action.title}
								</h3>
								<p className="text-sm text-warmGrey3 mt-1">
									{action.description}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
