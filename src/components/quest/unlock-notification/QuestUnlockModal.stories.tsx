import type { Meta, StoryObj } from "@storybook/react";
import QuestUnlockModal from "./QuestUnlockModal";
import type { StoryCompletionResponseDto } from "@/api/generated";

const meta: Meta<typeof QuestUnlockModal> = {
  title: "Quest/Unlock Notification/QuestUnlockModal", 
  component: QuestUnlockModal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: 
          "Main modal for displaying quest unlock notifications after story completion. Features beautiful Torii gate animation, quest previews, story completion rewards, and action buttons for navigation."
      }
    }
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is open"
    },
    onClose: {
      action: "close",
      description: "Callback function when modal is closed"
    },
    onStartQuest: {
      action: "startQuest", 
      description: "Callback function when Start Quest button is clicked"
    },
    onViewAllQuests: {
      action: "viewAllQuests",
      description: "Callback function when View All Quests button is clicked"
    }
  }
};

export default meta;
type Story = StoryObj<typeof QuestUnlockModal>;

// Mock story completion data
const mockStoryCompletionData: StoryCompletionResponseDto = {
  success: true,
  message: "Story completed successfully",
  storyProgress: {
    storyChapterId: "chapter-001",
    chapterTitle: "The Sacred Journey Begins",
    status: StoryCompletionResponseDto.status.COMPLETED,
    completedAt: new Date().toISOString()
  },
  unlockedQuests: [
    {
      questId: "quest-001",
      questName: "Sacred Mountain Trail",
      questDesc: "Explore the ancient pathways leading to the sacred mountain shrine and discover hidden treasures along the way.",
      questImage: "/image/model-route/1/kashima-shrine/1.jpg",
      touristSpotName: "Fushimi Inari Shrine",
      totalMagatamaPointAwarded: 500,
      isPremium: false
    }
  ],
  rewards: {
    magatamaPointsEarned: 100,
    achievementsUnlocked: ["First Chapter Complete"]
  }
};

const mockMultipleQuestsData: StoryCompletionResponseDto = {
  ...mockStoryCompletionData,
  storyProgress: {
    ...mockStoryCompletionData.storyProgress,
    chapterTitle: "The Great Convergence"
  },
  unlockedQuests: [
    {
      questId: "quest-001",
      questName: "Sacred Mountain Trail",
      questDesc: "Explore the ancient pathways leading to the sacred mountain shrine.",
      questImage: "/image/model-route/1/kashima-shrine/1.jpg",
      touristSpotName: "Fushimi Inari Shrine",
      totalMagatamaPointAwarded: 500,
      isPremium: false
    },
    {
      questId: "quest-002",
      questName: "Temple Bell Ceremony",
      questDesc: "Participate in the ancient bell ringing ceremony.",
      questImage: "/image/model-route/2/fukoji-temple/1.jpg",
      touristSpotName: "Fushimi Inari Shrine", 
      totalMagatamaPointAwarded: 300,
      isPremium: true
    },
    {
      questId: "quest-003",
      questName: "Moonlight Meditation",
      questDesc: "Join the evening meditation session under the moonlight.",
      questImage: null,
      touristSpotName: "Fushimi Inari Shrine",
      totalMagatamaPointAwarded: 400,
      isPremium: false
    }
  ],
  rewards: {
    magatamaPointsEarned: 250,
    achievementsUnlocked: ["Master Explorer", "Story Sage"]
  }
};

const mockNoRewardsData: StoryCompletionResponseDto = {
  ...mockStoryCompletionData,
  rewards: {
    magatamaPointsEarned: 0,
    achievementsUnlocked: []
  }
};

/**
 * Default modal with single quest unlock.
 */
export const Default: Story = {
  args: {
    isOpen: true,
    storyCompletionData: mockStoryCompletionData
  }
};

/**
 * Modal with multiple unlocked quests showing "View All Quests" button.
 */
export const MultipleQuests: Story = {
  args: {
    isOpen: true,
    storyCompletionData: mockMultipleQuestsData
  }
};

/**
 * Modal without story completion rewards.
 */
export const NoRewards: Story = {
  args: {
    isOpen: true,
    storyCompletionData: mockNoRewardsData
  }
};

/**
 * Closed modal state for testing.
 */
export const Closed: Story = {
  args: {
    isOpen: false,
    storyCompletionData: mockStoryCompletionData
  }
};

/**
 * Quest with premium badge and high rewards.
 */
export const PremiumQuest: Story = {
  args: {
    isOpen: true,
    storyCompletionData: {
      ...mockStoryCompletionData,
      unlockedQuests: [
        {
          questId: "quest-premium",
          questName: "Exclusive Shrine Experience",
          questDesc: "Gain exclusive access to restricted areas of the shrine and participate in special ceremonies reserved for premium members.",
          questImage: "/image/model-route/2/fukoji-temple/2.jpg",
          touristSpotName: "Kyoto Imperial Palace",
          totalMagatamaPointAwarded: 1200,
          isPremium: true
        }
      ],
      rewards: {
        magatamaPointsEarned: 500,
        achievementsUnlocked: ["Premium Explorer", "Royal Access"]
      }
    }
  }
};

/**
 * Long chapter title and tourist spot name to test text overflow.
 */
export const LongContent: Story = {
  args: {
    isOpen: true,
    storyCompletionData: {
      ...mockStoryCompletionData,
      storyProgress: {
        ...mockStoryCompletionData.storyProgress,
        chapterTitle: "The Epic Journey Through The Ancient Sacred Mountains And Mystical Forests"
      },
      unlockedQuests: [
        {
          ...mockStoryCompletionData.unlockedQuests[0],
          questName: "An Extremely Long Quest Name That Tests Text Wrapping",
          touristSpotName: "The Ancient Temple of the Sacred Mountain Spirits and Divine Guardians"
        }
      ]
    }
  }
};