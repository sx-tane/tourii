import { X } from "lucide-react";
import { useId } from "react";

type TaskType = "PHOTO_UPLOAD" | "SHARE_SOCIAL" | "ANSWER_TEXT";

interface SubmissionFiltersProps {
	taskTypeFilter: "" | TaskType;
	limit: number;
	onTaskTypeFilterChange: (value: "" | TaskType) => void;
	onLimitChange: (value: number) => void;
	onClearFilters: () => void;
}

export default function SubmissionFilters({
	taskTypeFilter,
	limit,
	onTaskTypeFilterChange,
	onLimitChange,
	onClearFilters,
}: SubmissionFiltersProps) {
	const taskTypeFilterId = useId();

	return (
		<div className="mb-6 space-y-4">
			{/* Filter Controls */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div>
					<label
						htmlFor={taskTypeFilterId}
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Task Type
					</label>
					<select
						id={taskTypeFilterId}
						value={taskTypeFilter}
						onChange={(e) =>
							onTaskTypeFilterChange(e.target.value as "" | TaskType)
						}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="">All Types</option>
						<option value="PHOTO_UPLOAD">Photo Upload</option>
						<option value="SHARE_SOCIAL">Social Share</option>
						<option value="ANSWER_TEXT">Text Answer</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="limit"
						className="block text-sm font-medium text-charcoal mb-1"
					>
						Per Page
					</label>
					<select
						value={limit}
						onChange={(e) => onLimitChange(Number(e.target.value))}
						className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
					>
						<option value="10">10 submissions</option>
						<option value="20">20 submissions</option>
						<option value="50">50 submissions</option>
						<option value="100">100 submissions</option>
					</select>
				</div>
				<div className="flex items-end">
					{taskTypeFilter && (
						<button
							type="button"
							onClick={onClearFilters}
							className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
						>
							<X size={16} />
							Clear Filters
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
