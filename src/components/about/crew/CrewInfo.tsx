import React from "react";
import { CrewInfoProps, crewData } from "./crewData";
import Link from "next/link";

const CrewInfo: React.FC = () => {
  return (
    <div>
      {crewData.map((crewMember: CrewInfoProps, index: number) => (
        <div className="w-5/12 text-left text-red" key={index}>
          <h2 className="text-2xl font-bold tracking-wider">
            {crewMember.name}
          </h2>
          <div className="mb-2 mt-1 text-[10px] font-bold uppercase tracking-wider">
            {crewMember.title}
          </div>
          <p className="text-pretty text-base font-medium">
            {crewMember.description}
          </p>
          <div className="font-bold">—</div>
          {crewMember.twitterLink && (
            <Link
              href={crewMember.twitterLink}
              target="blank"
              className="text-sm font-bold italic tracking-wider"
            >
              {crewMember.twiiterHandle}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default CrewInfo;
