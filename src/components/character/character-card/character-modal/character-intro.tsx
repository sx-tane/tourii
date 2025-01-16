import type React from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";
import { motion } from "framer-motion"; // Import Framer Motion
import type { CharacterProps } from "@/types/character-type";
import InfoTable from "./info-table";

const notoSerifJP = Noto_Serif_JP({
	subsets: ["latin"],
	display: "swap",
});

interface CharacterModalLeftProps {
	character: CharacterProps;
}

// Framer Motion Variants for Animation
const textVariants = {
	hidden: { opacity: 0, y: -50 }, // Start above
	visible: { opacity: 1, y: 0 }, // Move to original position
};

const imageVariants = {
	hidden: { opacity: 0, y: 50 }, // Start below
	visible: { opacity: 1, y: 0 }, // Move to original position
};

const CharacterIntro: React.FC<CharacterModalLeftProps> = ({ character }) => {
	return (
		<div className="bg-warmGrey flex p-8 justify-center items-center ml-10">
			{/* Text Content */}
			<motion.div
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

				{/* Table Content */}
				<InfoTable character={character} />
			</motion.div>

			{/* Image Content */}
			<motion.div
				className="h-full w-5/12 flex-none mx-10 mt-20"
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={imageVariants}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Image
					src={character.image ?? ""}
					alt={character.name ?? ""}
					width={1920}
					height={1920}
					quality={100}
					priority
				/>
			</motion.div>
		</div>
	);
};

export default CharacterIntro;
