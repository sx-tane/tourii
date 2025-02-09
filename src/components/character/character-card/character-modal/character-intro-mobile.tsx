"use client";
import Loading from "@/app/loading";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import { type CharacterModalLeftProps, notoSerifJP } from "./character-intro";
import InfoTable from "./info-table";

const CharacterIntroMobile: React.FC<CharacterModalLeftProps> = ({
	character,
	onNext,
	onPrevious,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="absolute h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
			<AnimatePresence>
				<motion.div
					key="image-content"
					className="h-full w-full flex flex-col items-center justify-start px-4 py-10 z-30"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					{/* Loading Overlay */}
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<Loading />
						</div>
					)}

					{/* Character Image */}
					<Image
						src={character.image ?? ""}
						alt={character.name ?? ""}
						width={960}
						height={960}
						priority
						onLoadingComplete={() => setIsLoading(false)}
						className={`transition-opacity duration-300 ${
							isLoading ? "opacity-0" : "opacity-100"
						}`}
					/>

					{/* Character Details */}
					<div className="absolute inset-0 top-1/2 md:top-3/4 h-fit md:h-screen w-full bg-warmGrey bg-opacity-50 p-10 box-border">
						<p
							className={`text-xl font-bold tracking-widest text-black my-2 ${notoSerifJP.className}`}
						>
							{character.kanjiname}
						</p>

						<h2 className="font-bold tracking-widest uppercase text-3xl">
							{character.name}
						</h2>

						<Markdown className="text-sm text-black tracking-wider mt-5 font-medium md:text-base leading-relaxed">
							{character.description}
						</Markdown>

						<InfoTable character={character} />
					</div>
				</motion.div>
			</AnimatePresence>
			{/* Navigation Buttons */}
			{/* <button
				className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50"
				onClick={onPrevious}
				type="button"
			>
				<div className="h-3 w-3 sm:h-6 sm:w-6">
					<Image
						src="/image/about/left.svg"
						alt="left"
						width={60}
						height={60}
						priority
					/>
				</div>
			</button> */}
			{/* <button
				className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50"
				onClick={onNext}
				type="button"
			>
				<div className="h-3 w-3 sm:h-6 sm:w-6">
					<Image
						src="/image/about/right.svg"
						alt="right"
						width={60}
						height={60}
						priority
					/>
				</div>
			</button> */}
		</div>
	);
};

export default CharacterIntroMobile;
