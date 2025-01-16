"use client";
import { motion } from "framer-motion";
import { bridgeData, placeData } from "../../../lib/data/world/world-data";
import LinkBridge from "../link-bridge";
import BigSection from "./big-section";
import SmallSection from "./small-section";
import { downToUpVariants } from "@/lib/animation/variants-settings";

const Section = () => {
	return (
		<div className="grid grid-cols-1 justify-center align-middle">
			<motion.div
				key="image-content"
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={downToUpVariants}
				transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
			>
				<div className="z-10">
					<SmallSection
						title={placeData[0]?.title}
						smallTitle={placeData[0]?.smallTitle}
						image={placeData[0]?.image}
						video={placeData[0]?.video}
					/>
				</div>
				<div className="z-60">
					<LinkBridge
						japaneseTitle={bridgeData[0]?.japaneseTitle}
						englishTitle={bridgeData[0]?.englishTitle}
					/>
				</div>
				<div className="z-10">
					<BigSection />
				</div>
				<div className="z-60">
					<LinkBridge
						japaneseTitle={bridgeData[1]?.japaneseTitle}
						englishTitle={bridgeData[1]?.englishTitle}
					/>
				</div>
				<div className="z-10">
					<SmallSection
						title={placeData[1]?.title}
						smallTitle={placeData[1]?.smallTitle}
						image={placeData[1]?.image}
						video={placeData[1]?.video}
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default Section;
