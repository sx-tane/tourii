"use client";

import StoryVideoNavigationButtons from "@/components/story/common/story-video-navigation-button";
import VideoIframe from "@/components/story/common/video-iframe";
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
				<VideoIframe iframeSrc={iframeSrc} title="Tourii Prologue" />
				<StoryVideoNavigationButtons
					returnLink="/touriiverse"
					isMuted={isMuted}
					toggleSound={toggleSound}
					handlePreviousChapter={() => { }}
					handleNextChapter={handleNextChapter}
					previousChapterUnlocked={false}
					nextChapterUnlocked={true}
				/>
			</motion.div>
		</div>
	);
};

export default Prologue;
