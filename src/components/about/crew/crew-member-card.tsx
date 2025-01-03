import type { CrewInfoProps } from "@/types/about-type";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

// TODO: when hover, it will change to our NFT image
const CrewMemberCard: React.FC<{ crewMember: CrewInfoProps }> = ({
	crewMember,
}) => {
	return (
		<div className="rounded-lg border-[1.5px] border-red px-6 py-6 text-left text-red">
			<Image
				src={crewMember.profileImage}
				alt={crewMember.name}
				width={140}
				height={140}
				className="mb-[50px] rounded-full"
				priority={true}
			/>
			<h2 className="text-2xl font-bold tracking-wider">{crewMember.name}</h2>
			<div className="mb-2 mt-1 text-[10px] font-bold uppercase tracking-wider">
				{crewMember.title}
			</div>
			<p className="text-pretty text-sm font-medium">
				{crewMember.description}
			</p>
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
