import Image from "next/image";
import { type CharacterProps } from "./characterData";

const CharacterCard: React.FC<CharacterProps> = ({
  name,
  image,
  description,
}) => {
  return (
    <div className="flex flex-row items-start p-4 text-red">
      <div className="mb-2 h-auto w-52 overflow-hidden rounded-full border-[1.5] border-mustard">
        <Image
          src={image ?? ""}
          alt={`Character ${name}`}
          width={248}
          height={248}
          className="object-cover"
        />
      </div>
      <div className="ml-4 pt-10">
        <h2 className="text-justify text-2xl font-bold uppercase tracking-wider">
          {name}
        </h2>
        <p className="mt-4 text-justify text-base font-medium tracking-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
