import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import type { Story } from "@/types/story-type";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import StoryButton from "./story-button";

const StoryComponent: React.FC<{ story: Story | undefined }> = ({ story }) => {
	const isVideo = story?.backgroundImage.endsWith(".mp4");
	const isNotVideo = story?.backgroundImage.endsWith(".png");

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
			{story?.image ? (
				<div>
					{/* Animated Title (Single Block Animation) */}
					<motion.div
						className="absolute left-10 top-5 z-30 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-6xl lg:text-9xl"
						variants={upToDownVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						{story?.title}
					</motion.div>

					{/* Delayed Button Animation */}
					<motion.div
						className="absolute bottom-10 left-10 z-30"
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<StoryButton story={story} />
					</motion.div>

					{/* Delayed Description & Image Animation */}
					<motion.div
						className="absolute right-10 top-5 z-30 w-1/3 hidden md:flex text-sm lg:text-base"
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
							className="absolute bottom-5 right-10 z-40 h-[30vh] lg:h-[40vh] xl:h-[45vh] hidden md:flex w-auto object-cover"
							src={story?.image ?? ""}
							alt={story?.title ?? ""}
							width={1000}
							height={1000}
							priority
						/>
					</motion.div>

					{/* Background Video */}
					{isVideo && (
						<video
							autoPlay
							loop
							muted
							playsInline
							preload="auto"
							className="absolute z-20 aspect-video h-full w-full object-cover brightness-50"
						>
							<source src={story?.backgroundImage} type="video/mp4" />
						</video>
					)}

					{/* Background Image */}
					{isNotVideo && (
						<Image
							src={story?.backgroundImage ?? ""}
							alt={story?.title ?? ""}
							width={1200}
							height={1200}
							className="absolute left-0 top-0 z-20 h-full w-full object-cover brightness-50"
							priority
						/>
					)}
				</div>
			) : (
				// Image background version
				<div>
					{/* Animated Title (Single Block Animation) */}
					<motion.div
						className="absolute left-10 top-5 z-40 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-5xl lg:text-9xl"
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
							className="absolute bottom-10 left-10 z-40"
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
