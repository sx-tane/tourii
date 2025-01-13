import { DescriptionCharacter } from "@/components/about/description";
import Divider from "@/components/about/divider-line/divider";
import CharacterList from "@/components/character/character-list";
import { descriptionData } from "@/lib/data/about/description-data";
import type { NextPage } from "next";
import type React from "react";

const Character: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="mt-10">
				<DescriptionCharacter {...descriptionData[4]} />
			</div>
			<CharacterList />
			<div className="absolute bottom-10 left-0 right-0">
				<Divider />
			</div>
		</div>
	);
};

export default Character;
