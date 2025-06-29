import type { TouristSpotCreateRequestDto } from "@/api/generated";
import { useId } from "react";

interface StandaloneSpotCreateModalProps {
	isOpen: boolean;
	onClose: () => void;
	form: TouristSpotCreateRequestDto;
	onFormChange: (updates: Partial<TouristSpotCreateRequestDto>) => void;
	hashtagText: string;
	onHashtagTextChange: (text: string) => void;
	smallImagesText: string;
	onSmallImagesTextChange: (text: string) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
}

export default function StandaloneSpotCreateModal({
	isOpen,
	onClose,
	form,
	onFormChange,
	hashtagText,
	onHashtagTextChange,
	smallImagesText,
	onSmallImagesTextChange,
	onSubmit,
	isSubmitting,
}: StandaloneSpotCreateModalProps) {
	const storyChapterIdId = useId();
	const touristSpotNameId = useId();
	const addressId = useId();
	const touristSpotDescId = useId();
	const bestVisitTimeId = useId();
	const mainImageId = useId();
	const smallImagesId = useId();
	const hashtagsId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						Create Standalone Tourist Spot
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
					>
						✕
					</button>
				</div>

				<div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
					<h3 className="font-semibold text-charcoal mb-2">ℹ️ About Standalone Tourist Spots</h3>
					<p className="text-sm text-charcoal text-opacity-80">
						Create tourist spots that exist independently of routes. These spots can be discovered by users, 
						added to multiple routes, and used in quest creation. Perfect for building a comprehensive database of locations.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Basic Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">
							Basic Information
						</h3>

						<div>
							<label
								htmlFor={storyChapterIdId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Story Chapter ID (optional)
							</label>
							<input
								id={storyChapterIdId}
								type="text"
								value={form.storyChapterId || ""}
								onChange={(e) =>
									onFormChange({ 
										storyChapterId: e.target.value.trim() || undefined 
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter valid story chapter ID or leave blank"
							/>
							<p className="mt-1 text-xs text-warmGrey3">
								Link to a story chapter if this spot has an associated narrative
							</p>
						</div>

						<div>
							<label
								htmlFor={touristSpotNameId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Spot Name *
							</label>
							<input
								id={touristSpotNameId}
								type="text"
								value={form.touristSpotName || ""}
								onChange={(e) =>
									onFormChange({ touristSpotName: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter tourist spot name"
								required
							/>
						</div>

						<div>
							<label
								htmlFor={addressId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Address *
							</label>
							<input
								id={addressId}
								type="text"
								value={form.address || ""}
								onChange={(e) => onFormChange({ address: e.target.value })}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Enter full address for location accuracy"
								required
							/>
						</div>

						<div>
							<label
								htmlFor={touristSpotDescId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Description *
							</label>
							<textarea
								id={touristSpotDescId}
								value={form.touristSpotDesc || ""}
								onChange={(e) =>
									onFormChange({ touristSpotDesc: e.target.value })
								}
								rows={4}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="Describe what makes this spot special and worth visiting"
								required
							/>
						</div>

						<div>
							<label
								htmlFor={bestVisitTimeId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Best Visit Time
							</label>
							<input
								id={bestVisitTimeId}
								type="text"
								value={form.bestVisitTime || ""}
								onChange={(e) =>
									onFormChange({ bestVisitTime: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="e.g., Spring morning, Summer evening, All year round"
							/>
						</div>
					</div>

					{/* Media & Tags */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-charcoal">
							Media & Tags
						</h3>

						<div>
							<label
								htmlFor={mainImageId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Main Image URL
							</label>
							<input
								id={mainImageId}
								type="url"
								value={form.imageSet?.main || ""}
								onChange={(e) =>
									onFormChange({
										imageSet: {
											...(form.imageSet || { main: "", small: [] }),
											main: e.target.value,
										},
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/main-image.jpg"
							/>
						</div>

						<div>
							<label
								htmlFor={smallImagesId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Additional Images (comma-separated URLs)
							</label>
							<textarea
								id={smallImagesId}
								value={smallImagesText}
								onChange={(e) => onSmallImagesTextChange(e.target.value)}
								rows={3}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
							/>
							<p className="mt-1 text-xs text-warmGrey3">
								Separate multiple image URLs with commas
							</p>
						</div>

						<div>
							<label
								htmlFor={hashtagsId}
								className="block text-sm font-medium text-charcoal mb-2"
							>
								Hashtags (comma-separated)
							</label>
							<textarea
								id={hashtagsId}
								value={hashtagText}
								onChange={(e) => onHashtagTextChange(e.target.value)}
								rows={3}
								className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
								placeholder="e.g., #temple, #historical, #peaceful, #nature"
							/>
							<p className="mt-1 text-xs text-warmGrey3">
								Use hashtags to categorize and make spots discoverable
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
						disabled={isSubmitting || !form.touristSpotName || !form.address || !form.touristSpotDesc}
						className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Creating..." : "Create Standalone Spot"}
					</button>
				</div>
			</div>
		</div>
	);
}