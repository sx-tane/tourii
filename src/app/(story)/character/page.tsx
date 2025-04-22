"use client";
import { DescriptionCharacter } from "@/components/about/description";
import CharacterList from "@/components/character/character-list";
import { descriptionData } from "@/lib/data/about/description-data";
import { characters } from "@/lib/data/character/character-data";
import { setCharacters } from "@/lib/redux/features/character/character-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";

const Character: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading, error } = useAppSelector((state) => state.character);

	useEffect(() => {
		// In a real app, you would fetch characters from an API here
		dispatch(setCharacters(characters));
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[90vh]">
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[90vh] text-red-500">
				Error: {error}
			</div>
		);
	}

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
