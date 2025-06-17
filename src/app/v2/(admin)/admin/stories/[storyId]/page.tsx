"use client";
import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import { getSagaById } from "@/hooks/stories/getSagaById";
import { makeApiRequest } from "@/utils/api-helpers";
import type {
	StoryChapterCreateRequestDto,
	StoryChapterUpdateRequestDto,
	StoryChapterResponseDto,
} from "@/api/generated";
import { Edit, Plus, Eye, ArrowLeft, Trash2 } from "lucide-react";

export default function SagaDetail() {
	const { storyId } = useParams() as { storyId: string };
	const {
		storyChapterList,
		mutateStoryChapterList,
		isLoadingStoryChapterList,
	} = getSagaById(storyId);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingChapter, setEditingChapter] =
		useState<StoryChapterResponseDto | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingChapterId, setDeletingChapterId] = useState<string | null>(
		null,
	);

	const [form, setForm] = useState<StoryChapterCreateRequestDto>({
		touristSpotId: "",
		chapterNumber: "",
		chapterTitle: "",
		chapterDesc: "",
		chapterImage: "",
		characterNameList: [],
		realWorldImage: "",
		chapterVideoUrl: "",
		chapterVideoMobileUrl: "",
		chapterPdfUrl: "",
		isUnlocked: true,
	});

	const resetForm = useCallback(() => {
		setForm({
			touristSpotId: "",
			chapterNumber: "",
			chapterTitle: "",
			chapterDesc: "",
			chapterImage: "",
			characterNameList: [],
			realWorldImage: "",
			chapterVideoUrl: "",
			chapterVideoMobileUrl: "",
			chapterPdfUrl: "",
			isUnlocked: true,
		});
		setEditingChapter(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.touristSpotId.trim() ||
			!form.chapterNumber.trim() ||
			!form.chapterTitle.trim()
		) {
			alert(
				"Please fill in required fields: Tourist Spot ID, Chapter Number, and Chapter Title",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest(`/api/stories/create-chapter/${storyId}`, form);
			resetForm();
			setShowCreateModal(false);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to create chapter:", error);
			alert("Failed to create chapter. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (
			!editingChapter ||
			!form.touristSpotId.trim() ||
			!form.chapterNumber.trim() ||
			!form.chapterTitle.trim()
		) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			const updateData: StoryChapterUpdateRequestDto = {
				...form,
				storyChapterId: editingChapter.storyChapterId,
				delFlag: false,
				updUserId: "admin",
			};
			await makeApiRequest(
				`/api/stories/update-chapter/${editingChapter.storyChapterId}`,
				updateData,
				"PUT",
			);
			resetForm();
			setShowCreateModal(false);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to update chapter:", error);
			alert("Failed to update chapter. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (chapter: StoryChapterResponseDto) => {
		setEditingChapter(chapter);
		setForm({
			touristSpotId: chapter.touristSpotId || "",
			chapterNumber: chapter.chapterNumber || "",
			chapterTitle: chapter.chapterTitle || "",
			chapterDesc: chapter.chapterDesc || "",
			chapterImage: chapter.chapterImage || "",
			characterNameList: chapter.characterNameList || [],
			realWorldImage: chapter.realWorldImage || "",
			chapterVideoUrl: chapter.chapterVideoUrl || "",
			chapterVideoMobileUrl: chapter.chapterVideoMobileUrl || "",
			chapterPdfUrl: chapter.chapterPdfUrl || "",
			isUnlocked: chapter.isUnlocked !== undefined ? chapter.isUnlocked : true,
		});
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleCharacterListChange = (value: string) => {
		const characters = value
			.split(",")
			.map((char) => char.trim())
			.filter((char) => char.length > 0);
		setForm({ ...form, characterNameList: characters });
	};

	const handleDelete = async (chapterId: string, chapterTitle: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the chapter "${chapterTitle}"? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingChapterId(chapterId);
		try {
			await makeApiRequest(
				`/api/stories/delete-chapter/${chapterId}`,
				{},
				"DELETE",
			);
			await mutateStoryChapterList();
		} catch (error) {
			console.error("Failed to delete chapter:", error);
			alert(
				`Failed to delete chapter: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingChapterId(null);
		}
	};

	if (isLoadingStoryChapterList) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">Loading chapters...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<a
							href="/v2/admin/stories"
							className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
							title="Back to Stories"
						>
							<ArrowLeft size={18} />
						</a>
						<h1 className="text-3xl font-bold text-charcoal">
							Chapter Management
						</h1>
					</div>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-red/90 transition-all"
					>
						<Plus size={18} />
						Create New Chapter
					</button>
				</div>

				{/* Chapters Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-6 py-4 text-left font-semibold">Chapter</th>
									<th className="px-6 py-4 text-left font-semibold">Title</th>
									<th className="px-6 py-4 text-left font-semibold">
										Tourist Spot
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Characters
									</th>
									<th className="px-6 py-4 text-left font-semibold">Status</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{storyChapterList?.map((chapter, index) => (
									<tr
										key={chapter.storyChapterId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
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
														: "bg-red-100 text-red-800"
												}`}
											>
												{chapter.isUnlocked ? "Unlocked" : "Locked"}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(chapter)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Chapter"
													disabled={deletingChapterId !== null}
												>
													<Edit size={16} />
												</button>
												<button
													type="button"
													onClick={() =>
														handleDelete(
															chapter.storyChapterId,
															chapter.chapterTitle,
														)
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
								)) || (
									<tr>
										<td
											colSpan={6}
											className="px-6 py-8 text-center text-charcoal"
										>
											No chapters found. Create your first chapter to get
											started.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
						<div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold text-charcoal">
									{editingChapter ? "Edit Chapter" : "Create New Chapter"}
								</h2>
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
								>
									✕
								</button>
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{/* Basic Information */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Basic Information
									</h3>

									<div>
										<label
											htmlFor="touristSpotId"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Tourist Spot ID *
										</label>
										<input
											id="touristSpotId"
											type="text"
											value={form.touristSpotId}
											onChange={(e) =>
												setForm({ ...form, touristSpotId: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter tourist spot ID"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterNumber"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Number *
										</label>
										<input
											id="chapterNumber"
											type="text"
											value={form.chapterNumber}
											onChange={(e) =>
												setForm({ ...form, chapterNumber: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Prologue, Chapter 1"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterTitle"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Title *
										</label>
										<input
											id="chapterTitle"
											type="text"
											value={form.chapterTitle}
											onChange={(e) =>
												setForm({ ...form, chapterTitle: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter chapter title"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Description
										</label>
										<textarea
											id="chapterDesc"
											value={form.chapterDesc}
											onChange={(e) =>
												setForm({ ...form, chapterDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter chapter description"
										/>
									</div>

									<div>
										<label
											htmlFor="characterNameList"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Characters (comma-separated)
										</label>
										<input
											id="characterNameList"
											type="text"
											value={form.characterNameList.join(", ")}
											onChange={(e) =>
												handleCharacterListChange(e.target.value)
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="e.g., Sakura, Takeshi, Yuki"
										/>
									</div>
								</div>

								{/* Media URLs */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Media URLs
									</h3>

									<div>
										<label
											htmlFor="chapterImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Chapter Image URL
										</label>
										<input
											id="chapterImage"
											type="url"
											value={form.chapterImage}
											onChange={(e) =>
												setForm({ ...form, chapterImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter-image.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="realWorldImage"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Real World Image URL
										</label>
										<input
											id="realWorldImage"
											type="url"
											value={form.realWorldImage}
											onChange={(e) =>
												setForm({ ...form, realWorldImage: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/real-world-image.jpg"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterVideoUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Desktop Video URL
										</label>
										<input
											id="chapterVideoUrl"
											type="url"
											value={form.chapterVideoUrl}
											onChange={(e) =>
												setForm({ ...form, chapterVideoUrl: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter-video.mp4"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterVideoMobileUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Mobile Video URL
										</label>
										<input
											id="chapterVideoMobileUrl"
											type="url"
											value={form.chapterVideoMobileUrl}
											onChange={(e) =>
												setForm({
													...form,
													chapterVideoMobileUrl: e.target.value,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/mobile-video.mp4"
										/>
									</div>

									<div>
										<label
											htmlFor="chapterPdfUrl"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											PDF URL
										</label>
										<input
											id="chapterPdfUrl"
											type="url"
											value={form.chapterPdfUrl}
											onChange={(e) =>
												setForm({ ...form, chapterPdfUrl: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="https://example.com/chapter.pdf"
										/>
									</div>
								</div>

								{/* Settings */}
								<div className="md:col-span-2 space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Settings
									</h3>
									<div className="flex gap-6">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={form.isUnlocked}
												onChange={(e) =>
													setForm({ ...form, isUnlocked: e.target.checked })
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
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
									disabled={isSubmitting}
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={editingChapter ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-red/90 disabled:opacity-50"
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
				)}
			</div>
		</div>
	);
}
