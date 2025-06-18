import React from "react";
import { Plus } from "lucide-react";

interface AdminLayoutProps {
	title: string;
	description?: string;
	onCreateClick?: () => void;
	createButtonText?: string;
	children: React.ReactNode;
}

export function AdminLayout({
	title,
	description,
	onCreateClick,
	createButtonText = "Create New",
	children,
}: AdminLayoutProps) {
	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-charcoal">{title}</h1>
						{description && (
							<p className="text-warmGrey3 mt-2">{description}</p>
						)}
					</div>
					{onCreateClick && (
						<button
							type="button"
							onClick={onCreateClick}
							className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
						>
							<Plus size={18} />
							{createButtonText}
						</button>
					)}
				</div>

				{children}
			</div>
		</div>
	);
}