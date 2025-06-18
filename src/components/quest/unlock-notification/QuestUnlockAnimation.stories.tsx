import type { Meta, StoryObj } from "@storybook/react";
import QuestUnlockAnimation from "./QuestUnlockAnimation";

const meta: Meta<typeof QuestUnlockAnimation> = {
  title: "Quest/Unlock Notification/QuestUnlockAnimation",
  component: QuestUnlockAnimation,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: 
          "Animated Torii gate component with sunset background and sparkle effects. Used in the quest unlock modal to create a beautiful, thematic animation that celebrates the unlocking of new quests."
      }
    }
  },
  argTypes: {
    isVisible: {
      control: "boolean",
      description: "Controls whether the animation is visible"
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply"
    }
  }
};

export default meta;
type Story = StoryObj<typeof QuestUnlockAnimation>;

/**
 * Default state of the quest unlock animation showing the beautiful Torii gate
 * with sunset background and sparkle effects.
 */
export const Default: Story = {
  args: {
    isVisible: true,
    className: ""
  }
};

/**
 * Animation in a container to show how it responds to different sizes.
 */
export const InContainer: Story = {
  args: {
    isVisible: true,
    className: "w-64 h-64"
  },
  decorators: [
    (Story) => (
      <div className="w-80 h-80 p-4 border rounded-lg bg-warmGrey">
        <Story />
      </div>
    )
  ]
};

/**
 * Hidden state - useful for testing visibility toggles.
 */
export const Hidden: Story = {
  args: {
    isVisible: false
  }
};

/**
 * Small size variant for mobile or compact displays.
 */
export const SmallSize: Story = {
  args: {
    isVisible: true,
    className: "w-32 h-32"
  }
};