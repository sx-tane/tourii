import type React from "react";
import CrewMemberCard from "./CrewMemberCard";
import { type CrewInfoProps, crewData } from "./crewData";

const CrewGrid: React.FC = () => {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ">
			{crewData.map((crewMember: CrewInfoProps, index: number) => (
				<CrewMemberCard crewMember={crewMember} key={index} />
			))}
		</div>
	);
};

export default CrewGrid;
