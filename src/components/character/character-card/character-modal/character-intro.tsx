import Loading from "@/app/loading";
import type { CharacterProps } from "@/app/v2/(stories)/types";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import { Noto_Serif_JP } from "next/font/google";
import Image from "next/image";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import InfoTable from "./info-table";

export const notoSerifJP = Noto_Serif_JP({
	subsets: ["latin"],
	display: "swap",
});

export interface CharacterModalLeftProps {
	character: CharacterProps;
	onNext: () => void;
	onPrevious: () => void;
}

const CharacterIntro: React.FC<CharacterModalLeftProps> = ({
	character,
	onNext,
	onPrevious,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentCharacter, setCurrentCharacter] = useState(character);
	const [animationKey, setAnimationKey] = useState(0);
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		setCurrentCharacter(character);
		setIsLoading(true);
		setAnimationKey((prevKey) => prevKey + 1);
		setShowButtons(false); // Hide buttons when character changes
	}, [character]);

	return (
		<div className="bg-warmGrey flex p-8 justify-center items-center ml-10 relative">
			<AnimatePresence mode="wait">
				<motion.div
					key={`text-content-${animationKey}`}
					className="flex flex-col"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={upToDownVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
					onAnimationComplete={() => setShowButtons(true)} // Show buttons after animation
				>
					<p
						className={`font-bold tracking-widest md:text-2xl text-black my-5 ${notoSerifJP.className}`}
					>
						{currentCharacter.kanjiname}
					</p>
					<h2 className="font-bold tracking-widest uppercase mb-5 md:text-3xl md:tracking-widest">
						{currentCharacter.name}
					</h2>
					<Markdown className="text-black tracking-wider mt-5 font-medium md:text-sm leading-relaxed text-justify">
						{currentCharacter.description}
					</Markdown>
					<InfoTable character={currentCharacter} />
				</motion.div>
				<motion.div
					key={`image-content-${animationKey}`}
					className="h-full w-1/2 flex-none mx-10 relative"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
					onAnimationComplete={() => setShowButtons(true)} // Show buttons after animation
				>
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<Loading />
						</div>
					)}
					<Image
						src={currentCharacter.image ?? ""}
						alt={currentCharacter.name ?? ""}
						width={960}
						height={960}
						priority
						onLoadingComplete={() => setIsLoading(false)}
						className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
					/>
				</motion.div>
			</AnimatePresence>
			{/* Navigation Buttons */}
			<button
				className={`absolute -left-5 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300 ${showButtons ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={onPrevious}
				type="button"
			>
				<div className="h-3 w-3 sm:h-5 sm:w-5">
					<Image
						src="/image/about/left.svg"
						alt="left"
						width={60}
						height={60}
						priority
					/>
				</div>
			</button>
			<button
				className={`absolute right-8 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300 ${showButtons ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={onNext}
				type="button"
			>
				<div className="h-3 w-3 sm:h-5 sm:w-5">
					<Image
						src="/image/about/right.svg"
						alt="right"
						width={60}
						height={60}
						priority
					/>
				</div>
			</button>
		</div>
	);
};

export default CharacterIntro;
