"use client";
import { characters } from "@/lib/data/character/character-data";
import type React from "react";
import { useState } from "react";
import CharacterCard from "./character-card/character-card";
import type { CharacterProps } from "@/types/character-type";
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
				{characters.map((char) => (
					<CharacterCard
						key={char.name}
						name={char.name}
						thumbnailImage={char.thumbnailImage}
						kanjiname={char.kanjiname}
						onClick={() => handleCardClick(char)}
					/>
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
