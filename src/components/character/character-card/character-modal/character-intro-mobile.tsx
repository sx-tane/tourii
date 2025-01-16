"use client";
import type React from "react";
import { notoSerifJP, type CharacterModalLeftProps } from "./character-intro";
import { useState } from "react";
import Loading from "@/app/loading";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";
import InfoTable from "./info-table";
import Image from "next/image";

const CharacterIntroMobile: React.FC<CharacterModalLeftProps> = ({
	character,
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
		</div>
	);
};

export default CharacterIntroMobile;
