import type React from "react";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface TouriiLogoAnimationProps {
	onAnimationComplete?: () => void;
}

const TouriiLogoAnimation: React.FC<TouriiLogoAnimationProps> = ({
	onAnimationComplete,
}) => {
	const controls = useAnimation();

	useEffect(() => {
		// Start logo animation
		const animateLogo = async () => {
			await controls.start({
				opacity: 1,
				scale: 1,
				transition: { duration: 0.3, ease: "easeOut" },
			});

			// Notify parent component when animation is complete
			if (onAnimationComplete) {
				onAnimationComplete();
			}
		};

		animateLogo();
	}, [controls, onAnimationComplete]);

	return (
		<div>
			<motion.object
				initial={{ opacity: 0, scale: 0.98 }}
				animate={controls}
				type="image/svg+xml"
				data="/image/homepage/tourii.svg"
				className="w-8/12 h-full"
				aria-label="Tourii Logo"
				onAnimationComplete={() => {
					if (onAnimationComplete) onAnimationComplete();
				}}
			/>

			<motion.p
				className="mt-5 text-base md:text-xl lg:text-3xl text-red tracking-[6px] font-bold"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.3 }}
			>
				{["EXPLORE", "EARN", "CONNECT"].map((word, index) => (
					<motion.span
						key={word}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							duration: 0.3,
							delay: 0.5 + index * 0.3, // Faster animation with shorter delays
							ease: [0.2, 0.65, 0.3, 0.9],
						}}
						className="inline-block"
					>
						{word}
						{index < 2 && (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.2,
									delay: 0.45 + index * 0.1,
								}}
							>
								.&nbsp;
							</motion.span>
						)}{" "}
					</motion.span>
				))}
			</motion.p>
		</div>
	);
};

export default TouriiLogoAnimation;
