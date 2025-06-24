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

// Zen-inspired animations - subtle and graceful
const ZEN_ANIMATIONS = {
	container: {
		initial: { opacity: 0 },
		animate: { 
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.15,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	},
	character: {
		initial: { opacity: 0, y: 20 },
		animate: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	},
	emptyState: {
		initial: { opacity: 0, y: 20, scale: 0.95 },
		animate: { 
			opacity: 1, 
			y: 0, 
			scale: 1,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	}
};

export const CharactersTabContent: React.FC<CharactersTabContentProps> = ({
	relevantCharacters,
	handleOpenModal,
}) => {
	return relevantCharacters.length > 0 ? (
		<motion.div 
			className="grid grid-cols-1 sm:grid-cols-2 gap-4"
			variants={ZEN_ANIMATIONS.container}
			initial="initial"
			animate="animate"
		>
			{relevantCharacters.map((character, index) => (
				<motion.div
					key={character.id}
					variants={ZEN_ANIMATIONS.character}
					tabIndex={0}
					className="block w-full text-left appearance-none bg-transparent border-none p-0 m-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg cursor-pointer"
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleOpenModal(character);
						}
					}}
				>
					<CharacterCard
						{...character}
						onClick={() => handleOpenModal(character)}
					/>
				</motion.div>
			))}
		</motion.div>
	) : (
		<motion.div
			variants={ZEN_ANIMATIONS.emptyState}
			initial="initial"
			animate="animate"
		>
			<Card className="border-warmGrey3/30 bg-warmGrey3/20 backdrop-blur-sm">
				<CardHeader>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<CardTitle className="text-charcoal">Characters</CardTitle>
						<CardDescription className="text-charcoal/70">
							No specific characters listed for this chapter.
						</CardDescription>
					</motion.div>
				</CardHeader>
			</Card>
		</motion.div>
	);
};
