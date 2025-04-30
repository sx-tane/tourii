import Link from "next/link";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const navItems = [
		{ name: "Story System", href: "/v2/stories" },
		{ name: "Model Routes", href: "/v2/routes" },
		{ name: "Quests", href: "/v2/quests" },
		{ name: "Digital Passport", href: "/v2/passport" },
		{ name: "Check-In Map", href: "/v2/check-in" },
		{ name: "Shop", href: "/v2/shop" },
		{ name: "Memory Wall", href: "/v2/memory-wall" },
		{ name: "Profile", href: "/v2/profile" },
	];

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="flex items-center justify-center h-16 border-b">
						<span className="text-xl font-bold text-indigo-600">Tourii</span>
					</div>
					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
							>
								{item.name}
							</Link>
						))}
					</nav>
					{/* User Profile */}
					<div className="p-4 border-t">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-gray-200 rounded-full" />
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-700">User Name</p>
								<p className="text-xs text-gray-500">Level 1 Explorer</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className="pl-64">
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
