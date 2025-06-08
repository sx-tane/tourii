import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { upToDownVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import type React from "react";

const ModelRouteIntro: React.FC<{ modelRoute: ModelRouteResponseDto }> = ({
	modelRoute,
}) => {
	const routeNameWords = modelRoute.routeName.split(" ");
	const recommendedWords = "Recommended for".split(" ");

	return (
		<div className="h-fit md:rounded-l-3xl md:rounded-r-none rounded-3xl bg-warmGrey2 py-8 text-center">
			<motion.div
				className="flex items-center justify-center text-xs sm:text-sm font-bold tracking-widest text-charcoal uppercase"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				<motion.span
					className="mx-2 sm:mx-4"
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.6,
						delay: 0.1,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				>
					Japan
					{/* TODO: Add the country name in backend and change the text to the country name */}
				</motion.span>
				<motion.div
					className="w-8 sm:w-16 border-t-2 border-charcoal"
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				/>
				<motion.span
					className="mx-2 sm:mx-4"
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.6,
						delay: 0.5,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				>
					{modelRoute.region}
				</motion.span>
			</motion.div>
			<motion.div
				className="mt-8 sm:mt-12 lg:mt-20 text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider px-4"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				{routeNameWords.map((word, i) => (
					<motion.span
						key={`routeName-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.6,
							delay: 0.2 + i * 0.1,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>
			<motion.div
				className="flex items-center justify-center px-4 sm:px-32 lg:px-96 text-xs sm:text-sm font-bold tracking-wider text-charcoal"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className="my-6 sm:my-8 lg:my-10 flex-grow border-t-[2px] border-warmGrey3"
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.8,
						delay: 0.4,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				/>
			</motion.div>
			<motion.div
				className="font-bold tracking-wider text-red text-sm sm:text-base"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				{recommendedWords.map((word, i) => (
					<motion.span
						key={`recommended-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.6,
							delay: 0.2 + i * 0.1,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>
			<div className="mt-4 sm:mt-6 flex justify-center">
				{/* Mobile and Tablet: 2x2 Grid */}
				<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
					{modelRoute.recommendation.map((recommendation, index) => (
						<motion.div
							key={recommendation}
							variants={upToDownVariants}
							initial="hidden"
							animate="visible"
							transition={{
								duration: 0.6,
								delay: 0.5 + index * 0.15,
								ease: "easeOut",
							}}
							className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-red p-2 text-xs sm:text-sm font-medium capitalize tracking-wider text-warmGrey"
						>
							{recommendation}
						</motion.div>
					))}
				</div>

				{/* Desktop: Horizontal Layout */}
				<div className="hidden lg:flex lg:space-x-16">
					{modelRoute.recommendation.map((recommendation, index) => (
						<motion.div
							key={recommendation}
							variants={upToDownVariants}
							initial="hidden"
							animate="visible"
							transition={{
								duration: 0.6,
								delay: 0.5 + index * 0.15,
								ease: "easeOut",
							}}
							className="flex h-36 w-36 items-center justify-center rounded-full bg-red p-2 text-sm font-medium capitalize tracking-wider text-warmGrey"
						>
							{recommendation}
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ModelRouteIntro;
