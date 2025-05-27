"use client";

import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
// RegionList is not used directly as we need to pass filtered data and handle clicks
// import RegionList from "@/components/model-route/region/region-list";
import FilterComponent from "@/components/model-route/common/filter-component/filter-component";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import WeatherComponent from "@/components/model-route/common/weather-component/weather-component"; // Corrected path
import Region from "@/components/model-route/region/region"; // Added Region import
// Import other components like RegionDescription, WeatherComponent, Animation as needed
// import RegionParentComponent from '@/components/region/region-parent-component';

// Styling similar to your website - this will be very basic inline styles for now.
// You should replace these with your actual global styles or a CSS-in-JS solution.
const pageStyles: React.CSSProperties = {
	fontFamily: "Arial, sans-serif",
	padding: "0", // Changed padding for full-width hero
	backgroundColor: "#f0f2f5", // A light background like many modern sites
};

const headerStyles: React.CSSProperties = {
	// This might be replaced by the hero
	textAlign: "center",
	marginBottom: "30px",
	color: "#333",
};

const contentWrapperStyles: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px", // Added padding here for content below hero
};

const filterSectionStyles: React.CSSProperties = {
	width: "100%",
	maxWidth: "900px", // Increased max width
	marginBottom: "20px",
	padding: "20px",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const listSectionStyles: React.CSSProperties = {
	width: "100%",
	maxWidth: "900px", // Increased max width
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
	padding: "10px", // Added padding
};

const regionCardStyle: React.CSSProperties = {
	// Style for the clickable region card
	cursor: "pointer",
	marginBottom: "10px", // Ensure spacing if Region component itself doesn't have margin
};

const ModelRouteRegionPage: React.FC = () => {
	const { modelRoutes, isLoadingModelRoutes, isErrorModelRoutes } =
		getModelRoutes();
	const [filteredRoutes, setFilteredRoutes] = useState<
		ModelRouteResponseDto[] | undefined
	>(undefined);
	const [featuredRoute, setFeaturedRoute] =
		useState<ModelRouteResponseDto | null>(null);

	const availableRegions = useMemo(() => {
		if (!modelRoutes) return [];
		return Array.from(new Set(modelRoutes.map((r) => r.region)));
	}, [modelRoutes]);

	const availableRecommendations = useMemo(() => {
		if (!modelRoutes) return [];
		return Array.from(new Set(modelRoutes.flatMap((r) => r.recommendation)));
	}, [modelRoutes]);

	const routesToDisplay =
		filteredRoutes !== undefined ? filteredRoutes : modelRoutes;

	useEffect(() => {
		const currentRoutes =
			filteredRoutes !== undefined ? filteredRoutes : modelRoutes;
		if (currentRoutes && currentRoutes.length > 0) {
			// If a featured route is already set, try to find it in the current list
			// If not found (e.g., due to filtering), or if no featured route is set, set it to the first item.
			const currentFeaturedId = featuredRoute?.modelRouteId;
			const foundInCurrent = currentRoutes.find(
				(r) => r.modelRouteId === currentFeaturedId,
			);

			if (foundInCurrent) {
				// If it's the same object, React might not re-render, ensure we pass a new ref if data could have changed
				// but for selection, same object is fine.
				// setFeaturedRoute(foundInCurrent);
			} else {
				setFeaturedRoute(currentRoutes[0] || null); // Ensure null if currentRoutes[0] is undefined
			}
		} else {
			setFeaturedRoute(null); // No routes to display
		}
	}, [modelRoutes, filteredRoutes, featuredRoute]); // Rerun if modelRoutes or filteredRoutes changes, or if featuredRoute was changed externally (less likely here)

	if (isLoadingModelRoutes)
		return (
			<div style={{ ...pageStyles, padding: "20px" }}>
				{" "}
				{/* Ensure padding for loading/error states */}
				<p>Loading page content...</p>
			</div>
		);
	if (isErrorModelRoutes)
		return (
			<div style={{ ...pageStyles, padding: "20px" }}>
				<p>Error loading page content. Please try again later.</p>
			</div>
		);
	if (!modelRoutes && !isLoadingModelRoutes)
		// Check after loading, if still no model routes
		return (
			<div style={{ ...pageStyles, padding: "20px" }}>
				<p>No model routes available at the moment.</p>
			</div>
		);

	// Hero Section for the featured route
	const HeroSection: React.FC<{ route: ModelRouteResponseDto }> = ({
		route,
	}) => {
		const heroStyle: React.CSSProperties = {
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${route.regionBackgroundMedia || "https://via.placeholder.com/1200x500?text=No+Image"})`, // Fallback image
			backgroundSize: "cover",
			backgroundPosition: "center",
			color: "white",
			padding: "80px 20px", // Increased padding
			textAlign: "center",
			minHeight: "50vh", // Relative to viewport height
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			// No border radius for full width hero
			// marginBottom: "30px", // No margin if it's full width at the top
		};
		const titleStyle: React.CSSProperties = {
			fontSize: "clamp(2.5rem, 6vw, 4.5rem)", // Larger font
			fontWeight: "bold",
			textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
			margin: "0 0 15px 0",
		};
		const regionTextStyle: React.CSSProperties = {
			fontSize: "clamp(1.1rem, 3vw, 1.5rem)", // Larger font
			textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
			marginBottom: "20px",
		};

		return (
			<div style={heroStyle}>
				<h1 style={titleStyle}>{route.routeName}</h1>
				<p style={regionTextStyle}>Region: {route.region}</p>
				{route.regionWeatherInfo && (
					<WeatherComponent weatherInfo={route.regionWeatherInfo} />
				)}
				{/* You can add more details here, e.g. from route.recommendation or touristSpotList highlights */}
			</div>
		);
	};

	return (
		<div style={pageStyles}>
			{featuredRoute && <HeroSection route={featuredRoute} />}

			{!featuredRoute &&
				!isLoadingModelRoutes && ( // Fallback header if no featured route after loading
					<header style={{ ...headerStyles, paddingTop: "20px" }}>
						<h1>Explore Our Model Routes</h1>
						<p>Select a route below or adjust filters.</p>
					</header>
				)}

			<div style={contentWrapperStyles}>
				<section style={filterSectionStyles}>
					<FilterComponent
						modelRoutes={modelRoutes || []} // Ensure modelRoutes is not undefined
						onFilterChange={setFilteredRoutes}
						availableRegions={availableRegions}
						availableRecommendations={availableRecommendations}
					/>
				</section>

				{/* Add RegionDescription here if needed, perhaps tied to featuredRoute */}
				{/* e.g. featuredRoute && <RegionDescription description={featuredRoute.someDescriptionField} /> */}

				<section style={listSectionStyles}>
					{routesToDisplay && routesToDisplay.length > 0 ? (
						routesToDisplay.map((route) => (
							<button
								key={route.modelRouteId}
								type="button"
								style={{
									...regionCardStyle,
									border:
										featuredRoute?.modelRouteId === route.modelRouteId
											? "3px solid dodgerblue"
											: "1px solid #ddd",
									borderRadius: "8px",
									overflow: "hidden",
									background: "none",
									color: "inherit",
									padding: "0",
									font: "inherit",
									textAlign: "left",
									width: "100%",
								}}
								onClick={() => setFeaturedRoute(route)}
							>
								<Region {...route} />
							</button>
						))
					) : (
						<p style={{ textAlign: "center", padding: "20px" }}>
							No routes match your current filter criteria.
						</p>
					)}
				</section>
			</div>
		</div>
	);
};

export default ModelRouteRegionPage;
