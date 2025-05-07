import type { CharacterProps } from "@/app/v2/(stories)/types";
import { Button } from "@headlessui/react";
import { BookOpen, MapPin } from "lucide-react";
import Image from "next/image";
import type React from "react";
import Markdown from "react-markdown";

interface CharacterCardProps extends CharacterProps {
	onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
	name,
	thumbnailImage,
	realm,
	kami,
	description,
	onClick,
}) => {
	return (
		<div className="flex flex-row md:items-stretch gap-0 bg-warmGrey3 rounded-lg overflow-hidden h-full w-full ">
			<div className="w-1/3 h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden relative bg-warmGrey2">
				<Image
					src={thumbnailImage ?? "/image/character/thumbnail/placeholder.png"}
					alt={name ?? "Character"}
					width={1080}
					height={1080}
					className="object-cover h-full w-full scale-110"
					priority
				/>
			</div>

			<div className="w-full p-4 md:w-2/3 h-3/8 md:h-full flex flex-col">
				<div className="flex-grow">
					<h3 className="text-base lg:text-xl font-bold text-charcoal uppercase tracking-widest mt-1">
						{name}
					</h3>
					<span className="font-normal text-xs text-charcoal italic tracking-widest">
						{kami}
					</span>
					<div className="flex flex-wrap items-center font-normal text-xs text-charcoal italic tracking-widest gap-x-3 gap-y-1 my-5">
						<span className="inline-flex items-center gap-1 tracking-wider">
							<MapPin size={14} />
							{realm}
						</span>
					</div>
					{description && (
						<Markdown className="mt-2 text-sm text-charcoal line-clamp-3 md:line-clamp-5 text-pretty leading-relaxed">
							{description}
						</Markdown>
					)}
				</div>

				<Button
					type="button"
					onClick={onClick}
					className="mt-2 inline-flex items-center gap-1 text-xs text-red hover:underline font-medium uppercase tracking-widest transition-all duration-300 self-end hover:scale-110"
				>
					<BookOpen size={14} />
					Read More
				</Button>
			</div>
		</div>
	);
};

export default CharacterCard;
