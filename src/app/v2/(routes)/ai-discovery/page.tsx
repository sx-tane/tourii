"use client";

import { AiRouteRecommendationRequestDto } from "@/api/generated/models/AiRouteRecommendationRequestDto";
import {
	InterestSelector,
	RegionSelector,
	RouteDiscovery,
} from "@/components/ai-route-discovery";
import {
	useAiRouteRecommendations,
	useAvailableHashtags,
	useModelRoutes,
} from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

enum DiscoveryStep {
	REGION = 1,
	INTERESTS = 2,
	CONFIGURATION = 3,
	ROUTES = 4,
}

const AiRouteDiscoveryPage: NextPage = () => {
	// State management
	const [currentStep, setCurrentStep] = useState<DiscoveryStep>(
		DiscoveryStep.REGION,
	);
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [routeResults, setRouteResults] = useState<any>(null);

	// AI Configuration state
	const [aiConfig, setAiConfig] = useState({
		proximityRadiusKm: 50, // Default: 50km
		maxRoutes: 3, // Default: 3 routes
		minSpotsPerCluster: 1, // Default: 2 min spots
		maxSpotsPerCluster: 8, // Default: 8 max spots
	});

	// Hooks
	const { data: modelRoutes, isLoading: routesLoading } = useModelRoutes();
	const { trigger: getHashtags, isMutating: hashtagsLoading } =
		useAvailableHashtags();
	const { trigger: getAiRoutes, isMutating: aiRoutesLoading } =
		useAiRouteRecommendations();

	// Available hashtags state
	const [availableHashtags, setAvailableHashtags] = useState<
		Array<{ hashtag: string; count: number }>
	>([]);

	// Filter existing routes by selected region
	const existingRoutes = useMemo(() => {
		if (!modelRoutes || !selectedRegion) return [];
		return modelRoutes.filter(
			(route) => route.region?.toLowerCase() === selectedRegion.toLowerCase(),
		);
	}, [modelRoutes, selectedRegion]);

	// Step handlers
	const handleRegionSelect = useCallback(
		async (region: string) => {
			setSelectedRegion(region);

			// Fetch hashtags for the selected region
			try {
				const hashtagResponse = await getHashtags({ region });
				setAvailableHashtags(hashtagResponse.topHashtags || []);
				setCurrentStep(DiscoveryStep.INTERESTS);
			} catch (error) {
				console.error("Failed to fetch hashtags:", error);
				// Still proceed to interests step with empty hashtags
				setAvailableHashtags([]);
				setCurrentStep(DiscoveryStep.INTERESTS);
			}
		},
		[getHashtags],
	);

	const handleInterestsConfirm = useCallback(() => {
		if (selectedInterests.length === 0) return;
		// Go to configuration step instead of directly generating routes
		setCurrentStep(DiscoveryStep.CONFIGURATION);
	}, [selectedInterests]);

	const handleConfigurationConfirm = useCallback(async () => {
		// Prepare AI route request with user-configured parameters
		const request: AiRouteRecommendationRequestDto = {
			keywords: selectedInterests,
			mode: AiRouteRecommendationRequestDto.mode.ANY,
			region: selectedRegion,
			proximityRadiusKm: aiConfig.proximityRadiusKm,
			maxRoutes: aiConfig.maxRoutes,
			minSpotsPerCluster: aiConfig.minSpotsPerCluster,
			maxSpotsPerCluster: aiConfig.maxSpotsPerCluster,
		};

		try {
			const aiResponse = await getAiRoutes(request);
			setRouteResults(aiResponse);
			setCurrentStep(DiscoveryStep.ROUTES);
		} catch (error) {
			console.error("Failed to get AI route recommendations:", error);
			// Still proceed to routes step to show existing routes
			setRouteResults(null);
			setCurrentStep(DiscoveryStep.ROUTES);
		}
	}, [selectedInterests, selectedRegion, aiConfig, getAiRoutes]);

	const handleRestart = useCallback(() => {
		setCurrentStep(DiscoveryStep.REGION);
		setSelectedRegion("");
		setSelectedInterests([]);
		setRouteResults(null);
		setAvailableHashtags([]);
	}, []);

	const handleRegenerate = useCallback(() => {
		handleConfigurationConfirm();
	}, [handleConfigurationConfirm]);

	// Navigation helpers
	const canProceedFromInterests = selectedInterests.length > 0;
	const isLoading = routesLoading || hashtagsLoading || aiRoutesLoading;

	return (
		<div className="min-h-screen bg-warmGrey py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header with Progress */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
						AI Route Discovery
					</h1>
					<p className="text-xl text-charcoal/80 mb-8">
						Discover personalized travel routes powered by artificial
						intelligence
					</p>

					{/* Progress Steps */}
					<div className="flex items-center justify-center gap-4 mb-8">
						{[
							{ step: DiscoveryStep.REGION, label: "Region", icon: "📍" },
							{ step: DiscoveryStep.INTERESTS, label: "Interests", icon: "❤️" },
							{
								step: DiscoveryStep.CONFIGURATION,
								label: "Configure",
								icon: "⚙️",
							},
							{ step: DiscoveryStep.ROUTES, label: "Routes", icon: "🗺️" },
						].map(({ step, label, icon }, index) => (
							<div key={step} className="flex items-center">
								<div
									className={`
										flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
										${
											currentStep >= step
												? "bg-red border-red text-white"
												: "bg-white border-charcoal/20 text-charcoal/50"
										}
									`}
								>
									<span className="text-lg">{icon}</span>
								</div>
								<span
									className={`ml-2 font-medium ${currentStep >= step ? "text-red" : "text-charcoal/50"}`}
								>
									{label}
								</span>
								{index < 3 && (
									<div
										className={`
											w-8 h-0.5 mx-4 transition-all duration-300
											${currentStep > step ? "bg-red" : "bg-charcoal/20"}
										`}
									/>
								)}
							</div>
						))}
					</div>

					{/* Breadcrumb Summary */}
					<div className="text-sm text-charcoal/60">
						{selectedRegion && <span>📍 {selectedRegion}</span>}
						{selectedInterests.length > 0 && (
							<span className="ml-4">
								❤️{" "}
								{selectedInterests
									.slice(0, 3)
									.map((i) => `#${i}`)
									.join(", ")}
								{selectedInterests.length > 3 &&
									` +${selectedInterests.length - 3} more`}
							</span>
						)}
					</div>
				</motion.div>

				{/* Step Content */}
				<AnimatePresence mode="wait">
					{currentStep === DiscoveryStep.REGION && (
						<motion.div
							key="region"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.5 }}
						>
							<RegionSelector
								routes={modelRoutes || []}
								onRegionSelect={handleRegionSelect}
								selectedRegion={selectedRegion}
								isLoading={routesLoading}
							/>
						</motion.div>
					)}

					{currentStep === DiscoveryStep.INTERESTS && (
						<motion.div
							key="interests"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.5 }}
						>
							<InterestSelector
								hashtags={availableHashtags}
								selectedInterests={selectedInterests}
								onInterestsChange={setSelectedInterests}
								maxSelections={10}
								isLoading={hashtagsLoading}
								region={selectedRegion}
							/>

							{/* Navigation Buttons */}
							<div className="flex justify-center gap-4 mt-12">
								<button
									onClick={() => setCurrentStep(DiscoveryStep.REGION)}
									className="px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors"
								>
									← Back to Regions
								</button>
								<button
									onClick={handleInterestsConfirm}
									disabled={!canProceedFromInterests}
									className={`
										px-8 py-3 rounded-lg font-medium transition-colors
										${
											canProceedFromInterests
												? "bg-red text-white hover:bg-red/90"
												: "bg-charcoal/20 text-charcoal/50 cursor-not-allowed"
										}
									`}
								>
									Configure AI →
								</button>
							</div>
						</motion.div>
					)}

					{currentStep === DiscoveryStep.CONFIGURATION && (
						<motion.div
							key="configuration"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.5 }}
						>
							<div className="max-w-2xl mx-auto">
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-charcoal mb-4">
										Configure AI Route Generation
									</h2>
									<p className="text-charcoal/70">
										Customize how AI generates your personalized routes
									</p>
								</div>

								<div className="bg-white rounded-lg p-8 shadow-lg space-y-8">
									{/* Proximity Radius */}
									<div>
										<label className="block text-sm font-medium text-charcoal mb-4">
											Search Radius: {aiConfig.proximityRadiusKm} km
										</label>
										<input
											type="range"
											min="10"
											max="100"
											step="10"
											value={aiConfig.proximityRadiusKm}
											onChange={(e) =>
												setAiConfig((prev) => ({
													...prev,
													proximityRadiusKm: parseInt(e.target.value),
												}))
											}
											className="w-full h-2 bg-warmGrey rounded-lg appearance-none cursor-pointer slider"
										/>
										<div className="flex justify-between text-xs text-charcoal/60 mt-1">
											<span>10km</span>
											<span>100km</span>
										</div>
									</div>

									{/* Max Routes */}
									<div>
										<label className="block text-sm font-medium text-charcoal mb-4">
											Number of Routes: {aiConfig.maxRoutes}
										</label>
										<input
											type="range"
											min="1"
											max="5"
											step="1"
											value={aiConfig.maxRoutes}
											onChange={(e) =>
												setAiConfig((prev) => ({
													...prev,
													maxRoutes: parseInt(e.target.value),
												}))
											}
											className="w-full h-2 bg-warmGrey rounded-lg appearance-none cursor-pointer slider"
										/>
										<div className="flex justify-between text-xs text-charcoal/60 mt-1">
											<span>1 route</span>
											<span>5 routes</span>
										</div>
									</div>

									{/* Spots per Route */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-charcoal mb-4">
												Min Spots per Route: {aiConfig.minSpotsPerCluster}
											</label>
											<input
												type="range"
												min="1"
												max="6"
												step="1"
												value={aiConfig.minSpotsPerCluster}
												onChange={(e) =>
													setAiConfig((prev) => ({
														...prev,
														minSpotsPerCluster: parseInt(e.target.value),
													}))
												}
												className="w-full h-2 bg-warmGrey rounded-lg appearance-none cursor-pointer slider"
											/>
											<div className="flex justify-between text-xs text-charcoal/60 mt-1">
												<span>2</span>
												<span>6</span>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-charcoal mb-4">
												Max Spots per Route: {aiConfig.maxSpotsPerCluster}
											</label>
											<input
												type="range"
												min="4"
												max="12"
												step="1"
												value={aiConfig.maxSpotsPerCluster}
												onChange={(e) =>
													setAiConfig((prev) => ({
														...prev,
														maxSpotsPerCluster: parseInt(e.target.value),
													}))
												}
												className="w-full h-2 bg-warmGrey rounded-lg appearance-none cursor-pointer slider"
											/>
											<div className="flex justify-between text-xs text-charcoal/60 mt-1">
												<span>4</span>
												<span>12</span>
											</div>
										</div>
									</div>

									{/* Configuration Summary */}
									<div className="bg-warmGrey/10 rounded-lg p-4">
										<h4 className="font-medium text-charcoal mb-2">
											Configuration Summary:
										</h4>
										<div className="text-sm text-charcoal/70 space-y-1">
											<p>
												• Search within {aiConfig.proximityRadiusKm}km of{" "}
												{selectedRegion}
											</p>
											<p>
												• Generate {aiConfig.maxRoutes} route
												{aiConfig.maxRoutes > 1 ? "s" : ""}
											</p>
											<p>
												• {aiConfig.minSpotsPerCluster}-
												{aiConfig.maxSpotsPerCluster} tourist spots per route
											</p>
											<p>
												• Keywords: {selectedInterests.slice(0, 3).join(", ")}
												{selectedInterests.length > 3
													? ` +${selectedInterests.length - 3} more`
													: ""}
											</p>
										</div>
									</div>
								</div>

								{/* Navigation Buttons */}
								<div className="flex justify-center gap-4 mt-12">
									<button
										onClick={() => setCurrentStep(DiscoveryStep.INTERESTS)}
										className="px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors"
									>
										← Back to Interests
									</button>
									<button
										onClick={handleConfigurationConfirm}
										disabled={isLoading}
										className={`
											px-8 py-3 rounded-lg font-medium transition-colors
											${
												!isLoading
													? "bg-red text-white hover:bg-red/90"
													: "bg-charcoal/20 text-charcoal/50 cursor-not-allowed"
											}
										`}
									>
										{isLoading ? "Generating Routes..." : "Generate Routes →"}
									</button>
								</div>
							</div>
						</motion.div>
					)}

					{currentStep === DiscoveryStep.ROUTES && (
						<motion.div
							key="routes"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.5 }}
						>
							<RouteDiscovery
								aiRoutes={routeResults}
								existingRoutes={existingRoutes}
								isLoading={aiRoutesLoading}
								region={selectedRegion}
								selectedInterests={selectedInterests}
								onRegenerate={handleRegenerate}
							/>

							{/* Navigation Buttons */}
							<div className="flex justify-center gap-4 mt-12">
								<button
									onClick={() => setCurrentStep(DiscoveryStep.CONFIGURATION)}
									className="px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors"
								>
									← Reconfigure AI
								</button>
								<button
									onClick={handleRestart}
									className="px-6 py-3 border-2 border-red text-red rounded-lg hover:bg-red hover:text-white transition-colors"
								>
									🔄 Start Over
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-16 py-8 border-t border-charcoal/10"
				>
					<p className="text-charcoal/60 mb-4">
						Not finding what you're looking for?
					</p>
					<Link
						href="/v2/region"
						className="px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors"
					>
						Explore All Regions
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default AiRouteDiscoveryPage;
