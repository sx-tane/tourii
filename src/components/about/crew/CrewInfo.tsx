import React from "react";
import { CrewInfoProps, crewData } from "./crewData";
import Link from "next/link";

const CrewInfo: React.FC = () => {
  return (
    <div>
      {crewData.map((crewMember: CrewInfoProps, index: number) => (
        <div key={index}>
          <h2>{crewMember.name}</h2>
          <h3>{crewMember.title}</h3>
          <p>{crewMember.description}</p>
          {crewMember.twitterLink && (
            <Link href={crewMember.twitterLink}>
              {crewMember.twiiterHandle}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default CrewInfo;
