import type { ModelRouteResponseDto } from "@/api/generated";
import { Edit, ExternalLink, Eye, Trash2 } from "lucide-react";

interface ModelRouteTableProps {
	routes: ModelRouteResponseDto[];
	selectedRoutes: string[];
	onToggleSelection: (routeId: string) => void;
	onToggleSelectAll: () => void;
	onEdit: (route: ModelRouteResponseDto) => void;
	onDelete: (routeId: string, routeName: string) => void;
	deletingRouteId: string | null;
}

export default function ModelRouteTable({
	routes,
	selectedRoutes,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	onDelete,
	deletingRouteId,
}: ModelRouteTableProps) {
	const isAllSelected =
		selectedRoutes.length === routes.length && routes.length > 0;

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
							<th className="px-6 py-4 text-left font-semibold">Route Name</th>
							<th className="px-6 py-4 text-left font-semibold">Region</th>
							<th className="px-6 py-4 text-left font-semibold">Story ID</th>
							<th className="px-6 py-4 text-left font-semibold">
								Tourist Spots
							</th>
							<th className="px-6 py-4 text-left font-semibold">
								Recommendations
							</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{routes.length > 0 ? (
							routes.map((route, index) => (
								<tr
									key={route.modelRouteId}
									className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
										selectedRoutes.includes(route.modelRouteId)
											? "ring-2 ring-blue-200"
											: ""
									}`}
								>
									<td className="px-4 py-4">
										<input
											type="checkbox"
											checked={selectedRoutes.includes(route.modelRouteId)}
											onChange={() => onToggleSelection(route.modelRouteId)}
											className="rounded border-warmGrey2 text-red focus:ring-red"
										/>
									</td>
									<td className="px-6 py-4">
										<div className="font-semibold text-charcoal">
											{route.routeName}
										</div>
										{route.regionDesc && (
											<div className="text-xs text-warmGrey3 mt-1">
												{route.regionDesc.substring(0, 50)}
												{route.regionDesc.length > 50 ? "..." : ""}
											</div>
										)}
									</td>
									<td className="px-6 py-4">
										<span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
											{route.region || "N/A"}
										</span>
									</td>
									<td className="px-6 py-4">
										<code className="text-xs bg-gray-100 px-2 py-1 rounded text-charcoal">
											{route.storyId || "N/A"}
										</code>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-charcoal">
												{route.touristSpotList?.length || 0}
											</span>
											{route.touristSpotList &&
												route.touristSpotList.length > 0 && (
													<span className="text-xs text-green-600">✓</span>
												)}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-charcoal">
												{route.recommendation?.length || 0}
											</span>
											{route.recommendation &&
												route.recommendation.length > 0 && (
													<span className="text-xs text-purple-600">💡</span>
												)}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => onEdit(route)}
												className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
												title="Edit Route"
												disabled={deletingRouteId !== null}
											>
												<Edit size={16} />
											</button>
											<a
												href={`/v2/admin/model-routes/${route.modelRouteId}`}
												className={`rounded-lg bg-mustard p-2 text-charcoal hover:bg-opacity-80 transition-all ${
													deletingRouteId !== null
														? "pointer-events-none opacity-50"
														: ""
												}`}
												title="Manage Tourist Spots"
											>
												<Eye size={16} />
											</a>
											<a
												href={`/v2/region/${route.region}/${route.modelRouteId}`}
												className={`rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition-all ${
													deletingRouteId !== null
														? "pointer-events-none opacity-50"
														: ""
												}`}
												title="View Route Page"
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink size={16} />
											</a>
											<button
												type="button"
												onClick={() =>
													onDelete(route.modelRouteId, route.routeName)
												}
												className={`rounded-lg p-2 transition-all ${
													deletingRouteId === route.modelRouteId
														? "bg-red-200 text-red-600 cursor-not-allowed"
														: "bg-red-100 text-red-700 hover:bg-red-200"
												}`}
												title="Delete Route"
												disabled={deletingRouteId !== null}
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
									No model routes found. Create your first route to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
