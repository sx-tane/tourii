"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Sparkles, CheckCircle, Brain, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoadingStatesProps } from "./types";
import { LoadingSteps } from "./types";

const STEP_ICONS = {
	[LoadingSteps.SEARCHING]: Search,
	[LoadingSteps.CLUSTERING]: MapPin,
	[LoadingSteps.AI_GENERATING]: Sparkles,
	[LoadingSteps.COMPLETE]: CheckCircle,
};

const STEP_COLORS = {
	[LoadingSteps.SEARCHING]: "text-blue-500",
	[LoadingSteps.CLUSTERING]: "text-green-500",
	[LoadingSteps.AI_GENERATING]: "text-purple-500",
	[LoadingSteps.COMPLETE]: "text-red",
};

export function LoadingStates({ progress, className }: LoadingStatesProps) {
	const [displayedStep, setDisplayedStep] = useState(progress.currentStep);
	const [animationKey, setAnimationKey] = useState(0);

	// Update displayed step with slight delay for smoother transitions
	useEffect(() => {
		const timer = setTimeout(() => {
			setDisplayedStep(progress.currentStep);
			setAnimationKey(prev => prev + 1);
		}, 100);
		return () => clearTimeout(timer);
	}, [progress.currentStep]);

	const Icon = STEP_ICONS[displayedStep];
	const iconColor = STEP_COLORS[displayedStep];

	return (
		<div className={cn("w-full max-w-md mx-auto", className)}>
			{/* Main Loading Container */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className="relative p-6 bg-warmGrey-50 rounded-2xl border border-charcoal-200"
			>
				{/* AI Brain Icon Background */}
				<div className="absolute top-4 right-4 opacity-10">
					<Brain className="h-8 w-8 text-charcoal" />
				</div>

				{/* Step Icon and Progress */}
				<div className="flex items-center gap-4 mb-4">
					<motion.div
						key={animationKey}
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ 
							type: "spring", 
							stiffness: 200, 
							damping: 15,
							duration: 0.5 
						}}
						className={cn(
							"flex items-center justify-center w-12 h-12 rounded-xl",
							"bg-warmGrey-100 border border-charcoal-200",
							iconColor
						)}
					>
						<Icon className="h-6 w-6" />
					</motion.div>

					<div className="flex-1">
						<AnimatePresence mode="wait">
							<motion.div
								key={displayedStep}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="space-y-1"
							>
								<h3 className="font-medium text-charcoal text-lg">
									{displayedStep}
								</h3>
								<p className="text-sm text-charcoal-600">
									{progress.estimatedTimeMs > 0 && (
										<span>
											~{Math.ceil(progress.estimatedTimeMs / 1000)}s remaining
										</span>
									)}
								</p>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-xs font-medium text-charcoal-600 uppercase tracking-wide">
							Progress
						</span>
						<span className="text-xs font-medium text-charcoal">
							{Math.round(progress.percentage)}%
						</span>
					</div>
					
					<div className="relative h-2 bg-warmGrey-200 rounded-full overflow-hidden">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${progress.percentage}%` }}
							transition={{ 
								duration: 0.8, 
								ease: "easeOut",
								type: "tween"
							}}
							className="absolute left-0 top-0 h-full bg-gradient-to-r from-red to-red/80 rounded-full"
						/>
						
						{/* Animated shimmer effect */}
						<motion.div
							animate={{ x: ["0%", "100%"] }}
							transition={{ 
								duration: 1.5, 
								repeat: Infinity, 
								ease: "easeInOut" 
							}}
							className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-warmGrey-50/50 to-transparent"
							style={{ 
								clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" 
							}}
						/>
					</div>
				</div>

				{/* Step Indicators */}
				<div className="mt-4 flex justify-between items-center">
					{Object.values(LoadingSteps).map((step, index) => {
						const isActive = step === displayedStep;
						const isComplete = Object.values(LoadingSteps).indexOf(displayedStep) > index;
						const StepIcon = STEP_ICONS[step];
						
						return (
							<motion.div
								key={step}
								initial={{ scale: 0.8, opacity: 0.5 }}
								animate={{ 
									scale: isActive ? 1.1 : 0.8,
									opacity: isActive || isComplete ? 1 : 0.5 
								}}
								transition={{ duration: 0.3 }}
								className={cn(
									"flex flex-col items-center gap-1 text-xs",
									isActive && "text-red",
									isComplete && "text-green-500",
									!isActive && !isComplete && "text-charcoal-400"
								)}
							>
								<div className={cn(
									"w-6 h-6 rounded-full border-2 flex items-center justify-center",
									isActive && "border-red bg-red/10",
									isComplete && "border-green-500 bg-green-500/10",
									!isActive && !isComplete && "border-charcoal-300"
								)}>
									{isComplete ? (
										<CheckCircle className="h-3 w-3" />
									) : (
										<StepIcon className="h-3 w-3" />
									)}
								</div>
								<span className="uppercase tracking-wider font-medium text-[10px] text-center max-w-[60px] leading-tight">
									{step.split(" ")[0]}
								</span>
							</motion.div>
						);
					})}
				</div>

				{/* Pulsing dots animation */}
				<div className="mt-4 flex justify-center items-center gap-1">
					{[0, 1, 2].map((index) => (
						<motion.div
							key={index}
							animate={{ 
								scale: [1, 1.2, 1],
								opacity: [0.4, 1, 0.4] 
							}}
							transition={{ 
								duration: 1.2, 
								repeat: Infinity,
								delay: index * 0.2 
							}}
							className="w-2 h-2 bg-red rounded-full"
						/>
					))}
				</div>
			</motion.div>

			{/* AI-powered badge */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-500"
			>
				<Sparkles className="h-3 w-3" />
				<span className="uppercase tracking-wide font-medium">
					AI-Powered Route Discovery
				</span>
				<Route className="h-3 w-3" />
			</motion.div>
		</div>
	);
}

// Simple loading spinner for inline use
export function SimpleLoadingSpinner({ className }: { className?: string }) {
	return (
		<motion.div
			animate={{ rotate: 360 }}
			transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			className={cn("inline-block", className)}
		>
			<Sparkles className="h-4 w-4 text-red" />
		</motion.div>
	);
}

// Skeleton cards for route results
export function RouteCardSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn("space-y-3", className)}>
			{[1, 2, 3].map((index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="p-4 bg-warmGrey-50 rounded-xl border border-charcoal-200"
				>
					<div className="flex items-start gap-4">
						{/* Image skeleton */}
						<div className="w-16 h-16 bg-warmGrey-200 rounded-lg animate-pulse" />
						
						<div className="flex-1 space-y-2">
							{/* Title skeleton */}
							<div className="h-4 bg-warmGrey-200 rounded animate-pulse w-3/4" />
							
							{/* Description skeleton */}
							<div className="space-y-1">
								<div className="h-3 bg-warmGrey-200 rounded animate-pulse w-full" />
								<div className="h-3 bg-warmGrey-200 rounded animate-pulse w-2/3" />
							</div>
							
							{/* Tags skeleton */}
							<div className="flex gap-2">
								<div className="h-5 w-16 bg-warmGrey-200 rounded-full animate-pulse" />
								<div className="h-5 w-12 bg-warmGrey-200 rounded-full animate-pulse" />
								<div className="h-5 w-20 bg-warmGrey-200 rounded-full animate-pulse" />
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}