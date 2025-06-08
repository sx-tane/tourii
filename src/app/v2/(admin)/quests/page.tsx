"use client";
import { useState } from "react";
import { getQuests } from "@/hooks/quests/getQuests";

export default function AdminQuests() {
	const { quests, isLoadingQuests, mutateQuests } =
		getQuests("/api/quests?page=1");
	const [form, setForm] = useState({ questName: "", questDesc: "" });

	const handleCreate = async () => {
		await fetch("/api/quests/create-quest", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({ questName: "", questDesc: "" });
		mutateQuests();
	};

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold">Quests</h1>
			{isLoadingQuests ? (
				<p>Loading...</p>
			) : (
				<ul className="list-disc pl-5">
					{quests?.quests?.map((q) => (
						<li key={q.questId}>{q.questName}</li>
					))}
				</ul>
			)}
			<div className="border-t pt-4">
				<h2 className="font-semibold mb-2">Create Quest</h2>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Quest Name"
					value={form.questName}
					onChange={(e) => setForm({ ...form, questName: e.target.value })}
				/>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Description"
					value={form.questDesc}
					onChange={(e) => setForm({ ...form, questDesc: e.target.value })}
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
