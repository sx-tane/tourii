"use client";

import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface InterestSelectorProps {
	/** Available hashtags to choose from */
	hashtags: Array<{
		hashtag: string;
		count: number;
	}>;
	/** Currently selected interests */
	selectedInterests: string[];
	/** Callback when interests are selected/deselected */
	onInterestsChange: (interests: string[]) => void;
	/** Maximum number of interests that can be selected */
	maxSelections?: number;
	/** Loading state */
	isLoading?: boolean;
	/** Selected region for context */
	region?: string;
}

// Predefined categories for better organization
const INTEREST_CATEGORIES = {
	culture: {
		name: "Culture & Heritage",
		icon: "🏛️",
		keywords: ["culture", "heritage", "traditional", "history", "shrine", "temple", "museum", "art"],
	},
	food: {
		name: "Food & Dining",
		icon: "🍜",
		keywords: ["food", "restaurant", "cuisine", "dining", "local", "specialty", "market", "cafe"],
	},
	nature: {
		name: "Nature & Outdoors",
		icon: "🌿",
		keywords: ["nature", "outdoor", "mountain", "forest", "park", "scenic", "hiking", "beach", "lake"],
	},
	entertainment: {
		name: "Entertainment",
		icon: "🎭",
		keywords: ["anime", "entertainment", "shopping", "festival", "event", "music", "performance"],
	},
	spiritual: {
		name: "Spiritual & Wellness",
		icon: "⛩️",
		keywords: ["spiritual", "meditation", "wellness", "hotspring", "onsen", "peaceful", "zen"],
	},
	urban: {
		name: "Urban & Modern",
		icon: "🏙️",
		keywords: ["city", "urban", "modern", "technology", "architecture", "nightlife", "business"],
	},
};

