import type { CharacterProps } from "@/app/v2/(stories)/types";
import CharacterCard from "@/components/character/character-card/character-card";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface CharactersTabContentProps {
	relevantCharacters: CharacterProps[];
	handleOpenModal: (character: CharacterProps) => void;
}

export const CharactersTabContent: React.FC<CharactersTabContentProps> = ({
	relevantCharacters,
	handleOpenModal,
}) => {
	return relevantCharacters.length > 0 ? (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{relevantCharacters.map((character) => (
				<motion.div
					key={character.id}
					tabIndex={0}
					className="block w-full text-left appearance-none bg-transparent border-none p-0 m-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleOpenModal(character);
						}
					}}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.5 }}
				>
					<CharacterCard
						{...character}
						onClick={() => handleOpenModal(character)} // Pass onClick down
					/>
				</motion.div>
			))}
		</div>
	) : (
		<Card>
			<CardHeader>
				<CardTitle>Characters</CardTitle>
				<CardDescription>
					No specific characters listed for this chapter.
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
