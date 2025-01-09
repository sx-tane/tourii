import type { CharacterProps } from "@/types/character-type";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const CharacterCard: React.FC<CharacterProps> = ({
	name,
	image,
	description,
}) => {
	return (
		<div className="flex flex-row items-center justify-start p-8 text-red">
			<div className="h-auto w-4/12 flex-none">
				<Image
					src={image ?? ""}
					alt={`Character ${name}`}
					width={500}
					height={500}
					quality={100}
					objectFit="contain"
				/>
			</div>
			<div className="ml-4 flex-1">
				<h2 className="text-justify text-3xl font-bold uppercase tracking-wider">
					{name}
				</h2>
				<div className="mt-4 text-justify text-base font-medium tracking-normal">
					<ReactMarkdown>{description ?? ""}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
