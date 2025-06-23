import type { StoryResponseDto } from "@/api/generated";
import { Edit, ExternalLink, Eye, Trash2 } from "lucide-react";

interface StoryTableProps {
	stories: StoryResponseDto[];
	selectedStories: string[];
	onToggleSelection: (storyId: string) => void;
	onToggleSelectAll: () => void;
	onEdit: (story: StoryResponseDto) => void;
	onDelete: (storyId: string, sagaName: string) => void;
	deletingStoryId: string | null;
}

export default function StoryTable({
	stories,
	selectedStories,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	onDelete,
	deletingStoryId,
}: StoryTableProps) {
	const isAllSelected =
		selectedStories.length === stories.length && stories.length > 0;

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={isAllSelected}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							<th className="px-6 py-4 text-left font-semibold">Story Name</th>
							<th className="px-6 py-4 text-left font-semibold">Description</th>
							<th className="px-6 py-4 text-left font-semibold">Location</th>
							<th className="px-6 py-4 text-left font-semibold">Chapters</th>
							<th className="px-6 py-4 text-left font-semibold">Type</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{stories.length > 0 ? (
							stories.map((story, index) => (
								<tr
									key={story.storyId}
									className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
										selectedStories.includes(story.storyId)
											? "ring-2 ring-blue-200"
											: ""
									}`}
								>
									<td className="px-4 py-4">
										<input
											type="checkbox"
											checked={selectedStories.includes(story.storyId)}
											onChange={() => onToggleSelection(story.storyId)}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</td>
									<td className="px-6 py-4">
										<div className="font-semibold text-charcoal">
											{story.sagaName}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="max-w-xs truncate text-sm text-charcoal">
											{story.sagaDesc || "No description"}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
											{story.location || "N/A"}
										</span>
									</td>
									<td className="px-6 py-4">
										<span className="text-sm text-charcoal">
											{story.chapterList?.length || 0} chapters
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={`rounded-full px-2 py-1 text-xs font-medium ${
												story.isPrologue
													? "bg-blue-100 text-blue-800"
													: "bg-green-100 text-green-800"
											}`}
										>
											{story.isPrologue ? "Prologue" : "Main Story"}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => onEdit(story)}
												className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
												title="Edit Story"
												disabled={deletingStoryId !== null}
											>
												<Edit size={16} />
											</button>
											<a
												href={`/v2/admin/stories/${story.storyId}`}
												className={`rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all ${
													deletingStoryId !== null
														? "pointer-events-none opacity-50"
														: ""
												}`}
												title="Manage Chapters"
											>
												<Eye size={16} />
											</a>
											<a
												href={`/v2/touriiverse/${story.storyId}`}
												className={`rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all ${
													deletingStoryId !== null
														? "pointer-events-none opacity-50"
														: ""
												}`}
												title="Jump to Story Page"
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink size={16} />
											</a>
											<button
												type="button"
												onClick={() => onDelete(story.storyId, story.sagaName)}
												className={`rounded-lg p-2 transition-all ${
													deletingStoryId === story.storyId
														? "bg-red-200 text-red-600 cursor-not-allowed"
														: "bg-red-100 text-red-700 hover:bg-red-200"
												}`}
												title="Delete Story"
												disabled={deletingStoryId !== null}
											>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7} className="px-6 py-8 text-center text-charcoal">
									No stories found. Create your first story to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
