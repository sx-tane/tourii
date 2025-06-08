"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getSagaById } from "@/hooks/stories/getSagaById";

export default function SagaDetail() {
	const { storyId } = useParams() as { storyId: string };
	const {
		storyChapterList,
		mutateStoryChapterList,
		isLoadingStoryChapterList,
	} = getSagaById(storyId);
	const [form, setForm] = useState({ chapterNumber: "", chapterTitle: "" });

	const handleCreate = async () => {
		await fetch(`/api/stories/create-chapter/${storyId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({ chapterNumber: "", chapterTitle: "" });
		mutateStoryChapterList();
	};

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold">Chapters</h1>
			{isLoadingStoryChapterList ? (
				<p>Loading...</p>
			) : (
				<ul className="list-disc pl-5">
					{storyChapterList?.map((c) => (
						<li key={c.storyChapterId}>{c.chapterTitle}</li>
					))}
				</ul>
			)}
			<div className="border-t pt-4">
				<h2 className="font-semibold mb-2">Create Chapter</h2>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Chapter No."
					value={form.chapterNumber}
					onChange={(e) => setForm({ ...form, chapterNumber: e.target.value })}
				/>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Title"
					value={form.chapterTitle}
					onChange={(e) => setForm({ ...form, chapterTitle: e.target.value })}
				/>
                <button
                    type="button"
                    onClick={handleCreate}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                >
                    Create
                </button>
			</div>
		</div>
	);
}
