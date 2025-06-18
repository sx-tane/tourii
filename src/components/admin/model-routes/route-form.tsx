import React from "react";
import type { ModelRouteCreateRequestDto } from "@/api/generated";

interface RouteFormProps {
	form: ModelRouteCreateRequestDto;
	onChange: (form: ModelRouteCreateRequestDto) => void;
	recommendationText: string;
	onRecommendationChange: (text: string) => void;
	isSubmitting?: boolean;
}

export function RouteForm({ 
	form, 
	onChange, 
	recommendationText, 
	onRecommendationChange, 
	isSubmitting = false 
}: RouteFormProps) {
	const updateForm = (updates: Partial<ModelRouteCreateRequestDto>) => {
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
						htmlFor="storyId"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Story ID *
					</label>
					<input
						id="storyId"
						type="text"
						value={form.storyId}
						onChange={(e) => updateForm({ storyId: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter story ID"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="routeName"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Route Name *
					</label>
					<input
						id="routeName"
						type="text"
						value={form.routeName}
						onChange={(e) => updateForm({ routeName: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter route name"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="region"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Region *
					</label>
					<input
						id="region"
						type="text"
						value={form.region}
						onChange={(e) => updateForm({ region: e.target.value })}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter region name"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="regionDesc"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Region Description
					</label>
					<textarea
						id="regionDesc"
						value={form.regionDesc}
						onChange={(e) => updateForm({ regionDesc: e.target.value })}
						rows={4}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="Enter region description"
						disabled={isSubmitting}
					/>
				</div>
			</div>

			{/* Media & Settings */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-charcoal">
					Media & Recommendations
				</h3>

				<div>
					<label
						htmlFor="regionBackgroundMedia"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Background Media URL
					</label>
					<input
						id="regionBackgroundMedia"
						type="url"
						value={form.regionBackgroundMedia}
						onChange={(e) =>
							updateForm({ regionBackgroundMedia: e.target.value })
						}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="https://example.com/background.jpg"
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label
						htmlFor="recommendation"
						className="block text-sm font-medium text-charcoal mb-2"
					>
						Recommendations (comma-separated)
					</label>
					<textarea
						id="recommendation"
						value={recommendationText}
						onChange={(e) => onRecommendationChange(e.target.value)}
						rows={6}
						className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
						placeholder="e.g., Visit during cherry blossom season, Try local cuisine, Bring comfortable shoes"
						disabled={isSubmitting}
					/>
				</div>
			</div>
		</div>
	);
}