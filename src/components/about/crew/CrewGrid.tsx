import React from "react";
import { type CrewInfoProps, crewData } from "./crewData";
import CrewMemberCard from "./CrewMemberCard";

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
