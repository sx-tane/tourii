import { crewData } from "@/lib/data/about/crew-data";
import type { CrewInfoProps } from "@/types/about-type";
import type React from "react";
import CrewMemberCard from "./crew-member-card";

const CrewGrid: React.FC = () => {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
			{crewData.map((crewMember: CrewInfoProps) => (
				<CrewMemberCard crewMember={crewMember} key={crewMember.name} />
			))}
		</div>
	);
};

export default CrewGrid;
