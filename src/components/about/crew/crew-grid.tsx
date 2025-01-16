"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { crewData } from "@/lib/data/about/crew-data";
import type { CrewInfoProps } from "@/types/about-type";
import { motion } from "framer-motion";
import type React from "react";
import CrewMemberCard from "./crew-member-card";

const CrewGrid: React.FC = () => {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
			{crewData.map((crewMember: CrewInfoProps, index) => (
				<motion.div
					key={crewMember.name}
					variants={downToUpVariants}
					initial="hidden"
					animate="visible"
					transition={{
						duration: 0.8,
						delay: index * 0.2,
						ease: [0, 0.71, 0.2, 1.01],
					}}
				>
					<CrewMemberCard crewMember={crewMember} />
				</motion.div>
			))}
		</div>
	);
};

export default CrewGrid;
