"use client";


import { motion } from "framer-motion";
import { downToUpVariants } from "@/lib/animation/variants-settings";

interface CarouselNavigationButtonsProps {
	onPrevious: () => void;
	onNext: () => void;
	// Add className to allow passing layout classes from parent if needed in the future,
	// but for now, we'll define them internally.
	// className?: string;
}

const CarouselNavigationButtons: React.FC<CarouselNavigationButtonsProps> = ({
	onPrevious,
	onNext,
}) => {
	const BUTTON_HOVER_TAP_EFFECTS = {
		hover: { scale: 1.05 },
		tap: { scale: 0.95 },
	};

	return (
		<motion.div
			className="flex space-x-3 md:space-x-5 mt-3 md:mt-5"
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
		>
			<motion.button
				type="button"
				onClick={onPrevious}
				className="bg-transparent border-warmGrey border-[1px] text-warmGrey p-3 md:p-4 rounded-full transition-all duration-300 ease-in-out hover:bg-warmGrey/20"
				aria-label="Previous route"
				whileHover="hover"
				whileTap="tap"
				variants={BUTTON_HOVER_TAP_EFFECTS}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-4 h-4 md:w-5 md:h-5"
					aria-hidden="true"
				>
					<title>Previous</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 19.5L8.25 12l7.5-7.5"
					/>
				</svg>
			</motion.button>
			<motion.button
				type="button"
				onClick={onNext}
				className="bg-transparent border-warmGrey border-[1px] text-warmGrey p-3 md:p-4 rounded-full transition-all duration-300 ease-in-out hover:bg-warmGrey/20"
				aria-label="Next route"
				whileHover="hover"
				whileTap="tap"
				variants={BUTTON_HOVER_TAP_EFFECTS}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-4 h-4 md:w-5 md:h-5"
					aria-hidden="true"
				>
					<title>Next</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.25 4.5l7.5 7.5-7.5 7.5"
					/>
				</svg>
			</motion.button>
		</motion.div>
	);
};

export default CarouselNavigationButtons;
