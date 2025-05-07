import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import StoryButton from "./story-button";

const StoryComponent: React.FC<{ story: StoryResponseDto | undefined }> = ({
	story,
}) => {
	// Use the updated field name: backgroundMedia
	const isVideo =
		typeof story?.backgroundMedia === "string" &&
		story.backgroundMedia.endsWith(".mp4");
	const isNotVideo =
		typeof story?.backgroundMedia === "string" &&
		story.backgroundMedia.endsWith(".png");

	// Handle the case where story is undefined
	if (!story) {
		// Optionally render a placeholder or null
		return null;
	}

	// Determine if we should use the layout with mapImage (assuming mapImage indicates the more detailed layout)
	// We use backgroundMedia for the actual display
	const hasDetailedLayout = !!story?.mapImage;

	return (
		<motion.div
			key="text-content"
			className="relative h-4/5 md:h-[65vh]  w-full md:w-11/12 animate-fadeIn overflow-hidden md:rounded-xl text-warmGrey"
			initial="hidden"
			animate="visible"
			exit="hidden"
			variants={upToDownVariants}
			transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
		>
			{hasDetailedLayout ? (
				<div>
					{/* Layout for stories WITH mapImage/description etc. */}
					<motion.div
						className="absolute left-10 top-5 z-30 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-6xl lg:text-9xl"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						{story?.sagaName}
					</motion.div>

					<motion.div
						className="absolute bottom-10 left-10 z-30"
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<StoryButton story={story} />
					</motion.div>

					<motion.div
						className="absolute right-10 top-5 z-30 w-1/3 hidden md:flex text-sm lg:text-base"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						{story?.sagaDesc}
					</motion.div>

					<motion.div
						variants={downToUpVariants}
						initial="visible"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Image
							className="absolute bottom-5 right-10 z-40 h-[30vh] lg:h-[40vh] xl:h-[45vh] hidden md:flex w-auto object-cover"
							src={story?.mapImage ?? ""}
							alt={story?.sagaName ? `${story.sagaName} Map` : "Map"}
							width={1000}
							height={1000}
							priority
						/>
					</motion.div>

					{/* Background Video/Image uses backgroundMedia */}
					{isVideo && (
						<video
							autoPlay
							loop
							muted
							playsInline
							preload="auto"
							className="absolute z-20 aspect-video h-full w-full object-cover brightness-50"
						>
							<source src={story?.backgroundMedia} type="video/mp4" />
						</video>
					)}

					{isNotVideo && (
						<Image
							src={story?.backgroundMedia ?? ""}
							alt={story?.sagaName ?? ""}
							width={1200}
							height={1200}
							className="absolute left-0 top-0 z-20 h-full w-full object-cover brightness-50"
							priority
						/>
					)}
				</div>
			) : (
				// Layout for simpler stories (e.g., Prologue, Coming Soon)
				<div>
					<motion.div
						className="absolute left-10 top-5 z-40 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-5xl lg:text-9xl"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						{story?.sagaName}
					</motion.div>

					{story?.sagaName !== "Coming Soon" && (
						<motion.div
							className="absolute bottom-10 left-10 z-40"
							variants={downToUpVariants}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<StoryButton story={story} />
						</motion.div>
					)}

					{/* Background Image uses backgroundMedia */}
					<Image
						src={story?.backgroundMedia ?? ""}
						alt={story?.sagaName ?? ""}
						width={1200}
						height={1200}
						className="absolute left-0 top-0 z-20 h-full w-full object-cover brightness-50"
						priority
					/>
				</div>
			)}
		</motion.div>
	);
};

export default StoryComponent;
