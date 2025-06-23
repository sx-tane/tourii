import type { StoryChapterResponseDto } from "@/api/generated";
import { Edit, ExternalLink, Trash2 } from "lucide-react";

interface StoryChapterTableProps {
	chapters: StoryChapterResponseDto[];
	selectedChapters: string[];
	deletingChapterId: string | null;
	storyId: string;
	onToggleSelection: (chapterId: string) => void;
	onToggleSelectAll: () => void;
	onEdit: (chapter: StoryChapterResponseDto) => void;
	onDelete: (chapterId: string, chapterTitle: string) => void;
}

export default function StoryChapterTable({
	chapters,
	selectedChapters,
	deletingChapterId,
	storyId,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	onDelete,
}: StoryChapterTableProps) {
	const isAllSelected =
		selectedChapters.length === chapters.length && chapters.length > 0;

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
							<th className="px-6 py-4 text-left font-semibold">Chapter</th>
							<th className="px-6 py-4 text-left font-semibold">Title</th>
							<th className="px-6 py-4 text-left font-semibold">Tourist Spot</th>
							<th className="px-6 py-4 text-left font-semibold">Characters</th>
							<th className="px-6 py-4 text-left font-semibold">Status</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{chapters.length > 0 ? (
							chapters.map((chapter, index) => (
								<tr
									key={chapter.storyChapterId}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-warmGrey"
									} ${
										selectedChapters.includes(chapter.storyChapterId)
											? "ring-2 ring-blue-200"
											: ""
									}`}
								>
									<td className="px-4 py-4">
										<input
											type="checkbox"
											checked={selectedChapters.includes(chapter.storyChapterId)}
											onChange={() => onToggleSelection(chapter.storyChapterId)}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</td>
									<td className="px-6 py-4">
										<div className="font-semibold text-charcoal">
											{chapter.chapterNumber}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="font-medium text-charcoal">
											{chapter.chapterTitle}
										</div>
										<div className="max-w-xs truncate text-sm text-warmGrey3">
											{chapter.chapterDesc || "No description"}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
											{chapter.touristSpotId}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="text-sm text-charcoal">
											{chapter.characterNameList?.length > 0
												? chapter.characterNameList.join(", ")
												: "No characters"}
										</div>
									</td>
									<td className="px-6 py-4">
										<span
											className={`rounded-full px-2 py-1 text-xs font-medium ${
												chapter.isUnlocked
													? "bg-green-100 text-green-800"
													: "bg-red text-warmGrey"
											}`}
										>
											{chapter.isUnlocked ? "Unlocked" : "Locked"}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => onEdit(chapter)}
												className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
												title="Edit Chapter"
												disabled={deletingChapterId !== null}
											>
												<Edit size={16} />
											</button>
											<a
												href={`/v2/touriiverse/${storyId}/chapters/${chapter.storyChapterId}`}
												className={`rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition-all ${
													deletingChapterId !== null
														? "pointer-events-none opacity-50"
														: ""
												}`}
												title="Jump to Chapter Page"
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink size={16} />
											</a>
											<button
												type="button"
												onClick={() =>
													onDelete(chapter.storyChapterId, chapter.chapterTitle)
												}
												className={`rounded-lg p-2 transition-all ${
													deletingChapterId === chapter.storyChapterId
														? "bg-red-200 text-red-600 cursor-not-allowed"
														: "bg-red-100 text-red-700 hover:bg-red-200"
												}`}
												title="Delete Chapter"
												disabled={deletingChapterId !== null}
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
									No chapters found. Create your first chapter to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
