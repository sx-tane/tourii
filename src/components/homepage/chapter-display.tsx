"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { MotionButton } from "@/components/common";
import { useHomepageHighlights } from "@/hooks/api/useHomepageHighlights";

const ChapterDisplay: React.FC = () => {
	const { data: highlights } = useHomepageHighlights();
	const router = useRouter();

	// Use highlights data or fallback
	const chapterData = highlights?.latestChapter || {
		title: "The Lantern Festival",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		chapterNumber: "Chapter 3",
		region: "Bungo-Ono",
		storyId: "STO202506-e086f3-131748-623667-BAAA",
		link: "/v2/touriiverse/STO202506-e086f3-131748-623667-BAAA/chapters/SCT202506-e80737-131748-5f0cbe-DAAA",
	};

	const handleReadNow = () => {
		if (chapterData.link) {
			router.push(chapterData.link);
		}
	};

	return (
		<div className="w-full">
			<div className="px-4">
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
							src={chapterData.imageUrl || ""}
							alt={chapterData.title}
							width={2000}
							height={2000}
							className="w-full h-full object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
						<motion.div
							className="absolute bottom-1 left-5 p-3 text-warmGrey uppercase flex flex-col gap-2"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							<p className="text-sm tracking-widest font-semibold italic ">
								{chapterData.region || "Aomori"}
							</p>
							<h2 className="tracking-widest font-bold lg:text-2xl">
								{chapterData.chapterNumber || "Chapter 3"}
							</h2>
							<p className="text-base italic tracking-widest">
								{chapterData.title}
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
								onClick={handleReadNow}
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
		</div>
	);
};

export default ChapterDisplay;
