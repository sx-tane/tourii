import type { Meta, StoryObj } from "@storybook/react";

import { ChapterTabs } from "./chapter-tabs";

const meta: Meta<typeof ChapterTabs> = {
    title: "Story/Chapter/ChapterTabs", // Adjusted title based on path
    component: ChapterTabs,
    tags: ["autodocs"], // Optional: enables automatic documentation generation
    parameters: {
        // Optional parameters
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        // Since ChapterTabs currently takes no props, args is empty
    },
};
