import type {
	StoryChapterCreateRequestDto,
	StoryChapterResponseDto,
} from "@/api/generated";
import { useId } from "react";

interface StoryChapterCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingChapter: StoryChapterResponseDto | null;
	form: StoryChapterCreateRequestDto;
	onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	onCharacterListChange: (value: string) => void;
}

export default function StoryChapterCreateEditModal({
	isOpen,
	onClose,
	editingChapter,
	form,
	onFormChange,
	onSubmit,
	isSubmitting,
	onCharacterListChange,
}: StoryChapterCreateEditModalProps) {
	const touristSpotIdId = useId();
	const chapterNumberId = useId();
	const chapterTitleId = useId();
	const chapterDescId = useId();
	const characterNameListId = useId();
	const chapterImageId = useId();
	const realWorldImageId = useId();
	const chapterVideoUrlId = useId();
	const chapterVideoMobileUrlId = useId();
	const chapterPdfUrlId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						{editingChapter ? "Edit Chapter" : "Create New Chapter"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
					>
						✕
					</button>
				</div>

				{/* Show comprehensive data when editing */}
				{editingChapter && (
					<div className="mb-6 rounded-lg bg-gray-50 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							📊 Complete Chapter Data
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Chapter ID:</span>{" "}
										{editingChapter.storyChapterId}
									</div>
									<div>
										<span className="font-medium">Story ID:</span>{" "}
										{editingChapter.storyId}
									</div>
									<div>
										<span className="font-medium">Tourist Spot ID:</span>{" "}
										{editingChapter.touristSpotId}
									</div>
									<div>
										<span className="font-medium">Saga Name:</span>{" "}
										{editingChapter.sagaName}
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">📅 Timestamps</h4>
								<div className="text-sm space-y-1">
									{editingChapter.insDateTime && (
										<div>
											<span className="font-medium">Created:</span>{" "}
											{editingChapter.insDateTime || "N/A"}
										</div>
									)}
									{editingChapter.updDateTime && (
										<div>
											<span className="font-medium">Updated:</span>{" "}
											{editingChapter.updDateTime || "N/A"}
										</div>
									)}
									{editingChapter.insUserId && (
										<div>
											<span className="font-medium">Created By:</span>{" "}
											{editingChapter.insUserId}
										</div>
									)}
									{editingChapter.updUserId && (
										<div>
											<span className="font-medium">Updated By:</span>{" "}
											{editingChapter.updUserId}
										</div>
									)}
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🎬 Media URLs</h4>
								<div className="text-sm space-y-1">
									{editingChapter.chapterImage && (
										<div>
											<span className="font-medium">📷 Chapter Image:</span>
											<div className="truncate text-green-600">
												{editingChapter.chapterImage}
											</div>
										</div>
									)}
									{editingChapter.realWorldImage && (
										<div>
											<span className="font-medium">🌍 Real World:</span>
											<div className="truncate text-blue-600">
												{editingChapter.realWorldImage}
											</div>
										</div>
									)}
									{editingChapter.chapterVideoUrl && (
										<div>
											<span className="font-medium">🎥 Desktop Video:</span>
											<div className="truncate text-purple-600">
												{editingChapter.chapterVideoUrl}
											</div>
										</div>
									)}
									{editingChapter.chapterVideoMobileUrl && (
										<div>
											<span className="font-medium">📱 Mobile Video:</span>
											<div className="truncate text-purple-600">
												{editingChapter.chapterVideoMobileUrl}
											</div>
										</div>
									)}
									{editingChapter.chapterPdfUrl && (
										<div>
											<span className="font-medium">📄 PDF:</span>
											<div className="truncate text-red-600">
												{editingChapter.chapterPdfUrl}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">👥 Characters</h4>
								<div className="text-sm space-y-1">
									{editingChapter.characterNameList &&
									editingChapter.characterNameList.length > 0 ? (
										<div className="space-y-1">
											<div>
												<span className="font-medium">Count:</span>{" "}
												{editingChapter.characterNameList.length}
											</div>
											{editingChapter.characterNameList.map((char, idx) => (
												<div
													key={`char-${editingChapter.storyChapterId}-${char}-${idx}`}
													className="text-blue-600"
												>
													• {char}
												</div>
											))}
										</div>
									) : (
										<div className="text-gray-500">No characters assigned</div>
									)}
								</div>
							</div>
						</div>

						{/* Status & Settings */}
						<div className="mt-4 grid grid-cols-2 gap-4">
							<div>
								<h4 className="font-medium text-charcoal">⚙️ Settings</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Unlocked:</span>{" "}
										{editingChapter.isUnlocked ? "✅ Yes" : "❌ No"}
									</div>
									<div>
										<span className="font-medium">Del Flag:</span>{" "}
										{editingChapter.delFlag ? "❌ Deleted" : "✅ Active"}
									</div>
								</div>
							</div>
						</div>

						{/* Raw JSON Data */}
						<details className="mt-4">
							<summary className="font-medium text-purple-600 cursor-pointer">
								🔍 Raw JSON Data
							</summary>
							<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
								{JSON.stringify(editingChapter, null, 2)}
							</pre>
						</details>
					</div>
				)}

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Basic Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">
							Basic Information
						</h3>

						<div>
							<label
								htmlFor={touristSpotIdId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Tourist Spot ID *
							</label>
							<input
								id={touristSpotIdId}
								type="text"
								value={form.touristSpotId}
								onChange={(e) =>
									onFormChange({ touristSpotId: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter tourist spot ID"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterNumberId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Chapter Number *
							</label>
							<input
								id={chapterNumberId}
								type="text"
								value={form.chapterNumber}
								onChange={(e) =>
									onFormChange({ chapterNumber: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="e.g., Prologue, Chapter 1"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterTitleId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Chapter Title *
							</label>
							<input
								id={chapterTitleId}
								type="text"
								value={form.chapterTitle}
								onChange={(e) => onFormChange({ chapterTitle: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter chapter title"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterDescId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Chapter Description
							</label>
							<textarea
								id={chapterDescId}
								value={form.chapterDesc}
								onChange={(e) => onFormChange({ chapterDesc: e.target.value })}
								rows={4}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter chapter description"
							/>
						</div>

						<div>
							<label
								htmlFor={characterNameListId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Characters (comma-separated)
							</label>
							<input
								id={characterNameListId}
								type="text"
								value={form.characterNameList.join(", ")}
								onChange={(e) => onCharacterListChange(e.target.value)}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="e.g., Sakura, Takeshi, Yuki"
							/>
						</div>
					</div>

					{/* Media URLs */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">Media URLs</h3>

						<div>
							<label
								htmlFor={chapterImageId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Chapter Image URL
							</label>
							<input
								id={chapterImageId}
								type="url"
								value={form.chapterImage}
								onChange={(e) => onFormChange({ chapterImage: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/chapter-image.jpg"
							/>
						</div>

						<div>
							<label
								htmlFor={realWorldImageId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Real World Image URL
							</label>
							<input
								id={realWorldImageId}
								type="url"
								value={form.realWorldImage}
								onChange={(e) =>
									onFormChange({ realWorldImage: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/real-world-image.jpg"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterVideoUrlId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Desktop Video URL
							</label>
							<input
								id={chapterVideoUrlId}
								type="url"
								value={form.chapterVideoUrl}
								onChange={(e) =>
									onFormChange({ chapterVideoUrl: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/chapter-video.mp4"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterVideoMobileUrlId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Mobile Video URL
							</label>
							<input
								id={chapterVideoMobileUrlId}
								type="url"
								value={form.chapterVideoMobileUrl}
								onChange={(e) =>
									onFormChange({
										chapterVideoMobileUrl: e.target.value,
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/mobile-video.mp4"
							/>
						</div>

						<div>
							<label
								htmlFor={chapterPdfUrlId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								PDF URL
							</label>
							<input
								id={chapterPdfUrlId}
								type="url"
								value={form.chapterPdfUrl}
								onChange={(e) =>
									onFormChange({ chapterPdfUrl: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/chapter.pdf"
							/>
						</div>
					</div>

					{/* Settings */}
					<div className="md:col-span-2 space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">Settings</h3>
						<div className="flex gap-6">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.isUnlocked}
									onChange={(e) =>
										onFormChange({ isUnlocked: e.target.checked })
									}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
								<span className="text-sm font-medium text-charcoal">
									Is Unlocked
								</span>
							</label>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="mt-8 flex justify-end gap-4">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onSubmit}
						disabled={isSubmitting}
						className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
					>
						{isSubmitting
							? "Saving..."
							: editingChapter
								? "Update Chapter"
								: "Create Chapter"}
					</button>
				</div>
			</div>
		</div>
	);
}
