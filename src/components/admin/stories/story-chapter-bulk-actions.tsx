import { Trash2, X } from "lucide-react";

interface StoryChapterBulkActionsProps {
	selectedChapters: string[];
	onBulkDelete: () => void;
	onClearSelection: () => void;
}

export default function StoryChapterBulkActions({
	selectedChapters,
	onBulkDelete,
	onClearSelection,
}: StoryChapterBulkActionsProps) {
	if (selectedChapters.length === 0) return null;

	return (
		<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
			<div className="flex items-center gap-4">
				<span className="text-sm font-medium text-blue-800">
					{selectedChapters.length} chapters selected
				</span>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onBulkDelete}
					className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
				>
					<Trash2 size={16} />
					Delete Selected
				</button>
				<button
					type="button"
					onClick={onClearSelection}
					className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
				>
					<X size={16} />
					Cancel
				</button>
			</div>
		</div>
	);
}
