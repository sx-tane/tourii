import React from "react";
import type { StoryCreateRequestDto } from "@/api/generated";

interface StoryFormProps {
	form: StoryCreateRequestDto;
	onChange: (form: StoryCreateRequestDto) => void;
	isSubmitting?: boolean;
}

export function StoryForm({ form, onChange, isSubmitting = false }: StoryFormProps) {
	const updateForm = (updates: Partial<StoryCreateRequestDto>) => {
		onChange({ ...form, ...updates });
	};

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{/* Basic Information */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-charcoal">
					Basic Information
				</h3>

				<div>
					<label
						htmlFor="sagaName"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Saga Name *
					</label>
					<input
						id="sagaName"
						type="text"
						value={form.sagaName}
						onChange={(e) => updateForm({ sagaName: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter saga name"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="sagaDesc"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Description *
					</label>
					<textarea
						id="sagaDesc"
						value={form.sagaDesc}
						onChange={(e) => updateForm({ sagaDesc: e.target.value })}
						rows={4}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter saga description"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="location"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Location
					</label>
					<input
						id="location"
						type="text"
						value={form.location}
						onChange={(e) => updateForm({ location: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter real world location"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="order"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Display Order
					</label>
					<input
						id="order"
						type="number"
						value={form.order}
						onChange={(e) =>
							updateForm({ order: Number.parseInt(e.target.value) || 0 })
						}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter display order"
						min="0"
						disabled={isSubmitting}
					/>
				</div>
			</div>

			{/* Media URLs */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-charcoal">Media URLs</h3>

				<div>
					<label
						htmlFor="backgroundMedia"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Background Media URL *
					</label>
					<input
						id="backgroundMedia"
						type="url"
						value={form.backgroundMedia}
						onChange={(e) => updateForm({ backgroundMedia: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="https://example.com/background.jpg"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="mapImage"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Map Image URL
					</label>
					<input
						id="mapImage"
						type="url"
						value={form.mapImage}
						onChange={(e) => updateForm({ mapImage: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="https://example.com/map.jpg"
						disabled={isSubmitting}
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
							onChange={(e) => updateForm({ isPrologue: e.target.checked })}
							className="rounded border-warmGrey2 text-red focus:ring-red"
							disabled={isSubmitting}
						/>
						<span className="text-sm font-medium text-charcoal">
							Is Prologue
						</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={form.isSelected}
							onChange={(e) => updateForm({ isSelected: e.target.checked })}
							className="rounded border-warmGrey2 text-red focus:ring-red"
							disabled={isSubmitting}
						/>
						<span className="text-sm font-medium text-charcoal">
							Is Selected
						</span>
					</label>
				</div>
			</div>
		</div>
	);
}