"use client";

import { RegionSelector, InterestSelector, RouteDiscovery } from "@/components/ai-route-discovery";
import { useModelRoutes, useAvailableHashtags, useAiRouteRecommendations } from "@/hooks";
import type { AiRouteRecommendationRequestDto } from "@/api/generated/models/AiRouteRecommendationRequestDto";
import { motion, AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

enum DiscoveryStep {
	REGION = 1,
	INTERESTS = 2,
	ROUTES = 3,
}

const AiRouteDiscoveryPage: NextPage = () => {
	// State management
	const [currentStep, setCurrentStep] = useState<DiscoveryStep>(DiscoveryStep.REGION);
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [routeResults, setRouteResults] = useState<any>(null);

	// Hooks
	const { data: modelRoutes, isLoading: routesLoading } = useModelRoutes();
	const { trigger: getHashtags, isMutating: hashtagsLoading } = useAvailableHashtags();
	const { trigger: getAiRoutes, isMutating: aiRoutesLoading } = useAiRouteRecommendations();

	// Available hashtags state
	const [availableHashtags, setAvailableHashtags] = useState<Array<{ hashtag: string; count: number }>>([]);

	// Filter existing routes by selected region
	const existingRoutes = useMemo(() => {
		if (!modelRoutes || !selectedRegion) return [];
		return modelRoutes.filter(route => 
			route.region?.toLowerCase() === selectedRegion.toLowerCase()
		);
	}, [modelRoutes, selectedRegion]);

	// Step handlers
	const handleRegionSelect = useCallback(async (region: string) => {
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
	}, [getHashtags]);

	const handleInterestsConfirm = useCallback(async () => {
		if (selectedInterests.length === 0) return;

		// Prepare AI route request
		const request: AiRouteRecommendationRequestDto = {
			keywords: selectedInterests,
			mode: AiRouteRecommendationRequestDto.mode.ANY,
			region: selectedRegion,
			proximityRadiusKm: 50,
			maxRoutes: 3,
			minSpotsPerCluster: 2,
			maxSpotsPerCluster: 8,
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
	}, [selectedInterests, selectedRegion, getAiRoutes]);

	const handleRestart = useCallback(() => {
		setCurrentStep(DiscoveryStep.REGION);
		setSelectedRegion("");
		setSelectedInterests([]);
		setRouteResults(null);
		setAvailableHashtags([]);
	}, []);

	const handleRegenerate = useCallback(() => {
		handleInterestsConfirm();
	}, [handleInterestsConfirm]);

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
						Discover personalized travel routes powered by artificial intelligence
					</p>

					{/* Progress Steps */}
					<div className="flex items-center justify-center gap-4 mb-8">
						{[
							{ step: DiscoveryStep.REGION, label: "Region", icon: "📍" },
							{ step: DiscoveryStep.INTERESTS, label: "Interests", icon: "❤️" },
							{ step: DiscoveryStep.ROUTES, label: "Routes", icon: "🗺️" },
						].map(({ step, label, icon }, index) => (
							<div key={step} className="flex items-center">
								<div
									className={`
										flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
										${currentStep >= step
											? "bg-red border-red text-white"
											: "bg-white border-charcoal/20 text-charcoal/50"
										}
									`}
								>
									<span className="text-lg">{icon}</span>
								</div>
								<span className={`ml-2 font-medium ${currentStep >= step ? "text-red" : "text-charcoal/50"}`}>
									{label}
								</span>
								{index < 2 && (
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
						{selectedRegion && (
							<span>📍 {selectedRegion}</span>
						)}
						{selectedInterests.length > 0 && (
							<span className="ml-4">
								❤️ {selectedInterests.slice(0, 3).map(i => `#${i}`).join(", ")}
								{selectedInterests.length > 3 && ` +${selectedInterests.length - 3} more`}
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
									disabled={!canProceedFromInterests || isLoading}
									className={`
										px-8 py-3 rounded-lg font-medium transition-colors
										${canProceedFromInterests && !isLoading
											? "bg-red text-white hover:bg-red/90"
											: "bg-charcoal/20 text-charcoal/50 cursor-not-allowed"
										}
									`}
								>
									{isLoading ? "Generating Routes..." : "Discover Routes →"}
								</button>
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
									onClick={() => setCurrentStep(DiscoveryStep.INTERESTS)}
									className="px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors"
								>
									← Change Interests
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