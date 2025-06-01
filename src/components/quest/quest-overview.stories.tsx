import QuestOverview from "./quest-overview";
import { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { Meta, StoryObj } from "@storybook/react";

const mockQuest: QuestResponseDto = {
  questId: "1",
  questName: "Golden Gate Adventure",
  questDesc:
    "Embark on an unforgettable journey across the Golden Gate Bridge and its surroundings. You'll discover breathtaking viewpoints, learn about the bridge's fascinating history, and capture stunning photos to share with friends and fellow adventurers. This quest will take you through some of San Francisco's most beautiful parks and scenic spots, offering a perfect blend of urban exploration and natural beauty.",
  questImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  questType: QuestResponseDto.questType.TRAVEL_TO_EARN,
  isUnlocked: true,
  isPremium: false,
  totalMagatamaPointAwarded: 500,
  tasks: [
    {
      taskId: "t1",
      questId: "1",
      taskTheme: "STORY",
      taskType: "VISIT_LOCATION",
      taskName: "Visit the Bridge",
      taskDesc: "Walk across the Golden Gate Bridge.",
      isUnlocked: true,
      requiredAction: "Walk across the bridge",
      groupActivityMembers: [],
      selectOptions: [],
      antiCheatRules: {},
      magatamaPointAwarded: 100,
      totalMagatamaPointAwarded: 100,
    },
    {
      taskId: "t2",
      questId: "1",
      taskTheme: "URBAN_EXPLORE",
      taskType: "PHOTO_UPLOAD",
      taskName: "Take a Photo",
      taskDesc: "Capture a photo from the viewpoint.",
      isUnlocked: false,
      requiredAction: "Upload a photo",
      groupActivityMembers: [],
      selectOptions: [],
      antiCheatRules: {},
      magatamaPointAwarded: 50,
      totalMagatamaPointAwarded: 50,
    },
  ],
};

const meta: Meta<typeof QuestOverview> = {
  title: "Quest/QuestOverview",
  component: QuestOverview,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof QuestOverview>;

export const Default: Story = {
  args: {
    quest: mockQuest,
  },
}; 