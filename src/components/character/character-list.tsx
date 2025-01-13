import { characters } from "@/lib/data/character/character-data";
import type React from "react";
import CharacterCard from "./character-card/character-card";
import type { CharacterProps } from "@/types/character-type";

const CharacterList: React.FC<CharacterProps> = () => {
	return (
		<div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			{characters.map((char) => (
				<div key={char.name}>
					<CharacterCard
						key={char.name}
						name={char.name}
						thumbnailImage={char.thumbnailImage}
						kanjiname={char.kanjiname}
					/>
				</div>
			))}
		</div>
	);
};

export default CharacterList;
