import React from "react";
import { MapPin, Trophy } from "lucide-react";

interface DistributionChartsProps {
	distribution: {
		regions: Record<string, number>;
		questTypes: Record<string, number>;
	};
	totalRoutes: number;
	totalQuests: number;
}

export function DistributionCharts({
	distribution,
	totalRoutes,
	totalQuests,
}: DistributionChartsProps) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{/* Regional Distribution */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
					<MapPin size={18} />
					Geographic Distribution
				</h3>
				<div className="space-y-3">
					{Object.entries(distribution.regions).map(([region, count]) => (
						<div key={region} className="flex items-center justify-between">
							<span className="text-sm font-medium text-charcoal">
								{region}
							</span>
							<div className="flex items-center gap-2">
								<div
									className="h-2 bg-blue-500 rounded"
									style={{
										width: `${Math.max(
											(count / totalRoutes) * 100,
											20,
										)}px`,
									}}
								/>
								<span className="text-sm text-warmGrey3 w-8 text-right">
									{count}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Quest Type Distribution */}
			<div className="rounded-lg bg-white p-6 shadow">
				<h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
					<Trophy size={18} />
					Quest Type Distribution
				</h3>
				<div className="space-y-3">
					{Object.keys(distribution.questTypes).length === 0 ? (
						<div className="text-center text-gray-500 py-4">
							No quest data available. Add some quests to see distribution.
						</div>
					) : (
						Object.entries(distribution.questTypes).map(([type, count]) => (
							<div key={type} className="flex items-center justify-between">
								<span className="text-sm font-medium text-charcoal">
									{type.replace(/_/g, " ")}
								</span>
								<div className="flex items-center gap-2">
									<div
										className="h-2 bg-yellow-500 rounded"
										style={{
											width: `${Math.max(
												totalQuests > 0 ? (count / totalQuests) * 100 : 20,
												20,
											)}px`,
										}}
									/>
									<span className="text-sm text-warmGrey3 w-8 text-right">
										{count}
									</span>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}