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
import CharacterModal from "@/components/character/character-card/character-modal/character-modal";
import type { CharacterProps } from "@/types/character-type";
import { motion } from "framer-motion";
import { StoryTabContent } from "./story-tab-content";
import { CharactersTabContent } from "./characters-tab-content";

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

    const chapterToDisplay = chapters.find(c => c.storyChapterId === selectedChapterId);

    const relevantCharacters = chapterToDisplay?.characterNameList
        ? characters.filter(char => chapterToDisplay.characterNameList.includes(char.id))
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
            <TabsList className="grid grid-cols-2 bg-background justify-between p-1 h-auto rounded-md mb-6 bg-warmGrey3">
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
                <StoryTabContent
                    chapters={chapters}
                    selectedChapterId={selectedChapterId}
                    chapterToDisplay={chapterToDisplay}
                    iframeSrc={iframeSrc}
                    isMuted={isMuted}
                    handleSelectChapter={handleSelectChapter}
                    toggleSound={toggleSound}
                />
            </TabsContent>

            <TabsContent value="characters" className="w-full">
                <CharactersTabContent
                    relevantCharacters={relevantCharacters}
                    handleOpenModal={handleOpenModal}
                />
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
