"use client";

import { downToUpVariants } from "@/lib/animation/variants-settings";
import { Button } from "@headlessui/react";
import {
	ArrowRightIcon,
	ArrowUturnLeftIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Prologue: NextPage = () => {
	const [isMuted, setIsMuted] = useState(false);
	const router = useRouter();
	const [iframeSrc, setIframeSrc] = useState(
		"https://www.youtube.com/embed/76yQ6bMiQB8?autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
	);

	const toggleSound = () => {
		const iframe = document.getElementById(
			"youtube-player",
		) as HTMLIFrameElement;
		if (iframe?.contentWindow) {
			if (isMuted) {
				iframe.contentWindow.postMessage(
					'{"event":"command","func":"unMute","args":""}',
					"*",
				);
			} else {
				iframe.contentWindow.postMessage(
					'{"event":"command","func":"mute","args":""}',
					"*",
				);
			}
			setIsMuted(!isMuted);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIframeSrc(
					"https://www.youtube.com/embed/oiB7xIM8rC4?si=wvqr43SS-Xa30mP1&autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
				);
			} else {
				setIframeSrc(
					"https://www.youtube.com/embed/76yQ6bMiQB8?autoplay=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0",
				);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleNextChapter = () => {
		router.push("/touriiverse/bungo-ono/bungoOnoChapterId2");
	};

	return (
		<div>
			<motion.div
				className="absolute right-0 h-[90vh] w-full md:h-[85vh] md:w-[85vw] animate-fadeIn md:rounded-tl-full md:rounded-bl-full text-charcoal"
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5 }}
			>
				<iframe
					id="youtube-player"
					src={iframeSrc}
					title="Tourii Prologue"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
					className="w-full h-full md:rounded-bl-xl md:rounded-tl-xl rounded-xl"
				/>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={downToUpVariants}
					transition={{ duration: 0.5 }}
					className="absolute left-5 bottom-5 space-x-2"
				>
					<Link href="/touriiverse">
						<Button className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal">
							<ArrowUturnLeftIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
						</Button>
					</Link>
					<Button
						onClick={toggleSound}
						className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
					>
						{isMuted ? (
							<SpeakerXMarkIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
						) : (
							<SpeakerWaveIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
						)}
					</Button>
					<Button
						onClick={handleNextChapter}
						className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
					>
						<ArrowRightIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					</Button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Prologue;
