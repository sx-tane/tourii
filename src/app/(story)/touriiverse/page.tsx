"use client";

import StoryComponent from "@/components/touriiverse-story/story-page/story-component";
import StorySelectionButton from "@/components/touriiverse-story/story-page/story-selection/story-selection-button";
import StorySelectionList from "@/components/touriiverse-story/story-page/story-selection/story-selection-list";
import {
	storyData,
	storySelectionData,
} from "@/lib/data/touriiverse/story-data";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Touriiverse: NextPage = () => {
	const [selectedStory, setSelectedStory] = useState(storyData[0]);
	const [selectionData, setSelectionData] = useState(storySelectionData);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
				isSelected: selection.selectedStoryId === selectedStoryId,
			}));
			setSelectionData(updatedSelectionData);
		}
	};

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<StoryComponent key={selectedStory?.storyId} story={selectedStory} />
				<StorySelectionList
					selectionData={selectionData}
					onSelect={handleSelectStory}
				/>
			</div>
		</div>
	);
};

export default Touriiverse;
