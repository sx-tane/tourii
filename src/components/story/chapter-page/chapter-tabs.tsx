import type { StoryChapterResponseDto } from "@/api/generated";
import type { CharacterProps } from "@/app/v2/(stories)/types";
import CharacterModal from "@/components/character/character-card/character-modal/character-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { characters } from "@/lib/data/character/character-data";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CharactersTabContent } from "./characters-tab-content";
import { StoryTabContent } from "./story-tab-content";
import { WorldLoreTabContent } from "./world-lore-tab-content";

interface ChapterTabsProps {
	chapters: StoryChapterResponseDto[];
	initialSelectedChapterId: string;
	onVideoComplete?: () => void;
}

export const ChapterTabs: React.FC<ChapterTabsProps> = ({
	chapters,
	initialSelectedChapterId,
	onVideoComplete,
}) => {
	const router = useRouter();
	const params = useParams();
	const storyId = Array.isArray(params.storyId)
		? params.storyId[0]
		: params.storyId;

	const [selectedChapterId, setSelectedChapterId] = useState<string>(
		initialSelectedChapterId,
	);
	const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);
	const [isMuted, setIsMuted] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCharacterForModal, setSelectedCharacterForModal] =
		useState<CharacterProps | null>(null);

	const chapterToDisplay = chapters.find(
		(c) => c.storyChapterId === selectedChapterId,
	);

	const relevantCharacters = chapterToDisplay?.characterNameList
		? characters.filter((char) =>
				chapterToDisplay.characterNameList.includes(char.id),
			)
		: [];

	const handleSelectChapter = (chapterId: string) => {
		setSelectedChapterId(chapterId);
		if (storyId) {
			router.push(`/v2/touriiverse/${storyId}/chapters/${chapterId}`, {
				scroll: false,
			});
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
			const command = isMuted ? "unMute" : "mute";
			iframe.contentWindow.postMessage(
				`{"event":"command","func":"${command}","args":""}`,
				"*",
			);
			setIsMuted(!isMuted);
		}
	};

	return (
		<Tabs defaultValue="story" className="w-full">
			<TabsList className="grid grid-cols-3 md:w-1/2 w-full border border-warmGrey3 justify-between p-1 h-auto rounded-md mb-6 bg-transparent">
				<TabsTrigger
					value="story"
					className=" px-5 py-2 uppercase tracking-[0.15rem] md:text-xs text-[10px] font-medium text-warmGrey3"
				>
					Story
				</TabsTrigger>
				<TabsTrigger
					value="characters"
					className=" px-5 py-2 uppercase tracking-[0.15rem] md:text-xs text-[10px] font-medium text-warmGrey3"
				>
					Characters
				</TabsTrigger>
				<TabsTrigger
					value="world-lore"
					className=" px-5 py-2 uppercase tracking-[0.15rem] md:text-xs text-[10px] font-medium text-warmGrey3"
				>
					World Lore
				</TabsTrigger>
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
					onVideoComplete={onVideoComplete}
				/>
			</TabsContent>

			<TabsContent value="characters" className="w-full">
				<CharactersTabContent
					relevantCharacters={relevantCharacters}
					handleOpenModal={handleOpenModal}
				/>
			</TabsContent>

			<TabsContent value="world-lore" className="w-full">
				<WorldLoreTabContent
					storyChapterId={chapterToDisplay?.storyChapterId}
				/>
			</TabsContent>

			<CharacterModal
				isOpen={isModalOpen}
				character={selectedCharacterForModal}
				onClose={handleCloseModal}
				characters={relevantCharacters}
			/>
		</Tabs>
	);
};
