import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import { useId } from "react";

interface StoryCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingStory: StoryResponseDto | null;
	form: StoryCreateRequestDto;
	onFormChange: (updates: Partial<StoryCreateRequestDto>) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
}

export default function StoryCreateEditModal({
	isOpen,
	onClose,
	editingStory,
	form,
	onFormChange,
	onSubmit,
	isSubmitting,
}: StoryCreateEditModalProps) {
	const sagaNameId = useId();
	const sagaDescId = useId();
	const locationId = useId();
	const orderId = useId();
	const backgroundMediaId = useId();
	const mapImageId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						{editingStory ? "Edit Story" : "Create New Story"}
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
				{editingStory && (
					<div className="mb-6 rounded-lg bg-gray-50 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							📊 Complete Story Data
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Story ID:</span>{" "}
										{editingStory.storyId}
									</div>
									<div>
										<span className="font-medium">Order:</span>{" "}
										{editingStory.order || 0}
									</div>
									<div>
										<span className="font-medium">Is Selected:</span>{" "}
										{editingStory.isSelected ? "✅ Yes" : "❌ No"}
									</div>
									<div>
										<span className="font-medium">Is Prologue:</span>{" "}
										{editingStory.isPrologue ? "✅ Yes" : "❌ No"}
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">📅 Timestamps</h4>
								<div className="text-sm space-y-1">
									{editingStory.insDateTime && (
										<div>
											<span className="font-medium">Created:</span>{" "}
											{editingStory.insDateTime || "N/A"}
										</div>
									)}
									{editingStory.updDateTime && (
										<div>
											<span className="font-medium">Updated:</span>{" "}
											{editingStory.updDateTime || "N/A"}
										</div>
									)}
									{editingStory.insUserId && (
										<div>
											<span className="font-medium">Created By:</span>{" "}
											{editingStory.insUserId}
										</div>
									)}
									{editingStory.updUserId && (
										<div>
											<span className="font-medium">Updated By:</span>{" "}
											{editingStory.updUserId}
										</div>
									)}
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🖼️ Media URLs</h4>
								<div className="text-sm space-y-1">
									{editingStory.backgroundMedia && (
										<div>
											<span className="font-medium">Background:</span>
											<div className="truncate text-blue-600">
												{editingStory.backgroundMedia}
											</div>
										</div>
									)}
									{editingStory.mapImage && (
										<div>
											<span className="font-medium">Map Image:</span>
											<div className="truncate text-green-600">
												{editingStory.mapImage}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Chapters List */}
						{editingStory.chapterList &&
							editingStory.chapterList.length > 0 && (
								<div className="mt-4">
									<h4 className="font-medium text-charcoal mb-2">
										📚 Chapters ({editingStory.chapterList.length})
									</h4>
									<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
										{editingStory.chapterList.map((chapter, idx) => (
											<div
												key={`modal-chapter-${editingStory.storyId}-${chapter.storyChapterId || idx}`}
												className="flex justify-between py-1 border-b last:border-b-0"
											>
												<span className="text-sm">
													{chapter.chapterNumber}: {chapter.chapterTitle}
												</span>
												<span className="text-xs text-gray-500">
													ID: {chapter.storyChapterId}
												</span>
											</div>
										))}
									</div>
								</div>
							)}

						{/* Raw JSON Data */}
						<details className="mt-4">
							<summary className="font-medium text-purple-600 cursor-pointer">
								🔍 Raw JSON Data
							</summary>
							<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
								{JSON.stringify(editingStory, null, 2)}
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
								htmlFor={sagaNameId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Saga Name *
							</label>
							<input
								id={sagaNameId}
								type="text"
								value={form.sagaName}
								onChange={(e) => onFormChange({ sagaName: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter saga name"
							/>
						</div>

						<div>
							<label
								htmlFor={sagaDescId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Description *
							</label>
							<textarea
								id={sagaDescId}
								value={form.sagaDesc}
								onChange={(e) => onFormChange({ sagaDesc: e.target.value })}
								rows={4}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter saga description"
							/>
						</div>

						<div>
							<label
								htmlFor={locationId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Location
							</label>
							<input
								id={locationId}
								type="text"
								value={form.location}
								onChange={(e) => onFormChange({ location: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter real world location"
							/>
						</div>

						<div>
							<label
								htmlFor={orderId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Display Order
							</label>
							<input
								id={orderId}
								type="number"
								value={form.order}
								onChange={(e) =>
									onFormChange({ order: Number.parseInt(e.target.value) || 0 })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter display order"
								min="0"
							/>
						</div>
					</div>

					{/* Media URLs */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">Media URLs</h3>

						<div>
							<label
								htmlFor={backgroundMediaId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Background Media URL *
							</label>
							<input
								id={backgroundMediaId}
								type="url"
								value={form.backgroundMedia}
								onChange={(e) =>
									onFormChange({ backgroundMedia: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/background.jpg"
							/>
						</div>

						<div>
							<label
								htmlFor={mapImageId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Map Image URL
							</label>
							<input
								id={mapImageId}
								type="url"
								value={form.mapImage}
								onChange={(e) => onFormChange({ mapImage: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/map.jpg"
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
									checked={form.isPrologue}
									onChange={(e) =>
										onFormChange({ isPrologue: e.target.checked })
									}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
								<span className="text-sm font-medium text-charcoal">
									Is Prologue
								</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.isSelected}
									onChange={(e) =>
										onFormChange({ isSelected: e.target.checked })
									}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
								<span className="text-sm font-medium text-charcoal">
									Is Selected
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
							: editingStory
								? "Update Story"
								: "Create Story"}
					</button>
				</div>
			</div>
		</div>
	);
}
