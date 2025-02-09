import type { Story } from "@/types/story-type";
import Image from "next/image";
import type React from "react";
import StoryButton from "./story-button";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";

const StoryComponent: React.FC<{ story: Story | undefined }> = ({ story }) => {
	const isVideo = story?.backgroundImage.endsWith(".mp4");

	return (
		<motion.div
			key="text-content"
			className="relative h-4/5 md:h-[65vh] w-full md:w-11/12 animate-fadeIn overflow-hidden md:rounded-xl text-warmGrey"
			initial="hidden"
			animate="visible"
			exit="hidden"
			variants={upToDownVariants}
			transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
		>
			{isVideo ? (
				<div>
					{/* Animated Title (Single Block Animation) */}
					<motion.div
						className="absolute left-10 top-5 z-50 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-5xl lg:text-9xl"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						{story?.title}
					</motion.div>

					{/* Delayed Button Animation */}
					<motion.div
						className="absolute bottom-10 left-10 z-50"
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<StoryButton story={story} />
					</motion.div>

					{/* Delayed Description & Image Animation */}
					<motion.div
						className="absolute right-10 top-5 z-50 w-1/3 hidden md:flex text-sm lg:text-lg"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						{story?.description}
					</motion.div>

					<motion.div
						variants={downToUpVariants}
						initial="visible"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Image
							className="absolute bottom-10 right-10 z-50 h-[30vh] lg:h-[40vh] hidden md:flex w-auto object-cover"
							src={story?.image ?? ""}
							alt={story?.title ?? ""}
							width={100}
							height={100}
							priority
						/>
					</motion.div>

					{/* Background Video */}
					<video
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						className="absolute z-40 aspect-video h-full w-full object-cover brightness-50"
					>
						<source src={story?.backgroundImage} type="video/mp4" />
					</video>
				</div>
			) : (
				// Image background version
				<div>
					{/* Animated Title (Single Block Animation) */}
					<motion.div
						className="absolute left-10 top-5 z-50 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-5xl lg:text-9xl"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						{story?.title}
					</motion.div>

					{/* Button appears only if title is not "Coming Soon" */}
					{story?.title !== "Coming Soon" && (
						<motion.div
							className="absolute bottom-10 left-10 z-50"
							variants={downToUpVariants}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<StoryButton story={story} />
						</motion.div>
					)}

					{/* Background Image */}
					<Image
						src={story?.backgroundImage ?? ""}
						alt={story?.title ?? ""}
						width={600}
						height={600}
						className="absolute left-0 top-0 z-40 h-full w-full object-cover brightness-50"
						priority
					/>
				</div>
			)}
		</motion.div>
	);
};

export default StoryComponent;
