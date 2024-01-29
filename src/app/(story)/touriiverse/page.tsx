"use client";

import StoryComponent from "@/components/touriiverse/StoryComponent";
import StorySelectionButton from "@/components/touriiverse/StorySelection";
import { storyData, storySelectionData } from "@/lib/data/story/storyData";
import { type NextPage } from "next";
import { useState } from "react";

const Touriiverse: NextPage = () => {
  const [selectedStory, setSelectedStory] = useState(storyData[0]);
  const [selectionData, setSelectionData] = useState(storySelectionData);

  const handleSelectStory = (selectedStoryId: string) => {
    const story = storyData.find((s) => s.storyId === selectedStoryId);
    if (story) {
      setSelectedStory(story);
      const updatedSelectionData = selectionData.map((selection) => ({
        ...selection,
        isSelected: selection.selecedStoryId === selectedStoryId,
      }));
      setSelectionData(updatedSelectionData);
    }
  };

  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="flex w-full flex-col items-center">
        <StoryComponent key={selectedStory?.storyId} story={selectedStory} />
        <div className="mt-4 flex w-11/12 gap-1">
          {selectionData.map((selection) => (
            <StorySelectionButton
              key={selection.selecedStoryId}
              selection={selection}
              onSelect={handleSelectStory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Touriiverse;
