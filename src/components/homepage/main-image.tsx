"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MainImage: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.8;
		}
	}, []);

	return (
		<div>
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="rounded-full border-[1.5px] border-mustard p-3 transition-transform duration-300 hover:scale-105">
						<Link href="https://www.youtube.com/@TouriiJP">
							<video
								ref={videoRef}
								autoPlay
								loop
								muted
								playsInline
								width={700}
								height={700}
								className="z-20 h-full w-full rounded-full object-cover"
							>
								<source src="/video/Tourii.mp4" type="video/mp4" />
							</video>
						</Link>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default MainImage;
