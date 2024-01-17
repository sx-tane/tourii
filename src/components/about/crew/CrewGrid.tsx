import React from "react";
import { type CrewInfoProps, crewData } from "./crewData";
import CrewMemberCard from "./CrewMemberCard";

const CrewGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
      {crewData.map((crewMember: CrewInfoProps, index: number) => (
        <CrewMemberCard crewMember={crewMember} key={index} />
      ))}
    </div>
  );
};

export default CrewGrid;
