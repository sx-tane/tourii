import Link from "next/link";
import { BarChart3, BookOpen, MapPin, Trophy } from "lucide-react";

export default function AdminHome() {
	const quickActions = [
		{
			title: "Analytics Dashboard",
			description: "View comprehensive insights and metrics",
			icon: BarChart3,
			href: "/v2/admin/analytics",
			color: "bg-blue-100 text-blue-800",
		},
		{
			title: "Manage Stories",
			description: "Create and edit story content",
			icon: BookOpen,
			href: "/v2/admin/stories",
			color: "bg-green-100 text-green-800",
		},
		{
			title: "Model Routes",
			description: "Manage tourist routes and spots",
			icon: MapPin,
			href: "/v2/admin/model-routes",
			color: "bg-purple-100 text-purple-800",
		},
		{
			title: "Quest Management",
			description: "Create and manage user quests",
			icon: Trophy,
			href: "/v2/admin/quests",
			color: "bg-yellow-100 text-yellow-800",
		},
	];

	return (
		<div className="space-y-8 text-charcoal">
			<div>
				<h1 className="text-3xl font-bold text-charcoal mb-2">
					Admin Dashboard
				</h1>
				<p className="text-warmGrey3">
					Manage your tourism content platform efficiently
				</p>
			</div>

			{/* Quick Actions Grid */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{quickActions.map((action) => (
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

			{/* Recent Activity Section */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h2 className="text-xl font-semibold text-charcoal mb-4">
					Quick Overview
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="text-center p-4 rounded-lg bg-blue-50">
						<div className="text-2xl font-bold text-blue-600">📊</div>
						<div className="text-sm text-blue-800 mt-2">
							View detailed analytics and performance metrics for all your
							content
						</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-green-50">
						<div className="text-2xl font-bold text-green-600">🔍</div>
						<div className="text-sm text-green-800 mt-2">
							Enhanced data visibility in all edit modals for better content
							management
						</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-purple-50">
						<div className="text-2xl font-bold text-purple-600">⚡</div>
						<div className="text-sm text-purple-800 mt-2">
							Advanced search, filtering, and bulk operations across all
							sections
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
