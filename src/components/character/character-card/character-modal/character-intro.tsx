import Loading from "@/app/loading";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import type { CharacterProps } from "@/types/character-type";
import { AnimatePresence, motion } from "framer-motion";
import { Noto_Serif_JP } from "next/font/google";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import InfoTable from "./info-table";

export const notoSerifJP = Noto_Serif_JP({
	subsets: ["latin"],
	display: "swap",
});

export interface CharacterModalLeftProps {
	character: CharacterProps;
}

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
					variants={upToDownVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<p
						className={` font-bold tracking-widest md:text-2xl text-black my-5 ${notoSerifJP.className}`}
					>
						{character.kanjiname}
					</p>
					<h2 className="font-bold tracking-widest uppercase mb-5 md:text-3xl md:tracking-widest">
						{character.name}
					</h2>
					<Markdown className="text-black tracking-wider mt-5 font-medium md:text-sm leading-relaxed">
						{character.description}
					</Markdown>
					<InfoTable character={character} />
				</motion.div>
				<motion.div
					key="image-content"
					className="h-full w-1/2 flex-none mx-10 relative"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
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
