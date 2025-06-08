"use client";
import { useState } from "react";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";

export default function AdminModelRoutes() {
	const { modelRoutes, isLoadingModelRoutes, mutateModelRoutes } =
		getModelRoutes();
	const [form, setForm] = useState({ routeName: "", region: "" });

	const handleCreate = async () => {
		await fetch("/api/routes/create-model-route", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({ routeName: "", region: "" });
		mutateModelRoutes();
	};

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold">Model Routes</h1>
			{isLoadingModelRoutes ? (
				<p>Loading...</p>
			) : (
				<ul className="list-disc pl-5">
					{modelRoutes?.map((r) => (
						<li key={r.modelRouteId}>{r.routeName}</li>
					))}
				</ul>
			)}
			<div className="border-t pt-4">
				<h2 className="font-semibold mb-2">Create Model Route</h2>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Route Name"
					value={form.routeName}
					onChange={(e) => setForm({ ...form, routeName: e.target.value })}
				/>
				<input
					className="border px-2 py-1 mr-2"
					placeholder="Region"
					value={form.region}
					onChange={(e) => setForm({ ...form, region: e.target.value })}
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
