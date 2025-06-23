import "@/styles/globals.css";
import { Bell, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	const navItems = [
		{ name: "🏠 Home", href: "/v2/admin" },
		{ name: "📊 Analytics", href: "/v2/admin/analytics" },
		{ name: "👥 Users", href: "/v2/admin/users" },
		{ name: "📋 Submissions", href: "/v2/admin/submissions" },
		{ name: "📚 Stories", href: "/v2/admin/stories" },
		{ name: "🗺️ Model Routes", href: "/v2/admin/model-routes" },
		{ name: "🏆 Quests", href: "/v2/admin/quests" },
	];

	return (
		<div className="min-h-screen bg-warmGrey">
			{/* Top Navigation Bar */}
			<div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-warmGrey2 shadow-sm">
				<div className="flex items-center justify-between h-16 px-6">
					<div className="flex items-center">
						<Link href="/v2/admin" className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-red rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">T</span>
							</div>
							<span className="text-xl font-bold text-charcoal">
								Tourii Admin
							</span>
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						{/* Notifications */}
						<button
							type="button"
							className="relative p-2 text-warmGrey3 hover:text-charcoal transition-colors"
							title="Notifications"
						>
							<Bell size={20} />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full"></span>
						</button>

						{/* Settings */}
						<button
							type="button"
							className="p-2 text-warmGrey3 hover:text-charcoal transition-colors"
							title="Settings"
						>
							<Settings size={20} />
						</button>

						{/* User Menu */}
						<div className="flex items-center space-x-3">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<User size={16} className="text-blue-600" />
								</div>
								<div className="text-sm">
									<div className="font-medium text-charcoal">Admin User</div>
									<div className="text-warmGrey3">Administrator</div>
								</div>
							</div>
							<button
								type="button"
								className="p-2 text-warmGrey3 hover:text-charcoal transition-colors"
								title="Logout"
							>
								<LogOut size={16} />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Sidebar Navigation */}
			<div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-warmGrey2 shadow-sm pt-16">
				<div className="flex flex-col h-full">
					<nav className="flex-1 px-4 py-6 space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="flex items-center px-4 py-3 text-sm font-medium text-charcoal rounded-lg hover:bg-warmGrey hover:text-red transition-all"
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Footer */}
					<div className="px-4 py-4 border-t border-warmGrey2">
						<div className="text-xs text-warmGrey3 text-center">
							Tourii Admin Panel
						</div>
						<div className="text-xs text-warmGrey3 text-center mt-1">
							v2.0.0
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="pl-64 pt-16">
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
