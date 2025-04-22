"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import type { CharacterProps } from "@/types/character-type";
import { motion } from "framer-motion";
import { useState } from "react";
import CharacterCard from "./character-card/character-card";
import CharacterModal from "./character-card/character-modal/character-modal";
import { setSelectedCharacter } from "@/lib/redux/features/character/character-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

const CharacterList: React.FC = () => {
	const dispatch = useAppDispatch();
	const { characters, selectedCharacter } = useAppSelector(
		(state) => state.character,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardClick = (character: CharacterProps) => {
		dispatch(setSelectedCharacter(character));
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		dispatch(setSelectedCharacter(null));
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="gap-5 grid grid-cols-2 lg:grid-cols-4 md:gap-10">
				{characters.map((char, index) => (
					<motion.div
						key={char.id}
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						transition={{
							duration: 0.8,
							delay: index * 0.2,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						<CharacterCard
							id={char.id}
							name={char.name}
							kanjiname={char.kanjiname}
							thumbnailImage={char.thumbnailImage}
							onClick={() => handleCardClick(char)}
						/>
					</motion.div>
				))}
			</div>
			{selectedCharacter && (
				<CharacterModal
					isOpen={isModalOpen}
					character={selectedCharacter}
					onClose={handleCloseModal}
					characters={characters}
				/>
			)}
		</>
	);
};

export default CharacterList;
