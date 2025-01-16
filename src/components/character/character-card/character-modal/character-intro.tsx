import type React from "react";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import type { CharacterProps } from "@/types/character-type";
import InfoTable from "./info-table";
import Loading from "@/app/loading";

const notoSerifJP = Noto_Serif_JP({
	subsets: ["latin"],
	display: "swap",
});

interface CharacterModalLeftProps {
	character: CharacterProps;
}

const textVariants = {
	hidden: { opacity: 0, y: -50 },
	visible: { opacity: 1, y: 0 },
};

const imageVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

const CharacterIntro: React.FC<CharacterModalLeftProps> = ({ character }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="bg-warmGrey flex p-8 justify-center items-center ml-10">
			<AnimatePresence>
				<motion.div
					key="text-content"
					className="flex flex-col"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={textVariants}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<p
						className={`text-2xl font-bold tracking-widest md:text-3xl text-black my-5 ${notoSerifJP.className}`}
					>
						{character.kanjiname}
					</p>
					<h2 className="font-bold tracking-widest uppercase mb-5 text-3xl md:text-5xl md:tracking-widest">
						{character.name}
					</h2>
					<Markdown className="text-sm text-black tracking-wider mt-5 font-medium md:text-base leading-relaxed">
						{character.description}
					</Markdown>
					<InfoTable character={character} />
				</motion.div>

				<motion.div
					key="image-content"
					className="h-full w-5/12 flex-none mx-10 mt-20 relative"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={imageVariants}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<Loading />
						</div>
					)}
					<Image
						src={character.image ?? ""}
						alt={character.name ?? ""}
						width={960}
						height={960}
						priority
						onLoadingComplete={() => setIsLoading(false)}
						className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default CharacterIntro;
