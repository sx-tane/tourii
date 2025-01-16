import type React from "react";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";
import type { CharacterProps } from "@/types/character-type";

const notoSerifJP = Noto_Serif_JP({
	subsets: ["latin"],
	display: "swap",
});

interface CharacterCardProps extends CharacterProps {
	onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
	name,
	kanjiname,
	thumbnailImage,
	onClick,
}) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="relative border-red border-[1.5px] rounded-3xl overflow-hidden group cursor-pointer"
			onClick={onClick}
		>
			<Image
				src={thumbnailImage ?? ""}
				alt={name ?? ""}
				width={350}
				height={350}
				quality={100}
				priority
			/>
			<div className="absolute top-0 right-0 bg-red h-2/5 w-1/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<p
					className={`text-white text-4xl font-bold tracking-[0.2em] [writing-mode:vertical-rl] ${notoSerifJP.className}`}
				>
					{kanjiname}
				</p>
			</div>
		</div>
	);
};

export default CharacterCard;
