import Description, {
	DescriptionCharacter,
} from "@/components/about/description";
import Divider from "@/components/about/divider-line/divider";
import { CharacterCarousel } from "@/components/character/character-carousel";
import { descriptionData } from "@/lib/data/about/description-data";
import type { NextPage } from "next";
import type React from "react";

const Character: NextPage = () => {
	return (
		<div>
			<div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
				<div className="mt-10">
					<DescriptionCharacter {...descriptionData[4]} />
				</div>
				<div className="my-auto mx-auto">
					{" "}
					<CharacterCarousel />
				</div>
				<div className="mb-10 mt-5">
					<Divider />
				</div>
			</div>
		</div>
	);
};

export default Character;
