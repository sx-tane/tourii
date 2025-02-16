"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import {
	bungoOnoChapterData,
	prologueChapterData,
} from "@/lib/data/touriiverse/chapter-data";
import type { Chapter } from "@/types/story-type";
import { Button } from "@headlessui/react";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUturnLeftIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const YoutubeVideo: React.FC = () => {
	const { chapterId } = useParams();
	const router = useRouter();
	const [chapter, setChapter] = useState<Chapter | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isMuted, setIsMuted] = useState(false);
	const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const foundChapter = bungoOnoChapterData.find(
					(p) => p.chapterId === chapterId,
				);
				setChapter(foundChapter ?? null);
			} catch (e) {
				setError("Failed to fetch chapter data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData().catch((e) => setError(e.message));
	}, [chapterId]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIframeSrc(chapter?.videoMobileLink);
			} else {
				setIframeSrc(chapter?.videoLink);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [chapter]);

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

	const handleNextChapter = () => {
		const currentIndex = bungoOnoChapterData.findIndex(
			(ch) => ch.chapterId === chapterId,
		);
		const nextChapter = bungoOnoChapterData[currentIndex + 1];
		if (nextChapter?.storyUnlocked) {
			router.push(`/touriiverse/bungo-ono/${nextChapter.chapterId}`);
		}
	};

	const handlePreviousChapter = () => {
		const currentIndex = bungoOnoChapterData.findIndex(
			(ch) => ch.chapterId === chapterId,
		);
		if (currentIndex === 1) {
			router.push("/touriiverse/prologue");
		} else {
			const previousChapter = bungoOnoChapterData[currentIndex - 1];
			if (previousChapter) {
				router.push(`/touriiverse/bungo-ono/${previousChapter.chapterId}`);
			}
		}
	};

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<ErrorComponent />
			</div>
		);
	}

	if (!chapter) {
		return (
			<div>
				<NotFoundComponent />
			</div>
		);
	}

	const currentIndex = bungoOnoChapterData.findIndex(
		(ch) => ch.chapterId === chapterId,
	);
	const nextChapter = bungoOnoChapterData[currentIndex + 1];
	const previousChapter =
		currentIndex === 0
			? prologueChapterData
			: bungoOnoChapterData[currentIndex - 1];

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
					title={`${chapter?.area} ${chapter?.chapterNumber}`}
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
					<Link href="/touriiverse/bungo-ono">
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
					{previousChapter && (
						<Button
							onClick={handlePreviousChapter}
							className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
						>
							<ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
						</Button>
					)}
					{nextChapter?.storyUnlocked && (
						<Button
							onClick={handleNextChapter}
							className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
						>
							<ArrowRightIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
						</Button>
					)}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default YoutubeVideo;
