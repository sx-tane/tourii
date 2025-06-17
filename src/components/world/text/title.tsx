"use client";
import type { TitleProps } from "@/types/world-type";
import { motion } from "framer-motion";


const Title: React.FC<TitleProps> = ({ smallTitle, title }) => {
	// Split strings into words internally
	const smallTitleWords = smallTitle?.split(" ") ?? [];
	const titleWords = title?.split(" ") ?? [];

	return (
		<motion.div
			className="my-10 items-center pt-5 text-center text-warmGrey3 md:pt-10"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false, amount: 0.5 }} // Trigger when 50% is visible
			transition={{ duration: 0.5 }}
		>
			<div className="font-bold uppercase relative">
				<motion.h3 className="mb-10 text-xs uppercase tracking-widest md:mb-20 md:text-lg">
					{smallTitleWords.map((word, i) => (
						<motion.span
							key={`smallTitle-${word}-${i}`}
							className="inline-block mr-[0.25em]" // Add margin for spacing between words
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: false }} // Animate each time it enters view
							transition={{
								duration: 0.6,
								delay: 0.2 + i * 0.1, // Staggered delay
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							{word}
						</motion.span>
					))}
				</motion.h3>

				<motion.h2
					className="whitespace-break-spaces text-warmGrey3 break-all text-3xl leading-snug tracking-wide sm:text-5xl md:mb-20 md:text-6xl md:tracking-widest"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.8,
						delay: 0.5,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				>
					{titleWords.map((word, i) => (
						<motion.span
							key={`title-${word}-${i}`}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.6,
								delay: 0.6 + i * 0.1,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							{word}
							{i < titleWords.length - 1 ? " " : ""}
						</motion.span>
					))}
				</motion.h2>
			</div>
		</motion.div>
	);
};

export default Title;
