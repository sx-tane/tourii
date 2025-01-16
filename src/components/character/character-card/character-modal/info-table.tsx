import type { CharacterProps } from "@/types/character-type";
import type React from "react";

interface CharacterModalInfoTableProps {
	character: CharacterProps;
}

const InfoTable: React.FC<CharacterModalInfoTableProps> = ({ character }) => {
	return (
		<div className="mt-8 text-xs md:text-base">
			<table className="table-auto w-fit text-center border-collapse border border-gray-700">
				<tbody>
					<tr className="border border-black">
						<td className="p-3 text-warmGrey bg-black font-light tracking-widest">
							Date Of Birth
						</td>
						<td className="p-3 text-black tracking-wider">
							{character.dob || "Unknown"}
						</td>
					</tr>
					<tr className="border border-black">
						<td className="p-3 text-warmGrey bg-black font-light tracking-widest">
							Realm
						</td>
						<td className="p-3 text-black tracking-wider">
							{character.realm || "Unknown"}
						</td>
					</tr>
					<tr className="border border-black">
						<td className="p-3 text-warmGrey bg-black font-light tracking-widest">
							Height
						</td>
						<td className="p-3 text-black tracking-wider">
							{character.height || "Unknown"}
						</td>
					</tr>
					<tr className="border border-black">
						<td className="p-3 text-warmGrey bg-black font-light tracking-widest">
							Weapon
						</td>
						<td className="p-3 text-black tracking-wider">
							{character.weapon || "Unknown"}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default InfoTable;
