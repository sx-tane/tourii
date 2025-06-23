import type { TouristSpotResponseDto } from "@/api/generated";
import { Camera, Edit, Tag, Trash2 } from "lucide-react";

interface TouristSpotTableProps {
	spots: TouristSpotResponseDto[];
	selectedSpots: string[];
	deletingSpotId: string | null;
	onToggleSelection: (spotId: string) => void;
	onToggleSelectAll: () => void;
	onEdit: (spot: TouristSpotResponseDto) => void;
	onDelete: (spotId: string, spotName: string) => void;
}

export default function TouristSpotTable({
	spots,
	selectedSpots,
	deletingSpotId,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	onDelete,
}: TouristSpotTableProps) {
	const isAllSelected = selectedSpots.length === spots.length && spots.length > 0;

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={isAllSelected}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							<th className="px-6 py-4 text-left font-semibold">Spot Name</th>
							<th className="px-6 py-4 text-left font-semibold">
								Description
							</th>
							<th className="px-6 py-4 text-left font-semibold">
								Best Visit Time
							</th>
							<th className="px-6 py-4 text-left font-semibold">Hashtags</th>
							<th className="px-6 py-4 text-left font-semibold">Images</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{spots.length > 0 ? (
							spots.map((spot, index) => (
								<tr
									key={spot.touristSpotId}
									className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
										selectedSpots.includes(spot.touristSpotId)
											? "ring-2 ring-blue-200"
											: ""
									}`}
								>
									<td className="px-4 py-4">
										<input
											type="checkbox"
											checked={selectedSpots.includes(spot.touristSpotId)}
											onChange={() => onToggleSelection(spot.touristSpotId)}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</td>
									<td className="px-6 py-4">
										<div className="font-semibold text-charcoal">
											{spot.touristSpotName}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="max-w-xs truncate text-sm text-charcoal">
											{spot.touristSpotDesc || "No description"}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="rounded-full bg-mustard px-2 py-1 text-xs font-medium text-charcoal">
											{spot.bestVisitTime || "Anytime"}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex flex-wrap gap-1">
											{spot.touristSpotHashtag
												?.slice(0, 2)
												.map((tag, tagIndex) => (
													<span
														key={`${spot.touristSpotId}-tag-${tagIndex}`}
														className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
													>
														<Tag size={10} />
														{tag}
													</span>
												))}
											{spot.touristSpotHashtag &&
												spot.touristSpotHashtag.length > 2 && (
													<span className="text-xs text-warmGrey3">
														+{spot.touristSpotHashtag.length - 2} more
													</span>
												)}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-1 text-sm text-charcoal">
											<Camera size={14} />
											<span>
												{spot.imageSet?.main ? 1 : 0} main,{" "}
												{spot.imageSet?.small?.length || 0} small
											</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => onEdit(spot)}
												className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
												title="Edit Tourist Spot"
												disabled={deletingSpotId !== null}
											>
												<Edit size={16} />
											</button>
											<button
												type="button"
												onClick={() =>
													onDelete(spot.touristSpotId, spot.touristSpotName)
												}
												className={`rounded-lg p-2 transition-all ${
													deletingSpotId === spot.touristSpotId
														? "bg-red-200 text-red-600 cursor-not-allowed"
														: "bg-red-100 text-red-700 hover:bg-red-200"
												}`}
												title="Delete Tourist Spot"
												disabled={deletingSpotId !== null}
											>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7} className="px-6 py-8 text-center text-charcoal">
									No tourist spots found. Add your first spot to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}