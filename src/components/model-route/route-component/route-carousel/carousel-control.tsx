import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

export interface CarouselControlProps {
	onPrevious: () => void;
	onNext: () => void;
	canGoPrevious: boolean;
	canGoNext: boolean;
	className?: string;
}

const CarouselControl: React.FC<CarouselControlProps> = ({
	onPrevious,
	onNext,
	canGoPrevious,
	canGoNext,
	className = "",
}) => {
	return (
		<div className={`absolute inset-0 pointer-events-none z-40 ${className}`}>
			{/* Left Arrow */}
			{canGoPrevious && (
				<motion.button
					type="button"
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 pointer-events-auto w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
					onClick={onPrevious}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2, duration: 0.3 }}
				>
					<ChevronLeft className="w-4 h-4 text-charcoal" />
				</motion.button>
			)}

			{/* Right Arrow */}
			{canGoNext && (
				<motion.button
					type="button"
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 pointer-events-auto w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
					onClick={onNext}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2, duration: 0.3 }}
				>
					<ChevronRight className="w-4 h-4 text-charcoal" />
				</motion.button>
			)}
		</div>
	);
};

export default CarouselControl;
