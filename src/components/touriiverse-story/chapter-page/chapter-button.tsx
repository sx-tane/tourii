import type { ChapterButtonProps } from "@/types/story-type";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type React from "react";

const ChapterButton: React.FC<ChapterButtonProps> = ({
	areaLink,
	vnUnlocked,
	chapterId,
	chapterNumber,
}) => {
	return (
		<div className="text-sm">
			{vnUnlocked ? (
				<Link
					href={`${areaLink}/${chapterId}`}
					className="mt-8 flex cursor-pointer justify-center rounded-full bg-charcoal px-16 py-3 text-center font-semibold tracking-wider text-warmGrey transition-all duration-300 hover:bg-red hover:text-warmGrey"
				>
					Start {chapterNumber}
				</Link>
			) : (
				<div className="mt-8 cursor-not-allowed rounded-full bg-warmGrey3 py-3 text-center font-semibold tracking-wider text-warmGrey">
					<LockClosedIcon
						className="-mt-1 mr-2 inline h-5 w-5"
						aria-hidden="true"
					/>
					Start {chapterNumber}
				</div>
			)}
		</div>
	);
};

export default ChapterButton;
