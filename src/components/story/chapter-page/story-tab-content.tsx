import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, ChevronRight } from "lucide-react";
import VideoIframe from "@/components/story/common/video-iframe";
import StoryVideoNavigationButtons from "@/components/story/common/story-video-navigation-button";
import { type FC, useMemo } from "react";

interface StoryTabContentProps {
    chapters: BackendStoryChapter[];
    selectedChapterId: string;
    chapterToDisplay: BackendStoryChapter | undefined;
    iframeSrc: string | undefined;
    isMuted: boolean;
    handleSelectChapter: (chapterId: string) => void;
    toggleSound: () => void;
}

// Helper function to extract sort key from chapter number
const getChapterSortKey = (chapter: BackendStoryChapter): number => {
    const numberPart = chapter.chapterNumber?.split(' ')[1];
    return Number.parseInt(numberPart ?? '0', 10);
};

export const StoryTabContent: FC<StoryTabContentProps> = ({
    chapters,
    selectedChapterId,
    chapterToDisplay,
    iframeSrc,
    isMuted,
    handleSelectChapter,
    toggleSound,
}) => {
    // Memoize the sorted chapters array
    const sortedChapters = useMemo(() => {
        return [...chapters].sort((a, b) => {
            const aNum = getChapterSortKey(a);
            const bNum = getChapterSortKey(b);
            return aNum - bNum;
        });
    }, [chapters]);

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {/* Chapter List Column */}
            <div
                className="md:col-span-1 p-4 rounded-lg overflow-y-auto bg-warmGrey3 max-h-[70vh]"
            >
                <h3 className="text-sm font-semibold uppercase tracking-widest">Chapters</h3>
                <div className=" mt-5" />
                <ul>
                    {sortedChapters.map((chapter) => (
                        <li key={chapter.storyChapterId} className="list-none border-b border-charcoal last:border-b-0">
                            <button
                                type="button"
                                onClick={chapter.isUnlocked ? () => handleSelectChapter(chapter.storyChapterId) : undefined}
                                disabled={!chapter.isUnlocked}
                                className={`w-full text-left rounded transition-colors duration-150 flex items-center p-3 space-x-4 ${selectedChapterId === chapter.storyChapterId
                                    ? 'bg-warmGrey'
                                    : chapter.isUnlocked
                                        ? 'hover:bg-warmGrey/80 focus:bg-warmGrey/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                        : 'opacity-60 cursor-not-allowed'
                                    }`}
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-warmGrey4 rounded overflow-hidden flex items-center justify-center">
                                    {chapter.isUnlocked && chapter.chapterImage ? (
                                        <Image
                                            src={chapter.chapterImage}
                                            alt={chapter.chapterTitle}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <Lock className="w-6 h-6 text-charcoal" />
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="text-xs text-charcoal uppercase tracking-widest font-medium ">
                                        {chapter.chapterNumber}
                                    </div>
                                    <div className="font-semibold text-xs tracking-wider italic mt-1">
                                        {chapter.chapterTitle}
                                    </div>
                                </div>
                                {chapter.isUnlocked && (
                                    <div className="flex-shrink-0">
                                        <ChevronRight className="w-5 h-5 text-charcoal" />
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Video/Description Column */}
            <div className="md:col-span-3 bg-background p-4 rounded-lg border max-h-[70vh] overflow-y-auto scrollbar-hide bg-warmGrey3">
                {chapterToDisplay ? (
                    <div>
                        {iframeSrc && (
                            <div className="aspect-video overflow-hidden rounded-lg relative">
                                <VideoIframe
                                    iframeSrc={iframeSrc}
                                    title={`${chapterToDisplay.sagaName} ${chapterToDisplay.chapterNumber}`}
                                />
                                <StoryVideoNavigationButtons
                                    isMuted={isMuted}
                                    toggleSound={toggleSound}
                                />
                            </div>
                        )}
                        {/* TODO: Add description display back if needed */}
                        {/* <h3 className="text-sm font-bold uppercase tracking-widest py-2">Description</h3> */}
                        {/* <p>{chapterToDisplay.chapterDesc}</p> */}
                    </div>
                ) : (
                    <p>No chapter selected or chapter data missing.</p>
                )}
            </div>
        </motion.div>
    );
}; 