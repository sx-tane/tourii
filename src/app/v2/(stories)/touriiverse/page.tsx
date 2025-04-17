"use client";

import StoryComponent from "@/components/story/story-page/story-component";
import StorySelectionList from "@/components/story/story-page/story-selection/story-selection-list";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchStories, setSelectedStory, selectStories } from "@/lib/redux/features/stories/stories-slice";
import type { NextPage } from "next";
import { useEffect } from "react";
import Loading from "@/app/loading";

const Touriiverse: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedStory, selectionData, status, error } = useAppSelector(selectStories);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchStories());
		}
	}, [status, dispatch]);

	const handleSelectStory = (selectedStoryId: string) => {
		dispatch(setSelectedStory(selectedStoryId));
	};

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	if (!selectedStory) {
		return null;
	}

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<StoryComponent key={selectedStory.storyId} story={selectedStory} />
				<StorySelectionList
					selectionData={selectionData}
					onSelect={handleSelectStory}
				/>
			</div>
		</div>
	);
};

export default Touriiverse;
