"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { characters } from "@/lib/data/character/character-data";
import type { CharacterProps } from "@/types/character-type";
import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import CharacterCard from "./character-card/character-card";
import CharacterModal from "./character-card/character-modal/character-modal";

const CharacterList: React.FC = () => {
	const [selectedCharacter, setSelectedCharacter] =
		useState<CharacterProps | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardClick = (character: CharacterProps) => {
		setSelectedCharacter(character);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCharacter(null);
	};

	return (
		<>
			<div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{characters.map((char, index) => (
					<motion.div
						key={char.name}
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
							key={char.name}
							name={char.name}
							thumbnailImage={char.thumbnailImage}
							kanjiname={char.kanjiname}
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
				/>
			)}
		</>
	);
};

export default CharacterList;
