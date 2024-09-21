import CharacterCard from "./CharacterCard";
import {
  type CharacterProps,
  characters,
} from "../../src/components/story/characterData";

const ProtagonistsSection: React.FC<CharacterProps> = () => {
  return (
    <div className="flex w-7/12 flex-wrap justify-center gap-8 bg-warmGrey3 p-4">
      {characters.map((char, index) => (
        <div key={index} className="">
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
