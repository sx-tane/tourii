import type { CharacterProps } from "@/types/character-type";
import { characters } from "../../src/lib/data/character/character-data";
import CharacterCard from "./CharacterCard";

const ProtagonistsSection: React.FC<CharacterProps> = () => {
	return (
		<div className="flex w-7/12 flex-wrap justify-center gap-8 bg-warmGrey3 p-4">
			{characters.map((char) => (
				<div key={char.name} className="">
					<CharacterCard
						key={char.name}
						name={char.name}
						image={char.image}
						description={char.description}
					/>
				</div>
			))}
		</div>
	);
};

export default ProtagonistsSection;
