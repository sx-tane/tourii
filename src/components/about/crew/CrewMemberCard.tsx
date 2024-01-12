import React from "react";
import { CrewInfoProps } from "./crewData";
import Image from "next/image";
import Link from "next/link";

const CrewMemberCard: React.FC<{ crewMember: CrewInfoProps }> = ({
  crewMember,
}) => {
  return (
    <div className="rounded-lg border-[1.5px] border-red py-6 pl-6 pr-6 text-left text-red">
      <Image
        src={crewMember.profileImage}
        alt={crewMember.name}
        width={140}
        height={140}
        className="mb-[50px] rounded-full"
      />
      <h2 className="text-2xl font-bold tracking-wider">{crewMember.name}</h2>
      <div className="mb-2 mt-1 text-[10px] font-bold uppercase tracking-wider">
        {crewMember.title}
      </div>
      <p className="text-prety text-sm font-medium">{crewMember.description}</p>
      <div className="font-bold">—</div>
      {crewMember.twitterLink && (
        <Link
          href={crewMember.twitterLink}
          target="blank"
          className="text-sm font-bold italic tracking-wider transition-all hover:text-black"
        >
          {crewMember.twiiterHandle}
        </Link>
      )}
    </div>
  );
};

export default CrewMemberCard;
