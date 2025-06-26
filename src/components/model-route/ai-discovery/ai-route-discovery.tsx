"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAIRouteRecommendations, usePopularKeywords } from "@/hooks";
import type { 
	AIRouteDiscoveryProps, 
	SearchState, 
	ErrorState, 
	LoadingProgress 
} from "./types";
import { 
	DEFAULT_FILTERS, 
	LoadingSteps, 
	ERROR_MESSAGES, 
	CACHE_TTL,
	MAX_KEYWORDS 
} from "./types";
import { KeywordInput } from "./keyword-input";
import { SearchFilters } from "./search-filters";
import { DiscoveredRoutes } from "./discovered-routes";
import { LoadingStates } from "./loading-states";

export function AIRouteDiscovery({
	region,
	onRoutesGenerated,
	className,
}: AIRouteDiscoveryProps) {
	// Search state
	const [searchState, setSearchState] = useState<SearchState>({
		keywords: [],
		filters: {
			...DEFAULT_FILTERS,
			region: region, // Set default region from props
		},
		isAdvancedOpen: false,
	});

	// UI state
	const [error, setError] = useState<ErrorState | null>(null);
	const [loadingProgress, setLoadingProgress] = useState<LoadingProgress>({
		currentStep: LoadingSteps.SEARCHING,
		percentage: 0,
		estimatedTimeMs: 0,
	});

	// API hooks
	const { data: popularKeywords = [] } = usePopularKeywords();
	const {
		trigger,
		data: discoveredRoutes,
		error: apiError,
		isMutating,
		reset,
	} = useAIRouteRecommendations({
		onSuccess: (data) => {
			setError(null);
			onRoutesGenerated?.(data.generatedRoutes);
		},
		onError: (error) => {
			const errorType = getErrorType(error);
			setError({
				type: errorType,
				message: formatErrorMessage(errorType, error),
				retryable: isRetryableError(errorType),
				retryAfter: getRetryAfter(error),
			});
		},
	});

	// Simulate loading progress for better UX
	const simulateLoadingProgress = useCallback(() => {
		setLoadingProgress({
			currentStep: LoadingSteps.SEARCHING,
			percentage: 0,
			estimatedTimeMs: 8000,
		});

		const steps = [
			{ step: LoadingSteps.SEARCHING, percentage: 25, delay: 1000 },
			{ step: LoadingSteps.CLUSTERING, percentage: 60, delay: 2500 },
			{ step: LoadingSteps.AI_GENERATING, percentage: 90, delay: 4000 },
			{ step: LoadingSteps.COMPLETE, percentage: 100, delay: 5500 },
		];

		steps.forEach(({ step, percentage, delay }) => {
			setTimeout(() => {
				if (isMutating) {
					setLoadingProgress({
						currentStep: step,
						percentage,
						estimatedTimeMs: Math.max(0, 8000 - delay),
					});
				}
			}, delay);
		});
	}, [isMutating]);

	// Handle search execution
	const handleSearch = useCallback(async () => {
		if (searchState.keywords.length === 0) {
			setError({
				type: "validation",
				message: "Please add at least one keyword to start your search",
				retryable: false,
			});
			return;
		}

		setError(null);
		simulateLoadingProgress();

		try {
			await trigger({
				keywords: searchState.keywords,
				mode: searchState.filters.mode,
				region: searchState.filters.region,
				proximityRadiusKm: searchState.filters.proximityRadiusKm,
				minSpotsPerCluster: searchState.filters.minSpotsPerCluster,
				maxSpotsPerCluster: searchState.filters.maxSpotsPerCluster,
				maxRoutes: searchState.filters.maxRoutes,
			});
		} catch (err) {
			// Error is handled by the hook's onError callback
		}
	}, [searchState, trigger, simulateLoadingProgress]);

	// Handle retry
	const handleRetry = useCallback(() => {
		setError(null);
		reset();
		handleSearch();
	}, [handleSearch, reset]);

	// Handle keyword changes
	const handleKeywordsChange = useCallback((keywords: string[]) => {
		setSearchState(prev => ({
			...prev,
			keywords: keywords.slice(0, MAX_KEYWORDS),
		}));
		setError(null);
	}, []);

	// Handle filter changes
	const handleFiltersChange = useCallback((filters: typeof searchState.filters) => {
		setSearchState(prev => ({
			...prev,
			filters,
		}));
	}, []);

	// Validation
	const isSearchDisabled = useMemo(() => {
		return (
			isMutating ||
			searchState.keywords.length === 0 ||
			searchState.keywords.length > MAX_KEYWORDS
		);
	}, [isMutating, searchState.keywords.length]);

	return (
		<div className={cn("w-full max-w-6xl mx-auto space-y-8", className)}>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center space-y-3"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-charcoal flex items-center justify-center gap-3">
					<Sparkles className="h-8 w-8 text-red" />
					Discover New Routes
				</h1>
				<p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
					Let AI create personalized travel routes based on your interests and preferences
				</p>
			</motion.div>

			{/* Search Interface */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="space-y-6 p-6 bg-warmGrey-50 rounded-2xl border border-charcoal-200"
			>
				{/* Keyword Input */}
				<KeywordInput
					keywords={searchState.keywords}
					onKeywordsChange={handleKeywordsChange}
					popularKeywords={popularKeywords}
					disabled={isMutating}
					placeholder="Describe what you'd like to explore..."
				/>

				{/* Search Filters */}
				<SearchFilters
					filters={searchState.filters}
					onFiltersChange={handleFiltersChange}
					isAdvancedOpen={searchState.isAdvancedOpen}
					onAdvancedToggle={() => setSearchState(prev => ({
						...prev,
						isAdvancedOpen: !prev.isAdvancedOpen,
					}))}
					disabled={isMutating}
				/>

				{/* Search Button */}
				<div className="flex justify-center">
					<motion.button
						whileHover={{ scale: isSearchDisabled ? 1 : 1.05 }}
						whileTap={{ scale: isSearchDisabled ? 1 : 0.95 }}
						onClick={handleSearch}
						disabled={isSearchDisabled}
						className={cn(
							"flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg",
							"transition-all duration-300 shadow-lg",
							"uppercase tracking-wide",
							isSearchDisabled
								? "bg-charcoal-200 text-charcoal-400 cursor-not-allowed"
								: "bg-red text-warmGrey-50 hover:bg-red/90 hover:shadow-xl"
						)}
						type="button"
					>
						{isMutating ? (
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
							>
								<Sparkles className="h-5 w-5" />
							</motion.div>
						) : (
							<Search className="h-5 w-5" />
						)}
						{isMutating ? "Discovering Routes..." : "Discover Routes"}
					</motion.button>
				</div>
			</motion.div>

			{/* Error Display */}
			<AnimatePresence>
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						className="p-4 bg-red/5 border border-red/20 rounded-xl"
					>
						<div className="flex items-start gap-3">
							<AlertCircle className="h-5 w-5 text-red flex-shrink-0 mt-0.5" />
							<div className="flex-1 space-y-2">
								<h4 className="font-medium text-red">
									{error.type === "rate_limit" ? "Rate Limit Reached" : "Search Error"}
								</h4>
								<p className="text-sm text-charcoal-600">
									{error.message}
								</p>
								{error.retryable && (
									<button
										onClick={handleRetry}
										className="inline-flex items-center gap-2 text-sm font-medium text-red hover:text-red/80 transition-colors"
										type="button"
									>
										<RotateCcw className="h-4 w-4" />
										Try Again
									</button>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Loading State */}
			<AnimatePresence>
				{isMutating && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="flex justify-center py-8"
					>
						<LoadingStates progress={loadingProgress} />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Results */}
			<AnimatePresence>
				{discoveredRoutes && !isMutating && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5 }}
					>
						<DiscoveredRoutes
							routes={discoveredRoutes.generatedRoutes}
							summary={discoveredRoutes.summary}
							onRouteSelect={(route) => {
								// Future: Handle route selection (e.g., navigate to route details)
								console.log("Selected route:", route);
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// Utility functions for error handling
function getErrorType(error: any): ErrorState["type"] {
	if (error?.status === 429) return "rate_limit";
	if (error?.status >= 400 && error?.status < 500) return "validation";
	if (error?.status >= 500) return "network";
	if (error?.message?.includes("no routes found")) return "no_results";
	if (error?.message?.includes("AI unavailable")) return "ai_unavailable";
	return "generic";
}

function formatErrorMessage(type: ErrorState["type"], error: any): string {
	const baseMessage = ERROR_MESSAGES[type];
	
	if (type === "rate_limit" && error?.retryAfter) {
		return baseMessage.replace("{time}", `${Math.ceil(error.retryAfter / 1000)}s`);
	}
	
	return baseMessage;
}

function isRetryableError(type: ErrorState["type"]): boolean {
	return ["rate_limit", "network", "generic"].includes(type);
}

function getRetryAfter(error: any): number | undefined {
	return error?.retryAfter || error?.headers?.["retry-after"];
}