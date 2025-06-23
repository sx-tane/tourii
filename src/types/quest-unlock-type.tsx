import type { StoryCompletionResponseDto } from "@/api/generated";

// Re-export for convenience
export type { StoryCompletionResponseDto };

/**
 * Quest unlock data structure extracted from story completion response
 */
export interface QuestUnlockData {
	questId: string;
	questName: string;
	questDesc: string;
	questImage: string | null;
	touristSpotName: string;
	totalMagatamaPointAwarded: number;
	isPremium: boolean;
}

/**
 * Props for QuestUnlockModal component
 */
export interface QuestUnlockModalProps {
	isOpen: boolean;
	onClose: () => void;
	storyCompletionData: StoryCompletionResponseDto;
	onStartQuest?: (questId: string) => void;
	onViewAllQuests?: (touristSpotName: string) => void;
}

/**
 * Props for QuestPreviewCard component
 */
export interface QuestPreviewCardProps {
	quest: QuestUnlockData;
	onStartQuest?: (questId: string) => void;
	className?: string;
}

/**
 * Props for QuestUnlockAnimation component
 */
export interface QuestUnlockAnimationProps {
	className?: string;
	isVisible?: boolean;
}

/**
 * Hook state for quest unlock functionality
 */
export interface UseQuestUnlockState {
	isModalOpen: boolean;
	questUnlockData: StoryCompletionResponseDto | null;
	showUnlockModal: (data: StoryCompletionResponseDto) => void;
	hideUnlockModal: () => void;
	handleStartQuest: (questId: string) => void;
	handleViewAllQuests: (touristSpotName: string) => void;
}

/**
 * Hook state for video completion functionality
 */
export interface UseVideoCompletionState {
	isVideoCompleted: boolean;
	videoProgress: number;
	isVideoPlaying: boolean;
	handleVideoEnd: () => void;
	handleVideoProgress: (progress: number) => void;
	resetVideoState: () => void;
}

/**
 * YouTube player event types
 */
export interface YouTubePlayerEvent {
	target: {
		getCurrentTime: () => number;
		getDuration: () => number;
		getPlayerState: () => number;
	};
}

/**
 * YouTube player states
 */
export enum YouTubePlayerState {
	UNSTARTED = -1,
	ENDED = 0,
	PLAYING = 1,
	PAUSED = 2,
	BUFFERING = 3,
	CUED = 5,
}
