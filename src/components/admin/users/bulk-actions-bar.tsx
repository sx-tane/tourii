import { X } from "lucide-react";

interface BulkActionsBarProps {
	selectedCount: number;
	onCancel: () => void;
}

export default function BulkActionsBar({
	selectedCount,
	onCancel,
}: BulkActionsBarProps) {
	if (selectedCount === 0) return null;

	return (
		<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
			<div className="flex items-center gap-4">
				<span className="text-sm font-medium text-blue-800">
					{selectedCount} users selected
				</span>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
				>
					<X size={16} />
					Cancel
				</button>
			</div>
		</div>
	);
}
