import Link from "next/link";
import type { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	const navItems = [
		{ name: "📊 Analytics", href: "/v2/admin/analytics" },
		{ name: "📚 Stories", href: "/v2/admin/stories" },
		{ name: "🗺️ Model Routes", href: "/v2/admin/model-routes" },
		{ name: "🏆 Quests", href: "/v2/admin/quests" },
	];

	return (
		<div className="min-h-screen bg-warmGrey">
			<div className="fixed inset-y-0 left-0 w-64 bg-warmGrey shadow-lg">
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-center h-16 border-b">
						<span className="text-xl font-bold text-charcoal">Admin</span>
					</div>
					<nav className="flex-1 px-4 py-6 space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="flex items-center px-4 py-2 text-sm font-medium text-charcoal bg-warmGrey rounded-md hover:bg-gray-50 hover:text-charcoal"
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			</div>
			<div className="pl-64">
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
