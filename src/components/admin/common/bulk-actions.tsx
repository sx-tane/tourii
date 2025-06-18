import React from "react";
import { Trash2, X } from "lucide-react";

export interface BulkAction {
	id: string;
	label: string;
	icon?: React.ComponentType<{ size: number }>;
	onClick: () => void;
	variant?: "danger" | "default";
	className?: string;
}

interface BulkActionsProps {
	selectedCount: number;
	onClear: () => void;
	actions?: BulkAction[];
	className?: string;
}

export function BulkActions({
	selectedCount,
	onClear,
	actions = [],
	className = "",
}: BulkActionsProps) {
	if (selectedCount === 0) return null;

	// Default delete action if no actions provided
	const defaultActions: BulkAction[] = actions.length > 0 ? actions : [
		{
			id: "delete",
			label: "Delete Selected",
			icon: Trash2,
			onClick: () => {},
			variant: "danger",
		}
	];

	return (
		<div className={`mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 ${className}`}>
			<div className="flex items-center gap-4">
				<span className="text-sm font-medium text-blue-800">
					{selectedCount} items selected
				</span>
			</div>
			<div className="flex items-center gap-2">
				{defaultActions.map((action) => {
					const Icon = action.icon;
					return (
						<button
							key={action.id}
							type="button"
							onClick={action.onClick}
							className={`flex items-center gap-2 px-3 py-1 text-sm rounded-lg transition-all ${
								action.variant === "danger"
									? "bg-red-100 text-red-700 hover:bg-red-200"
									: "bg-blue-100 text-blue-700 hover:bg-blue-200"
							} ${action.className || ""}`}
						>
							{Icon && <Icon size={16} />}
							{action.label}
						</button>
					);
				})}
				<button
					type="button"
					onClick={onClear}
					className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
				>
					<X size={16} />
					Cancel
				</button>
			</div>
		</div>
	);
}