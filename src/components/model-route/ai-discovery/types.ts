import type { AiGeneratedRoute, RouteSearchRequest, RouteRecommendationResponse } from "@/hooks/api/useAIRouteRecommendations";

// Search interface types
export interface KeywordTag {
	id: string;
	label: string;
	isSelected?: boolean;
}

export interface SearchFilters {
	mode: "all" | "any";
	region?: string;
	proximityRadiusKm: number;
	minSpotsPerCluster: number;
	maxSpotsPerCluster: number;
	maxRoutes: number;
}

export interface SearchState {
	keywords: string[];
	filters: SearchFilters;
	isAdvancedOpen: boolean;
}

// Loading states
export enum LoadingSteps {
	SEARCHING = "Finding matching tourist spots...",
	CLUSTERING = "Grouping nearby locations...",
	AI_GENERATING = "Creating personalized routes...",
	COMPLETE = "Route recommendations ready!"
}

export interface LoadingProgress {
	currentStep: LoadingSteps;
	percentage: number;
	estimatedTimeMs: number;
}

// Error states
export type ErrorType = 
	| "rate_limit" 
	| "validation" 
	| "network" 
	| "no_results" 
	| "ai_unavailable"
	| "generic";

export interface ErrorState {
	type: ErrorType;
	message: string;
	retryable: boolean;
	retryAfter?: number;
	suggestedAction?: string;
}

// Cache interface
export interface CachedResult {
	data: RouteRecommendationResponse;
	timestamp: number;
	searchKey: string;
}

// Component props
export interface AIRouteDiscoveryProps {
	region?: string;
	onRoutesGenerated?: (routes: AiGeneratedRoute[]) => void;
	className?: string;
}

export interface KeywordInputProps {
	keywords: string[];
	onKeywordsChange: (keywords: string[]) => void;
	popularKeywords?: string[];
	placeholder?: string;
	maxKeywords?: number;
	disabled?: boolean;
	className?: string;
}

export interface SearchFiltersProps {
	filters: SearchFilters;
	onFiltersChange: (filters: SearchFilters) => void;
	isAdvancedOpen: boolean;
	onAdvancedToggle: () => void;
	disabled?: boolean;
	className?: string;
}

export interface DiscoveredRoutesProps {
	routes: AiGeneratedRoute[];
	isLoading?: boolean;
	summary?: RouteRecommendationResponse["summary"];
	onRouteSelect?: (route: AiGeneratedRoute) => void;
	className?: string;
}

export interface RouteDiscoveryCardProps {
	route: AiGeneratedRoute;
	onSelect?: () => void;
	className?: string;
}

export interface LoadingStatesProps {
	progress: LoadingProgress;
	className?: string;
}

// Utility types
export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export interface CacheKey {
	keywords: string[];
	filters: SearchFilters;
}

// Constants
export const DEFAULT_FILTERS: SearchFilters = {
	mode: "any",
	proximityRadiusKm: 50,
	minSpotsPerCluster: 2,
	maxSpotsPerCluster: 8,
	maxRoutes: 5,
};

export const POPULAR_KEYWORDS = [
	"animation", "traditional culture", "food & nightlife", 
	"nature", "adventure", "temples", "festivals", 
	"cherry blossoms", "hot springs", "mountain views",
	"coastal scenery", "historical sites", "modern architecture"
];

export const ERROR_MESSAGES: Record<ErrorType, string> = {
	rate_limit: "Taking a quick break! Try again in {time}",
	no_results: "No routes found. Try different keywords or expand your search area",
	ai_unavailable: "AI is taking a coffee break. Showing curated routes instead",
	validation: "Please check your search terms and try again",
	network: "Connection issue. Please check your internet and try again",
	generic: "Something went wrong. Please try again",
};

export const CACHE_TTL = 15 * 60 * 1000; // 15 minutes (matches backend)
export const MAX_KEYWORDS = 10;
export const MIN_KEYWORD_LENGTH = 2;
export const MAX_KEYWORD_LENGTH = 50;