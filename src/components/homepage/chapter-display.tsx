import type { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useSelector } from "react-redux";
import { MotionButton } from "@/components/common";

const ChapterDisplay: React.FC = () => {
	const { chapterNumber, storyTitle, imageUrl } = useSelector(
		(state: RootState) => state.chapter,
	);

	return (
		<section className="w-full mx-auto">
			<div className="container mx-auto px-4">
				<motion.div
					className="w-full relative overflow-hidden rounded-[50px]"
					initial={{ opacity: 0, y: 40, scale: 0.98 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: false, amount: 0.3 }}
					transition={{
						duration: 1,
						ease: [0.25, 0.1, 0.25, 1],
					}}
				>
					<div className="aspect-video relative">
						<Image
							src={imageUrl}
							alt={storyTitle}
							width={2000}
							height={2000}
							className="w-full h-full object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
						<motion.div
							className="absolute bottom-1 left-5 p-3 text-warmGrey uppercase"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							<h2 className="tracking-widest font-bold lg:text-2xl">
								{chapterNumber}
							</h2>
							<p className="text-base italic tracking-widest mt-2">
								{storyTitle}
							</p>
						</motion.div>
						<motion.div
							className="absolute bottom-1 right-5 p-3"
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							<MotionButton
								hoverText="READ NOW"
								colors={{
									borderColor: "border-warmGrey",
									hoverBgColor: "#ECECDC",
									defaultTextColor: "#ECECDC",
									hoverTextColor: "#21211B",
								}}
							/>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ChapterDisplay;
