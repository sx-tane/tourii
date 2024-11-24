import type { Chapter } from "@/types/interfaceStory";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type React from "react";

type ChapterButtonProps = {
	chapter: Chapter | undefined;
};

const ChapterButton: React.FC<ChapterButtonProps> = ({ chapter }) => {
	const isUnlocked = chapter?.vnUnlocked;
	return (
		<div>
			{isUnlocked ? (
				<Link
					href={`/touriiverse/bungo-ono/${chapter.chapterId}`}
					className="mt-8 flex cursor-pointer justify-center  rounded-full bg-charcoal px-16 py-3 text-center font-semibold tracking-wider text-warmGrey transition-all duration-300 hover:bg-red hover:text-warmGrey"
				>
					Start {chapter.chapterNumber}
				</Link>
			) : (
				<div className="mt-8 cursor-not-allowed rounded-full bg-warmGrey3 px-16 py-3 text-center font-semibold tracking-wider text-warmGrey">
					<LockClosedIcon
						className="-mt-1 mr-2 inline h-5 w-5"
						aria-hidden="true"
					/>
					Start {chapter?.chapterNumber}
				</div>
			)}
		</div>
	);
};

export default ChapterButton;