const InterestSelector: React.FC<InterestSelectorProps> = memo(({
	hashtags,
	selectedInterests,
	onInterestsChange,
	maxSelections = 10,
	isLoading = false,
	region,
}) => {
	// Categorize hashtags based on keywords
	const categorizedHashtags = useMemo(() => {
		const categorized: Record<string, typeof hashtags> = {};
		const uncategorized: typeof hashtags = [];

		// Initialize categories
		Object.keys(INTEREST_CATEGORIES).forEach(key => {
			categorized[key] = [];
		});

		hashtags.forEach(hashtag => {
			let assigned = false;
			
			// Try to assign to a category
			for (const [categoryKey, category] of Object.entries(INTEREST_CATEGORIES)) {
				if (category?.keywords?.some(keyword => 
					hashtag.hashtag.toLowerCase().includes(keyword.toLowerCase())
				)) {
					categorized[categoryKey]?.push(hashtag);
					assigned = true;
					break;
				}
			}

			if (!assigned) {
				uncategorized.push(hashtag);
			}
		});

		return { categorized, uncategorized };
	}, [hashtags]);

	const handleInterestToggle = (interest: string) => {
		if (selectedInterests.includes(interest)) {
			// Remove interest
			onInterestsChange(selectedInterests.filter(i => i !== interest));
		} else if (selectedInterests.length < maxSelections) {
			// Add interest if under limit
			onInterestsChange([...selectedInterests, interest]);
		}
	};

	const isInterestSelected = (interest: string) => selectedInterests.includes(interest);
	const canSelectMore = selectedInterests.length < maxSelections;

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
				<p className="mt-4 text-charcoal">Loading interests...</p>
			</div>
		);
	}

	if (hashtags.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-charcoal">
				<h2 className="text-xl font-semibold mb-2">No Interests Available</h2>
				<p className="text-center">
					No interests found for {region ? `${region} region` : "this area"}. Please try a different region.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center mb-8"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
					What interests you in {region}?
				</h1>
				<p className="text-lg text-charcoal/80 mb-4">
					Select up to {maxSelections} interests to find personalized routes
				</p>
				<div className="text-sm text-charcoal/60">
					{selectedInterests.length} of {maxSelections} selected
				</div>
			</motion.div>

			{/* Progress Bar */}
			<motion.div
				initial={{ opacity: 0, scaleX: 0 }}
				animate={{ opacity: 1, scaleX: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="w-full bg-warmGrey3 rounded-full h-2 mb-8"
			>
				<div
					className="bg-red h-2 rounded-full transition-all duration-300"
					style={{ width: `${(selectedInterests.length / maxSelections) * 100}%` }}
				/>
			</motion.div>

			{/* Categories */}
			<div className="space-y-8">
				{Object.entries(INTEREST_CATEGORIES).map(([categoryKey, category]) => {
					const categoryHashtags = categorizedHashtags.categorized[categoryKey];
					
					if (!categoryHashtags || categoryHashtags.length === 0) return null;

					return (
						<motion.div
							key={categoryKey}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="space-y-4"
						>
							{/* Category Header */}
							<div className="flex items-center gap-3 mb-4">
								<span className="text-2xl">{category.icon}</span>
								<h3 className="text-xl font-semibold text-charcoal">
									{category.name}
								</h3>
								<span className="text-sm text-charcoal/60">
									({categoryHashtags?.length || 0} available)
								</span>
							</div>

							{/* Category Hashtags */}
							<div className="flex flex-wrap gap-3">
								{categoryHashtags?.map((hashtag, index) => (
									<motion.button
										key={`${categoryKey}-${hashtag.hashtag}`}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => handleInterestToggle(hashtag.hashtag)}
										disabled={!canSelectMore && !isInterestSelected(hashtag.hashtag)}
										className={`
											px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
											border-2 select-none cursor-pointer
											${isInterestSelected(hashtag.hashtag)
												? "bg-red text-white border-red shadow-lg"
												: canSelectMore
													? "bg-white text-charcoal border-charcoal/20 hover:border-red hover:text-red"
													: "bg-warmGrey3 text-charcoal/50 border-charcoal/10 cursor-not-allowed"
											}
										`}
									>
										#{hashtag.hashtag}
										<span className="ml-2 text-xs opacity-75">
											({hashtag.count})
										</span>
									</motion.button>
								))}
							</div>
						</motion.div>
					);
				})}

				{/* Uncategorized hashtags */}
				{categorizedHashtags.uncategorized.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="space-y-4"
					>
						<div className="flex items-center gap-3 mb-4">
							<span className="text-2xl">🏷️</span>
							<h3 className="text-xl font-semibold text-charcoal">
								Other Interests
							</h3>
							<span className="text-sm text-charcoal/60">
								({categorizedHashtags.uncategorized.length} available)
							</span>
						</div>

						<div className="flex flex-wrap gap-3">
							{categorizedHashtags.uncategorized.map((hashtag, index) => (
								<motion.button
									key={`uncategorized-${hashtag.hashtag}`}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleInterestToggle(hashtag.hashtag)}
									disabled={!canSelectMore && !isInterestSelected(hashtag.hashtag)}
									className={`
										px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
										border-2 select-none cursor-pointer
										${isInterestSelected(hashtag.hashtag)
											? "bg-red text-white border-red shadow-lg"
											: canSelectMore
												? "bg-white text-charcoal border-charcoal/20 hover:border-red hover:text-red"
												: "bg-warmGrey3 text-charcoal/50 border-charcoal/10 cursor-not-allowed"
										}
									`}
								>
									#{hashtag.hashtag}
									<span className="ml-2 text-xs opacity-75">
										({hashtag.count})
									</span>
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</div>

			{/* Selected Summary */}
			{selectedInterests.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mt-12 p-6 bg-warmGrey3/30 rounded-lg border border-charcoal/10"
				>
					<h4 className="text-lg font-semibold text-charcoal mb-3">
						Your Selected Interests:
					</h4>
					<div className="flex flex-wrap gap-2">
						{selectedInterests.map((interest) => (
							<span
								key={interest}
								className="px-3 py-1 bg-red text-white rounded-full text-sm font-medium"
							>
								#{interest}
							</span>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
});

InterestSelector.displayName = "InterestSelector";

export default InterestSelector;