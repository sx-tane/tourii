import type {
	ModelRouteCreateRequestDto,
	ModelRouteResponseDto,
} from "@/api/generated";
import { useId } from "react";

interface ModelRouteCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingRoute: ModelRouteResponseDto | null;
	form: ModelRouteCreateRequestDto;
	onFormChange: (updates: Partial<ModelRouteCreateRequestDto>) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	recommendationText: string;
	onRecommendationTextChange: (text: string) => void;
}

export default function ModelRouteCreateEditModal({
	isOpen,
	onClose,
	editingRoute,
	form,
	onFormChange,
	onSubmit,
	isSubmitting,
	recommendationText,
	onRecommendationTextChange,
}: ModelRouteCreateEditModalProps) {
	const storyIdId = useId();
	const routeNameId = useId();
	const regionId = useId();
	const regionDescId = useId();
	const regionBackgroundMediaId = useId();
	const recommendationId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						{editingRoute ? "Edit Model Route" : "Create New Model Route"}
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
				{editingRoute && (
					<div className="mb-6 rounded-lg bg-gray-50 p-4">
						<h3 className="text-lg font-semibold text-charcoal mb-4">
							📊 Complete Route Data
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Route ID:</span>{" "}
										{editingRoute.modelRouteId}
									</div>
									<div>
										<span className="font-medium">Story ID:</span>{" "}
										{editingRoute.storyId || "N/A"}
									</div>
									<div>
										<span className="font-medium">Region:</span>{" "}
										{editingRoute.region || "N/A"}
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">🏖️ Tourist Spots</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Total Spots:</span>{" "}
										{editingRoute.touristSpotList?.length || 0}
									</div>
									{editingRoute.touristSpotList &&
										editingRoute.touristSpotList.length > 0 && (
											<div className="max-h-20 overflow-y-auto">
												{editingRoute.touristSpotList
													.slice(0, 3)
													.map((spot, idx) => (
														<div
															key={spot.touristSpotId || idx}
															className="text-xs text-gray-600"
														>
															{spot.touristSpotName || `Spot ${idx + 1}`}
														</div>
													))}
												{editingRoute.touristSpotList.length > 3 && (
													<div className="text-xs text-gray-500">
														...and {editingRoute.touristSpotList.length - 3}{" "}
														more
													</div>
												)}
											</div>
										)}
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium text-charcoal">
									💡 Recommendations
								</h4>
								<div className="text-sm space-y-1">
									<div>
										<span className="font-medium">Count:</span>{" "}
										{editingRoute.recommendation?.length || 0}
									</div>
									{editingRoute.recommendation &&
										editingRoute.recommendation.length > 0 && (
											<div className="max-h-20 overflow-y-auto">
												{editingRoute.recommendation.map((rec, idx) => (
													<div
														key={`rec-${idx}-${rec.substring(0, 10)}`}
														className="text-xs text-purple-600"
													>
														{rec}
													</div>
												))}
											</div>
										)}
								</div>
							</div>
						</div>

						{/* Raw JSON Data */}
						<details className="mt-4">
							<summary className="font-medium text-purple-600 cursor-pointer">
								🔍 Raw JSON Data
							</summary>
							<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
								{JSON.stringify(editingRoute, null, 2)}
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
								htmlFor={storyIdId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Story ID *
							</label>
							<input
								id={storyIdId}
								type="text"
								value={form.storyId}
								onChange={(e) => onFormChange({ storyId: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter story ID"
							/>
						</div>

						<div>
							<label
								htmlFor={routeNameId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Route Name *
							</label>
							<input
								id={routeNameId}
								type="text"
								value={form.routeName}
								onChange={(e) => onFormChange({ routeName: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter route name"
							/>
						</div>

						<div>
							<label
								htmlFor={regionId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Region *
							</label>
							<input
								id={regionId}
								type="text"
								value={form.region}
								onChange={(e) => onFormChange({ region: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter region name"
							/>
						</div>

						<div>
							<label
								htmlFor={regionDescId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Region Description
							</label>
							<textarea
								id={regionDescId}
								value={form.regionDesc}
								onChange={(e) => onFormChange({ regionDesc: e.target.value })}
								rows={4}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter region description"
							/>
						</div>
					</div>

					{/* Media and Recommendations */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">
							Media & Recommendations
						</h3>

						<div>
							<label
								htmlFor={regionBackgroundMediaId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Background Media URL
							</label>
							<input
								id={regionBackgroundMediaId}
								type="url"
								value={form.regionBackgroundMedia}
								onChange={(e) =>
									onFormChange({ regionBackgroundMedia: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/background.jpg"
							/>
						</div>

						<div>
							<label
								htmlFor={recommendationId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Recommendations
							</label>
							<textarea
								id={recommendationId}
								value={recommendationText}
								onChange={(e) => onRecommendationTextChange(e.target.value)}
								rows={6}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter recommendations separated by commas"
							/>
							<div className="text-xs text-warmGrey3 mt-1">
								Separate multiple recommendations with commas
							</div>
						</div>

						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
							<h4 className="font-medium text-yellow-800 mb-2">
								📝 Note about Tourist Spots
							</h4>
							<p className="text-sm text-yellow-700">
								Tourist spots for this route can be managed after creation by
								clicking the "Manage Tourist Spots" action.
							</p>
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
							: editingRoute
								? "Update Route"
								: "Create Route"}
					</button>
				</div>
			</div>
		</div>
	);
}
