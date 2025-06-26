"use client";

import { useState, useRef, KeyboardEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KeywordInputProps } from "./types";
import { MAX_KEYWORDS, MIN_KEYWORD_LENGTH, MAX_KEYWORD_LENGTH } from "./types";

export function KeywordInput({
	keywords,
	onKeywordsChange,
	popularKeywords = [],
	placeholder = "Search for experiences like 'animation', 'traditional culture'...",
	maxKeywords = MAX_KEYWORDS,
	disabled = false,
	className,
}: KeywordInputProps) {
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Filter suggestions based on input and exclude already selected keywords
	const filteredSuggestions = popularKeywords
		.filter((keyword) => 
			keyword.toLowerCase().includes(inputValue.toLowerCase()) &&
			!keywords.includes(keyword)
		)
		.slice(0, 6); // Limit suggestions

	const addKeyword = useCallback((keyword: string) => {
		const trimmed = keyword.trim();
		if (
			trimmed.length >= MIN_KEYWORD_LENGTH &&
			trimmed.length <= MAX_KEYWORD_LENGTH &&
			!keywords.includes(trimmed) &&
			keywords.length < maxKeywords
		) {
			onKeywordsChange([...keywords, trimmed]);
			setInputValue("");
			setShowSuggestions(false);
			inputRef.current?.focus();
		}
	}, [keywords, onKeywordsChange, maxKeywords]);

	const removeKeyword = useCallback((keywordToRemove: string) => {
		onKeywordsChange(keywords.filter((k) => k !== keywordToRemove));
	}, [keywords, onKeywordsChange]);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputValue.trim()) {
			e.preventDefault();
			addKeyword(inputValue);
		} else if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
			e.preventDefault();
			removeKeyword(keywords[keywords.length - 1]);
		}
	};

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setShowSuggestions(value.length > 0);
	};

	return (
		<div className={cn("relative w-full", className)}>
			{/* Main input container */}
			<div className="relative">
				<div
					className={cn(
						"min-h-[56px] w-full rounded-xl border border-charcoal-200 bg-warmGrey-50 px-4 py-3",
						"flex flex-wrap items-center gap-2 transition-all duration-200",
						"focus-within:border-red focus-within:ring-2 focus-within:ring-red/20",
						disabled && "opacity-50 cursor-not-allowed",
						keywords.length >= maxKeywords && "border-mustard"
					)}
				>
					{/* Search icon */}
					<Search className="h-5 w-5 text-charcoal-400 flex-shrink-0" />

					{/* Keyword tags */}
					<AnimatePresence>
						{keywords.map((keyword) => (
							<motion.div
								key={keyword}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
								className={cn(
									"inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium",
									"bg-red text-warmGrey-50 border border-red",
									"hover:bg-red/90 transition-colors duration-200"
								)}
							>
								<span className="uppercase tracking-wide">{keyword}</span>
								{!disabled && (
									<button
										onClick={() => removeKeyword(keyword)}
										className="ml-1 hover:bg-warmGrey-50/20 rounded-full p-0.5 transition-colors"
										type="button"
									>
										<X className="h-3 w-3" />
									</button>
								)}
							</motion.div>
						))}
					</AnimatePresence>

					{/* Input field */}
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={(e) => handleInputChange(e.target.value)}
						onKeyDown={handleKeyDown}
						onFocus={() => setShowSuggestions(inputValue.length > 0)}
						onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
						placeholder={keywords.length === 0 ? placeholder : "Add another keyword..."}
						disabled={disabled || keywords.length >= maxKeywords}
						className={cn(
							"flex-1 min-w-[200px] bg-transparent border-none outline-none text-charcoal",
							"placeholder:text-charcoal-400 text-base",
							disabled && "cursor-not-allowed"
						)}
					/>

					{/* Keywords count indicator */}
					{keywords.length > 0 && (
						<span className="text-xs text-charcoal-400 flex-shrink-0">
							{keywords.length}/{maxKeywords}
						</span>
					)}
				</div>

				{/* Character count for current input */}
				{inputValue.length > 0 && (
					<div className="absolute right-4 -bottom-6 text-xs text-charcoal-400">
						{inputValue.length}/{MAX_KEYWORD_LENGTH}
					</div>
				)}
			</div>

			{/* Suggestions dropdown */}
			<AnimatePresence>
				{showSuggestions && filteredSuggestions.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className={cn(
							"absolute top-full left-0 right-0 mt-2 z-50",
							"bg-warmGrey-50 border border-charcoal-200 rounded-xl shadow-lg",
							"max-h-48 overflow-y-auto"
						)}
					>
						<div className="p-2">
							<div className="text-xs font-medium text-charcoal-600 px-3 py-2 uppercase tracking-wide">
								Popular Keywords
							</div>
							{filteredSuggestions.map((suggestion) => (
								<button
									key={suggestion}
									onClick={() => addKeyword(suggestion)}
									className={cn(
										"w-full text-left px-3 py-2 rounded-lg text-sm",
										"hover:bg-warmGrey-100 transition-colors duration-150",
										"flex items-center gap-2 text-charcoal"
									)}
									type="button"
								>
									<Plus className="h-4 w-4 text-charcoal-400" />
									<span className="uppercase tracking-wide">{suggestion}</span>
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Validation message */}
			{keywords.length >= maxKeywords && (
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-2 text-sm text-mustard flex items-center gap-2"
				>
					<span>Maximum {maxKeywords} keywords allowed</span>
				</motion.div>
			)}

			{/* Popular keywords quick add (when no input) */}
			{keywords.length === 0 && !inputValue && popularKeywords.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="mt-4"
				>
					<div className="text-xs font-medium text-charcoal-600 mb-2 uppercase tracking-wide">
						Popular Searches
					</div>
					<div className="flex flex-wrap gap-2">
						{popularKeywords.slice(0, 8).map((keyword) => (
							<button
								key={keyword}
								onClick={() => addKeyword(keyword)}
								disabled={disabled}
								className={cn(
									"px-3 py-1.5 rounded-full text-sm border border-charcoal-200",
									"bg-warmGrey-50 text-charcoal hover:bg-warmGrey-100",
									"transition-colors duration-200 uppercase tracking-wide",
									"hover:border-red hover:text-red",
									disabled && "opacity-50 cursor-not-allowed"
								)}
								type="button"
							>
								{keyword}
							</button>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}