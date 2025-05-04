import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import VideoIframe from "@/components/story/common/video-iframe";
import StoryVideoNavigationButtons from "@/components/story/common/story-video-navigation-button";
import { Lock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { characters } from "@/lib/data/character/character-data";
import CharacterCard from "@/components/character/character-card/character-card";
import CharacterModal from "@/components/character/character-card/character-modal/character-modal";
import type { CharacterProps } from "@/types/character-type";
import { motion } from "framer-motion";

interface ChapterTabsProps {
    chapters: BackendStoryChapter[];
    initialSelectedChapterId: string;
}

export const ChapterTabs: React.FC<ChapterTabsProps> = ({ chapters, initialSelectedChapterId }) => {
    const router = useRouter();
    const params = useParams();
    const storyId = Array.isArray(params.storyId) ? params.storyId[0] : params.storyId;

    const [selectedChapterId, setSelectedChapterId] = useState<string>(initialSelectedChapterId);
    const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);
    const [isMuted, setIsMuted] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCharacterForModal, setSelectedCharacterForModal] = useState<CharacterProps | null>(null);

    const selectedChapter = chapters.find(c => c.storyChapterId === selectedChapterId);

    const chapterToDisplay = chapters.find(c => c.storyChapterId === selectedChapterId);

    const relevantCharacters = selectedChapter?.characterNameList
        ? characters.filter(char => selectedChapter.characterNameList.includes(char.id))
        : [];

    const handleSelectChapter = (chapterId: string) => {
        setSelectedChapterId(chapterId);
        if (storyId) {
            router.push(`/v2/touriiverse/${storyId}/chapters/${chapterId}`, { scroll: false });
        }
    };

    const handleOpenModal = (character: CharacterProps) => {
        setSelectedCharacterForModal(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCharacterForModal(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (chapterToDisplay) {
                if (window.innerWidth <= 768) {
                    setIframeSrc(chapterToDisplay.chapterVideoMobileUrl);
                } else {
                    setIframeSrc(chapterToDisplay.chapterVideoUrl);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [chapterToDisplay]);

    const toggleSound = () => {
        const iframe = document.getElementById(
            "youtube-player",
        ) as HTMLIFrameElement;
        if (iframe?.contentWindow) {
            const command = isMuted ? 'unMute' : 'mute';
            iframe.contentWindow.postMessage(
                `{"event":"command","func":"${command}","args":""}`,
                "*",
            );
            setIsMuted(!isMuted);
        }
    };

    return (
        <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-[450px] grid-cols-3 bg-background justify-between p-1 h-auto rounded-md mb-6 bg-warmGrey3">
                <TabsTrigger
                    value="story"
                    className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal">
                    Story
                </TabsTrigger>
                <TabsTrigger
                    value="characters"
                    className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal">
                    Characters
                </TabsTrigger>
                {/* <TabsTrigger
                    value="world-lore"
                    className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal">
                    World Lore
                </TabsTrigger> */}
            </TabsList>

            <TabsContent value="story" className="w-full">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div
                        className="md:col-span-1 p-4 rounded-lg overflow-y-auto bg-warmGrey3 max-h-[70vh]"
                    >
                        <h3 className="text-sm font-semibold uppercase tracking-widest">Chapters</h3>
                        <div className=" mt-5" />
                        <ul>
                            {chapters.map((chapter) => (
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
                            </div>
                        ) : (
                            <p>No chapter selected or chapter data missing.</p>
                        )}
                    </div>
                </motion.div>
            </TabsContent>

            <TabsContent value="characters" className="w-full">
                {relevantCharacters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relevantCharacters.map((character) => (
                            <motion.div
                                key={character.id}
                                tabIndex={0}
                                className="block w-full text-left appearance-none bg-transparent border-none p-0 m-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg hover:shadow-md transition-shadow duration-200"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleOpenModal(character);
                                    }
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CharacterCard
                                    {...character}
                                    onClick={() => handleOpenModal(character)}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Characters</CardTitle>
                            <CardDescription>No specific characters listed for this chapter.</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </TabsContent>

            {/* <TabsContent value="world-lore">
                <Card>
                    <CardHeader>
                        <CardTitle>World Lore</CardTitle>
                        <CardDescription>World lore details will be displayed here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This section will delve into the world and lore surrounding the story.</p>
                    </CardContent>
                </Card>
            </TabsContent> */}

            <CharacterModal
                isOpen={isModalOpen}
                character={selectedCharacterForModal}
                onClose={handleCloseModal}
                characters={relevantCharacters}
            />
        </Tabs>
    );
};
