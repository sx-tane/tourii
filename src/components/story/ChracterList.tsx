import CharacterCard from "./CharacterCard";
import { CharacterProps, characters } from "./characterData";

const ProtagonistsSection: React.FC<CharacterProps> = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {characters.map((char, index) => (
        <div key={index} className="w-full md:w-9/12">
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
