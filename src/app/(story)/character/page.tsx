import { DescriptionCharacter } from "@/components/about/description";
import CharacterList from "@/components/character/character-list";
import { descriptionData } from "@/lib/data/about/description-data";
import type { NextPage } from "next";
import type React from "react";

const Character: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[90vh]">
			<div>
				<DescriptionCharacter {...descriptionData[4]} />
			</div>
			<div className="mt-10">
				<CharacterList />
			</div>
		</div>
	);
};

export default Character;
