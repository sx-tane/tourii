import type React from "react";
import { useState, useEffect } from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

interface FilterComponentProps {
	modelRoutes: ModelRouteResponseDto[];
	onFilterChange: (filteredRoutes: ModelRouteResponseDto[]) => void;
	availableRegions?: string[];
	availableRecommendations?: string[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	modelRoutes,
	onFilterChange,
	availableRegions,
	availableRecommendations,
}) => {
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [selectedRecommendation, setSelectedRecommendation] =
		useState<string>("");

	useEffect(() => {
		let filtered = [...modelRoutes];

		if (selectedRegion) {
			filtered = filtered.filter((route) => route.region === selectedRegion);
		}

		if (selectedRecommendation) {
			filtered = filtered.filter((route) =>
				route.recommendation.includes(selectedRecommendation),
			);
		}

		onFilterChange(filtered);
	}, [selectedRegion, selectedRecommendation, modelRoutes, onFilterChange]);

	return (
		<div style={{ padding: "20px", border: "1px solid #eee", margin: "10px" }}>
			<h4>Filter Options</h4>
			{availableRegions && availableRegions.length > 0 && (
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="region-filter" style={{ marginRight: "10px" }}>
						Region:
					</label>
					<select
						id="region-filter"
						value={selectedRegion}
						onChange={(e) => setSelectedRegion(e.target.value)}
					>
						<option value="">All Regions</option>
						{availableRegions.map((region) => (
							<option key={region} value={region}>
								{region}
							</option>
						))}
					</select>
				</div>
			)}

			{availableRecommendations && availableRecommendations.length > 0 && (
				<div style={{ marginBottom: "10px" }}>
					<label
						htmlFor="recommendation-filter"
						style={{ marginRight: "10px" }}
					>
						Activity Type:
					</label>
					<select
						id="recommendation-filter"
						value={selectedRecommendation}
						onChange={(e) => setSelectedRecommendation(e.target.value)}
					>
						<option value="">All Activities</option>
						{availableRecommendations.map((rec) => (
							<option key={rec} value={rec}>
								{rec}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
};

export default FilterComponent;
