"use client";
import { useState } from "react";
import { getSagas } from "@/hooks/stories/getSagas";

export default function AdminStories() {
	const { sagas, isLoadingSagas, mutateSagas } = getSagas();
	const [form, setForm] = useState({ sagaName: "", sagaDesc: "" });

	const handleCreate = async () => {
		await fetch("/api/stories/create-saga", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({ sagaName: "", sagaDesc: "" });
		mutateSagas();
	};

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold">Stories</h1>
			{isLoadingSagas ? (
				<p>Loading...</p>
			) : (
				<ul className="list-disc pl-5">
					{sagas?.map((s) => (
						<li key={s.sagaId} className="mb-1">
							<a
								href={`/v2/admin/stories/${s.sagaId}`}
								className="text-indigo-600 underline"
							>
								{s.sagaName}
							</a>
						</li>
					))}
				</ul>
			)}
			<div className="border-t pt-4">
				<h2 className="font-semibold mb-2">Create Saga</h2>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Saga Name"
					value={form.sagaName}
					onChange={(e) => setForm({ ...form, sagaName: e.target.value })}
				/>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Description"
					value={form.sagaDesc}
					onChange={(e) => setForm({ ...form, sagaDesc: e.target.value })}
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
