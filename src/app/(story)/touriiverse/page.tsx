"use client";

import StoryComponent from "@/components/touriiverse/StoryComponent";
import StorySelectionButton from "@/components/touriiverse/StorySelection";
import { storyData, storySelectionData } from "@/lib/data/story/storyData";
import { type NextPage } from "next";
import { useEffect, useState } from "react";

const Touriiverse: NextPage = () => {
  const [selectedStory, setSelectedStory] = useState(storyData[0]);
  const [selectionData, setSelectionData] = useState(storySelectionData);

  useEffect(() => {
    const initialSelectionData = selectionData.map((selection, index) => ({
      ...selection,
      isSelected: index === 0,
    }));
    setSelectionData(initialSelectionData);
  }, []);

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
    <div>
      <div className="flex h-[90vh] items-center justify-center transition-all duration-300">
        <div className="flex w-full snap-x flex-col items-center">
          <StoryComponent key={selectedStory?.storyId} story={selectedStory} />
          <div className="item-center mt-2 flex w-11/12 justify-center gap-1">
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
    </div>
  );
};

export default Touriiverse;
